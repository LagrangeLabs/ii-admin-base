import React, { CSSProperties } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

const { Option } = Select;

import { KeyValueObj } from '../interface';
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
  /** select.option 的key字段，默认为key */
  optionKey?: string;
  /** select.option 的value字段，默认为value */
  optionValue?: string;
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
    options: [],
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
    this.setState({ options: [], fetching: true });
    const params = (getParams && getParams(value)) || value;
    if (fetchOption) {
      fetchOption(params).then((body: any) => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return;
        }
        const options = (getOption && getOption(body)) || body;
        const updateData: any = { options, fetching: false };
        if (updateStateFlag) {
          const item = options.find((itemEach: any) => itemEach.key === value);
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
      options: [],
      fetching: false,
    });
  };

  render() {
    const { fetching, options, value } = this.state;
    const {
      mode,
      placeholder,
      itemStyle,
      optionKey = 'key',
      optionValue = 'value',
      ...restProps
    } = this.props;
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
        {options.map((item: KeyValueObj) => (
          <Option key={item[optionValue]} value={item[optionValue]}>
            {item[optionKey]}
          </Option>
        ))}
      </Select>
    );
  }
}
