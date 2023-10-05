// Talia BarZohar 318257060
// Sagi stav  316584622
// Noa danino 324012277
import React, { useState, useEffect } from "react";
import "./Cart.css";

//Cart function
function Cart(props) {
  return (
    <div
      class="offcanvas offcanvas-end cart-continer"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Cart</h5>

        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        {props.cartList.length === 0 ? (
          <div> Cart is Empty</div>
        ) : (
          props.cartList.map((item) =>
            Show_Items(item, props.addToCart, props.removeItemFromCart)
          )
        )}
        {props.cartList.length === 0 ? (
          <div></div>
        ) : (
          <div className="total-wrapper">
            <div className="total-title">Total</div>
            <div>{props.totalPrice}$</div>
            <button className="btn btn-outline-light">Payment</button>
          </div>
        )}
      </div>
    </div>
  );
}
//Show_Items function - include addToCart and removeItemFromCart
function Show_Items(item, addToCart, removeItemFromCart) {
  return (
    <div className="CartItem-container">
      <img className="CartItem-Img" src={item.image} alt={item.name} />
      <div className="CartItem-name"> {item.name}</div>
      <div className="CartItem-price"> {item.price}</div>
      <div className="amount-container">
        <button
          className="Plus-Minus-btn btn"
          onClick={() => {
            const new_item = {
              id: item.id,
              name: item.name,
              image: item.image,
              amount: 1,
              price: item.price / item.amount,
            };
            removeItemFromCart(new_item, "minus");
          }}
        >
          <i class="fa-solid fa-minus"></i>
        </button>
        {item.amount}
        <button
          className="Plus-Minus-btn btn"
          onClick={() => {
            const new_item = {
              id: item.id,
              name: item.name,
              image: item.image,
              amount: 1,
              price: item.price / item.amount,
            };
            addToCart(new_item);
          }}
        >
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
      <button
        className="Remove_All"
        onClick={() => {
          removeItemFromCart(item, "removeAll");
        }}
      >
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  );
}

export default Cart;
