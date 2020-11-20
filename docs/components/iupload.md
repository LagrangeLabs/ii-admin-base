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

| 属性         | 说明                                                                                                                                                                                                                             | 类型                                        | 默认值      | 是否必传 | 版本 |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ----------- | -------- | ---- |
| multiple     | multiple 是否支持多个上传                                                                                                                                                                                                        | boolean                                     | true        | 否       |      |
| describe     | describe 描述文案                                                                                                                                                                                                                | string \| ReactNode \|(string\|ReactNode)[] |             | 否       |      |
| extra        | extra 额外描述文案                                                                                                                                                                                                               | string \| ReactNode \|(string\|ReactNode)[] |             | 否       |      |
| onChange     | onChange 回调方法                                                                                                                                                                                                                | (params: any) => void                       |             | 否       |      |
| beforeUpload | 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 File 或 Blob 对象则上传 resolve 传入对象）。注意：IE9 不支持该方法 | (params: any) => any                        | () => false | 否       |      |
| style        | 自定义样式                                                                                                                                                                                                                       | CSSProperties                               |             | 否       |      |
| iconFontSize | iconFontSize 上传图标大小                                                                                                                                                                                                        | number                                      | 28          | 否       |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle
