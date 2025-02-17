import { memo } from 'react';
import type { PassengerCounterItemProps } from '@flights/types/passenger';
import Counter from '@components/Counter';

function PassengerCounterItem({
  passenger,
  passengers,
  onPassengerUpdate,
}: PassengerCounterItemProps) {
  return (
    <Counter
      key={passenger.type}
      text={passenger.text}
      description={passenger.description}
      value={passengers[passenger.type]}
      onIncrease={() => onPassengerUpdate(passenger.type, true)}
      onDecrease={() => onPassengerUpdate(passenger.type, false)}
      min={passenger.type === 'adults' ? 1 : 0}
      max={passenger.type === 'infants' ? passengers.adults : 9}
    />
  );
}

PassengerCounterItem.displayName = 'PassengerCounterItem';

export default memo(PassengerCounterItem);
