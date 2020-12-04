
export type GithubAccount = {
  id : number
  login: string
  node_id: string
  gravatar_id: string
  avatar_url: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  type: string
}


export type GithubActivity = {
  id: string
  type: string
  actor: GithubActor
  payload: GithubPayload
  repo: GithubRepository
  created_at: string
  org: GithubOrganisation
}

export type GithubActor = {
  id: string
  type: string
  login: string
  display_login: string
  gravatar_id: string
  avatar_url: string
}

export type GithubRepository = {
  id: string
  name: string
  url: string
  display_login: string
  gravatar_id: string
  avatar_url: string
}

export type GithubPayload = {
  push_id: string
  size: number
  distinct_size: number
  ref: string
  head: string
  before: string
  commits: GithubCommit[]
}

export type GithubCommit = {
  sha: string
  author: GithubAuthor
  message: string
  distinct: boolean
  url: string
}

export type GithubAuthor = {
  email: string
  name: string
}

export type GithubOrganisation = {
  id: string
  login: string
  gravatar_id: string
  url: string
  avatar_url: string
}
