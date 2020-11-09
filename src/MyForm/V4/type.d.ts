import { CSSProperties } from 'react';
import { InputType } from '@/utils/getMatch';

/**
 * FormItem props
 */
export interface FormItem {
  /**
   * type :item 类型 | 'text' 文本展示
  | 'phone' 录入验证码
  | 'select' 单选下拉框
  | 'multiselect' 多选下拉框
  | 'selectSearch' 搜索下拉框
  | 'upload' 文件上传
  | 'richtext' 富文本
  | 'input' 文本录入框
  | 'checkbox' 多选
  | 'number' 数字录入框
  | 'textarea' 多行文本
  | 'date' 时间选择器
   */
  type: InputType;
  /** input 类型  password、text、file等 */
  inputType?: string;
  /** item style */
  itemStyle?: CSSProperties;
  /** label formitem label文案 */
  label: React.ReactNode | string;
  /** name 提交值的key */
  name: string;
  /** value type为text时的展示值 */
  value?: string;
  /** dateFormat 时间选择器格式 */
  dateFormat?: string;
  /** placeholder */
  placeholder?: string;
  /** option select等的选项 */
  option?: { key: string; value: string }[];
  /** rules 校验规则 */
  rules?: any[];
  /** describe  type为upload的描述文案 */
  describe?: string | string[];
  /** extra type为upload的额外描述文案 */
  extra?: string | string[];
  /** uploadImage 上传图片方法 */
  uploadImage?: (params: any) => Promise<any>;
  /** 是否可以搜索 */
  showSearch?: boolean;
  /** allowClear 是否允许清楚已选项 */
  allowClear?: boolean;
  /** 是否隐藏字段（依然会收集和校验字段） */
  hidden?: boolean;
  /** 关联选项 */
  childName?: string;
  /** 关联选项 父级 */
  parentName?: string;
  /** 关联选项 子选项 */
  originOption?: { [T: string]: any[] };
  /** form item col 占几部分 */
  span?: number;
  /** getVerifyCode 获取验证码方法 */
  getVerifyCode?: () => void;
  /** checkPhone 校验手机号方法 */
  checkPhone?: () => boolean;
  /** showTime 时间选择器是否可以时间*/
  showTime?: boolean;
  /** disabledDate 不可选时间 */
  disabledDate?: (currentDate: any) => boolean;
}
