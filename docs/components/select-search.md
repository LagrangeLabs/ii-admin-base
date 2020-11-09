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

<!-- <API src='../../src/SelectSearch/index.tsx'></API> -->

| 属性        | 说明                                           | 类型                              | 默认值 | 版本 |
| ----------- | ---------------------------------------------- | --------------------------------- | ------ | ---- |
| fetchOption | fetchOption 搜索方法                           | (params: any) => Promise          |        |      |
| getParams   | getParams 请求参数处理方法                     | (params: any) => any              |        |      |
| getOption   | getOption 返回结果处理方法，默认展示 key value | (params: any) => any              |        |      |
| onChange    | onChange 返回选择结果 默认携带 key、value      | (params: any) => any              |        |      |
| mode?:      | mode 多选、单选                                | 'multiple' \| 'tags' \| undefined |        |      |
| placeholder | placeholder 提示信息                           | string                            |        |      |
| itemStyle   | itemStyle select 样式                          | CSSProperties                     |        |      |
| defaultKey  | defaultKey 默认搜索关键字                      | string                            |        |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle
