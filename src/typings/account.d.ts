export type AccountModel = {
  address: string
  passphrase?: string
  dpos?: DPoS
  keys: AccountKeys
  token?: Token
  sequence?: Sequence
}

export interface DPoS {
  delegate: Delegate
  sentVotes: string[]
  unlocking: []
}

export interface Delegate {
  username: string
  pomHeights: number[]
  consecutiveMissedBlocks: number
  lastForgedHeight: number
  totalVotesReceived: string
  isBanned: boolean
}

export interface AccountKeys {
  numberOfSignatures?: number
  mandatoryKeys?: number[],
  optionalKeys?: number[]
  publicKey: string;
  privateKey: string;
}

export interface Token {
  balance: string
}

export interface Sequence {
  nonce: string
}
