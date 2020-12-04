import React from 'react';
import { AccountModel } from '../../typings/account';
import { CalendarItem } from '../../typings/application';
import { Moment } from 'moment';

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

export const AccountDetailsHeaderCalendarItem: React.FC<ContainerProps> = ({ dayNumber, index, calendarItem, today }) => {
  const day = calendarItem.day;

  const isToday = day ? day.format('D MM YYYY') === today.format('D MM YYYY') : false;
  const isTodayClazz = isToday ? 'fc-red' : 'fc-black'

  return (
    <div className="bgc-xl-grey calendar-square ">
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
    </div>
  )
}
