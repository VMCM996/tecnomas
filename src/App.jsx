import { useState } from 'react'
import NavBar from './components/NavBar'
import ProductCard from './components/ProductCard'
import styles from './components/ProductCard.module.css'

import imgOficina from './assets/pc-oficina.png'
import imgGaming from './assets/pc-gaming.png'
import imgPro from './assets/pc-pro.png'

function App() {
  const equipos = [
    { id: 1, name: "PC Oficina Básica", specs: "Intel Core 2 Duo, 4GB de ram, 120GB SSD", price: 155, img: imgOficina },
    { id: 2, name: "PC Gaming Entry", specs: "AMD Ryzen 5, 16GB de RAM, 500GB NVME, GTX 1650", price: 450, img: imgGaming },
    { id: 3, name: "PC Pro Workstation", specs: "Intel Core i7, 32GB RAM, 1TB SSD, RTX 4060", price: 950, img: imgPro },
  ]

  const [productoSeleccionado, setProductoSeleccionado] = useState(null)

  // 1. FUNCIÓN DE WHATSAPP CONECTADA CON LOS DATOS REALES DEL PRODUCTO
  const handlePedirPorWhatsApp = (producto) => {
    // REEMPLAZA ESTE NÚMERO POR EL TUYO: Código de país + número sin espacios ni símbolos
    // Ejemplo para Venezuela: "584121234567"
    const telefono = "584126502901"; 

    // Estructuramos el mensaje de forma atractiva usando negritas (*) y saltos de línea (\n)
    const mensaje = `¡Hola TecnoMas! 👋\n\nMe interesa el siguiente equipo de tu catálogo:\n\n💻 *${producto.name}*\n⚙️ _${producto.specs}_\n💰 *Precio:* $${producto.price}\n\n¿Tienen disponibilidad?`;

    // Codificamos el texto para que sea una URL válida
    const mensajeEncriptado = encodeURIComponent(mensaje);

    // Creamos el enlace final directo
    const urlWhatsApp = `https://wa.me/${telefono}?text=${mensajeEncriptado}`;

    // Abre una nueva pestaña hacia WhatsApp / WhatsApp Web
    window.open(urlWhatsApp, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh', color: 'white' }}>
      <NavBar /> 
      
      <main style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: "'Syne', sans-serif", fontWeight: '800' }}>
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
              // Conectamos también el botón exterior de la tarjeta por comodidad
              onAddToCart={() => handlePedirPorWhatsApp(prod)}
              onOpenModal={() => setProductoSeleccionado(prod)} 
            />
          ))}
        </div>
      </main>

      {/* MODAL */}
      {productoSeleccionado && (
        <div className={styles.modalOverlay} onClick={() => setProductoSeleccionado(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            
            <button className={styles.closeButton} onClick={() => setProductoSeleccionado(null)}>
              &times;
            </button>
            
            <h2 style={{ margin: '0 0 1rem 0', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
              {productoSeleccionado.name}
            </h2>
            
            <img 
              src={productoSeleccionado.img} 
              alt={productoSeleccionado.name} 
              style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '1rem' }} 
            />
            
            <p style={{ fontWeight: '600', margin: '0' }}>Características técnicas:</p>
            <p className={styles.modalSpecs}>
              {productoSeleccionado.specs}
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '700', color: '#2e7d32' }}>
                ${productoSeleccionado.price}
              </span>
              
              {/* 2. BOTÓN DEL MODAL CONECTADO A WHATSAPP */}
              <button 
                className={styles.button}
                onClick={() => {
                  handlePedirPorWhatsApp(productoSeleccionado);
                  setProductoSeleccionado(null); // Cierra el modal automáticamente tras redirigir
                }}
              >
                Pedir por WhatsApp
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default App