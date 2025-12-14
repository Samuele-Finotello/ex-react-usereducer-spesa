
function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  return (
    <>
      <div>
        <ul>
          {products.map(product => {
            return (
              <li>
                <span className="me-15">{product.name}</span>
                <span>€ {product.price}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default App
