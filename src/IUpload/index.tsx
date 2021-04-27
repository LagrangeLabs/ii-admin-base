import React, { CSSProperties, ReactNode } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';

import { UploadProps } from 'antd/lib/upload/interface';
const { Dragger } = Upload;

import './index.less';

interface IUpload extends UploadProps {
  /** multiple 是否支持多个上传 */
  multiple?: boolean;
  /** describe 描述文案 */
  describe?: string | ReactNode | (string | ReactNode)[];
  /** extra 额外描述文案 */
  extra?: string | ReactNode | (string | ReactNode)[];
  // /** onChange 回调方法 */
  // onChange?: (params: any) => void;
  // /** 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 File 或 Blob 对象则上传 resolve 传入对象）。注意：IE9 不支持该方法 */
  // beforeUpload?: (params: any) => any;
  /** 自定义样式 */
  // style?: CSSProperties;
  /** 自定义上传icon */
  icon?: ReactNode;
  children?: ReactNode;
  /** iconFontSize 上传图标大小 */
  iconFontSize?: number;
  /** 图标样式 */
  iconFontStyle?: CSSProperties;
  /** 上传组件类型 */
  uploadType?: 'dragger' | 'upload';
}

const beforeUpload = () => {
  return false;
};

export default function IUpload(props: IUpload) {
  const {
    multiple = true,
    iconFontSize = 28,
    iconFontStyle,
    describe,
    extra,
    icon,
    uploadType = 'dragger',
    children,
    ...restProps
  } = props;

  if (!restProps.beforeUpload) {
    restProps.beforeUpload = beforeUpload;
  }

  if (uploadType === 'dragger') {
    return (
      <Dragger multiple={multiple} {...restProps}>
        {children}
        <p className="myupload-iconpart">
          {!icon && (
            <UploadOutlined
              style={{
                fontSize: `${iconFontSize}px`,
                color: '#3079FF',
                ...iconFontStyle,
              }}
            />
          )}
          {icon}
        </p>
        <p className="myupload-describe">
          {describe instanceof Array
            ? describe.map((item, index: number) => (
                <div key={`index${index}`}>{item}</div>
              ))
            : describe}
        </p>
        <p className="myupload-extra">
          {extra instanceof Array
            ? extra.map((item, index: number) => (
                <div key={`index${index}`}>{item}</div>
              ))
            : extra}
        </p>
      </Dragger>
    );
  }
  return (
    <Upload multiple={multiple} {...restProps}>
      {children}
    </Upload>
  );
}
