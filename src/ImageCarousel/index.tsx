import React from 'react';
import Slider, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './reset.less';

/**
 * react-slick 官方文档
 * https://github.com/akiran/react-slick
 */
type IProps = {
  /** 组件类名 */
  className?: string;
  /** 组件样式,控制外部样式无效，请修改当前页面样式 */
  style?: React.CSSProperties;
  /** Slider配置项，具体参考官网 */
  settings?: Settings;
  /** 轮播图片 */
  fileList?: string[];
  /** 获取当前点击图片 */
  onClick?: (currentPath: string) => void;
};

const SETTINGS = {
  dots: true,
  infinite: true,
  adaptiveHeight: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const ImageCarousel: React.FC<IProps> = props => {
  const {
    style,
    className,
    settings = SETTINGS,
    fileList = [],
    onClick = () => {},
  } = props;

  return (
    <div className={className} style={style}>
      <Slider {...settings}>
        {fileList.map((file: string) => (
          <img
            onClick={() => onClick(file)}
            style={{ width: '100%', height: '100%' }}
            src={file}
            alt="icon"
          />
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
