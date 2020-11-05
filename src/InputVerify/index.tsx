import React, { useState, FC } from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import classNames from 'classnames';

import './index.less';
export interface InputVerifyProps extends InputProps {
  /** 发送验证码接口函数 */
  sendCode?: () => void;
  /** 倒计时时间 */
  countDown?: number;
  /** 初始验证码文本内容 */
  initCodeText?: string;
  /** 重新发送验证码文本内容 */
  reCodeText?: string;
  /** 验证码类名 */
  codeClassname?: string;
}

/**
 * 带验证码功能的输入组件，适用于要发送验证码的场景。
 *
 * ### 如何引用
 *
 * ~~~javascript
 * import { InputVerify } from 'ii-admin-base'
 * ~~~
 */
export const InputVerify: FC<InputVerifyProps> = props => {
  const {
    sendCode,
    countDown,
    initCodeText,
    reCodeText,
    codeClassname,
    ...restProps
  } = props;

  const [codeText, setCodeText] = useState(initCodeText);
  const [codeStatus, setCodeStatus] = useState(false);

  // 处理倒计时时间
  const handleCountDown = (
    timer: ReturnType<typeof setTimeout> | null,
    count: number,
  ) => {
    if (timer) {
      clearTimeout(timer);
    }

    if (count <= 0) {
      setCodeText(reCodeText);
      setCodeStatus(false);
    } else {
      setCodeText(`${count} s`);

      const newTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
        handleCountDown(newTimer, count - 1);
      }, 1000);
    }
  };

  // 处理验证码点击
  const handleCodeClick = () => {
    if (codeStatus) return;

    sendCode && sendCode();
    setCodeStatus(true);
    handleCountDown(null, countDown as number);
  };

  const codeCls = classNames('ii-verify-button', codeClassname, {
    'ii-verify-button-disabled': codeStatus,
  });

  return (
    <Input
      data-testid="test-input-verify"
      {...restProps}
      suffix={
        <span className={codeCls} onClick={handleCodeClick}>
          {codeText}
        </span>
      }
    />
  );
};

InputVerify.defaultProps = {
  countDown: 60,
  initCodeText: '发送验证码',
  reCodeText: '重新发送',
};

export default InputVerify;
