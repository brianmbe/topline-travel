import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Product from "./pages/product/Product";
import AppLayout from "./pages/appLayout/AppLayout";
import Pricing from "./pages/pricing/Pricing";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import HomePage from "./pages/home/HomePage";
import CityList from "./components/City/CityList";
import CountryList from "./components/Country/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";
import { CitiesProvider } from "./context/CitiesContext";

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate to={"cities"} replace />} />
            <Route index path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="product" element={<Product />} />
          <Route path="price" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
