export interface IBlock {
  height: string;
}

export default class BlockModel implements IBlock {
  height: string;

  constructor(block: IBlock) {
    if (block) {

    }
  }
}
