import React from "react";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({ city, deleteCityHandler }) {
  const { emoji, cityName, date } = city;
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <span className={styles.name}>{cityName}</span>
      <span className={styles.date}>{formatDate(date)}</span>
      <button
        className={styles.deleteBtn}
        onClick={() => deleteCityHandler(city.id)}
      >
        &times;
      </button>
    </li>
  );
}
