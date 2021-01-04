---
title: CronInput Cron表达式生成器
---

# CronInput Cron 表达式生成器

Demo:

```tsx
import React from 'react';

import { CronInput } from 'ii-admin-base';

export default () => {
  const inputStyle = {
    width: '700px',
  };
  return (
    <div>
      <CronInput inputStyle={inputStyle} style={inputStyle} />
    </div>
  );
};
```

<br />

| 属性       | 说明           | 类型                | 默认值 | 是否必传 | 版本 |
| ---------- | -------------- | ------------------- | ------ | -------- | ---- |
| inputStyle | 组件输入框样式 | React.CSSProperties |        | 否       |      |
| style      | 组件样式       | React.CSSProperties |        | 否       |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle
