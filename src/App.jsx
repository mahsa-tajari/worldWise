import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import "./App.css";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";

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
            <Route index element={<p>List</p>} />
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
            <Route
              path="countries"
              element={<CountryList isLoading={isLoading} cities={cities} />}
            />
          </Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
