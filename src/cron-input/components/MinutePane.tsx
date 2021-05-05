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

export const MinutePane: React.FC<TProps> = props => {
  const { value, onChange } = props;
  const [currentRadio, setCurrentRadio] = useState(1);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(10);
  const [offsetFrom, setOffsetFrom] = useState(0);
  const [offset, setOffset] = useState(1);
  const [selected, setSelected] = useState(['0']);

  useEffect(() => {
    if (value === '*') {
      setCurrentRadio(1);
    } else if (value.indexOf('-') > -1) {
      setCurrentRadio(2);
      const [defaultFrom, defaultTo] = value.split('-');
      setFrom(parseInt(defaultFrom, 10));
      setTo(parseInt(defaultTo, 10));
    } else if (value.indexOf('/') > -1) {
      setCurrentRadio(3);
      const [defaultOffsetFrom, defaultOffset] = value.split('/');
      setOffsetFrom(parseInt(defaultOffsetFrom, 10));
      setOffset(parseInt(defaultOffset, 10));
    } else {
      setCurrentRadio(4);
      setSelected(value ? value.split(',') : ['0']);
    }
  }, [value]);

  useEffect(() => {
    switch (currentRadio) {
      case 1:
        onChange('*');
        break;
      case 2:
        onChange(`${from}-${to}`);
        break;
      case 3:
        onChange(`${offsetFrom}/${offset}`);
        break;
      case 4:
        onChange(selected.join(','));
        break;
      default:
        break;
    }
  }, [currentRadio, from, to, offsetFrom, offset, selected]);

  const onChangeRadio = useCallback(e => {
    setCurrentRadio(e.target.value);
  }, []);

  const onChangeFrom = useCallback(v => {
    setFrom(v || 0);
  }, []);

  const onChangeTo = useCallback(v => {
    setTo(v || 0);
  }, []);

  const onChangeOffsetFrom = useCallback(v => {
    setOffsetFrom(v || 0);
  }, []);

  const onChangeOffset = useCallback(v => {
    setOffset(v || 0);
  }, []);

  const onChangeSelected = useCallback(v => {
    setSelected(v.length !== 0 ? v : ['0']);
  }, []);

  const checkList = useMemo(() => {
    const disabled = currentRadio !== 4;
    const checks = [];
    for (let i = 1; i <= 60; i++) {
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
        每一分钟
      </Radio>

      <Radio style={radioStyle} value={2}>
        周期从&nbsp;
        <InputNumber
          disabled={currentRadio !== 2}
          min={0}
          max={59}
          value={from}
          size="small"
          onChange={onChangeFrom}
          style={{ width: 100 }}
        />
        &nbsp;-&nbsp;
        <InputNumber
          disabled={currentRadio !== 2}
          min={0}
          max={59}
          value={to}
          size="small"
          onChange={onChangeTo}
          style={{ width: 100 }}
        />
        &nbsp;分，每分执行一次
      </Radio>

      <Radio style={radioStyle} value={3}>
        从&nbsp;
        <InputNumber
          disabled={currentRadio !== 3}
          min={0}
          max={59}
          value={offsetFrom}
          size="small"
          onChange={onChangeOffsetFrom}
          style={{ width: 100 }}
        />
        &nbsp;分开始， 每&nbsp;
        <InputNumber
          disabled={currentRadio !== 3}
          min={0}
          max={59}
          value={offset}
          size="small"
          onChange={onChangeOffset}
          style={{ width: 100 }}
        />
        &nbsp;分执行一次
      </Radio>

      <Radio value={4}>
        指定
        <br />
        <CheckboxGroup value={selected} onChange={onChangeSelected}>
          <Row> {checkList}</Row>
        </CheckboxGroup>
      </Radio>
    </RadioGroup>
  );
};

export default MinutePane;
