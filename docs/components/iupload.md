---
title: IUpload 通用附件上传
---

# IUpload 常用封装

Demo:

```tsx
import React from 'react';
import { IUpload } from 'ii-admin-base';

export default () => {
  return (
    <IUpload
      extra={[
        '支持扩展名：.word .pdf',
        <span style={{ color: 'red' }}>建议上传30M以内大小的PDF文件</span>,
      ]}
      describe="点击或将PDF拖拽到这里上传"
    />
  );
};
```

<!-- <API src='../../src/IUpload/index.tsx'></API> -->

| 属性         | 说明                      | 类型                                        | 默认值 | 版本 |
| ------------ | ------------------------- | ------------------------------------------- | ------ | ---- |
| multiple     | multiple 是否支持多个上传 | boolean                                     |        |      |
| describe     | describe 描述文案         | string \| ReactNode \|(string\|ReactNode)[] |        |      |
| extra        | extra 额外描述文案        | string \| ReactNode \|(string\|ReactNode)[] |        |      |
| onChange     | onChange 回调方法         | (params: any) => void                       |        |      |
| style        | 自定义样式                | CSSProperties                               |        |      |
| iconFontSize | iconFontSize 上传图标大小 | number                                      |        |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle
