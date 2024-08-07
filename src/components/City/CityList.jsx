/* eslint-disable react/prop-types */

import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";

export default function CityList({ cities, isLoading }) {
  if (isLoading) <Spinner />;

  if (!cities.length)
    return <Message message={"Add your first city by clicking on the map!"} />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
