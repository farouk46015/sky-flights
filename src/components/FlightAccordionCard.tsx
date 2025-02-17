import type { FlightAccordionCardProps } from '@flights/types/flight';
import { Collapse } from 'antd';
import { Plane, Clock, ArrowRight, Users, Briefcase } from 'lucide-react';

function FlightAccordionCard({ itinerary }: FlightAccordionCardProps) {
  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getItems = () => {
    return itinerary.legs.map((leg) => ({
      key: leg.id,
      label: (
        <div className="w-full">
          <div className="flex justify-between items-center w-full py-2">
            <div className="flex items-center gap-4">
              <img src={leg.carriers.marketing[0].logoUrl} alt="Airline Logo" className="w-8 h-8" />
              <div>
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <span>{leg.origin.displayCode}</span>
                  <ArrowRight className="w-4 h-4 text-blue-500" />
                  <span>{leg.destination.displayCode}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {formatDateTime(leg.departure).split(',')[0]}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-sm font-medium">{formatDuration(leg.durationInMinutes)}</div>
              <div className="text-xs text-gray-500">
                {leg.stopCount === 0 ? 'Direct' : `${leg.stopCount} Stop`}
              </div>
            </div>

            <div className="text-xl font-bold text-blue-600">${itinerary.price.raw.toFixed(2)}</div>
          </div>
        </div>
      ),
      children: (
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
              <div>
                <div className="font-medium">Departure</div>
                <div className="text-lg">{formatDateTime(leg.departure)}</div>
                <div className="text-sm text-gray-600">{leg.origin.name}</div>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-5 h-5 text-blue-500 mb-1" />
                <div className="text-sm font-medium">{formatDuration(leg.durationInMinutes)}</div>
                <div className="flex items-center text-xs text-gray-500">
                  <Plane className="w-4 h-4 mx-1" />
                  {leg.stopCount === 0 ? 'Direct Flight' : `${leg.stopCount} Stop`}
                </div>
              </div>
              <div>
                <div className="font-medium text-right">Arrival</div>
                <div className="text-lg">{formatDateTime(leg.arrival)}</div>
                <div className="text-sm text-gray-600">{leg.destination.name}</div>
              </div>
            </div>

            {leg.segments.map((segment) => (
              <div key={segment.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Plane className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Flight {segment.flightNumber}</span>
                  <span className="text-sm text-gray-600">• {segment.marketingCarrier.name}</span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Departure</div>
                    <div className="font-medium">{formatDateTime(segment.departure)}</div>
                    <div className="text-sm">{segment.origin.name}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-medium">{formatDuration(segment.durationInMinutes)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Arrival</div>
                    <div className="font-medium">{formatDateTime(segment.arrival)}</div>
                    <div className="text-sm">{segment.destination.name}</div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Fare Conditions</span>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Changes:</span>
                      <span
                        className={
                          itinerary.farePolicy.isChangeAllowed ? 'text-green-600' : 'text-red-600'
                        }
                      >
                        {itinerary.farePolicy.isChangeAllowed ? 'Allowed' : 'Not allowed'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Cancellation:</span>
                      <span
                        className={
                          itinerary.farePolicy.isCancellationAllowed
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        {itinerary.farePolicy.isCancellationAllowed ? 'Allowed' : 'Not allowed'}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Price Details</span>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Fare:</span>
                      <span className="font-medium">${itinerary.price.raw.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    }));
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Collapse items={getItems()} className="bg-white rounded-lg shadow-md" />
    </div>
  );
}

export default FlightAccordionCard;
