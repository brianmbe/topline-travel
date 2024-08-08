/* eslint-disable react/prop-types */
import styles from "./CountryList.module.css";

import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import CountryItem from "./CountryItem";
import { useCities } from "../../context/CitiesContext";

export default function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message={"Add your first city by clicking on the map!"} />;

  // Unique countries from the cities
  const countries = cities.reduce((arr, city) => {
    if (!arr.some((el) => el.country === city.country)) {
      arr.push({ country: city.country, emoji: city.emoji });
    }
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}
