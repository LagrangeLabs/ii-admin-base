const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx', '../src/styles/index.less'],
  addons: [
    {
      name: '@storybook/preset-create-react-app',
      options: {
        craOverrides: {
          fileLoaderExcludes: ['less'],
        },
      },
    },
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [require.resolve('babel-preset-react-app')],
          },
        },
        // 过滤 node_modules 中的 props
        {
          loader: require.resolve('react-docgen-typescript-loader'),
          options: {
            // 将枚举或者联合类型转换成字符串形式，避免字符串字面量显示别名。
            shouldExtractLiteralValuesFromEnum: true,
            // 避免显示原生内置属性
            propFilter: (prop) => {
              if (prop.parent) {
                return !prop.parent.fileName.includes('node_modules');
              }

              return true;
            },
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.less$/,
      loaders: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
      include: [path.resolve(__dirname, '../src'), /[\\/]node_modules[\\/].*antd/],
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
