import { HallarApiConfig } from '../typings';
import { Projects } from './projects';
import { Github } from './github';

export class HallarClient {

  private _projects!: Projects;
  private _github!: Github;

  config: HallarApiConfig = {
    url: ""
  };



  constructor(config: HallarApiConfig) {
    this.config = {
      ...this.config,
      ...config
    }
    this._projects = new Projects(this.config);
    this._github = new Github(this.config);
  }

  public get projects(): Projects {
    return this._projects;
  }

  public get github(): Github {
    return this._github;
  }


}


export * from './github'
