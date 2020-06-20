import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'; // 记录组件行为
import InputVerify from './InputVerify';

const WrappedInputVerify = () => {
  return (
    <div style={{ width: '400px' }}>
      <InputVerify placeholder="请输入四位验证码" sendCode={() => {}} onChange={action('changed')} />
    </div>
  );
};

storiesOf('验证码输入组件', module)
  // 如果要自动显示组件的注释，需将当前 Story 的名称改成和组件名称一样
  .add('InputVerify', WrappedInputVerify);
