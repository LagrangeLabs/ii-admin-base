import React, { CSSProperties } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

const { Option } = Select;
/**
 * SearchProps properties
 */
export interface SearchProps {
  /** fetchOption 搜索方法 */
  fetchOption?: (params: any) => Promise<any>;
  /** getParams 请求参数处理方法 */
  getParams?: (params: any) => any;
  /** getOption 返回结果处理方法，默认展示key  value */
  getOption?: (params: any) => any;
  /** onChange 返回选择结果 默认携带key、value */
  onChange?: (params: any) => any;
  /** mode 多选、单选 */
  mode?: 'multiple' | 'tags' | undefined;
  /** placeholder 提示信息 */
  placeholder?: string;
  /** itemStyle select样式 */
  itemStyle?: CSSProperties;
  /** defaultKey 默认搜索关键字 */
  defaultKey?: string;
}

/**
 * UserRemoteSelect
 */
export default class UserRemoteSelect extends React.Component<SearchProps> {
  lastFetchId: number;

  constructor(props: SearchProps) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }

  state = {
    data: [],
    value: [],
    fetching: false,
  };

  // 初始化加载数据
  componentDidMount() {
    const { defaultKey = '' } = this.props;
    this.fetchUser(defaultKey || '', true);
  }

  /**
   *
   * @param value 关键字
   * @param updateStateFlag 是否需要更新state中的value
   */
  fetchUser = (value: string, updateStateFlag?: boolean) => {
    const { fetchOption, getParams, getOption, onChange } = this.props;
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    const params = getParams && getParams(value);
    if (fetchOption) {
      fetchOption(params).then((body: any) => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return;
        }
        const data = getOption && getOption(body);
        const updateData: any = { data, fetching: false };
        if (updateStateFlag) {
          const item = data.find((itemEach: any) => itemEach.key === value);
          if (item) {
            item.label = item.key;
            updateData.value = item;
            if (onChange) {
              onChange(item);
            }
          }
        }
        this.setState(updateData);
      });
    }
  };

  handleChange = (value: any) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  };

  render() {
    const { fetching, data, value } = this.state;
    const { mode, placeholder, itemStyle, ...restProps } = this.props;
    return (
      <Select
        mode={mode}
        labelInValue
        value={value}
        placeholder={placeholder}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchUser}
        onChange={this.handleChange}
        style={itemStyle}
        showSearch
        {...restProps}
      >
        {data.map((item: any) => (
          <Option key={item.value || item} value={item.value || item}>
            {item.key || item}
          </Option>
        ))}
      </Select>
    );
  }
}
