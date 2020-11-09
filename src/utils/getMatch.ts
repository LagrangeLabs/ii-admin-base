/* eslint-disable no-plusplus */

export type InputType =
  | 'text'
  | 'phone'
  | 'select'
  | 'multiselect'
  | 'selectSearch'
  | 'upload'
  | 'richtext'
  | 'input'
  | 'checkbox'
  | 'number'
  | 'textarea'
  | 'date';

export const getType = (item: any): InputType => {
  if (item.valueType === 'NUMBER') {
    return 'number';
  }
  if (item.valueType === 'DATE') {
    return 'date';
  }
  if (item.type === 'INPUT_RADIO') {
    return 'select';
  }
  if (item.type === 'INPUT_CHECKBOX') {
    return 'multiselect';
  }
  return 'input';
};

export const getListItem = (item: any) => {
  const type = getType(item);
  const { key, option, required, span } = item;
  return {
    type,
    label: key,
    name: key,
    option,
    span,
    rules: [{ required, message: `${key}不能为空` }],
  };
};
