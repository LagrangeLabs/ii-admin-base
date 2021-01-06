import React, { useState } from 'react';
import { Tabs, Button } from 'antd';
import {
  secondRegex,
  minuteRegex,
  hourRegex,
  dayRegex,
  monthRegex,
  weekRegex,
  yearRegex,
} from './cron-regex';
const { TabPane } = Tabs;
import SecondPane from './components/SecondPane';
import MinutePane from './components/MinutePane';
import HourPane from './components/HourPane';
import DayPane from './components/DayPane';
import WeekPane from './components/WeekPane';
import MonthPane from './components/MonthPane';
import YearPane from './components/YearPane';
import './index.less';

type TProps = {
  style?: React.CSSProperties;
  value: string;
  onOk?: (value: string) => void;
};

export const Cron: React.FC<TProps> = props => {
  const { style, value, onOk } = props;
  const [currentTab, setCurrentTab] = useState('1');
  const [second, setSecond] = useState('*');
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [day, setDay] = useState('*');
  const [month, setMonth] = useState('*');
  const [week, setWeek] = useState('?');
  const [year, setYear] = useState('*');

  const parse = () => {
    if (value) {
      try {
        let [
          secondVal,
          minuteValue,
          hourVal,
          dayVal,
          monthVal,
          weekVal,
          yearVal,
        ] = value.split(' ');
        secondVal = secondRegex.test(secondVal) ? secondVal : '*';
        minuteValue = minuteRegex.test(minuteValue) ? minuteValue : '*';
        hourVal = hourRegex.test(hourVal) ? hourVal : '*';
        dayVal = dayRegex.test(dayVal) ? dayVal : '*';
        monthVal = monthRegex.test(monthVal) ? monthVal : '*';
        weekVal = weekRegex.test(weekVal) ? weekVal : '?';
        weekVal = dayVal !== '?' ? '?' : weekVal;
        yearVal = yearRegex.test(yearVal) ? yearVal : '*';
        setSecond(secondVal);
        setMinute(minuteValue);
        setHour(hourVal);
        setDay(dayVal);
        setMonth(monthVal);
        setWeek(weekVal);
        setYear(yearVal);
      } catch (error) {
        setSecond('*');
        setMinute('*');
        setHour('*');
        setDay('*');
        setMonth('*');
        setWeek('?');
        setYear('*');
      }
    }
  };
  const generate = () => {
    if (onOk) {
      onOk([second, minute, hour, day, month, week, year].join(' '));
    }
  };
  const changeDay = (v: string) => {
    setDay(v);
    if (v !== '?') {
      setWeek('?');
    }
  };
  const changeWeek = (v: string) => {
    setWeek(v);
    if (v !== '?') {
      setDay('?');
    }
  };

  return (
    <div className="ii-cron-container" style={style}>
      <Tabs activeKey={currentTab} onChange={setCurrentTab} tabPosition="left">
        <TabPane tab="秒" key="1">
          <SecondPane value={second} onChange={setSecond} />
        </TabPane>
        <TabPane tab="分钟" key="2">
          <MinutePane value={minute} onChange={setMinute} />
        </TabPane>
        <TabPane tab="小时" key="3">
          <HourPane value={hour} onChange={setHour} />
        </TabPane>
        <TabPane tab="日" key="4">
          <DayPane value={day} onChange={changeDay} />
        </TabPane>
        <TabPane tab="月" key="5">
          <MonthPane value={month} onChange={setMonth} />
        </TabPane>
        <TabPane tab="周" key="6">
          <WeekPane value={week} onChange={changeWeek} />
        </TabPane>
        <TabPane tab="年" key="7">
          <YearPane value={year} onChange={setYear} />
        </TabPane>
      </Tabs>
      <div className="ii-cron-footer">
        {/* <Button style={{ marginRight: 10 }} onClick={parse}>
          解析到UI
        </Button> */}
        <Button type="primary" onClick={generate}>
          生成
        </Button>
      </div>
    </div>
  );
};

export default Cron;
