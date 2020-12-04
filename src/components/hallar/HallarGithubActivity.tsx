import React from 'react';
import moment from 'moment';
import { GithubActivity } from '../../utils/hallar';
import { HallarGithubActivityPayload } from './HallarGithubActivityPayload';

interface Props {
  activity: GithubActivity
}

const translateActivityType = (type: string) => {
  return type === 'PushEvent'
    ? 'pushed to'
    : type
}

export const HallarGithubActivity: React.FC<Props> = ({ activity }) => {
  console.log(activity)
  return (
    <>
      <div className="mb25 bgc-white p15 br">
        <div className="mb5">{activity.actor.login} {translateActivityType(activity.type)} {activity.repo.name}</div>
        <HallarGithubActivityPayload activity={activity} />
        <div className="fc-grey fs-s">{moment(activity.created_at).format('DD MMM YYYY HH:mm:ss')}</div>
      </div>
    </>
  )
}
