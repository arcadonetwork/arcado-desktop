import React from 'react';
import { GithubActivity } from '../../utils/hallar';
import { HallarGithubActivityCommit } from './HallarGithubActivityCommit';

interface Props {
  activity: GithubActivity
}

export const HallarGithubActivityPayload: React.FC<Props> = ({ activity }) => {

  return (
    <div className="p5-15 br br5 bgc-xxl-grey mb5">
      {
        activity.type === 'PushEvent'
        ? activity
          .payload
          .commits
          .map((commit) =>
            <HallarGithubActivityCommit
              commit={commit}
            />)
         : JSON.stringify(activity.payload)
      }
    </div>
  )
}
