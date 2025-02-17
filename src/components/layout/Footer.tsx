import React, { memo, useMemo } from "react";
import SVG from "@/assets/icons";
import { Spin } from "antd";
import CustomSelect from "../UI/CustomSelect";
import { useLocaleConfig } from "@/hooks/useLocaleConfig";

const Footer: React.FC = memo(() => {
  const {
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
  } = useLocaleConfig();

  // Prepare options with searchable text
  const countryOptions = useMemo(
    () =>
      countries.map((country) => ({
        value: country.value,
        label: country.label,
        searchText: `${country.label} ${country.value.split("__")[0]}`, // Include country code in search
      })),
    [countries]
  );

  const localeOptions = useMemo(
    () =>
      locales.map((locale) => ({
        value: locale.id,
        label: locale.text,
        searchText: `${locale.text} ${locale.id}`, // Include locale ID in search
      })),
    [locales]
  );

  const currencyOptions = useMemo(
    () =>
      currencies.map((currency) => ({
        value: currency.value,
        label: currency.label,
        searchText: `${currency.label} ${currency.value}`, // Include currency code in search
      })),
    [currencies]
  );

  if (loading) return <Spin />;
  if (error) return <div>Error loading configuration</div>;

  return (
    <footer className="fixed bottom-0 left-0 mt-auto bg-white/70 backdrop-blur-lg shadow-lg  shadow-gray-300 w-full">
      <div className="h-1 w-full bg-gradient-to-b from-gray-300 to-transparent"></div>
      <div className="container mx-auto px-4 py-6">
        <div className=" w-full">
          <div className="flex flex-wrap gap-4 justify-center items-center ">
            <div className="flex">
              <CustomSelect
                prefix={
                  <div className="flex">
                    <SVG id="global" width="20" height="20" />
                    <label>Country:</label>
                  </div>
                }
                value={{ value: selectedCountry, label: selectedCountry }}
                className="border-1 border-gray-300 rounded-full !p-4"
                onChange={updateCountry}
                options={countryOptions}
                showSearch
                placeholder="Search country..."
              />
            </div>
            <div>
              <CustomSelect
                prefix={
                  <div className="flex">
                    <SVG id="pointer" width="20" height="20" />
                    <label>Locale:</label>
                  </div>
                }
                value={{ value: selectedLocale, label: selectedLocale }}
                className="border-1 border-gray-300 rounded-full !p-4"
                onChange={updateLocale}
                options={localeOptions}
                showSearch
                placeholder="Search locale..."
              />
            </div>
            <div>
              <CustomSelect
                prefix={
                  <div className="flex">
                    <SVG id="currency" width="20" height="20" />
                    <label>Currency :</label>
                  </div>
                }
                value={{ value: selectedCurrency, label: selectedCurrency }}
                className="border-1 border-gray-300 rounded-full !p-4"
                onChange={updateCurrency}
                options={currencyOptions}
                showSearch
                placeholder="Search currency..."
              />
            </div>
          </div>

          <div className="flex gap-4">{/* Additional footer content */}</div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
