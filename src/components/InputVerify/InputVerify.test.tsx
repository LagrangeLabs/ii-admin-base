import React from 'react';
import { render, fireEvent, wait, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom'; // toHaveClass、toBeInTheDocument、...
import '@testing-library/jest-dom/extend-expect'; // 注册所有的matchers
import InputVerify, { InputVerifyProps } from './InputVerify';

const antdProps: InputVerifyProps = {
  placeholder: 'antd input placeholder',
  size: 'large',
  sendCode: jest.fn(), // jest.fn 创建模拟函数，检测是否被调用
  onPressEnter: jest.fn(),
  onChange: jest.fn(),
};

const selfProps: InputVerifyProps = {
  countDown: 3,
  initCodeText: '发送验证码',
  reCodeText: '再次发送',
  sendCode: jest.fn(),
};

let wrapper: RenderResult, inputElement: HTMLInputElement;

// 测试 Ant Design 的原始 Input 组件是否正常
describe("Test InputVerify component on the props of antd's input component", () => {
  /**
   * 针对多个测试case运行前需获取相同的元素，可以通过beforeEach避免重复设置。
   * 在每个case运行之前，都会运行该函数
   */
  beforeEach(() => {
    wrapper = render(<InputVerify {...antdProps} />);

    // 在元素加上 data-testid
    inputElement = wrapper.getByTestId('test-input-verify') as HTMLInputElement;
  });

  it("should have the input's class of antd", () => {
    expect(inputElement).toBeInTheDocument(); // 判断元素是否在HTML文档中
    expect(inputElement).toHaveClass('ant-input'); // 判断有没有对应的class
  });

  it('should support size', () => {
    expect(inputElement).toHaveClass('ant-input-lg');
  });

  it('should trigger onChange event correctly', () => {
    // 触发 change 事件
    fireEvent.change(inputElement, { target: { value: 'input test' } });
    expect(antdProps.onChange).toHaveBeenCalled();
    expect(inputElement.value).toEqual('input test');
  });
});

// 测试 InputVerify 组件自身属性
describe("Test InputVerify component on the self's props", () => {
  beforeEach(() => {
    wrapper = render(<InputVerify {...selfProps} />);
  });

  it('should render the correct InputVerify component', () => {
    // getByText返回的元素是HTMLElement
    const suffixElement = wrapper.getByText('发送验证码');

    expect(suffixElement).toBeInTheDocument();
    expect(suffixElement).toHaveClass('ii-verify-button');
  });

  it('click verify button should call the right callback ', async () => {
    const suffixElement = wrapper.getByText('发送验证码');

    fireEvent.click(suffixElement);

    // 检测 sendCode 函数是否被调用到
    expect(selfProps.sendCode).toHaveBeenCalled();

    // 通过 async、await 与 wait 函数，让断言语句延时执行
    await wait(
      () => {
        // 函数中的断言会重复执行，直到断言通过或者timeout报错
        expect(wrapper.getByText('再次发送')).toBeInTheDocument();
      },
      { timeout: 4000 }
    );
  });
});
