import { useState, useCallback, useMemo, memo } from 'react';
import { Dropdown, Button, InputNumber, message } from 'antd';
import type { PassengerType } from '@flights/types/passenger';
import SVG from '@assets/icons';
import { usePassengers } from '@hooks/usePassengers';
import PassengerCounterDropdown from './PassengerCounterDropdown';

function PassengersCounter() {
  const [isOpen, setIsOpen] = useState(false);
  const { passengers, updatePassenger, totalPassengers } = usePassengers();

  const handlePassengerUpdate = useCallback(
    (type: PassengerType['type'], increment: boolean) => {
      const result = updatePassenger(type, increment);
      if (!result.isValid && result.message) {
        message.warning(result.message);
      }
    },
    [updatePassenger]
  );

  const dropdownContent = useMemo(
    () => (
      <PassengerCounterDropdown passengers={passengers} onPassengerUpdate={handlePassengerUpdate} />
    ),
    [passengers, handlePassengerUpdate]
  );

  return (
    <div>
      <Dropdown
        className="!border-none"
        open={isOpen}
        dropdownRender={() => dropdownContent}
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
            <i className={`${isOpen ? 'icon-up-dir' : 'icon-down-dir'} text-lg`} />
          </div>
        </Button>
      </Dropdown>
    </div>
  );
}

PassengersCounter.displayName = 'PassengersCounter';

export default memo(PassengersCounter);
