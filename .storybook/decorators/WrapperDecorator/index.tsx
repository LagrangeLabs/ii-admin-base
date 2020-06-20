import React from 'react';

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px',
};

// 创建一个样式包裹的装饰器
const WrapperDecorator = (storyFn) => <div style={wrapperStyle}>{storyFn()}</div>;

export default WrapperDecorator;
