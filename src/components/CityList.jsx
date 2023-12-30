import React from "react";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
export default function CityList({ cities, isLoading, deleteCityHandler }) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message={"Add a city by clicking on a city on the map!"} />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem
          city={city}
          key={city.id}
          deleteCityHandler={deleteCityHandler}
        />
      ))}
    </ul>
  );
}
