import React, { useState, FC, useEffect, useMemo } from 'react';
import { Tree } from 'antd';
import { DataNode, TreeProps } from 'antd/lib/tree';

export interface ISuyTreeProps extends TreeProps {
  /** 树结构数据 */
  treeData: DataNode[];
  /** 需要加工的title字段 */
  titleField: string;
  /** 需要加工的key字段 */
  keyField: string;
  /** 需要加工的children字段 */
  childrenField: string;
}

const SuyTree: FC<ISuyTreeProps> = props => {
  const {
    treeData,
    titleField,
    keyField,
    childrenField,
    ...extraProps
  } = props;

  console.log(extraProps);

  const computeTree = (
    treeData: DataNode[],
    titleField: string,
    keyField: string,
    childrenField: string,
  ): DataNode[] => {
    return treeData.map((item: any) => ({
      title: item[`${titleField}`],
      key: item[keyField],
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

  return <Tree treeData={memoTreeData} {...extraProps} />;
};

SuyTree.defaultProps = {
  treeData: [],
  titleField: 'name',
  keyField: 'id',
  childrenField: 'children',
};

export default SuyTree;
