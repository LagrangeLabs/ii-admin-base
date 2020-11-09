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

<API src='../../src/MyUpload/index.tsx'></API>

More skills for writing demo: https://d.umijs.org/guide/demo-principle
