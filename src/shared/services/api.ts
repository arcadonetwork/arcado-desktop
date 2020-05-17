import { request, URI } from './request';

const authenticate = async (passphrase: string) => {
  return request({
    url: URI,
    method: 'POST',
    body: {
      passphrase
    }
  });
};

export default {
  authenticate
}
