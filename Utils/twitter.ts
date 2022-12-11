import { Client } from 'twitter-api-sdk';

export async function getMemeTweets() {
  const client = new Client(process.env.TWITTER_BEARER as string);

  const response = await client.tweets.tweetsRecentSearch({
    query: 'from:RespectfulMemes has:images -is:reply -is:retweet',
    'tweet.fields': ['public_metrics', 'created_at']
  });

  return response;
}
