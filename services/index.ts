import axios from 'axios';
import { IOneHook } from '../Utils';

const restAgent = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const getRequestConfig: any = () => {
  return {
    params: {},
    headers: {}
  };
};

export const webhooks = {
  add: (data: { url: string; name: string }) => {
    const config = getRequestConfig();

    return restAgent.post('/readwrite', data, config);
  },
  remove: (data: IOneHook) => {
    const config = getRequestConfig();
    config.params.remove = data.url;

    return restAgent.delete('/readwrite', config);
  },
  test: (data: IOneHook) => {
    const config = getRequestConfig();

    return restAgent.post('/test', data, config);
  }
};
