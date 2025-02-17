import { memo, useCallback } from 'react';
import { useFlightClass, useRoundTrip } from '@hooks/useFlightSearch';
import SVG from '@assets/icons';
import { ROUND_TRIP, FLIGHT_CLASS } from '@utils/constraints';
import CustomSelect from '@components/CustomSelect';
import CustomDateRange from '@components/CustomDateRange';
import FlightSelect from '@components/FlightSelect';
import PassengersCounter from '@components/PassengersCounter';
import { Button } from 'antd';
import useSearch from '@hooks/useSearch';
import useFlightResults from '@hooks/useFlightResaults';

function SearchBox() {
  const { roundTrip, setRoundTrip } = useRoundTrip();
  const { flightClass, setFlightClass } = useFlightClass();
  const { searchFlights, isLoading } = useFlightResults();

  useSearch();

  const handleRoundTripChange = useCallback(
    (value: string) => {
      setRoundTrip(ROUND_TRIP.filter((i) => i.value === value)[0]);
    },
    [setRoundTrip]
  );

  const handleFlightClassChange = useCallback(
    (value: string) => {
      setFlightClass(FLIGHT_CLASS.filter((i) => i.value === value)[0]);
    },
    [setFlightClass]
  );

  const handleSearch = useCallback(async () => {
    await searchFlights();
  }, [searchFlights]);

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="rounded-xl bg-white/70 backdrop-blur-lg p-4 shadow-lg pb-13 relative">
        <div className="mb-6 flex gap-2">
          <div>
            <CustomSelect
              options={ROUND_TRIP}
              defaultValue={ROUND_TRIP[0]}
              value={roundTrip}
              prefix={<SVG id={roundTrip.icon} width="20" height="20" />}
              onChange={handleRoundTripChange}
            />
          </div>
          <div>
            <PassengersCounter />
          </div>
          <div>
            <CustomSelect
              options={FLIGHT_CLASS}
              defaultValue={FLIGHT_CLASS[0]}
              value={flightClass}
              onChange={handleFlightClassChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-[60%_40%] gap-4">
          <div className="">
            <div className="grid grid-cols-2 gap-3">
              <FlightSelect type="from" prefix={<SVG id="start-point" width="20" height="20" />} />
              <FlightSelect type="to" prefix={<SVG id="pointer" width="20" height="20" />} />
            </div>
          </div>
          <div className="pe-4">
            <CustomDateRange />
          </div>
        </div>
        <div className="mx-auto absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <Button
            loading={isLoading}
            disabled={isLoading}
            onClick={handleSearch}
            className="!rounded-full !py-6 !px-5 !hover:bg-blue-300 !bg-blue-500 !border-none text-black font-medium"
          >
            <SVG id="search" width="20" height="20" />
            <span className="text-lg">Search</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

SearchBox.displayName = 'SearchBox';

export default memo(SearchBox);
