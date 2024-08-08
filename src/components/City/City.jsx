import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../../context/CitiesContext";
import { useEffect } from "react";
import { formatDate } from "./formatDate";
import Spinner from "../Spinner/Spinner";
import Backbutton from "../Button/Backbutton";

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(() => {
    getCity(id);
  }, [id]);

  if (isLoading) return <Spinner />;
  if (!currentCity) return <p>No city data found</p>;

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>
          You went to {cityName} on {formatDate(date)}
        </h6>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Backbutton />
      </div>
    </div>
  );
}

export default City;
