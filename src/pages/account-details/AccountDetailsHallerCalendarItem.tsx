import React from 'react';
import { AccountModel } from '../../typings/account';
import { CalendarItem } from '../../typings/application';
import { Moment } from 'moment';
import { isArrayWithElements } from '../../utils/type-checking';
import { GithubActivity } from '../../utils/hallar';

const eventLabels = {
  commits: 'commits',
  merge_commits: 'merge commits',
  pr_open: 'PR open',
  pr_merged: 'PR merged',
  pr_comments: 'PR comments',
  pr_review: 'PR review'
}

interface ContainerProps {
  account?: AccountModel,
  dayNumber: number
  index: number
  calendarItem: CalendarItem
  today: Moment
}

const getDayByIndex = (idx : number) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days[idx]
}

const getParsedEvent = (key: string, value: number) => {
  if (value === 0) return '';
  return `${eventLabels[key]} : ${value}`;
}

export const AccountDetailsHeaderCalendarItem: React.FC<ContainerProps> = ({ dayNumber, index, calendarItem, today }) => {
  const day = calendarItem.day;

  const isToday = day ? day.format('D MM YYYY') === today.format('D MM YYYY') : false;
  const isTodayClazz = isToday ? 'fc-red' : 'fc-black'

  const parsed = {
    commits: 0,
    merge_commits: 0,
    pr_open: 0,
    pr_merged: 0,
    pr_comments: 0,
    pr_review: 0
  }

  const events = isArrayWithElements(calendarItem.activity) ? calendarItem.activity.map((item: GithubActivity) => item.type) : [];

  events.forEach((item: string) => {
    if (item === 'PushEvent'){
      parsed.commits += 1
    } else if (item === 'CreateEvent') {
      parsed.pr_open += 1
    }
  })

  return (
    <div className="bgc-white calendar-square ">
      <div className="p10 flex-c flex-jc-sb">
        <div className={isTodayClazz}>
          <span className="ffm-bold">{day ? day.format('D') : ''}</span>
        </div>
        {
          index < 8
          ? <div className="fc-lgrey">{getDayByIndex(index)}</div>
            : ''
        }
      </div>
      <div className="p10">
        {
          Object.keys(parsed).map((key, i) => (
            getParsedEvent(key, parsed[key])
          ))
        }
      </div>
    </div>
  )
}
