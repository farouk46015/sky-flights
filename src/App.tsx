import { useEffect } from "react";
import SearchBox from "@/components/SearchBox";
import FlightList from "./components/FlightList";
import { SearchProvider } from "./context/SearchContext";
import { FlightResultsProvider } from "./context/FlightResultsContext";
import { getDefaultCurrency, getDefaultLocale } from "./utils/userLocation";
import Layout from "./components/layout";

function App() {
  useEffect(() => {
    const fetchLocaleAndCurrency = async () => {
      try {
        const locale = await getDefaultLocale();
        localStorage.setItem("userLocale", locale);

        const currency = await getDefaultCurrency();
        localStorage.setItem("userCurrency", currency);

        console.log("Stored Locale:", locale);
        console.log("Stored Currency:", currency);
      } catch (error) {
        console.error("Error setting locale and currency:", error);
      }
    };

    fetchLocaleAndCurrency();
  }, []);

  return (
    <Layout>
      <div className="">
        <div className="p-20">
          <div>
            <h1 className="text-center text-5xl">Flights</h1>
          </div>
          <SearchProvider>
            <FlightResultsProvider>
              <SearchBox />
              <FlightList />
            </FlightResultsProvider>
          </SearchProvider>
        </div>
      </div>
    </Layout>
  );
}

export default App;
