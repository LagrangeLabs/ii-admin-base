import React, { CSSProperties } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';

const { Dragger } = Upload;

import './index.less';

interface MyUpload {
  /** multiple 是否支持多个上传 */
  multiple?: boolean;
  /** describe 描述文案 */
  describe?: string | string[];
  /** extra 额外描述文案 */
  extra?: string | string[];
  /** onChange 回调方法 */
  onChange?: (params: any) => void;
  style?: CSSProperties;
  /** iconFontSize 上传图标大小 */
  iconFontSize?: number;
}
export default function MyUpload(props: MyUpload) {
  const {
    multiple = true,
    iconFontSize = 28,
    describe,
    extra,
    ...restProps
  } = props;

  return (
    <Dragger multiple={multiple} {...restProps}>
      <p className="myupload-iconpart">
        <UploadOutlined
          style={{ fontSize: `${iconFontSize}px`, color: '#3079FF' }}
        />
      </p>
      <p className="myupload-describe">
        {describe instanceof Array
          ? describe.map(item => <div key={item}>{item}</div>)
          : describe}
      </p>
      <p className="myupload-extra">
        {extra instanceof Array
          ? extra.map(item => <div key={item}>{item}</div>)
          : extra}
      </p>
    </Dragger>
  );
}
