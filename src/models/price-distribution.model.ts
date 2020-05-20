export interface IPriceDistribution {
  first: number;
  second: number;
  third: number;
}

export default class PriceDistributionModel implements IPriceDistribution {
  first: number;
  second: number;
  third: number;

  constructor(priceDistribution: IPriceDistribution) {
    if (priceDistribution) {
      this.first = priceDistribution.first;
      this.second = priceDistribution.second;
      this.third = priceDistribution.third;
    }
  }
}
