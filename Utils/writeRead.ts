import fs from 'fs/promises';
import path from 'path';
const file = path.join(process.cwd(), './webhooks/data.json');
// const vc = path.join(process.cwd(), './___vc');
// const apis = path.join(process.cwd(), './api');

export async function getWebHook() {
  const rawFileContent = await fs.readFile(file, { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);

  const hookURLS = data.webhooks ?? [];
  return hookURLS;
}

export function storeHooks(webhooks: any) {
  return fs.writeFile(file, JSON.stringify({ webhooks: webhooks || [] }));
}
