import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'ii-admin-base',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  publicPath: '/ii-admin-base/',
  base: '/ii-admin-base',
  history: { type: 'hash' },
  styles: ['https://cdn.bootcdn.net/ajax/libs/antd/4.7.0/antd.min.css'],
  // more config: https://d.umijs.org/config
});
