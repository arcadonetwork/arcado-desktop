import { request, URI } from './request';

export const getAll = async () => {
  return request({
    url: URI,
    method: 'GET'
  });
};
