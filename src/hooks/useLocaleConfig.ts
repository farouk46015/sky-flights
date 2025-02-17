import { useState, useEffect } from "react";
import { mainApi } from "@/services/api/main";

interface Currency {
  label: string;
  value: string;
}
interface Country {
  label: string;
  value: string;
}

interface LocaleConfig {
  locales: Array<Locale>;
  currencies: Array<Currency>;
  countries: Array<Country>;
  loading: boolean;
  error: Error | null;
  selectedLocale: string;
  selectedCurrency: string;
  selectedCountry: string;
  updateLocale: (locale: string) => void;
  updateCurrency: (currency: string) => void;
  updateCountry: (country: string) => void;
}

interface ConfigData {
  country: string;
  countryCode: string;
  market: string;
  currencyTitle: string;
  currency: string;
  currencySymbol: string;
  site: string;
}

interface ConfigResponse {
  status: boolean;
  message: string;
  timestamp: number;
  data: Array<ConfigData>;
}

interface Locale {
  text: string;
  id: string;
}

interface LocaleResponse {
  status: boolean;
  message: string;
  timestamp: number;
  data: Array<Locale>;
}

export const useLocaleConfig = (): LocaleConfig => {
  const [locales, setLocales] = useState<Locale[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [selectedLocale, setSelectedLocale] = useState(
    () => localStorage.getItem("userLocale") || "en-US"
  );

  const [selectedCurrency, setSelectedCurrency] = useState(
    () => localStorage.getItem("userCurrency") || "USD"
  );

  const [selectedCountry, setSelectedCountry] = useState(
    () => localStorage.getItem("userCountry") || "US__en-US"
  );

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const cachedLocales = localStorage.getItem("cachedLocales");
        const cachedConfig = localStorage.getItem("cachedConfig");
        const cacheTimestamp = localStorage.getItem("configCacheTimestamp");

        const isCacheValid =
          cacheTimestamp &&
          Date.now() - parseInt(cacheTimestamp) < 24 * 60 * 60 * 1000;

        if (
          isCacheValid &&
          cachedLocales &&
          cachedConfig &&
          cachedLocales != "undefined" &&
          cachedConfig != "undefined"
        ) {
          setLocales(JSON.parse(cachedLocales));
          const configs = JSON.parse(cachedConfig);
          const currenciesList = configs.map((i: any) => ({
            label: i.currency,
            value: i.currency,
          }));
          const countriesList = configs.map((i: any) => ({
            label: i.country,
            value: `${i.countryCode}__${i.market}`,
          }));
          setCurrencies(currenciesList);
          setCountries(countriesList);
          setLoading(false);
          return;
        }

        const [localeResponse, configResponse] = (await Promise.all([
          mainApi.getLocale(),
          mainApi.getConfig(),
        ])) as [LocaleResponse, ConfigResponse];

        if (localeResponse.status && configResponse.status) {
          setLocales(localeResponse.data);
          const currenciesList = configResponse.data.map((i) => ({
            label: i.currency,
            value: i.currency,
          }));
          const countriesList = configResponse.data.map((i) => ({
            label: i.country,
            value: `${i.countryCode}__${i.market}`,
          }));
          setCurrencies(currenciesList);
          setCountries(countriesList);

          localStorage.setItem(
            "cachedLocales",
            JSON.stringify(localeResponse.data)
          );
          localStorage.setItem(
            "cachedConfig",
            JSON.stringify(configResponse.data)
          );
          localStorage.setItem("configCacheTimestamp", Date.now().toString());
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const updateLocale = (locale: string) => {
    setSelectedLocale(locale);
    localStorage.setItem("userLocale", locale);
  };

  const updateCurrency = (currency: string) => {
    setSelectedCurrency(currency);
    localStorage.setItem("userCurrency", currency);
  };

  const updateCountry = (country: string) => {
    setSelectedCountry(country);
    localStorage.setItem("userCountry", country);
  };

  return {
    locales,
    currencies,
    countries,
    loading,
    error,
    selectedLocale,
    selectedCurrency,
    selectedCountry,
    updateLocale,
    updateCurrency,
    updateCountry,
  };
};
