import { Client, GatewayIntentBits } from 'discord.js';
import type { NextApiRequest, NextApiResponse } from 'next';
import { DISCORD } from '../../Utils/discord';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  // await DISCORD();

  DISCORD;

  return res.status(200).json({ name: 'Example' });
}
// const DISCORD = async () => {
//   const client = new Client({ intents: ['Guilds'] });

//   // When the client is ready, run this code (only once)
//   // We use 'c' for the event parameter to keep it separate from the already defined 'client'
//   client.on('ready', () => {
//     const Guilds = client.guilds.cache.map((guild) => guild);

//     console.log(Guilds);
//   });

//   // Log in to Discord with your client's token
//   client.login('TubKU1FQmCQezAdppaHUq3meofQMXZXP');
// };
