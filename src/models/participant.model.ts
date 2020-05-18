export interface IParticipant {
  address: string;
  win: number;
  loss: number;
  status: string;
}

export default class ParticipantModel implements IParticipant {
  address: string;
  win: number;
  loss: number;
  status: string;

  constructor(participant: IParticipant) {
    if (participant) {
      this.address = participant.address;
      this.win = participant.win;
      this.loss = participant.loss;
      this.status = participant.status;
    }
  }
}
