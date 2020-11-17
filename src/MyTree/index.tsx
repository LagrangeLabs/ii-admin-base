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
  /** icon图标 */
  iconTag?: React.ReactNode;
}

const MyTree: FC<ISuyTreeProps> = props => {
  const {
    treeData,
    titleField,
    keyField,
    childrenField,
    iconTag,
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
      icon: iconTag,
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

MyTree.defaultProps = {
  treeData: [],
  titleField: 'name',
  keyField: 'id',
  childrenField: 'children',
};

export default MyTree;
