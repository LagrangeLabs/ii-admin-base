import React from 'react';
import { Select } from 'antd';

const weekOptions = {
  SUN: '星期日',
  MON: '星期一',
  TUE: '星期二',
  WED: '星期三',
  THU: '星期四',
  FRI: '星期五',
  SAT: '星期六',
};

export const WeekSelect: React.FC = props => {
  return (
    <Select size="small" {...props}>
      {Object.entries(weekOptions).map(([weekCode, weekName]) => {
        return (
          <Select.Option key={weekCode} value={weekCode}>
            {weekName}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default WeekSelect;
