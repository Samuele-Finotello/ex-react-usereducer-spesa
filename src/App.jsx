import { useReducer } from "react";

function App() {

  const [cartProducts, dispatchCartProducts] = useReducer(cartReducer, [])

  function cartReducer(addedProducts, action) {
    switch (action.type) {
      case 'ADD_TO_CART':
        const addedProduct = addedProducts.find(p => p.name === action.payload.name);
        if (addedProduct) {
          action.payload.quantity = addedProduct.quantity + 1;
        }
        else {
          return [...addedProducts, {
            ...action.payload,
            quantity: 1
          }]
        }
      case 'UPDATE_QUANTITY':
        if (action.payload.quantity < 1 || isNaN(action.payload.quantity)) {
          return addedProducts;
        }
        return addedProducts.map(product => product.name === action.payload.name ? { ...product, quantity: action.payload.quantity } : product)
      case 'REMOVE_FROM_CART':
        return addedProducts.filter(product => product.name !== action.payload)
    }
  }

  console.log(cartProducts)

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const total = cartProducts.reduce((acc, product) => {
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
                <button onClick={() => dispatchCartProducts({ type: 'ADD_TO_CART', payload: product })}>Aggiungi al carrello</button>
              </li>
            )
          })}
        </ul>
        <h2>Carrello:</h2>
        <ul>
          {cartProducts.length === 0 ? 'Carrello vuoto' :
            cartProducts.map((product, i) => {
              return (
                <li className="mb-15" key={i}>
                  <span className="me-15">{product.name}</span>
                  <span className="me-15">€ {(product.price).toFixed(2)}</span>
                  <span className="me-15"><input type="number" value={product.quantity} onChange={e => dispatchCartProducts({ type: 'UPDATE_QUANTITY', payload: { name: product.name, quantity: parseInt(e.target.value) } })} /></span>
                  <button onClick={() => dispatchCartProducts({ type: 'REMOVE_FROM_CART', payload: product.name })}>Rimuovi dal carrello</button>
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
