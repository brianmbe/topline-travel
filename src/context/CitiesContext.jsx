/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState();

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

  // Getting a single city data
  // http request to get a single city data
  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();

      setCurrentCity(data);
    } catch {
      alert("There was an error while fetching the data from the server");
    } finally {
      setIsLoading(false);
    }
  }

  // Adding a new city in the database
  async function createNewCity(newCity) {
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      console.log(data);
    } catch {
      alert("There was an error while creatign the new city........");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, createNewCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// Consuming the context
function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error(
      "Cities context is being used outside the cities provider context"
    );

  return context;
}

export { CitiesProvider, useCities };
