import { useState } from 'react'
import NavBar from './components/NavBar'
import ProductCard from './components/ProductCard'

// 1. Importamos las imágenes de los productos
import imgOficina from './assets/pc-oficina.png'
import imgGaming from './assets/pc-gaming.png'
import imgPro from './assets/pc-pro.png'

// 2. ¡IMPORTAMOS TU IMAGEN DE FONDO! (Asegúrate de que el nombre coincida)
import bgImage from './assets/background.png' 

function App() {
  const equipos = [
    { id: 1, name: "PC Oficina Básica", specs: "Intel Core 2 Duo, 4GB de ram, 120GB SSD", price: 155, img: imgOficina },
    { id: 2, name: "PC Gaming Entry", specs: "AMD Ryzen 5, 16GB de RAM, 500GB NVME, GTX 1650", price: 450, img: imgGaming },
    { id: 3, name: "PC Pro Workstation", specs: "Intel Core i7, 32GB RAM, 1TB SSD, RTX 4060", price: 950, img: imgPro },
  ]

  const handlePedirEquipo = (nombreProducto) => {
    alert(`¡Pronto podrás pedir la ${nombreProducto} por WhatsApp!`);
  }

  return (
    /* 3. CONFIGURAMOS LOS ESTILOS DE FONDO AQUÍ */
    <div style={{ 
      backgroundImage: `url(${bgImage})`, 
      backgroundSize: 'cover',             // Hace que la imagen cubra toda la pantalla sin deformarse
      backgroundPosition: 'center',        // Centra la imagen de fondo
      backgroundRepeat: 'no-repeat',       // Evita que la imagen se duplique como mosaico
      backgroundAttachment: 'fixed',       // Hace que el fondo se quede quieto al hacer scroll (efecto premium)
      minHeight: '100vh', 
      color: 'white' 
    }}>
      
      <NavBar /> 
      
      <main style={{ padding: '2rem' }}>
        {/* Añadimos un textShadow al título para que se lea bien sobre cualquier fondo */}
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', textShadow: '2px 2px 8px rgba(0,0,0,0.7)', fontFamily: "'Syne', sans-serif", }}>
          Catálogo de Equipos
        </h1>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {equipos.map((prod) => (
            <ProductCard 
              key={prod.id}
              name={prod.name}
              specs={prod.specs}
              price={prod.price}
              img={prod.img}
              onAddToCart={() => handlePedirEquipo(prod.name)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App