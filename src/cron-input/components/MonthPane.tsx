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

export const MonthPane: React.FC<TProps> = props => {
  const { value, onChange } = props;
  const [currentRadio, setCurrentRadio] = useState(1);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(10);
  const [offsetFrom, setOffsetFrom] = useState(1);
  const [offset, setOffset] = useState(1);
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
    } else {
      setCurrentRadio(5);
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

  const onChangeSelected = useCallback(v => {
    setSelected(v.length !== 0 ? v : ['1']);
  }, []);

  const checkList = useMemo(() => {
    const disabled = currentRadio !== 4;
    const checks = [];
    for (let i = 1; i < 13; i++) {
      checks.push(
        <Col key={i} span={4}>
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
        每一月
      </Radio>

      <Radio style={radioStyle} value={2}>
        不指定
      </Radio>

      <Radio style={radioStyle} value={3}>
        从&nbsp;
        <InputNumber
          disabled={currentRadio !== 3}
          min={1}
          max={12}
          value={from}
          size="small"
          onChange={onChangeFrom}
          style={{ width: 100 }}
        />
        &nbsp;-&nbsp;
        <InputNumber
          disabled={currentRadio !== 3}
          min={1}
          max={12}
          value={to}
          size="small"
          onChange={onChangeTo}
          style={{ width: 100 }}
        />
        &nbsp;月，每月执行一次
      </Radio>

      <Radio style={radioStyle} value={4}>
        从&nbsp;
        <InputNumber
          disabled={currentRadio !== 4}
          min={1}
          max={12}
          value={offsetFrom}
          size="small"
          onChange={onChangeOffsetFrom}
          style={{ width: 100 }}
        />
        &nbsp;月开始， 每&nbsp;
        <InputNumber
          disabled={currentRadio !== 4}
          min={1}
          max={12}
          value={offset}
          size="small"
          onChange={onChangeOffset}
          style={{ width: 100 }}
        />
        &nbsp;月执行一次
      </Radio>

      <Radio value={5}>
        指定
        <br />
        <CheckboxGroup value={selected} onChange={onChangeSelected}>
          <Row>{checkList}</Row>
        </CheckboxGroup>
      </Radio>
    </RadioGroup>
  );
};

export default MonthPane;
