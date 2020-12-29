---
title: CodeMirror 编辑器组件
---

# CodeMirror 编辑器组件

Demo:

```tsx
import React, { useState } from 'react';

require('codemirror/mode/sql/sql.js');

import { Button } from 'antd';
import { CodeMirror } from 'ii-admin-base';

export default () => {
  const [instance, setInstance] = useState({});
  const [code, setCode] = useState('');

  const getCodeInstance = (instance: any) => {
    setInstance(instance);
  };

  const getCode = () => {
    const value = instance.doc.getValue();
    setCode(value);
  };

  return (
    <div>
      <Button type="primary" onClick={getCode}>
        输入值获取
      </Button>
      <div style={{ padding: 10 }}>{code}</div>
      <CodeMirror
        getCodeInstance={getCodeInstance}
        options={{
          lineNumbers: true,
          mode: 'text/x-mariadb',
          matchBrackets: true,
        }}
      />
    </div>
  );
};
```

#### codemirror 官方文档

https://codemirror.net/

<br />

| 属性            | 说明                                          | 类型                    | 默认值 | 是否必传 | 版本 |
| --------------- | --------------------------------------------- | ----------------------- | ------ | -------- | ---- |
| options         | codemirror 配置项，具体参考官网               | object                  |        | 是       |      |
| className       | 组件类名                                      | string                  |        | 否       |      |
| style           | 组件样式,控制外部样式无效，请修改当前页面样式 | React.CSSProperties     |        | 否       |      |
| getCodeInstance | 获取 codemirror 实例                          | (parmas: any) => void   |        | 是       |      |
| getValueFlag    | 获取 codemirror 当前是否有输入                | (flag: boolean) => void |        | 否       |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle
