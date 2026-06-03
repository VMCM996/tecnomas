import { useState } from 'react'
import NavBar from './components/NavBar'
import ProductCard from './components/ProductCard'
import bgImage from './assets/background.png'
import imgOficina from './assets/pc-oficina.png'
import imgGaming from './assets/pc-gaming.png'
import imgPro from './assets/pc-pro.png'

function App() {

    const [cart, setCart] = useState(0)
    const equipos = [
  { id: 1, name: "PC Oficina Básica", specs: "Intel Core 2 Duo, 4GB de ram, 120GB SSD", price: 155, img: 'data:image/jpeg;base64,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' },
  { id: 2, name: "PC Gaming Entry", specs: "AMD Ryzen 5, 16GB de RAM, 500GB NVME, GTX 1650", price: 450, img: imgGaming },
  { id: 3, name: "PC Pro Workstation", specs: "Intel Core i7, 32GB RAM, 1TB SSD, RTX 4060", price: 950, img: imgPro },
  ]

  
  const handleAgregarAlCarrito = () => {
    setCart(cart +1)
  }
  const newLocal = '100vh'
  return (
    <div style={{ 
      backgroundImage: `url(${bgImage})`, /* Carga tu imagen usando template literals */
      backgroundSize: 'cover',             /* Hace que la imagen cubra toda la pantalla sin deformarse */
      backgroundPosition: 'center',        /* Centra la imagen en vertical y horizontal */
      backgroundRepeat: 'no-repeat',       /* Evita que la imagen se duplique como mosaico */
      backgroundAttachment: 'fixed',       /* El fondo se queda quieto mientras haces scroll (efecto elegante) */
      minHeight: newLocal, 
      color: 'white' 
    }}>
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
              img={prod.img}
              onAddToCart={handleAgregarAlCarrito} // <-- Pasamos la función a cada tarjeta
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App