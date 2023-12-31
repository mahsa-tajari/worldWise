import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({ city, deleteCityHandler }) {
  const { emoji, cityName, date, id, position } = city;
  return (
    <li>
      <Link
        className={styles.cityItem}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <span className={styles.name}>{cityName}</span>
        <span className={styles.date}>{formatDate(date)}</span>
        <button
          className={styles.deleteBtn}
          onClick={() => deleteCityHandler(id)}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}
