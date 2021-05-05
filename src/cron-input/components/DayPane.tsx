import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Radio, Checkbox, Row, Col, InputNumber } from 'antd';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

type TProps = {
  value: string;
  onChange: (value: string) => void;
};

export const DayPane: React.FC<TProps> = props => {
  const { value, onChange } = props;
  const [currentRadio, setCurrentRadio] = useState(1);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(10);
  const [offsetFrom, setOffsetFrom] = useState(1);
  const [offset, setOffset] = useState(1);
  const [lateDay, setLateDay] = useState(1);
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
    } else if (value.indexOf('/') > -1) {
      setCurrentRadio(4);
      const [defaultOffsetFrom, defaultOffset] = value.split('/');
      setOffsetFrom(parseInt(defaultOffsetFrom, 10));
      setOffset(parseInt(defaultOffset, 10));
    } else if (value.indexOf('W') > -1) {
      setCurrentRadio(5);
      setLateDay(parseInt(value.split('W')[0], 10));
    } else if (value.indexOf('L') > -1) {
      setCurrentRadio(6);
    } else {
      setCurrentRadio(7);
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
        onChange(`${offsetFrom}/${offset}`);
        break;
      case 5:
        onChange(`${lateDay}W`);
        break;
      case 6:
        onChange('L');
        break;
      case 7:
        onChange(selected.join(','));
        break;
      default:
        break;
    }
  }, [currentRadio, from, to, offsetFrom, offset, lateDay, selected]);

  const onChangeRadio = useCallback(e => {
    setCurrentRadio(e.target.value);
  }, []);

  const onChangeFrom = useCallback(v => {
    setFrom(v || 1);
  }, []);

  const onChangeTo = useCallback(v => {
    setTo(v || 1);
  }, []);

  const onChangeOffsetFrom = useCallback(v => {
    setOffsetFrom(v || 1);
  }, []);

  const onChangeOffset = useCallback(v => {
    setOffset(v || 1);
  }, []);

  const onChangeLateDay = useCallback(v => {
    setLateDay(v || 1);
  }, []);

  const onChangeSelected = useCallback(v => {
    setSelected(v.length !== 0 ? v : ['1']);
  }, []);

  const checkList = useMemo(() => {
    const disabled = currentRadio !== 7;
    const checks = [];
    for (let i = 1; i < 32; i++) {
      checks.push(
        <Col key={i} span={3}>
          <Checkbox disabled={disabled} value={i.toString()}>
            {i}
          </Checkbox>
        </Col>,
      );
    }
    return checks;
  }, [currentRadio, selected]);

  return (
    <RadioGroup name="radiogroup" value={currentRadio} onChange={onChangeRadio}>
      <Radio style={radioStyle} value={1}>
        每一日
      </Radio>

      <Radio style={radioStyle} value={2}>
        不指定
      </Radio>

      <Radio style={radioStyle} value={3}>
        周期从&nbsp;
        <InputNumber
          disabled={currentRadio !== 3}
          min={1}
          max={23}
          value={from}
          size="small"
          onChange={onChangeFrom}
          style={{ width: 100 }}
        />
        &nbsp;-&nbsp;
        <InputNumber
          disabled={currentRadio !== 3}
          min={1}
          max={23}
          value={to}
          size="small"
          onChange={onChangeTo}
          style={{ width: 100 }}
        />
        &nbsp;日，每日执行一次
      </Radio>

      <Radio style={radioStyle} value={4}>
        从&nbsp;
        <InputNumber
          disabled={currentRadio !== 4}
          min={1}
          max={23}
          value={offsetFrom}
          size="small"
          onChange={onChangeOffsetFrom}
          style={{ width: 100 }}
        />
        &nbsp;日开始， 每&nbsp;
        <InputNumber
          disabled={currentRadio !== 4}
          min={1}
          max={23}
          value={offset}
          size="small"
          onChange={onChangeOffset}
          style={{ width: 100 }}
        />
        &nbsp;日执行一次
      </Radio>

      <Radio style={radioStyle} value={5}>
        每月&nbsp;
        <InputNumber
          disabled={currentRadio !== 5}
          min={1}
          max={31}
          value={lateDay}
          size="small"
          onChange={onChangeLateDay}
          style={{ width: 100 }}
        />
        &nbsp;号最近的那个工作日
      </Radio>

      <Radio style={radioStyle} value={6}>
        本月最后一天
      </Radio>

      <Radio value={7}>
        指定
        <br />
        <CheckboxGroup value={selected} onChange={onChangeSelected}>
          <Row> {checkList}</Row>
        </CheckboxGroup>
      </Radio>
    </RadioGroup>
  );
};

export default DayPane;
