import { cryptography } from "@liskhq/lisk-client";

const genesisBlockID = Buffer.from('017192d8da7d20b419b2129ea51f5e9358fb0ea4904366a4ca6f887587bfbda0', 'hex');
export const networkIdentifier = cryptography.getNetworkIdentifier(genesisBlockID, 'ARCD');

