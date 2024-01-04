import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useGetParams } from "../hooks/useGetParams";

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
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const url = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  useEffect(function () {
    async function fetchData() {
      try {
        setFetchCityLoading(true);
        const res = await fetch(`${url}?latitude=${lat}&longitude=${lng}`);
        const result = await res.json();
        console.log(result);
      } catch (error) {
        throw new Error(error);
      } finally {
        setFetchCityLoading(false);
      }
    }
    fetchData();
    return function () {};
  }, []);
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
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
