import { TableProps, ColumnProps } from 'antd/lib/table';

export type FilterType = 'search' | 'input' | 'select' | 'datepicker' | 'rangepicker' | 'cascader';

interface OptionProps {
  /** 数值 */
  value: string | number;
  /** 标签 */
  label: string;
}

/**
 * 下拉选择器选择项
 */
type SelectOptionProps = OptionProps;

/**
 * 级联选择器选择项
 */
interface CascaderOptionProps {
  /** 数值 */
  value: string | number;
  /** 标签 */
  label: string;
  children?: Array<CascaderOptionProps>;
}

/**
 * 筛选项的选择项
 */
export type FilterOptionProps = SelectOptionProps | CascaderOptionProps;

/**
 * 表单页面筛选项配置
 */
export interface FilterConfigProps {
  /** 宽度 */
  width?: number;
  /** 类名 */
  className?: string;
  /** 筛选项类型 */
  type: FilterType;
  /** 默认文字 */
  placeholder?: string;
  /** 筛选项字段，用于传递给后端的参数字段名。可以是字符、字符数组 */
  field: string | Array<string>;
  /** 筛选项字段返回的数据格式类型 */
  filterReturnType?: 'string' | 'array';
  /** 选择项数据源 */
  options?: Array<FilterOptionProps>;
  /** 设置 Select 的模式为多选或标签 */
  selectMode?: string;
  /** 日期格式 */
  dateFormat?: string;
}

/**
 * 分页参数
 */
interface PagingPrams {
  pageNum: number;
  pageSize: number;
}

/**
 * 表单页面
 *
 * + 泛型 T 表示单个行数据的数据格式;
 * + 泛型 R 表示表单页面的其他筛选项数据
 */
export interface IIPageTableProps<T, R> extends TableProps<T> {
  /** 表单页面标题 */
  pageTitle?: string;
  /** 表单页面筛选项配置 */
  filterCfgList?: Array<FilterConfigProps>;
  /** 表格数据总数 */
  total?: number;
  /** 表格数据数组 */
  dataSource?: Array<T>;
  /** 表格行 key 的取值，可以是字符串 */
  rowKey?: string;
  /** 是否需要刷新表单页面 */
  shouldRefresh?: boolean;
  /** 表格列的配置描述 */
  columns: Array<ColumnProps<T>>;
  /** 获取表单数据接口 */
  getTableList: (params: PagingPrams & R) => void;
  /** 默认搜索条件 */
  defaultCondtions?: T;
  /** 额外操作：如导出、新增等操作 */
  extraOpera: React.ReactNode;
}
