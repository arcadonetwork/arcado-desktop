type Meta = {
  count: number;
  limit: number;
  offset: number;
}

export type ApiResponseModel<T> = {
  meta: Meta;
  data: T
}
