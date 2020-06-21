export interface IEndResult {
  first: string;
  second: string;
  third: string;
}

export default class EndResultModel implements IEndResult {
  first: string;
  second: string;
  third: string;

  constructor(endResult: IEndResult) {
    if (endResult) {
      this.first = endResult.first;
      this.second = endResult.second;
      this.third = endResult.third;
    }
  }
}
