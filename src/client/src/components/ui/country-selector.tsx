import React, { createContext, useState, useContext } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const CountryRegionContext = createContext({
  country: "",
  region: "",
  setCountry: (country: string) => {},
  setRegion: (region: string) => {},
});

function useCountryRegion() {
  return useContext(CountryRegionContext);
}

interface SelectorProps {
  className?: string;
}

export function CountrySelector({ className }: SelectorProps) {
  const { country, setCountry, setRegion } = useCountryRegion();

  const handleCountryChange = (val: string) => {
    setCountry(val);
    setRegion("");
  };
  return (
    <CountryDropdown
      value={country}
      onChange={handleCountryChange}
      className={className}
      priorityOptions={["All Countries"]}
      defaultOptionLabel="All Countries"
    />
  );
}

export function RegionSelector({ className }: SelectorProps) {
  const { country, region, setRegion } = useCountryRegion();

  return (
    <RegionDropdown
      country={country}
      value={region}
      onChange={setRegion}
      className={className}
      defaultOptionLabel="All Regions"
      blankOptionLabel="All Regions"
    />
  );
}

export function CountryRegionProvider(
  { children }: { children: React.ReactNode },
) {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  return (
    <CountryRegionContext.Provider
      value={{ country, region, setCountry, setRegion }}
    >
      {children}
    </CountryRegionContext.Provider>
  );
}
