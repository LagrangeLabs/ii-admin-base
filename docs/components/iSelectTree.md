---
title: ISelectTree 树结构组件
---

# ISelectTree 树结构组件

Demo:

```tsx
import React from 'react';
import { ISelectTree } from 'ii-admin-base';

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
        hhh: '0-0-1',
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
  <ISelectTree
    treeData={treeData}
    titleField="hhh"
    keyField="lll"
    childrenField="kkk"
    style={{ width: 300 }}
  />
);
```
