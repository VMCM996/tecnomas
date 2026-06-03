import { useState } from 'react'
import NavBar from './components/NavBar'
import ProductCard from './components/ProductCard'

function App() {

    const [cart, setCart] = useState(0)
    const equipos = [
    {
      id: 1,
      name: "PC Oficina Basica",
      specs: "Intel Core 2 Duo, 4GB de ram, 120GB SSD",
      price: 155
    },
    {
      id: 2,
      name: "PC Oficina Basica",
      specs: "AMD Ryzen 5, 16GB de RAM, 500GB NVME, GTX 1650",
      price: 155
    },
    {
      id: 3,
      name: "PC Oficina Basica",
      specs: "Intel Core 2 Duo, 4GB de ram, 120GB SSD",
      price: 255
    },
  ]

  const handleAgregarAlCarrito = () => {
    setCart(cart +1)
  }
  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white' }}>
      {/* Pasamos el estado actual al Navbar */}
      <NavBar cartCount={cart} /> 
      
      <main style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Catálogo de Equipos</h1>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {equipos.map((prod) => (
            <ProductCard 
              key={prod.id}
              name={prod.name}
              specs={prod.specs}
              price={prod.price}
              onAddToCart={handleAgregarAlCarrito} // <-- Pasamos la función a cada tarjeta
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App