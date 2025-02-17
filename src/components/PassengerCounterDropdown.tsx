import { memo } from 'react';
import type { PassengerCounterDropdownProps } from '@flights/types/components';
import { PASSENGERS } from '@utils/constraints';
import PassengerCounterItem from './PassengerCounterItem';

function PassengerCounterDropdown({
  passengers,
  onPassengerUpdate,
}: PassengerCounterDropdownProps) {
  return (
    <div className="bg-white/70 backdrop-blur-lg p-4 shadow-lg rounded-sm">
      {PASSENGERS.map((passenger) => (
        <PassengerCounterItem
          key={passenger.type}
          passenger={passenger}
          passengers={passengers}
          onPassengerUpdate={onPassengerUpdate}
        />
      ))}
    </div>
  );
}

PassengerCounterDropdown.displayName = 'PassengerCounterDropdown';

export default memo(PassengerCounterDropdown);
