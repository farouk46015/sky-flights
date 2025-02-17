import React from "react";
import FlightAccordionCard from "./UI/FlightAccordionCard";
import { useFlightResults } from "@/context/FlightResultsContext";

const FlightList: React.FC = () => {
  const { result } = useFlightResults();

  return (
    <div className="p-4 max-w-6xl mx-auto mb-20">
      <div>
        {result?.itineraries.length ? (
          result?.itineraries.map((itinerary) => (
            <FlightAccordionCard key={itinerary.id} itinerary={itinerary} />
          ))
        ) : (
          <div>
            <div className="text-lg text-center">No Flights Found</div>
            <img
              src={result?.destinationImageUrl}
              className="w-[40vw] mx-auto mt-3 rounded-md"
            />
          </div>
        )}
      </div>
      <div className="mb-4 text-sm text-gray-600">
        Total Results Found: {result?.context.totalResults}
      </div>
    </div>
  );
};

export default FlightList;
