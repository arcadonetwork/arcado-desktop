export interface IAsset {
  recipientId?: string;
  amount?: string;
}

export default class AssetModel implements IAsset {
  recipientId?: string;
  amount?: string;

  constructor(asset: AssetModel) {
    if (asset) {
      this.recipientId = asset.recipientId;
      this.amount = asset.amount;
    }
  }
}
