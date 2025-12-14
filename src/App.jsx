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
    const addedProduct = addedProducts.find(p => p.name === product.name);
    if (addedProduct) {
      updateProductQuantity(addedProduct.name, addedProduct.quantity + 1)
      return;
    }
    setAddedProducts(curr => [...curr, {
      ...product,
      quantity: 1
    }])
  }

  function updateProductQuantity(name, quantity) {
    if (quantity < 1 || isNaN(quantity)) {
      return;
    }
    setAddedProducts(curr => curr.map(product => product.name === name ? { ...product, quantity } : product))
  }

  function removeFromCart(product) {
    setAddedProducts(curr => curr.filter(p => p.name !== product.name))
  }

  const total = addedProducts.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0)

  return (
    <>
      <div>
        <ul>
          {products.map((product, i) => {
            return (
              <li className="mb-15" key={i}>
                <span className="me-15">{product.name}</span>
                <span className="me-15">€ {(product.price).toFixed(2)}</span>
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
                  <span className="me-15">€ {(product.price).toFixed(2)}</span>
                  <span className="me-15"><input type="number" value={product.quantity} onChange={e => updateProductQuantity(product.name, parseInt(e.target.value))} /></span>
                  <button onClick={() => removeFromCart(product)}>Rimuovi dal carrello</button>
                </li>
              )
            })
          }
        </ul>
        <h2>Totale carrello: € {total.toFixed(2)}</h2>
      </div>
    </>
  )
}

export default App
