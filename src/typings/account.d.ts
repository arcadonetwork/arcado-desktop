export type AccountModel = {
  address: string
  passphrase?: string
  dpos?: DPoS
  keys: AccountKeys
  token?: Token
  sequence?: Sequence
  hallar?: Hallar
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

export interface Hallar {
  github: HallarGithubAccount
  activities: HallarActivity[]
}

export interface HallarGithubAccount {
  id: number
  username: string
}

export interface HallarActivity {
  id: number
  title: string
  description: string
}

export interface Sequence {
  nonce: string
}
