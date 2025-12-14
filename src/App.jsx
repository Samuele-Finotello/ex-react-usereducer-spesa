import { useState } from "react";

function App() {

  const [addedProducts, setAddedProducts] = useState([])

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  function addToCart(product) {
    if (addedProducts.some(p => p.name === product.name)) return;
    const productToAdd = {
      ...product,
      quantity: 1
    }
    setAddedProducts(curr => [...curr, productToAdd])
  }

  return (
    <>
      <div>
        <ul>
          {products.map((product, i) => {
            return (
              <li className="mb-15" key={i}>
                <span className="me-15">{product.name}</span>
                <span className="me-15">€ {product.price}</span>
                <button onClick={() => addToCart(product)}>Aggiungi al carrello</button>
              </li>
            )
          })}
        </ul>
        <h2>Carrello:</h2>
        <ul>
          {addedProducts.length === 0 ? 'Carrello vuoto' :
            addedProducts.map((product, i) => {
              return (
                <li className="mb-15" key={i}>
                  <span className="me-15">{product.name}</span>
                  <span className="me-15">€ {product.price}</span>
                  <span>Quantity: {product.quantity}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
    </>
  )
}

export default App
