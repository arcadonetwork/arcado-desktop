import moment from 'moment'
import { EPOCH_TIME_SECONDS } from '@liskhq/lisk-constants';
import { utils } from '@liskhq/lisk-transactions';

export const getFormattedDate = (timestamp: number) => {
  let date = moment((EPOCH_TIME_SECONDS + timestamp) * 1000)
  let format = 'DD MMM YYYY'
  if (!timestamp || !moment((EPOCH_TIME_SECONDS + timestamp) * 1000).isValid()) {
    return '-'
  }
  return date.format(format).toLowerCase()
}

export const createNetworkTs = (): number => {
  return utils.getTimeFromBlockchainEpoch(Number(new Date()) - 10000);
};
