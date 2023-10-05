// Talia BarZohar 318257060
// Sagi stav  316584622
// Noa danino 324012277
import React from "react";
import "./Card.css";

// Card component
function Card(props) {
  return (
    <div className="card">
      <img
        src={props.item.image}
        alt="item"
        className="card-img-top product_img"
      />
      <div className="card-body">
        <h5 className="card-title">name: {props.item.name} </h5>
        <p className="card-text">Price: {props.item.price}</p>
        <p className="card-text">Category: {props.item.Category}</p>
        {/* button- addToCart */}
        <button
          className="button-1"
          role="button"
          onClick={() => {
            props.addToCart(props.item);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Card;
