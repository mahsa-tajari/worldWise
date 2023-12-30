import React from "react";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
export default function CityList({ cities, isLoading }) {
  const countries = cities.reduce((arr, cur) => {
    if (!arr.map((el) => el.city).includes(cur.country))
      return [...arr, { country: cur.country, emoji: cur.emoji }];
    else return arr;
  }, []);

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message={"Add a city by clicking on a city on the map!"} />;
  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}
