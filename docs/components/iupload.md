---
title: IUpload 通用附件上传
---

# IUpload 常用封装

Demo:

```tsx
import React from 'react';
import { Button } from 'antd';
import { IUpload } from 'ii-admin-base';

export default () => {
  return (
    <div>
      <h3>可拖拽上传</h3>
      <IUpload
        extra={[
          '支持扩展名：.word .pdf',
          <span style={{ color: 'red' }}>建议上传30M以内大小的PDF文件</span>,
        ]}
        describe="点击或将PDF拖拽到这里上传"
      />
      <br />
      <h3>普通上传，可以自定义样式</h3>
      <IUpload uploadType="upload">
        <Button>上传</Button>
      </IUpload>
    </div>
  );
};
```

<!-- <API src='../../src/IUpload/index.tsx'></API> -->

继承自 [UploadProps](https://ant.design/components/upload-cn/#API)

| 属性          | 说明                      | 类型                                        | 默认值  | 是否必传 | 版本 |
| ------------- | ------------------------- | ------------------------------------------- | ------- | -------- | ---- |
| multiple      | multiple 是否支持多个上传 | boolean                                     | true    | 否       |      |
| describe      | describe 描述文案         | string \| ReactNode \|(string\|ReactNode)[] |         | 否       |      |
| extra         | extra 额外描述文案        | string \| ReactNode \|(string\|ReactNode)[] |         | 否       |      |
| iconFontSize  | iconFontSize 上传图标大小 | number                                      | 28      | 否       |      |
| iconFontStyle | 图标样式                  | CSSProperties                               | 28      | 否       |      |
| uploadType    | 上传组件类型              | 'dragger' \| 'upload'                       | dragger | 否       |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle
