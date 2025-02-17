import type { ReactNode } from 'react';
import type { DatePickerProps } from 'antd';
import type { CalendarSearchParams, FlightDay, FlightResponse } from '@flights/types/flight';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { DatePicker, Space, ConfigProvider } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import locale from 'antd/es/date-picker/locale/en_US';
import SVG from '@assets/icons';
import { useDateRange, useLocations } from '@hooks/useFlightSearch';
import { flightsApi } from '@services/api/flights';
import { validateCalendarSearchParams } from '@utils/validation';
import { formatDate } from '@utils/date';
import { getPriceMap } from '@utils/price';
import DateRangeCell from '@components/DateRangeCell';

const { RangePicker } = DatePicker;

function CustomDateRange() {
  const [datePrice, setDatePrice] = useState<FlightDay[]>([]);
  const [priceCurrency, setPriceCurrency] = useState('USD');
  const { dateRange, setDateRange } = useDateRange();
  const { fromLocation, toLocation } = useLocations();

  useEffect(() => {
    const searchParams: CalendarSearchParams = {
      originSkyId: fromLocation?.skyId || '',
      destinationSkyId: toLocation?.skyId || '',
      fromDate: dateRange[0] ? formatDate(dateRange[0]) : '',
    };
    const getPriceCalendar = async () => {
      if (!validateCalendarSearchParams(searchParams)) {
        return;
      }
      try {
        const response = (await flightsApi.getPriceCalendar(searchParams)) as FlightResponse;
        if (response.status && response.data.flights && response.data.flights.days.length > 0) {
          setPriceCurrency(response.data.flights.currency);
          setDatePrice(response.data.flights.days);
        }
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    getPriceCalendar();
  }, [fromLocation?.skyId, toLocation?.skyId, dateRange]);

  const priceMap = useMemo(() => getPriceMap(datePrice), [datePrice]);

  const cellRender: DatePickerProps<Dayjs>['cellRender'] = useCallback(
    (current: string | number | Dayjs, info: { type: string; originNode: ReactNode }) => {
      if (!dayjs.isDayjs(current)) return info.originNode;

      const dateStr = current.format('YYYY-MM-DD');
      const priceInfo = priceMap[dateStr];
      const isSelected = dateRange.some(
        (date: Date | null) => date && dayjs.isDayjs(current) && current.isSame(date, 'day')
      );

      return (
        <DateRangeCell
          current={current}
          info={info}
          priceInfo={priceInfo}
          priceCurrency={priceCurrency}
          isSelected={isSelected}
        />
      );
    },
    [dateRange, priceMap, priceCurrency]
  );

  const handleDateChange = useCallback(
    (values: [Dayjs | null, Dayjs | null] | null) => {
      if (values) {
        const [start, end] = values;
        if (!end) {
          setDateRange([start?.toDate() || null, null]);
        } else {
          setDateRange([start?.toDate() || null, end?.toDate() || null]);
        }
      }
    },
    [setDateRange]
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1a73e8',
        },
        components: {
          DatePicker: {
            cellHeight: 60,
            cellWidth: 60,
          },
        },
      }}
    >
      <Space size={12} direction="vertical" className="w-full">
        <RangePicker
          allowEmpty={[false, true]}
          prefix={<SVG id="date" width="20" height="20" />}
          suffixIcon={null}
          size="large"
          cellRender={cellRender}
          className="w-full !rounded-sm !border !border-gray-300 !py-3 !hover:border-blue-500 !hover:shadow-md"
          locale={locale}
          format="DD MMM YYYY"
          onChange={handleDateChange}
          value={[
            dateRange[0] ? dayjs(dateRange[0]) : null,
            dateRange[1] ? dayjs(dateRange[1]) : null,
          ]}
          placeholder={['Departure', 'Return']}
        />
      </Space>
    </ConfigProvider>
  );
}

CustomDateRange.displayName = 'CustomDateRange';

export default memo(CustomDateRange);
