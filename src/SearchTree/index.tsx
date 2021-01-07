import React, { useState, FC, useEffect, useMemo, memo } from 'react';
import { Tree, Input } from 'antd';
import { DataNode, TreeProps } from 'antd/lib/tree';
import './index.css';

export interface ISuyTreeProps extends TreeProps {
  /** 树结构数据 */
  treeData: DataNode[];
  /** 需要加工的title字段 */
  titleField?: string;
  /** 需要加工的key字段 */
  keyField?: string;
  /** 需要加工的children字段 */
  childrenField?: string;
  /** icon图标 */
  iconTag?: React.ReactNode | Array<any> | any;
  /** 是否显示搜索 */
  showSearch?: boolean;
  /** search tree 间距 */
  gap?: number;
}

const { Search } = Input;

const SearchTree: FC<ISuyTreeProps> = props => {
  const {
    treeData,
    titleField = 'name',
    keyField = 'id',
    childrenField = 'children',
    iconTag,
    showSearch,
    gap,
    defaultExpandedKeys = [],
    ...extraProps
  } = props;

  const [expandedKeys, setExpandedKeys] = useState(defaultExpandedKeys);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [indexPath, setIndexPath] = useState([]);

  /** 副作用 */

  /** 副作用结束 */

  /** 对树的字段进行加工 */
  const iconIsArray = Array.isArray(iconTag);
  const computeTree = (
    treeData: DataNode[],
    titleField: string,
    keyField: string,
    childrenField: string,
    deepLen: number,
  ): DataNode[] => {
    const icon = iconIsArray ? iconTag[deepLen] : iconTag;
    return treeData.map((item: any) => {
      const {
        [titleField]: titleProp,
        [keyField]: keyProp,
        [childrenField]: childrenProp,
        ...rest
      } = item;
      return {
        title: titleProp,
        icon: icon,
        key: keyProp,
        ...rest,
        children: childrenProp
          ? computeTree(
              childrenProp,
              titleField,
              keyField,
              childrenField,
              deepLen + 1,
            )
          : [],
      };
    });
  };

  const memoTreeData = useMemo(() => {
    // const iconIsArray = Array.isArray(iconTag)
    return computeTree(treeData, titleField, keyField, childrenField, 0);
  }, [treeData, titleField, keyField]);

  /** 搜索树开始 */
  const gData: any = memoTreeData;

  const dataList: any = [];
  const generateList = (data: any) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key, title } = node;
      dataList.push({ key, title });
      if (node.children) {
        generateList(node.children);
      }
    }
  };
  generateList(gData);

  const getParentKey = (key: any, tree: any): any => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item: any) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  const onExpand = (expandedKeys: any) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onChange = (e: any) => {
    const { value } = e.target;
    const expandedKeys = dataList
      .map((item: any) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, gData);
        }
        return null;
      })
      .filter(
        (item: any, i: any, self: any) => item && self.indexOf(item) === i,
      );
    setExpandedKeys(expandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const loop = (data: any) =>
    data.map((item: any) => {
      const { title: titleProp, key, icon, children, ...rest } = item;
      const index = titleProp.indexOf(searchValue);
      const beforeStr = titleProp.substr(0, index);
      const afterStr = titleProp.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{titleProp}</span>
        );
      if (children) {
        return {
          title,
          key,
          icon,
          ...rest,
          children: loop(children),
        };
      }

      return {
        title,
        key,
        icon,
        ...rest,
      };
    });
  /** 搜索树结束 */

  return (
    <div>
      {showSearch && (
        <Search
          style={{ marginBottom: gap || 8 }}
          placeholder="Search"
          onChange={onChange}
        />
      )}
      <Tree
        treeData={loop(gData)}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        {...extraProps}
      />
    </div>
  );
};

SearchTree.defaultProps = {
  treeData: [],
  titleField: 'name',
  keyField: 'id',
  childrenField: 'children',
  showSearch: false,
};

export default SearchTree;
