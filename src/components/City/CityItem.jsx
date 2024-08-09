/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { formatDate } from "./formatDate";
import { useCities } from "../../context/CitiesContext";
import { countryFlag } from "./CountryFlag";

export default function CityItem({ city }) {
  const { currentCity } = useCities();
  const { emoji, cityName, date, id, position } = city;

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity && id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span>{countryFlag(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
