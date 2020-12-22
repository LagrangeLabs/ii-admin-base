---
title: SearchTree 树结构组件
---

# SearchTree 树结构组件

Demo:

```tsx
import React from 'react';
import { SearchTree } from 'ii-admin-base';
import { CarryOutOutlined, PlayCircleFilled } from '@ant-design/icons';

const treeData = [
  {
    hhh: '0-0',
    lll: '0-0',
    selectable: false,
    disabled: true,
    kkk: [
      {
        hhh: '0-0-0',
        lll: '0-0-0',
        kkk: [
          { hhh: '0-0-0-0', lll: '0-0-0-0' },
          { hhh: '0-0-0-1', lll: '0-0-0-1' },
          { hhh: '0-0-0-2', lll: '0-0-0-2' },
        ],
      },
      {
        hhh: 'Suyana',
        lll: '0-0-1',
        kkk: [
          { hhh: '0-0-1-0', lll: '0-0-1-0' },
          { hhh: '0-0-1-1', lll: '0-0-1-1' },
          { hhh: '0-0-1-2', lll: '0-0-1-2' },
        ],
      },
      {
        hhh: '0-0-2',
        lll: '0-0-2',
        selectable: false,
        disabled: true,
      },
    ],
  },
  {
    hhh: '0-1',
    lll: '0-1',
    kkk: [
      { hhh: '0-1-0-0', lll: '0-1-0-0' },
      { hhh: '0-1-0-1', lll: '0-1-0-1' },
      { hhh: '0-1-0-2', lll: '0-1-0-2' },
    ],
  },
  {
    hhh: '0-2',
    lll: '0-2',
  },
];

export default () => (
  <SearchTree
    treeData={treeData}
    titleField="hhh"
    keyField="lll"
    childrenField="kkk"
    iconTag={[<CarryOutOutlined />, <PlayCircleFilled />]}
    showIcon
    showSearch={true}
  />
);
```

### SearchTree props 说明

| 属性          | 说明                             | 类型                                                                                | 默认值      | 是否必传 | 版本 |
| ------------- | -------------------------------- | ----------------------------------------------------------------------------------- | ----------- | -------- | ---- |
| treeData      | 原始数组                         | array<{value, title, children, [disabled, disableCheckbox, selectable, checkable]}> | []          | 否       |      |
| titleField    | 需要加工的 title 字段            | string                                                                              | name        | 否       |      |
| keyField      | 需要加工的 key 字段              | string                                                                              | id          | 否       |      |
| childrenField | 需要加工的 children 字段         | string                                                                              | children    | 否       |      |
| showSearch    | 是否显示搜索框                   | boolean                                                                             | false       | 否       |      |
| iconTag       | title 前的图标 或者 一个图标数组 | ReactNode                                                                           | ReactNode[] |          | 否   |  |
