import React, { useState, FC, useMemo } from 'react';
import { Tree, Input } from 'antd';
import { DataNode, TreeProps } from 'antd/lib/tree';
import './index.css';

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
  /** 是否显示搜索 */
  showSearch?: boolean;
  /** search tree 间距 */
  gap?: number;
}

const { Search } = Input;

const SearchTree: FC<ISuyTreeProps> = props => {
  const {
    treeData,
    titleField,
    keyField,
    childrenField,
    iconTag,
    showSearch,
    gap,
    ...extraProps
  } = props;

  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  /** 对树的字段进行加工 */
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
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return {
          title,
          key: item.key,
          icon: item.icon,
          children: loop(item.children),
        };
      }

      return {
        title,
        key: item.key,
        icon: item.icon,
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
