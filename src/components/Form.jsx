import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useGetParams } from "../hooks/useGetParams";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
function Form() {
  const [fetchCityLoading, setFetchCityLoading] = useState(false);
  const [lat, lng] = useGetParams();
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geoCodingErr, setGeoCodingErr] = useState(null);
  const { addNewCity, isLoading } = useCities();
  const navigate = useNavigate();

  const url = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchData() {
        try {
          setFetchCityLoading(true);
          setGeoCodingErr("");
          const res = await fetch(`${url}?latitude=${lat}&longitude=${lng}`);
          const result = await res.json();

          if (!result.countryCode)
            throw new Error(
              "Doesn't seem to be a city. Please click somewhere else!"
            );

          setCityName(result.city || result.locality || "");
          setCountryName(result.countryName);
          setEmoji(convertToEmoji(result.countryCode));
        } catch (error) {
          setGeoCodingErr(error.message);
        } finally {
          setFetchCityLoading(false);
        }
      }
      fetchData();
    },
    [lat, lng]
  );

  async function addNewCityHandler(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      id: new Date().getSeconds(),
      cityName,
      country: countryName,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await addNewCity(newCity);
    navigate("/app/cities");
  }

  if (fetchCityLoading) return <Spinner />;
  if (!lat && !lng)
    return <Message message={"Start by clicking somewhere on the map."} />;
  if (geoCodingErr) return <Message message={geoCodingErr} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={addNewCityHandler}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <ReactDatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
