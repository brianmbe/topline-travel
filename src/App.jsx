import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/product/Product";
import AppLayout from "./pages/appLayout/AppLayout";
import Pricing from "./pages/pricing/Pricing";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import HomePage from "./pages/home/HomePage";
import CityList from "./components/City/CityList";
import CountryList from "./components/Country/CountryList";
import { useEffect, useState } from "react";
import City from "./components/City/City";
import Form from "./components/Form/Form";

const BASE_URL = "http://localhost:8000";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        setCities(data);
      } catch {
        alert("There was an error while fetching the data from the server");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate to={"cities"} replace />} />
          <Route
            index
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="product" element={<Product />} />
        <Route path="price" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
