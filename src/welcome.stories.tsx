import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('首页', module).add(
  'welcome',
  () => {
    return (
      <>
        <h1>欢迎来到 ii-admin-base 基础组件库</h1>
        <p>ii-admin-base 基础组件库是杭州实在智能前端团队基于公司众多项目业务线沉淀的基础组件库。</p>
        <h3>安装试试</h3>
        <code>npm install ii-admin-base --save</code>
      </>
    );
  },
  // 将 withInfo 插件设置成disable
  { info: { disable: true } }
);
