import React from 'react';
import HighlightCard from './index';

const TestHighlightCard = () => {
  return (
    <div style={{ width: '500px', padding: '20px', background: 'rgba(0, 0, 0, 0.05)' }}>
      <HighlightCard cardTitle="卡片标题">
        <div>卡片内容</div>
      </HighlightCard>
    </div>
  );
};

export default {
  title: '高亮卡片组件',
  component: HighlightCard,
};

export const StoryHighlightCard = () => (
  <div>
    <h1>HighlightCard 卡片</h1>
    <p>最基础的卡片容器，用于修饰表单页面、段落等。</p>
    <h2>如何引用</h2>
    <div style={{ marginBottom: '10px' }}>
      <code>{`import { HighlightCard } from 'ii-admin-base'`}</code>
    </div>
    <br />
    <h2>组件展示</h2>
    <TestHighlightCard />
  </div>
);

StoryHighlightCard.story = {
  name: 'HighlightCard', // 如果要自动显示组件的注释，需将当前 Story 的名称改成和组件名称一样
  parameters: {
    info: {
      propTables: [HighlightCard],
    },
  },
};
