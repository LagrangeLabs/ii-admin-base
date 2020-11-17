---
title: SearchTree 树结构组件
---

# SearchTree 树结构组件

Demo:

```tsx
import React from 'react';
import { SearchTree } from 'ii-admin-base';
import { CarryOutOutlined } from '@ant-design/icons';

const treeData = [
  {
    hhh: '0-0',
    lll: '0-0',
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
    iconTag={<CarryOutOutlined />}
    showIcon={true}
    showSearch={true}
  />
);
```
