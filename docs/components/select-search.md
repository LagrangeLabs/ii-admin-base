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

| 属性        | 说明                                           | 类型                              | 默认值 | 是否必传 | 版本 |
| ----------- | ---------------------------------------------- | --------------------------------- | ------ | -------- | ---- |
| fetchOption | fetchOption 搜索方法                           | (params: any) => Promise          |        | 否       |      |
| getParams   | getParams 请求参数处理方法                     | (params: any) => any              |        | 否       |      |
| getOption   | getOption 返回结果处理方法，默认展示 key value | (params: any) => any              |        | 否       |      |
| onChange    | onChange 返回选择结果 默认携带 key、value      | (params: any) => any              |        | 否       |      |
| mode        | mode 多选、单选                                | 'multiple' \| 'tags' \| undefined |        | 否       |      |
| optionKey   | select.option 的 key 字段                      | string                            | key    | 否       |      |
| optionValue | select.option 的 value 字段                    | string                            | value  | 否       |      |
| placeholder | placeholder 提示信息                           | string                            |        | 否       |      |
| itemStyle   | itemStyle select 样式                          | CSSProperties                     |        | 否       |      |
| defaultKey  | defaultKey 默认搜索关键字                      | string                            |        | 否       |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle
