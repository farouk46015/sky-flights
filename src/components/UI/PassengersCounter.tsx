import type { PassengerType } from "@/types/Passenger";

import React, { useState, useCallback, memo } from "react";
import { Dropdown, Button, InputNumber, message } from "antd";
import SVG from "@/assets/icons";
import Counter from "./Counter";
import { PASSENGERS } from "@/utils/constraints";
import { usePassengers } from "@/hooks/usePassengers";

const PassengersCounter: React.FC = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const { passengers, updatePassenger, totalPassengers } = usePassengers();

  const handlePassengerUpdate = useCallback(
    (type: PassengerType["type"], increment: boolean) => {
      const result = updatePassenger(type, increment);
      if (!result.isValid && result.message) {
        message.warning(result.message);
      }
    },
    [updatePassenger]
  );

  const renderCounter = useCallback(
    (passenger: PassengerType) => (
      <Counter
        key={passenger.type}
        text={passenger.text}
        description={passenger.description}
        value={passengers[passenger.type]}
        onIncrease={() => handlePassengerUpdate(passenger.type, true)}
        onDecrease={() => handlePassengerUpdate(passenger.type, false)}
        min={passenger.type === "adults" ? 1 : 0}
        max={passenger.type === "infants" ? passengers.adults : 9}
      />
    ),
    [passengers, handlePassengerUpdate]
  );

  return (
    <div>
      <Dropdown
        className="!border-none"
        open={isOpen}
        dropdownRender={() => (
          <div className="bg-white/70 backdrop-blur-lg p-4 shadow-lg rounded-sm">
            {PASSENGERS.map(renderCounter)}
          </div>
        )}
        onOpenChange={setIsOpen}
      >
        <Button aria-label={`Select passengers (${totalPassengers} selected)`}>
          <div className="flex items-center !border-none">
            <SVG id="person" width="20" height="20" />
            <InputNumber
              disabled
              aria-label="Total passengers"
              className="!border-none !mx-3 !w-8 text-center !bg-transparent !disabled:bg-transparent"
              value={totalPassengers}
            />
            <i
              className={`${isOpen ? "icon-up-dir" : "icon-down-dir"} text-lg`}
            />
          </div>
        </Button>
      </Dropdown>
    </div>
  );
});

PassengersCounter.displayName = "PassengersCounter";

export default PassengersCounter;
