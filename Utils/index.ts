import { prisma } from './prisma';
// import type { webhooks } from '@prisma/client';

export interface IHooks {
  server_name: string;
  url: string;
}

export interface IOneHook {
  url: string;
}

export const getWebhooks = async () => {
  const storedWebhooks = await prisma.webhooks.findMany();

  return storedWebhooks;
};

export const storeWebhook = async (formData: IHooks) => {
  const { url } = formData;
  if (!url) {
    throw Error('Add webhook url');
  }

  const exists = await findOneWebhook(formData);
  console.log(exists);

  if (exists) {
    throw new Error('webhook url already exists');
  }

  console.log(exists, 'here');

  const storedWebhooks = await prisma.webhooks.create({
    data: formData
  });

  return storedWebhooks;
};

export const findOneWebhook = async (formData: IOneHook) => {
  const { url } = formData;
  if (!url) {
    throw Error('Add webhook url');
  }

  const exists = await prisma.webhooks.findUnique({
    where: { url }
  });

  if (!exists) {
    throw Error('Webhook doesnt exist');
  }

  return exists;
};
export const deleteWebhook = async (formData: IOneHook) => {
  const { url } = formData;
  if (!url) {
    throw Error('Add webhook url');
  }

  const exists = await prisma.webhooks.findUnique({
    where: { url }
  });

  if (!exists) {
    throw Error('Webhook doesnt exist');
  }

  await prisma.webhooks.delete({
    where: { url }
  });

  return 'success';
};
