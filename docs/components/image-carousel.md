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
