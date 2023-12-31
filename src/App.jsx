import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
  function deleteCityHandler(id) {
    setCities((prev) => prev.filter((city) => city.id !== id));
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="product" element={<Product />}></Route>
          <Route path="pricing" element={<Pricing />}></Route>
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route
              path="cities"
              element={
                <CityList
                  cities={cities}
                  isLoading={isLoading}
                  deleteCityHandler={deleteCityHandler}
                />
              }
            />
            <Route path="cities/:id" element={<City />} />
            <Route
              path="countries"
              element={<CountryList isLoading={isLoading} cities={cities} />}
            />
            <Route path="form" element={<Form />}></Route>
          </Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
