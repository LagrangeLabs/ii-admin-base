---
title: ImageCarousel 图片轮播组件
---

# ImageCarousel 图片轮播组件

Demo:

```tsx
import React, { useState } from 'react';
import { ImageCarousel } from 'ii-admin-base';

export default () => {
  const carouselImages = [
    'https://www.keaidian.com/uploads/allimg/190604/04221240_21.jpg',
    'https://www.keaidian.com/uploads/allimg/190604/04221240_21.jpg',
  ];

  return (
    <div style={{ position: 'relative', height: '600px' }}>
      <ImageCarousel fileList={carouselImages} />
    </div>
  );
};
```

#### react-slick 官方文档

https://github.com/akiran/react-slick

<br />

| 属性      | 说明               | 类型                          | 默认值   | 是否必传 | 版本 |
| --------- | ------------------ | ----------------------------- | -------- | -------- | ---- |
| className | 类名               | string                        |          | 否       |      |
| style     | 组件样式           | React.CSSProperties           |          | 否       | 否   |
| settings  | Slider 配置项      | Settings                      | SETTINGS | 否       |      |
| fileList  | 轮播图片           | string[]                      | []       | 否       |      |
| onClick   | 当前轮播图点击事件 | (currentImage:string) => void |          | 是       |      |

<br />

```
SETTINGS = {
  dots: true,
  infinite: true,
  adaptiveHeight: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
}
```
