import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Radio, Checkbox, Row, Col, InputNumber } from 'antd';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

const weekOptions = ['1', '2', '3', '4', '5', '6', '7'];

type TProps = {
  value: string;
  onChange: (value: string) => void;
};

export const WeekPane: React.FC<TProps> = props => {
  const { value, onChange } = props;
  const [currentRadio, setCurrentRadio] = useState(2);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(1);
  const [weekOfMonth, setWeekOfMonth] = useState(1);
  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [lastWeekOfMonth, setLastWeekOfMonth] = useState(1);
  const [selected, setSelected] = useState(['1']);

  useEffect(() => {
    if (value === '*') {
      setCurrentRadio(1);
    } else if (value === '?') {
      setCurrentRadio(2);
    } else if (value.indexOf('-') > -1) {
      setCurrentRadio(3);
      const [defaultFrom, defaultTo] = value.split('-');
      setFrom(parseInt(defaultFrom, 10));
      setTo(parseInt(defaultTo, 10));
    } else if (value.indexOf('#') > -1) {
      setCurrentRadio(4);
      const [defaultDayOfWeek, defaultWeekOfMonth] = value.split('#');
      setWeekOfMonth(parseInt(defaultWeekOfMonth, 10));
      setDayOfWeek(parseInt(defaultDayOfWeek, 10));
    } else if (value.indexOf('L') > -1) {
      setCurrentRadio(5);
      const [defaultLastWeekOfMonth] = value.split('L');
      setLastWeekOfMonth(parseInt(defaultLastWeekOfMonth, 10));
    } else {
      setCurrentRadio(6);
      setSelected(value ? value.split(',') : ['1']);
    }
  }, [value]);

  useEffect(() => {
    switch (currentRadio) {
      case 1:
        onChange('*');
        break;
      case 2:
        onChange('?');
        break;
      case 3:
        onChange(`${from}-${to}`);
        break;
      case 4:
        onChange(`${dayOfWeek}#${weekOfMonth}`);
        break;
      case 5:
        onChange(`${lastWeekOfMonth}L`);
        break;
      case 6:
        onChange(selected.join(','));
        break;
      default:
        break;
    }
  }, [
    currentRadio,
    from,
    to,
    weekOfMonth,
    dayOfWeek,
    lastWeekOfMonth,
    selected,
  ]);

  const onChangeRadio = useCallback(e => {
    setCurrentRadio(e.target.value);
  }, []);

  const onChangeFrom = useCallback(v => {
    setFrom(v || 1);
  }, []);

  const onChangeTo = useCallback(v => {
    setTo(v || 1);
  }, []);

  const onChangeWeekOfMonth = useCallback(v => {
    setWeekOfMonth(v || 1);
  }, []);

  const onChangeDayOfWeek = useCallback(v => {
    setDayOfWeek(v || 1);
  }, []);

  const onChangeLastWeekOfMonth = useCallback(v => {
    setLastWeekOfMonth(v || 1);
  }, []);

  const onChangeSelected = useCallback(v => {
    setSelected(v.length !== 0 ? v : [1]);
  }, []);

  const checkList = useMemo(() => {
    const disabled = currentRadio !== 6;
    return weekOptions.map(item => {
      return (
        <Col key={item} span={3}>
          <Checkbox disabled={disabled} value={item}>
            {item}
          </Checkbox>
        </Col>
      );
    });
  }, [currentRadio, selected]);

  return (
    <RadioGroup name="radiogroup" value={currentRadio} onChange={onChangeRadio}>
      <Radio style={radioStyle} value={1}>
        每一周
      </Radio>

      <Radio style={radioStyle} value={2}>
        不指定
      </Radio>

      <Radio style={radioStyle} value={3}>
        周期从星期&nbsp;
        <InputNumber
          disabled={currentRadio !== 3}
          min={1}
          max={7}
          value={from}
          size="small"
          onChange={onChangeFrom}
          style={{ width: 100 }}
        />
        &nbsp;-&nbsp;
        <InputNumber
          disabled={currentRadio !== 3}
          min={1}
          max={7}
          value={to}
          size="small"
          onChange={onChangeTo}
          style={{ width: 100 }}
        />
        &nbsp;，每星期执行一次
      </Radio>

      <Radio style={radioStyle} value={4}>
        本月第&nbsp;
        <InputNumber
          disabled={currentRadio !== 4}
          min={0}
          max={23}
          value={weekOfMonth}
          size="small"
          onChange={onChangeWeekOfMonth}
          style={{ width: 100 }}
        />
        &nbsp;周的星期&nbsp;
        <InputNumber
          disabled={currentRadio !== 4}
          min={1}
          max={7}
          value={dayOfWeek}
          size="small"
          onChange={onChangeDayOfWeek}
          style={{ width: 100 }}
        />
        &nbsp;执行一次
      </Radio>

      <Radio style={radioStyle} value={5}>
        本月的最后一个星期&nbsp;
        <InputNumber
          disabled={currentRadio !== 5}
          min={1}
          max={7}
          value={lastWeekOfMonth}
          size="small"
          onChange={onChangeLastWeekOfMonth}
          style={{ width: 100 }}
        />
        &nbsp;执行一次
      </Radio>

      <Radio style={radioStyle} value={6}>
        指定
        <br />
        <CheckboxGroup
          value={selected}
          onChange={onChangeSelected}
          style={{ width: '100%' }}
        >
          <Row>{checkList}</Row>
        </CheckboxGroup>
      </Radio>
    </RadioGroup>
  );
};

export default WeekPane;
