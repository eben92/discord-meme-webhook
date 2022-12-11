// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getMemeTweets } from '../../Utils/twitter';
// import { getWebHook, storeHooks } from '../../Utils/writeRead';
import type { IHooks } from '../../Utils';
import {
  findOneWebhook,
  getWebhooks,
  storeWebhook,
  deleteWebhook
} from '../../Utils';
import type { webhooks } from '@prisma/client';

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

const sendTweetToDiscord = async (
  tweet: NonNullable<AsyncReturnType<typeof getMemeTweets>['data']>[number]
) => {
  const formattedMessage = `https://twitter.com/RespectfulMemes/status/${tweet.id}`;

  // const webHookURL = process.env.DISCORD_WEBHOOK!;

  const webHookURLS = await getWebhooks();

  const send = webHookURLS.map((hook) => {
    console.log('done');
    return fetch(hook.url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: formattedMessage
      })
    });
  });

  Promise.allSettled(send);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      const tweets = await getMemeTweets();

      const tweetOver1K =
        tweets?.data?.filter(
          (tweet) =>
            (tweet.public_metrics?.like_count ?? 0) > 500 &&
            new Date(tweet?.created_at ?? 0) > new Date(Date.now() - 86400000)
        ) ?? [];

      var randomTweet =
        tweetOver1K[Math.floor(Math.random() * tweetOver1K.length)];
      const discordWebhookCalls = [randomTweet]?.map((tweet) => {
        return sendTweetToDiscord(tweet);
      });

      Promise.allSettled(discordWebhookCalls);

      return res.status(200).json({ msg: 'sent' });

    case 'POST':
      try {
        const hookData: IHooks = body;

        if (!hookData.url.startsWith('https://discord.com/api/webhooks/')) {
          return res.status(400).json({ error: 'Invalid discord webhook url' });
        }

        await storeWebhook(hookData);

        return res.status(201).json({ msg: 'success' });
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }

    case 'DELETE':
      try {
        const { remove } = query;

        if (typeof remove !== 'string') throw Error('invalid type');

        const hookData = { url: remove };
        await deleteWebhook(hookData);

        return res.status(201).json({ msg: 'your webhook has been deleted.' });
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(405).json({ error: 'lol' });
  }
}
