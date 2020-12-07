import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import { AccountModel } from '../../typings/account';
import { AccountDetailsHeaderCalendarItem } from './AccountDetailsHallerCalendarItem';
import { CalendarItem } from '../../typings/application';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { GithubActivity } from '../../utils/hallar';
import { hallarClient } from '../../shared/api/hallar';

interface ContainerProps {
  account: AccountModel
}

export const AccountDetailsHallarCalendar: React.FC<ContainerProps> = ({ account }) => {

  const [calendar, setCalendar] = useState<CalendarItem[]>([]);
  const [activity, setActivity] = useState<GithubActivity[]>([]);
  const [activeMonth, setActiveMonth] = useState<Moment>(moment())
  const today = moment();

  useEffect(() => {
    async function onInit () {
      getActivity();
    }
    onInit()
  }, [account.address, activeMonth])

  useEffect(() => {
    renderMonthView()
  }, [activity])

  async function getActivity () {
    try {
      const data = await hallarClient.github.activity(account.hallar.github.username)
      setActivity(data);
    } catch (e) {
      console.error(e);
    }
  }

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
      const day = moment(firstDay).add(i, 'days');
      const act = activity.filter(item => moment(item.created_at).format('D MM YYYY') === day.format('D MM YYYY'))
      calendar[start + i] = {
        ...calendar[start + i],
        day,
        activity: act
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
      <div className="w100 br5-top br-l br-r br-t flex-c bgc-white p15-25">
        <h1 className="fc-black ffm-bold fs-xm p0 m0 mr25">
          {activeMonth.format('MMMM YYYY')}
        </h1>
        <div className="ml-auto flex-c">
          <div className="flex-c flex-jc-c img--30 bgc-lblue fc-blue fs-xs bgc-grey__hover click mr10" onClick={setPreviousMonth}>
            <LeftOutlined />
          </div>
          <div className="flex-c flex-jc-c img--30 bgc-lblue fc-blue fs-xs bgc-grey__hover click" onClick={setNextMonth}>
            <RightOutlined />
          </div>
        </div>
      </div>
      <div className="calendar-grid flex-jc-sb flex-ww bgc-xl-grey br">
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
