import React, { ReactNode } from "react";

interface SVGProps {
  width?: number | string | null;
  height?: number | string | null;
  viewBox?: string;
  fill?: boolean;
  stroke?: boolean;
  id: string;
  children?: ReactNode;
  isHidden?: boolean;
  useClass?: string;
  className?: string;
}

const SVG: React.FC<SVGProps> = ({
  width = null,
  height = null,
  viewBox,
  fill = true,
  stroke = false,
  id,
  children,
  isHidden,
  useClass = "",
  className = "",
}) => {
  const _width = width ? width.toString().replace("%", "") : "100";
  const _height = height ? height.toString().replace("%", "") : "100";
  const _viewBox = viewBox ? viewBox : `0 0 ${_width} ${_height}`;

  return isHidden ? (
    <svg display="none" className={className}>
      {children}
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      preserveAspectRatio="xMidYMid meet"
      width={_width}
      height={_height}
      viewBox={_viewBox}
      className={`${className} ${fill ? "fill" : ""} ${stroke ? "stroke" : ""}`}
    >
      <use xlinkHref={`#${id}`} className={useClass} />
    </svg>
  );
};

export default SVG;
