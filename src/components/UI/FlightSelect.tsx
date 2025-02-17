import type {
  FlightSelectProps,
  SearchApiResponse,
  SearchResult,
  Location,
} from "@/types/flight";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Select } from "antd";
import SVG from "@/assets/icons";
import { useLocations } from "@/hooks/useFlightSearch";
import { flightsApi } from "@/services/api/flights";
import { getUserLocation, transformLocations } from "@/utils/userLocation";

const FlightSelect: React.FC<FlightSelectProps> = memo(
  ({
    prefix = null,
    type,
    placeholder = type === "from" ? "Where from?" : "Where to?",
  }) => {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { fromLocation, setFromLocation, toLocation, setToLocation } =
      useLocations();
    const value = type === "from" ? fromLocation : toLocation;
    const setValue = type === "from" ? setFromLocation : setToLocation;

    useEffect(() => {
      if (type === "from") {
        getUserLocation().then((location) => {
          flightsApi.getNearByAirports(location).then((response: any) => {
            const resultResponse = response as SearchApiResponse;

            if (resultResponse.status) {
              const locationData = response.data as Location;
              if (locationData.current) {
                setValue({
                  skyId:
                    locationData.current.navigation.relevantFlightParams
                      .skyId || undefined,
                  entityId:
                    locationData.current.navigation.relevantFlightParams
                      .entityId || undefined,
                });
                const nearBy = transformLocations(locationData.nearby);
                setSearchResults([locationData.current, ...nearBy]);
              }
            }
          });
        });
      }
    }, []);

    const handleSearch = useCallback((value: string) => {
      setLoading(true);

      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      searchTimeout.current = setTimeout(() => {
        if (value && value.trim().length > 2) {
          flightsApi
            .searchAirports(value)
            .then((response: unknown) => {
              const searchResponse = response as SearchApiResponse;
              if (searchResponse.status) {
                setSearchResults(searchResponse.data);
              }
            })
            .catch((e) => {
              console.error("Search error:", e);
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          setSearchResults([]);
          setLoading(false);
        }
      }, 300);
    }, []);

    const options = searchResults.map((result) => ({
      value: JSON.stringify({ skyId: result.skyId, entityId: result.entityId }),
      label: (
        <div className="flex content-center justify-start py-2">
          <span className="px-3 p-2">
            {result.navigation.entityType === "AIRPORT" ? (
              <SVG id="plan" width="20" height="20" />
            ) : (
              <SVG id="pointer" width="20" height="20" />
            )}
          </span>
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">
              {result.presentation.suggestionTitle}
            </span>
            <span className="text-sm text-gray-500">
              {result.presentation.subtitle}
            </span>
          </div>
        </div>
      ),
      subLabel: result.presentation.subtitle,
    }));

    const handleChange = useCallback(
      (newValue: string) => {
        setValue(JSON.parse(newValue));
      },
      [setValue]
    );

    return (
      <div className="rounded-sm border border-gray-300 p-2 hover:border-blue-500 hover:shadow-md">
        <Select
          prefix={prefix}
          suffixIcon={null}
          showSearch
          placeholder={placeholder}
          value={JSON.stringify(value) || undefined}
          onChange={handleChange}
          onSearch={handleSearch}
          optionFilterProp="children"
          className="w-full !border-none"
          popupClassName="rounded-lg shadow-lg"
          dropdownStyle={{ padding: "8px" }}
          filterOption={false}
          options={options}
          loading={loading}
          notFoundContent={loading ? "Searching..." : "No results found"}
        />
      </div>
    );
  }
);

FlightSelect.displayName = "FlightSelect";

export default FlightSelect;
