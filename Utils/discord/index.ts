import { Client, GatewayIntentBits } from 'discord.js';

// export const DISCORD = async () => {
console.log('start');

const DISCORD = new Client({ intents: ['Guilds'] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
DISCORD.on('ready', () => {
  const Guilds = DISCORD.guilds.cache.map((guild) => guild);

  console.log(Guilds, 'uild');
});

// Log in to Discord with your client's token
DISCORD.login(
  'NDg4MTE5OTg1MjY5NTA2MDgw'
);

export { DISCORD };
// };
//
