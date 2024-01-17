import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

async function getPizzas() {
  const res = await fetch(
    "https://pizzeria-api-17ekvx.a671fi.gbr-e1.cloudhub.io/api/pizzas"
  );
  // const res = await fetch("http://localhost:8081/api/pizzas");
  const pizzaData = await res.json();
  // console.log(pizzaData);
  return pizzaData;
}

const pizzas = await getPizzas();
console.log(pizzas);

function App() {
  return (
    <div className="container">
      <Header />
      <Menu pizzas={pizzas} />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>--Pizzeria Gon--</h1>
      <h2>Our Menu</h2>
      <p>
        Authentic italian cuisine by Gon. 6 creative dishes to dhoose from. All
        from our stone oven, all organic, all delicious.
      </p>
    </div>
  );
}

function Menu({ pizzas }) {
  return (
    <div className="pizzas-list">
      {pizzas.map((pizza) => (
        <Pizza
          name={pizza.name}
          ingredients={pizza.ingredients}
          price={pizza.price}
          photoName={pizza.photoName}
        />
      ))}
      {/* <Pizza
        name="Focaccia Gon"
        ingredients="Pane, olio e rosmarino"
        price="3"
        photoName="pizzas/focaccia.jpg"
      />
      <Pizza
        name="Pizza Spinaci"
        ingredients="Tomato, mozarella, spinach"
        price="10"
        photoName="pizzas/spinaci.jpg"
      /> */}
    </div>
  );
}

function Pizza({ name, ingredients, price, photoName }) {
  return (
    <div className="pizza">
      <img src={photoName} alt="Pizza Focaccia" />
      <div className="pizza-details">
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{price}</span>
      </div>
    </div>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  // if (hour >= openHour && hour <= closeHour) alert("We're currently open!");
  // else alert("Sorry, we're closed");

  return (
    <footer className="footer">
      {isOpen ? (
        <Order openHour={openHour} closeHour={closeHour} />
      ) : (
        <p>
          We're closed! We're happy to welcome you in between {openHour}:00 and{" "}
          {closeHour}:00
        </p>
      )}
    </footer>
  );
}

function Order({ openHour, closeHour }) {
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online
      </p>
      <button className="btn">Order Now</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
