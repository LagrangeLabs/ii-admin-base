import React, { useState } from 'react';
import { Dropdown, Input } from 'antd';
import Cron from './cron';

type TProps = {
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  value?: string;
  onChange?: (params: string) => void;
};

export const CronInput: React.FC<TProps> = props => {
  const { style, inputStyle, value, onChange, ...passThroughProps } = props;
  const [CronValue, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const onOk = (value: string) => {
    if (onChange) {
      onChange(value);
    }
    setValue(value);
    setVisible(false);
  };
  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };
  return (
    <div>
      <Dropdown
        trigger={['click']}
        placement="bottomLeft"
        onVisibleChange={handleVisibleChange}
        visible={visible}
        overlay={<Cron onOk={onOk} value={CronValue} style={style} />}
      >
        <Input value={CronValue} style={inputStyle} {...passThroughProps} />
      </Dropdown>
    </div>
  );
};

export default CronInput;
