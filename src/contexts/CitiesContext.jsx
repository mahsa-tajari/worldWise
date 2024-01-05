import React, { createContext, useEffect, useContext, useReducer } from "react";
const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
  }
}
function CitiesProvider({ children }) {
  const [{ cities, error, currentCity, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchData() {
      dispatch({ type: "loading" });
      try {
        const req = await fetch(`${BASE_URL}/cities`);
        const res = await req.json();
        dispatch({ type: "cities/loaded", payload: res });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There is an error loading data",
        });
      }
    }
    fetchData();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const req = await fetch(`${BASE_URL}/cities/${id}`);
      const res = await req.json();
      dispatch({ type: "city/loaded", payload: res });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There is an error loading data",
      });
    }
  }

  async function deleteCityHandler(id) {
    dispatch({ type: "loading" });
    try {
      const req = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There is an error deleting data",
      });
    }
  }
  async function addNewCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const req = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = req.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      alert("There is an error sending data");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        useCities,
        addNewCity,
        deleteCityHandler,
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
