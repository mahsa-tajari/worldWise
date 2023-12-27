import React from "react";
import { NavLink } from "react-router-dom";
export default function Product() {
  return (
    <div>
      <h1>Product</h1>
      <NavLink to="/pricing">Pricing</NavLink>
    </div>
  );
}
