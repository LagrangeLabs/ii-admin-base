import { addDecorator, addParameters, configure } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import WrapperDecorator from './decorators/WrapperDecorator';

import 'antd/dist/antd.less';

// 通过addDecorator添加插件
addDecorator(WrapperDecorator);
addDecorator(withInfo);

addParameters({
  info: {
    inline: true, // 直接展示所有信息
    header: false, // 隐藏组件名称和组件描述
    source: false,
  },
});

// 将 welcome 文档说明置于顶部
const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')];
  const req = require.context('../src/components', true, /\.stories\.tsx$/);
  req.keys().forEach((fname) => allExports.push(req(fname)));

  return allExports;
};

// automatically import all files ending in *.stories.tsx
configure(loaderFn, module);
