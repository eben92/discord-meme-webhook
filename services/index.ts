import axios from 'axios';

const restAgent = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const getRequestConfig = () => {
  return {
    params: {},
    headers: {}
  };
};

export const webhooks = {
  add: (data: { url: string; name: string }) => {
    const config = getRequestConfig();

    return restAgent.post('/readwrite', data, config);
  }
};
