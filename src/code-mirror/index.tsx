import React, { useEffect, useRef } from 'react';

import CodeMirror from 'codemirror';

import 'codemirror/lib/codemirror.css';

import './reset.less';

/**
 * codemirror 官方文档
 * https://codemirror.net/
 */
type IProps = {
  /** 组件类名 */
  className?: string;
  /** 组件样式,控制外部样式无效，请修改当前页面样式 */
  style?: React.CSSProperties;
  /** codemirror配置项，具体参考官网 */
  options?: object;
  /** 获取codemirror 实例 */
  getCodeInstance: (parmas: any) => void;
  /** 获取codemirror 当前是否有输入 */
  getValueFlag?: (flag: boolean) => void;
};

export const CodeMirrorF: React.FC<IProps> = props => {
  const { getCodeInstance, style, getValueFlag, options, className } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const prevFlag = useRef(false);

  useEffect(() => {
    let result: any = null;
    if (textareaRef.current) {
      result = CodeMirror.fromTextArea(
        textareaRef.current,
        options,
        // {
        //   lineNumbers: true,
        //   mode: 'text/x-mariadb',
        //   matchBrackets: true,
        // }
      );
      getCodeInstance(result);
    }

    const intervalId = setInterval(() => {
      if (result) {
        const value = result.doc.getValue();
        const currentFlag = value.length > 0;
        if (currentFlag !== prevFlag.current) {
          prevFlag.current = currentFlag;
          getValueFlag && getValueFlag(currentFlag);
        }
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={className} style={style}>
      <textarea ref={textareaRef} style={{ display: 'none' }}></textarea>
    </div>
  );
};

export default CodeMirrorF;
