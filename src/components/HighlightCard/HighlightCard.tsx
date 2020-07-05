import React, { FC } from 'react';
import classNames from 'classnames';

export interface IIHighlightCardProps {
  /** 卡片模块标题 */
  cardTitle: string | React.ReactNode;
  /** 是否展示高亮图标 */
  showHighLightIcon?: boolean;
  /** 容器类名 */
  className?: string;
  /** 容器样式 */
  style?: React.CSSProperties;
}

const HighlightCard: FC<IIHighlightCardProps> = (props) => {
  const { cardTitle, showHighLightIcon, className, style, children } = props;

  const containerCls = classNames('ii-highlight-card', className);

  const headCls = classNames('ii-highlight-card-head', {
    'ii-highlight-icon': showHighLightIcon,
  });

  return (
    <div className={containerCls} style={style}>
      {cardTitle ? <div className={headCls}>{cardTitle}</div> : null}
      <div>{children}</div>
    </div>
  );
};

HighlightCard.defaultProps = {
  showHighLightIcon: true,
};

export default HighlightCard;
