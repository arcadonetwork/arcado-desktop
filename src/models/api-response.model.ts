import { TransactionModel } from './transaction.model';

type Meta = {
  count: number;
  limit: number;
  offset: number;
}

export type ApiResponseModel<T> = {
  meta: Meta;
  data: TransactionModel<T>[]
}
