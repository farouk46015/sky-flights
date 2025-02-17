import { memo } from 'react';
import type { DateRangeCellProps } from '@flights/types/components';
import { Tooltip } from 'antd';

import { formatPrice, getPriceColor } from '@utils/price';
import dayjs from 'dayjs';

function DateRangeCell({
  current,
  info,
  priceInfo,
  priceCurrency,
  isSelected,
}: DateRangeCellProps) {
  if (info.type !== 'date' || !dayjs.isDayjs(current)) {
    return info.originNode;
  }

  const cellContent = (
    <div
      className={`flex flex-col items-center justify-center p-1 h-[50px] w-[50px] ${
        isSelected ? 'bg-blue-500/10 text-gray-800 rounded-full' : ''
      }`}
    >
      <span className="text-base">{current.date()}</span>
      {priceInfo ? (
        <span
          className="text-xs mt-1"
          style={{
            color: isSelected ? 'white' : getPriceColor(priceInfo.group),
          }}
        >
          {formatPrice(priceInfo.price, priceCurrency)}
        </span>
      ) : null}
    </div>
  );

  return priceInfo ? (
    <Tooltip
      title={`${formatPrice(priceInfo.price, priceCurrency)} - ${priceInfo.group.toUpperCase()}`}
    >
      {cellContent}
    </Tooltip>
  ) : (
    cellContent
  );
}

DateRangeCell.displayName = 'DateRangeCell';

export default memo(DateRangeCell);
