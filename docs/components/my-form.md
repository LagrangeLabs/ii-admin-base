---
title: MyForm form表单
---

# form 表单 常用封装

Demo:

```tsx
import React from 'react';
import { MyForm } from 'ii-admin-base';
import { Form, Button, Row, Col } from 'antd';

const DEMO_FORM = [
  {
    type: 'select',
    placeholder: '请选择企业规模',
    label: '企业规模',
    option: [
      { key: '1-50人', value: '1-50人' },
      { key: '50-100人', value: '50-100人' },
      { key: '101-150人', value: '101-150人' },
    ],
    name: 'select',
  },
  {
    type: 'multiselect',
    placeholder: '请选择企业规模复选',
    label: '企业规模复选',
    option: [
      { key: '1-50人', value: '1-50人' },
      { key: '50-100人', value: '50-100人' },
      { key: '101-150人', value: '101-150人' },
    ],
    name: 'multiselect',
  },
  {
    type: 'selectSearch',
    placeholder: '输入关键字',
    label: '远程搜索复选框',
    option: [],
    name: 'selectSearch',
    getOption: data => {
      return data.map((item: any) => ({ key: item, value: item }));
    },
    fetchOption: () => {
      return new Promise(resolve => {
        resolve(['searchData1', 'searchData2']);
      });
    },
    getParams: value => value,
  },
  {
    type: 'select',
    label: '关联父级',
    name: 'parentCode',
    childName: 'childCode',
    option: [
      { key: '选项一', value: '1' },
      { key: '选项二', value: '2' },
    ],
  },
  {
    type: 'select',
    label: '关联子级',
    name: 'childCode',
    parentName: 'parentCode',
    originOption: {
      '1': [
        { key: '子选项一', value: '子1' },
        { key: '子选项二', value: '子2' },
      ],
      '2': [
        { key: '子选项三', value: '子3' },
        { key: '子选项四', value: '子4' },
      ],
    },
    option: [],
  },
  {
    type: 'phone',
    placeholder: '获取验证码',
    label: '验证码',
    name: 'code',
  },
  {
    type: 'input',
    placeholder: '隐藏该字段，默认传参值',
    hidden: true,
    value: '默认传参',
    label: '企业资质',
    name: 'input',
  },
  {
    type: 'date',
    placeholder: '输入日期',
    label: '日期',
    name: 'date',
  },
  {
    type: 'number',
    placeholder: '输入数字',
    label: '数字',
    name: 'number',
  },
  {
    type: 'upload',
    label: '上传附件',
    name: 'upload',
    extra: ['支持扩展名：.word .pdf', '建议上传30M以内大小的PDF文件'],
    describe: '点击或将PDF拖拽到这里上传',
    itemStyle: { width: '300px', height: '150px', background: '#fbfdff' },
    rules: [],
  },
];

export default () => {
  const [form] = Form.useForm();
  return (
    <div>
      <MyForm
        formItemLayout={{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
        form={form}
        list={DEMO_FORM}
      />
      <Row>
        <Col offset={6}>
          <Button type="primary">提交</Button>
          <Button style={{ marginLeft: '8px' }}>取消</Button>
        </Col>
      </Row>
    </div>
  );
};
```

<API src='../../src/MyForm/V4/index.tsx'></API>

### FormItem 类型说明

| 属性        | 说明                                 | 类型                                                                                                                                                                                                                                                              | 默认值 | 版本 |
| ----------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---- |
| type        | item 类型                            | 'text' 文本展示 \| 'phone' 录入验证码\| 'select' 单选下拉框\| 'multiselect' 多选下拉框\| 'selectSearch' 搜索下拉框\| 'upload' 文件上传\| 'richtext' 富文本\| 'input' 文本录入框\| 'checkbox' 多选\| 'number' 数字录入框\| 'textarea' 多行文本\| 'date' 时间选择器 | 必选   |
| inputType   | input 类型 password、text、file 等   | string                                                                                                                                                                                                                                                            |        |      |
| itemStyle   | item style                           | CSSProperties                                                                                                                                                                                                                                                     |        |      |
| label       | label formitem label 文案            | React.ReactNode \| string                                                                                                                                                                                                                                         |        |      |
| name        | name 提交值的 key                    | string                                                                                                                                                                                                                                                            |        |      |
| placeholder | placeholder                          | string                                                                                                                                                                                                                                                            |        |      |
| option      | option select 等的选项               | { key: string; value: string }[]                                                                                                                                                                                                                                  |        |      |
| rules       | rules 校验规则                       | any[]                                                                                                                                                                                                                                                             |        |      |
| showSearch  | 是否可以搜索                         | boolean                                                                                                                                                                                                                                                           |        |      |
| allowClear  | allowClear 是否允许清楚已选项        | boolean                                                                                                                                                                                                                                                           |        |      |
| hidden      | 是否隐藏字段（依然会收集和校验字段） | boolean                                                                                                                                                                                                                                                           |        |      |
| span        | form item col 占几部分               | number                                                                                                                                                                                                                                                            |        |      |

#### type 为 text

| 属性  | 说明                          | 类型   | 默认值 | 版本 |
| ----- | ----------------------------- | ------ | ------ | ---- |
| value | value type 为 text 时的展示值 | string |        |      |

#### type 为 upload

| 属性     | 说明                                | 类型               | 默认值 | 版本 |
| -------- | ----------------------------------- | ------------------ | ------ | ---- |
| describe | describe type 为 upload 的描述文案  | string \| string[] |        |      |
| extra    | extra type 为 upload 的额外描述文案 | string \| string[] |        |      |

#### type 为 richtext

| 属性        | 说明                     | 类型                          | 默认值 | 版本 |
| ----------- | ------------------------ | ----------------------------- | ------ | ---- |
| uploadImage | uploadImage 上传图片方法 | (params: any) => Promise<any> |        |      |

#### type 为 phone

| 属性          | 说明                         | 类型          | 默认值 | 版本 |
| ------------- | ---------------------------- | ------------- | ------ | ---- |
| getVerifyCode | getVerifyCode 获取验证码方法 | () => void    |        |      |
| checkPhone    | checkPhone 校验手机号方法    | () => boolean |        |      |

#### type 为 date

| 属性         | 说明                            | 类型                          | 默认值       | 版本 |
| ------------ | ------------------------------- | ----------------------------- | ------------ | ---- |
| dateFormat   | dateFormat 时间选择器格式       | string                        | 'YYYY/MM/DD' |      |
| showTime     | showTime 时间选择器是否可以时间 | boolean                       | false        |      |
| disabledDate | disabledDate 不可选时间         | (currentDate: any) => boolean |              |      |

#### 表单项有联动

| 属性         | 说明            | 类型                   | 默认值 | 版本 |
| ------------ | --------------- | ---------------------- | ------ | ---- |
| childName    | 关联选项        | string                 |        |      |
| parentName   | 关联选项 父级   | string                 |        |      |
| originOption | 关联选项 子选项 | { [T: string]: any[] } |        |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle
