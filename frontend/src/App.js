// Talia BarZohar 318257060
// Sagi stav  316584622
// Noa danino 324012277
import { useEffect, useState } from "react";
import "./App.css";
import Products from "./pages/Products";
import ResponsiveAppBar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  //The division of products into categories
  const [kitchen, setKitchen] = useState([]);
  const [livingRoom, setLivingRoom] = useState([]);
  const [batRoom, setBatRoom] = useState([]);
  const [bedRoom, setBedRoom] = useState([]);

  const [cartList, setcartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  //Call to API and give the data
  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:5000/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setKitchen(data.filter((item) => item.Category === "Kitchen"));
          setLivingRoom(data.filter((item) => item.Category === "LIVING ROOM"));
          setBatRoom(data.filter((item) => item.Category === "BATHROOM"));
          setBedRoom(data.filter((item) => item.Category === "BEDROOM"));
        });
    };
    fetchData();
  }, []);

  // addToCart function
  const addToCart = (item) => {
    const itemIsFound = cartList.find((product) => item.id === product.id);
    //If the product exist add 1 to amount
    if (itemIsFound) {
      setcartList(
        cartList.map(
          (product) =>
            item.id === product.id
              ? {
                  ...itemIsFound, //... Copy the content
                  amount: itemIsFound.amount + 1, //Add 1 to amount
                  price: item.price + product.price, //Add to the previous price
                }
              : product //Do not update the products that we have not changed
        )
      );
    } else {
      //If the product is not exist add the new product to cart
      const new_item = {
        id: item.id,
        name: item.name,
        image: item.image,
        amount: 1, //The default amount of product will be 1
        price: item.price,
      };
      setcartList([...cartList, new_item]); //...cartList say Copy the previous content of the array and new_item - Add the new mor to the array
    }
    console.log(cartList);
    setTotalPrice(totalPrice + item.price); //Update the total price
  };

  //removeItemFromCart function
  const removeItemFromCart = (item, porpose) => {
    const itemIsFound = cartList.find((product) => item.id === product.id);
    //amount=1 say remov 1 item from cart or removeAll say remov all items
    if (itemIsFound.amount === 1 || porpose === "removeAll") {
      //If i want to remov the all items from cart
      const items = cartList.filter((product) => item.id !== product.id); //if item.id equal product.id remov the product from the cart
      setcartList(items); // take the current array and insert it to cartList array
      setTotalPrice(totalPrice - itemIsFound.price); //Update the price
    } else {
      //If i want to remove just 1 item from cart
      setcartList(
        cartList.map((product) =>
          item.id === product.id
            ? {
                ...itemIsFound,
                amount: itemIsFound.amount - 1,
                price: product.price - item.price,
              }
            : product
        )
      );
      setTotalPrice(totalPrice - item.price);
    }
  };
  return (
    <>
      {/* In-app routing */}
      <Router>
        {/* The bar will appear in all routings */}
        <ResponsiveAppBar
          cartList={cartList}
          addToCart={addToCart}
          removeItemFromCart={removeItemFromCart}
          totalPrice={totalPrice}
        />
        {/* In-app routing */}
        <Routes>
          {/* specific routing */}
          {/* The first line is deductive routing */}
          <Route
            path="/"
            element={<Products items={products} addToCart={addToCart} />}
          />
          <Route
            path="living-room"
            element={<Products items={livingRoom} addToCart={addToCart} />}
          />
          <Route
            path="bathroom"
            element={<Products items={batRoom} addToCart={addToCart} />}
          />
          <Route
            path="bedroom"
            element={<Products items={bedRoom} addToCart={addToCart} />}
          />
          <Route
            path="kitchen"
            element={<Products items={kitchen} addToCart={addToCart} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
