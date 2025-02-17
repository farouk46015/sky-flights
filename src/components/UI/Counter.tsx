import React, { memo } from "react";
import { Button, Tooltip } from "antd";
import type { PassengerType } from "@/types/Passenger";

interface CounterProps extends Omit<PassengerType, "type"> {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

const Counter: React.FC<CounterProps> = memo(
  ({ text, description, value, onIncrease, onDecrease, min = 0, max = 9 }) => {
    const isMinDisabled = value <= min;
    const isMaxDisabled = value >= max;

    return (
      <div className="flex items-center justify-between py-3">
        <div>
          <p className="font-medium">{text}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="flex items-center gap-3">
          <Tooltip title={isMinDisabled ? `Minimum ${text} is ${min}` : ""}>
            <span>
              <Button
                disabled={isMinDisabled}
                onClick={onDecrease}
                aria-label={`Decrease ${text}`}
                className="flex h-8 w-8 items-center justify-center rounded-full"
              >
                -
              </Button>
            </span>
          </Tooltip>
          <span className="w-4 text-center">{value}</span>
          <Tooltip title={isMaxDisabled ? `Maximum ${text} is ${max}` : ""}>
            <span>
              <Button
                disabled={isMaxDisabled}
                onClick={onIncrease}
                aria-label={`Increase ${text}`}
                className="flex h-8 w-8 items-center justify-center rounded-full"
              >
                +
              </Button>
            </span>
          </Tooltip>
        </div>
      </div>
    );
  }
);

Counter.displayName = "Counter";

export default Counter;
