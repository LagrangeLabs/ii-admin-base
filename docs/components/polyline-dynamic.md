---
title: PolylineDynamic 蚂蚁线
---

# PolylineDynamic 蚂蚁线

Demo:

```tsx
import React, { useState } from 'react';

require('codemirror/mode/sql/sql.js');

import { Button } from 'antd';
import { PolylineDynamic } from 'ii-admin-base';

export default () => {
  const [clearSvg, setClearSvg] = useState(false);
  const points = ['100 100, 200 200, 300, 200', '400 400, 500 400, 600, 300'];
  const markColor = { color: 'red' };

  const getCode = () => {
    setClearSvg(!clearSvg);
  };

  return (
    <div style={{ position: 'relative', height: '600px' }}>
      <Button type="primary" onClick={getCode}>
        {clearSvg ? '设置' : '清空'}蚂蚁线
      </Button>

      <PolylineDynamic
        offsetEach={-0.25}
        clearSvg={clearSvg}
        points={points}
        stroke={markColor.color}
      />
    </div>
  );
};
```

#### mdn svg/polyline

https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline

<br />

| 属性            | 说明                           | 类型               | 默认值      | 是否必传 | 版本 |
| --------------- | ------------------------------ | ------------------ | ----------- | -------- | ---- |
| className       | 类名                           | string             | ''          | 否       |      |
| offsetEach      | 滚动速度                       | number             | 0.8         | 否       |      |
| clearSvg        | 是否清除 svg                   | boolean            | false       | 否       |      |
| points          | polyline 属性 points           | string \| string[] |             | 是       |      |
| stroke          | 线段颜色                       | string             |             | 是       |      |
| fill            | 填充颜色                       | string             | transparent | 否       |      |
| strokeDasharray | polyline 属性 stroke-dasharray | string             | 5           | 否       |      |
| strokeWidth     | polyline 属性 stroke-width     | string             | 1.5         | 否       |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle
