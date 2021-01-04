import React, { useState } from 'react';
import { Dropdown, Input } from 'antd';
import Cron from './cron';

type TProps = {
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  onChange?: (params: any) => void;
};

export const CronInput: React.FC<TProps> = props => {
  const { style, inputStyle, ...passThroughProps } = props;
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const onChange = (value: string) => {
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
        overlay={<Cron onChange={onChange} value={value} style={style} />}
      >
        <Input value={value} style={inputStyle} {...passThroughProps} />
      </Dropdown>
    </div>
  );
};

export default CronInput;
