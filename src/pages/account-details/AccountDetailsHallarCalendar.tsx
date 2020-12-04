import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import { AccountModel } from '../../typings/account';
import { AccountDetailsHeaderCalendarItem } from './AccountDetailsHallerCalendarItem';
import { CalendarItem } from '../../typings/application';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface ContainerProps {
  account: AccountModel
}

export const AccountDetailsHallarCalendar: React.FC<ContainerProps> = ({ account }) => {

  const [calendar, setCalendar] = useState<CalendarItem[]>([]);
  const [activeMonth, setActiveMonth] = useState<Moment>(moment())
  const today = moment();

  useEffect(() => {
    renderMonthView()
  }, [account.address, activeMonth])

  function renderMonthView () {
    const max_elements = 35;

    const firstDay = activeMonth.startOf('month');
    const dow = firstDay.day();
    const daysInMonth = activeMonth.daysInMonth();

    let calendar: CalendarItem[] = [...Array(max_elements)].map((item, idx) => {
      return {
        index: idx
      }
    });

    const start = dow - 1;
    for (let i = 0; i < daysInMonth; i++) {

      calendar[start + i] = {
        ...calendar[start + i],
        day : moment(firstDay).add(i, 'days')
      }

    }
    setCalendar(calendar);
  }

  async function setNextMonth () {
    const nextMonth = moment(activeMonth).add(1, 'months');
    setActiveMonth(nextMonth);
  }

  async function setPreviousMonth () {
    const previousMonth = moment(activeMonth).subtract(1, 'months');
    await setActiveMonth(previousMonth)
  }

  return (
    <div className="w100 mb200">
      <div className="mb25 flex-c">
        <h1 className="fc-black ffm-bold fs-xm p0 m0 mr25">{activeMonth.format('MMMM YYYY')}</h1>
        <div className="flex-c flex-jc-c img--20 bgc-lblue fc-blue fs-xs bgc-grey__hover click mr5" onClick={setPreviousMonth}>
          <LeftOutlined />
        </div>
        <div className="flex-c flex-jc-c img--20 bgc-lblue fc-blue fs-xs bgc-grey__hover click" onClick={setNextMonth}>
          <RightOutlined />
        </div>
      </div>
      <div className="calendar-grid flex-jc-sb flex-ww bgc-lgrey">
        {
          calendar.map((calendarItem, index) =>
            <AccountDetailsHeaderCalendarItem
              calendarItem={calendarItem}
              index={index}
              dayNumber={index}
              today={today}
            />)
        }
      </div>
    </div>
  )
}
