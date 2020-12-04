import { Octokit } from '@octokit/rest'
import { GithubActivity } from '../typings';

import { HallarApiConfig } from '../typings';


export class Github {

  octokit: any;

  constructor(config: HallarApiConfig) {
    this.octokit = new Octokit();
  }

  async get (params: { address: string }): Promise<any[]> {
    try {
      const { data }: any = fetch(`http://localhost:8090/api/projects?address=${params.address}`)
      console.log(data)
      return data.items;
    } catch (e) {
      return []
    }
  }

  activity = async (username: string): Promise<GithubActivity[]> => {
    try {
      const { data } = await this.octokit.activity
        .listPublicEventsForUser({
          username,
          per_page: 5
        });
      return data;
    } catch (e) {
      return []
    }
  }

  users = async (value: string): Promise<any> => {
    try {
      const { data } = await this.octokit.search
        .users({
          q: value,
          per_page: 3
        });
      return data.items;
    } catch (e) {
      return undefined;
    }
  }

  projects = async (value: string): Promise<any[]> => {
    try {
      const { data } = await this.octokit.search
        .repos({
          q: value,
          per_page: 5
        });
      return data.items;
    } catch (e) {
      return []
    }
  }

}
