import { NetworkModel } from '../typings/network.model';

export const availableNetworks: NetworkModel[] = [
  {
    name: 'Alphanet',
    identifier: 'alphanet',
    nodeUrl: "http://localhost:4000",
    wsUrl: "ws://localhost:4001/ws"
  }
]
