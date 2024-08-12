import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import { countryFlag } from "../City/CountryFlag";
import useUrlPosition from "../../hooks/useUrlPosition";
import Button from "../Button/Button";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";

import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../../context/CitiesContext";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function capitalizeNotes(notes) {
  if (!notes) return "";
  return notes.charAt(0).toUpperCase() + notes.slice(1);
}

function Form() {
  const { lat, lng } = useUrlPosition();
  const { createNewCity } = useCities();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryName, setCountryName] = useState(""); // State for full country name
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeoCoding(true);
        setGeoCodingError("");

        const res = await fetch(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();

        if (!data.countryCode) {
          throw new Error(
            "This does not seem to be a country 😒, Click somewhere else to load your city or province data on Worldwise!"
          );
        }

        setCityName(data.city || "");
        setCountry(data.countryCode || "");
        setCountryName(data.countryName || ""); // Set the full country name

        // Set default notes with localityInfo.administrative[1].description if it exists
        const defaultNotes =
          data.localityInfo?.administrative?.[1]?.description || "";
        setNotes(capitalizeNotes(defaultNotes)); // Capitalize notes before setting the state
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }

    fetchCityData();
  }, [lat, lng]);

  // Form Submission
  function handleFormSubmission(e) {
    e.preventDefault();

    if (!cityName || !date) {
      alert("City name and date are required!");
      return;
    }

    // const newCity = {
    //   cityName,
    //   country: countryName,
    //   emoji: country,
    //   date,
    //   notes,
    //   position: { lat, lng },
    // };

    // console.log(newCity);

    // Handle city creation logic here, e.g., createNewCity(newCity);

    navigate(-1); // Navigate back to the previous page
  }

  if (isLoadingGeoCoding) return <Spinner />;

  if (!lat && !lng)
    return (
      <Message
        message={"Start by clicking on the map to add your visited city"}
      />
    );

  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form className={styles.form} onSubmit={handleFormSubmission}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {cityName && (
          <span className={styles.flag}>
            <span>{countryFlag(country)}</span>
          </span>
        )}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) =>
            setDate(date ? date.toISOString().slice(0, 10) : "")
          }
          selected={date ? new Date(date) : null}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(capitalizeNotes(e.target.value))}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type={"back"}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
