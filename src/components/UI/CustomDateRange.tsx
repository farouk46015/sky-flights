import type { DatePickerProps } from "antd";
import type {
  CalendarSearchParams,
  CustomDateRangeProps,
  FlightGroup,
  FlightDay,
  FlightsData,
  FlightResponse,
} from "@/types/flight";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { DatePicker, Space, ConfigProvider, theme, Tooltip } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import "dayjs/locale/en";
import locale from "antd/es/date-picker/locale/en_US";
import SVG from "@/assets/icons";
import { useDateRange, useLocations } from "@/hooks/useFlightSearch";
import { flightsApi } from "@/services/api/flights";
import { formatDate } from "@/utils/date";
import { validateCalanderSearchParams } from "@/utils/validation";

const { RangePicker } = DatePicker;

const CustomDateRange: React.FC<CustomDateRangeProps> = memo(
  ({ datePrices = [], currency = "USD" }) => {
    const [datePrice, setDatePrice] = useState<FlightDay[]>([]);
    const [priceCurrency, setPriceCurrency] = useState("USD");
    const { token } = theme.useToken();
    const { dateRange, setDateRange } = useDateRange();
    const { fromLocation, toLocation } = useLocations();

    useEffect(() => {
      const searchParams: CalendarSearchParams = {
        originSkyId: fromLocation?.skyId,
        destinationSkyId: toLocation?.skyId,
        fromDate: dateRange[0] ? formatDate(dateRange[0]) : "",
      };
      const getPriceCalendar = async () => {
        if (!validateCalanderSearchParams(searchParams)) {
          return;
        }
        try {
          const response = (await flightsApi.getPriceCalendar(
            searchParams
          )) as FlightResponse;
          if (
            response.status &&
            response.data.flights &&
            response.data.flights.days.length > 0
          ) {
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

    const priceMap = useMemo(() => {
      return datePrice.reduce((acc, { day, price, group }) => {
        acc[day] = { price, group };
        return acc;
      }, {} as Record<string, { price: number; group: string }>);
    }, [datePrice]);

    const getPriceColor = useCallback((group: string) => {
      switch (group) {
        case "low":
          return "#4CAF50";
        case "medium":
          return "#FF9800";
        case "high":
          return "#F44336";
        default:
          return "#666";
      }
    }, []);

    const formatPrice = useCallback(
      (price: number) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(price);
      },
      [currency]
    );

    const cellRender: DatePickerProps<Dayjs>["cellRender"] = useCallback(
      (current, info) => {
        if (info.type !== "date") return info.originNode;

        const dateStr = current.format("YYYY-MM-DD");
        const priceInfo = priceMap[dateStr];
        const isSelected = dateRange.some(
          (date) =>
            date && dayjs.isDayjs(current) && current.isSame(date, "day")
        );

        const cellContent = (
          <div
            className={`flex flex-col items-center justify-center p-1 ${
              isSelected ? "bg-blue-500/10 text-gray-800 rounded-full" : ""
            }`}
          >
            <span className="text-base">{current.date()}</span>
            {priceInfo && (
              <span
                className="text-xs mt-1"
                style={{
                  color: isSelected ? "white" : getPriceColor(priceInfo.group),
                }}
              >
                {formatPrice(priceInfo.price)}
              </span>
            )}
          </div>
        );

        return priceInfo ? (
          <Tooltip
            title={`${formatPrice(
              priceInfo.price
            )} - ${priceInfo.group.toUpperCase()}`}
          >
            {cellContent}
          </Tooltip>
        ) : (
          cellContent
        );
      },
      [dateRange, priceMap, getPriceColor, formatPrice]
    );

    const handleDateChange = useCallback(
      (values: any) => {
        if (values) {
          const [start, end] = values;
          if (!end) {
            setDateRange([start.toDate(), null]);
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
            colorPrimary: "#1a73e8",
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
            placeholder={["Departure", "Return"]}
          />
        </Space>
      </ConfigProvider>
    );
  }
);

CustomDateRange.displayName = "CustomDateRange";

export default CustomDateRange;
