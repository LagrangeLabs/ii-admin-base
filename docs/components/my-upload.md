---
title: MyUpload 通用附件上传
---

# MyUpload 常用封装

Demo:

```tsx
import React from 'react';
import { MyUpload } from 'ii-admin-base';

export default () => {
  return (
    <MyUpload
      extra={['支持扩展名：.word .pdf', '建议上传30M以内大小的PDF文件']}
      describe="点击或将PDF拖拽到这里上传"
    />
  );
};
```

<!-- <API src='../../src/MyUpload/index.tsx'></API> -->

| 属性         | 说明                      | 类型                  | 默认值 | 版本 |
| ------------ | ------------------------- | --------------------- | ------ | ---- |
| multiple     | multiple 是否支持多个上传 | boolean               |        |      |
| describe     | describe 描述文案         | string \| string[]    |        |      |
| extra        | extra 额外描述文案        | string \| string[]    |        |      |
| onChange     | onChange 回调方法         | (params: any) => void |        |      |
| style        | 自定义样式                | CSSProperties         |        |      |
| iconFontSize | iconFontSize 上传图标大小 | number                |        |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle
