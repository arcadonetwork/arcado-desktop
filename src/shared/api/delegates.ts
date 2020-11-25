import { request, NETWORK_BASE_URI } from './request';

import { isArrayWithElements } from '../../utils/type-checking';
import { ApiResponseModel } from '../../typings/api-response.model';
import { ForgerModel } from '../../typings/forger';


const URI = `${NETWORK_BASE_URI}/api/forgers`

export const fetchDelegates = async (): Promise<ApiResponseModel<ForgerModel[]>> => {
  let response = await request({
    url: URI,
    method: 'GET'
  });
  if (isArrayWithElements(response.data)) {
    return response;
  }
  return { data: [], meta: undefined }
};
