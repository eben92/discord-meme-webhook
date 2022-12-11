// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getMemeTweets } from '../../Utils/twitter';
// import webhookURLS from '../../webhooks/data.json'
import { getWebHook, storeHooks } from '../../Utils/writeRead';
// import NextCors from 'nextjs-cors';

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

  const webHookURLS = await getWebHook();

  webHookURLS.map((hook: { name: string; url: string }) => {
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
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tweets = await getMemeTweets();

  const tweetOver1K =
    tweets?.data?.filter(
      (tweet) =>
        (tweet.public_metrics?.like_count ?? 0) > 500 &&
        new Date(tweet?.created_at ?? 0) > new Date(Date.now() - 86400000)
    ) ?? [];

  const twettt = [tweetOver1K[1]];

  const discordWebhookCalls = [tweetOver1K[1]]?.map((tweet) => {
    return sendTweetToDiscord(tweet);
  });

  Promise.allSettled(discordWebhookCalls);

  return res.status(200).json(tweetOver1K);
}
