import React, { FC, useMemo } from 'react';
import { TreeSelect } from 'antd';
import { TreeSelectProps } from 'antd/lib/tree-select';
import { DataNode } from 'antd/lib/tree';

interface ITreeSelectProps extends TreeSelectProps<any> {
  /** 树结构数据 */
  treeData: any;
  /** 需要加工的title字段 */
  titleField: string;
  /** 需要加工的key字段 */
  keyField: string;
  /** 需要加工的children字段 */
  childrenField: string;
}

const ITreeSelect: FC<ITreeSelectProps> = props => {
  const {
    treeData,
    titleField,
    keyField,
    childrenField,
    ...extraProps
  } = props;

  const computeTree = (
    treeData: DataNode[],
    titleField: string,
    keyField: string,
    childrenField: string,
  ): DataNode[] => {
    return treeData.map((item: any) => ({
      title: item[`${titleField}`],
      key: item[keyField],
      value: item[keyField],
      children: item[`${childrenField}`]
        ? computeTree(
            item[`${childrenField}`],
            titleField,
            keyField,
            childrenField,
          )
        : [],
    }));
  };

  const memoTreeData = useMemo(() => {
    return computeTree(treeData, titleField, keyField, childrenField);
  }, [treeData, titleField, keyField]);

  return <TreeSelect treeData={memoTreeData} {...extraProps} />;
};

ITreeSelect.defaultProps = {
  treeData: [],
  titleField: 'name',
  keyField: 'id',
  childrenField: 'children',
};

export default ITreeSelect;
