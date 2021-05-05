import React, { useState, useEffect, useRef } from 'react';

import './index.less';

type IProps = {
  points: string | string[];
  stroke: string;
  fill?: string;
  className?: string;
  strokeDasharray?: string;
  strokeWidth?: string;
  offsetEach?: number;
  clearSvg?: boolean;
};

export const ListItem: React.FC<IProps> = props => {
  const {
    className = '',
    points,
    stroke,
    fill = 'transparent',
    strokeDasharray = '5',
    strokeWidth = '1.5',
    offsetEach = 0.8,
    clearSvg = false,
  } = props;
  const pointsResult = points instanceof Array ? points : [points];

  const [offset, setOffset] = useState(3);
  const offsetRef = useRef(3);
  const intervalRef: any = useRef(null);

  useEffect(() => {
    initAnimate();
  }, []);

  useEffect(() => {
    if (clearSvg) {
      clearInterval(intervalRef.current);
    } else {
      initAnimate();
    }
  }, [clearSvg]);

  const initAnimate = () => {
    const intervaliId = setInterval(() => {
      const newResult = offsetRef.current + offsetEach;
      offsetRef.current = newResult;
      setOffset(newResult);
    }, 15);
    intervalRef.current = intervaliId;
    return () => {
      clearInterval(intervaliId);
    };
  };

  return (
    <svg className={`ii-base-svgcontainer ${className}`}>
      <desc></desc>
      <defs></defs>
      {!clearSvg &&
        pointsResult.map((item, index) => {
          const current = offsetRef.current;
          return (
            <polyline
              key={`index${item}`}
              points={item}
              stroke={stroke}
              fill={fill}
              strokeDasharray={strokeDasharray}
              strokeWidth={strokeWidth}
              strokeDashoffset={current}
            />
          );
        })}
    </svg>
  );
};

export default ListItem;
