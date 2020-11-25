export const API_BASE_URI = 'http://localhost:3000'
export const NETWORK_BASE_URI = 'http://localhost:4000'
export const CUSTOM_NETWORK_BASE_URI = 'http://localhost:8080'

interface Options {
  url: string,
  body?: object,
  method: string,
  headers?: object
}

export const request = (options: Options) => {
  const { url } = options;
  const body = JSON.stringify(options.body);
  return fetchRequest(url, {
    ...options,
    body,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json'
    }
  });
};

/**
 * Request Wrapper with default success/error actions
 */

const fetchRequest = async (url: string, options: object) => {
  const response = await fetch(url, options);
  if (response.ok) {
    return response.json();
  } else {
    const error = await response.json();
    throw Object.assign({ status: error.statusCode, message: error.message });
  }
};

export const parseParameters = (parameters: any) => {
  const { contains, limit, type, asset } = parameters

  let params = `?limit=${limit || 10}`

  if (contains && contains.length > 0) {
    params += `&contains=${contains}`
  }

  if (type) {
    params += `&type=${type}`
  }

  if (asset) {
    params += `&asset=${asset}`
  }

  return params
}
