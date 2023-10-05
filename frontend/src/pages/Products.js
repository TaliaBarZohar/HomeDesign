// Talia BarZohar 318257060
// Sagi stav  316584622
// Noa danino 324012277
import React from "react";
import Card from "../components/Card";
import "./Products.css";

// Products function
function Products(props) {
  return (
    <div className="products-container">
      <div className="products-wrapper">
        {props.items.map((item) => {
          return <Card item={item} key={item.id} addToCart={props.addToCart} />;
        })}
      </div>
    </div>
  );
}
export default Products;
