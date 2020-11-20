---
title: InputVerify 验证码
---

# InputVerify 验证码

Demo:

```tsx
import React from 'react';
import { InputVerify } from 'ii-admin-base';

export default () => (
  <InputVerify
    placeholder="请输入四位验证码"
    sendCode={() => {}}
    onChange={() => {}}
  />
);
```

<br/>

继承[antd input props](https://ant.design/components/input-cn/#Input)

| 属性          | 说明                   | 类型          | 默认值     | 是否必传 | 版本 |
| ------------- | ---------------------- | ------------- | ---------- | -------- | ---- |
| sendCode      | 发送验证码接口函数     | () => void    |            | 否       |      |
| countDown     | 倒计时时间             | number        | 60         | 否       |      |
| initCodeText  | 初始验证码文本内容     | string        | 发送验证码 | 否       |      |
| reCodeText    | 重新发送验证码文本内容 | string        | 重新发送   | 否       |      |
| checkPhone    | 校验手机号格式         | () => boolean |            | 否       |      |
| codeClassname | 验证码类名             | string        |            | 否       |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle
