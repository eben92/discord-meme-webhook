import fs from 'fs';
import { readdir } from 'fs/promises';
import path from 'path';

const file =
  process.env.NODE_ENV !== 'production'
    ? path.join(process.cwd(), '/webhooks/data.json')
    : path.join('/tmp', 'hook.json');

export async function getWebHook() {
  console.log('hitting');
  // const files = await readdir('/tmp');
  // for (const file1 of files) console.log(file1, 'filess');

  const rawFileContent = fs.readFileSync(file, { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);

  console.log(data, 'ddd');

  const hookURLS = data.webhooks ?? [];
  return hookURLS;
}

export function storeHooks(webhooks: any) {
  return fs.writeFileSync(file, JSON.stringify({ webhooks: webhooks || [] }));
}
