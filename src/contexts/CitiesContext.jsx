import React, { createContext, useState, useEffect, useContext } from "react";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  const BASE_URL = "http://localhost:8000";
  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const req = await fetch(`${BASE_URL}/cities`);
        const res = await req.json();
        setCities(res);
      } catch {
        alert("There is an error loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const req = await fetch(`${BASE_URL}/cities/${id}`);
      const res = await req.json();
      setCurrentCity(res);
    } catch {
      alert("There is an error loading data");
    } finally {
      setIsLoading(false);
    }
  }

  function deleteCityHandler(id) {
    setCities((prev) => prev.filter((city) => city.id !== id));
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        useCities,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("You can't use it outside contextProvider");
  return context;
}
export { CitiesProvider, useCities };
