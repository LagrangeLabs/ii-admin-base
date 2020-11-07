---
title: SelectSearch 搜索下拉框
---

# SelectSearch 搜索下拉框

Demo:

```tsx
import React from 'react';
import { SelectSearch } from 'ii-admin-base';

export default () => (
  <SelectSearch
    placeholder="请输入搜索关键字"
    itemStyle={{ width: '400px' }}
    getOption={data => {
      return data.map((item: any) => ({ key: item, value: item }));
    }}
    fetchOption={() => {
      return new Promise(resolve => {
        const len = parseInt(Math.random(0, 1) * 10) + 1;
        const result = [];
        for (let i = 0; i < len; i++) {
          result.push(`searchData${i + 1}`);
        }
        resolve(result);
      });
    }}
    getParams={value => value}
  />
);
```

<API src='../../src/SelectSearch/index.tsx'></API>

More skills for writing demo: https://d.umijs.org/guide/demo-principle
