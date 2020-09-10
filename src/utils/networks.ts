import { NetworkModel } from '../models/network.model';

export const availableNetworks: NetworkModel[] = [
  {
    name: 'Testnet',
    identifier: 'testnet',
    nodeUrl: "http://localhost:4000",
    wsPort: 8000
  }
]
