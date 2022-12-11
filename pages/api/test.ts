// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getMemeTweets } from '../../Utils/twitter';
import type { IOneHook } from '../../Utils';
// import { findOneWebhook } from '../../Utils';

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

const sendTweetToDiscord = async (
  tweet: NonNullable<AsyncReturnType<typeof getMemeTweets>['data']>[number],
  body: IOneHook
) => {
  const formattedMessage = `Your test  \n   https://twitter.com/RespectfulMemes/status/${tweet.id}`;

  // const webHookURL = process.env.DISCORD_WEBHOOK!;

  // const webHookURLS = await findOneWebhook(body);

  return fetch(body.url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: formattedMessage
    })
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case 'POST':
      try {
        const { url }: IOneHook = body;

        if (!url) {
          return res.status(400).json({ error: 'Add webhook url' });
        }

        if (!url.startsWith('https://discord.com/api/webhooks/')) {
          return res.status(400).json({ error: 'Invalid discord webhook url' });
        }

        const tweets = await getMemeTweets();

        const tweetOver1K =
          tweets?.data?.filter(
            (tweet) =>
              (tweet.public_metrics?.like_count ?? 0) > 500 &&
              new Date(tweet?.created_at ?? 0) > new Date(Date.now() - 86400000)
          ) ?? [];

        const discordWebhookCalls = [tweetOver1K[1]]?.map((tweet) => {
          return sendTweetToDiscord(tweet, body);
        });

        Promise.allSettled(discordWebhookCalls);

        return res.status(200).json({ msg: 'sent' });
      } catch (error) {
        return res.status(400).json({ error });
      }

    default:
      return res.status(405).json({ error: 'lol' });
  }
}
