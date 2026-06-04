// src/App.jsx
import { useState } from 'react'
import NavBar from './components/NavBar'
import ProductCard from './components/ProductCard'
import styles from './components/ProductCard.module.css'

// Aquí importamos los datos puros que acabamos de acomodar en el Paso 1
import { listaEquipos } from './data/products'

function App() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  
  // Estado para guardar lo que escribe el usuario en la barra
  const [searchTerm, setSearchTerm] = useState('')

  const handlePedirPorWhatsApp = (producto) => {
    const telefono = "584126502901"; 
    const mensaje = `¡Hola Tecnomas! 👋\n\nMe interesa el siguiente equipo de tu catálogo:\n\n *${producto.name}*\n _${producto.specs}_\n *Precio:* $${producto.price}\n\n¿Tienen disponibilidad?`;
    const mensajeEncriptado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${telefono}?text=${mensajeEncriptado}`;
    window.open(urlWhatsApp, '_blank');
  };

  // Método 2: Filtramos dinámicamente antes del return usando 'specs' o 'name'
  const filteredProducts = listaEquipos.filter((prod) => {
    const term = searchTerm.toLowerCase();
    return (
      prod.name.toLowerCase().includes(term) ||
      prod.specs.toLowerCase().includes(term)
    );
  });

  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh', color: 'white' }}>
      <NavBar /> 
      
      <main style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', fontFamily: "'Syne', sans-serif", fontWeight: '800' }}>
          Catálogo de Equipos
        </h1>

        {/* INPUT DE BÚSQUEDA */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <input
            type="text"
            placeholder="Buscar por procesador, RAM, nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '500px',
              padding: '12px 20px',
              borderRadius: '30px',
              border: '2px solid #333',
              backgroundColor: '#1f1f1f',
              color: 'white',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.3s ease',
              fontFamily: "'Poppins', sans-serif"
            }}
            onFocus={(e) => e.target.style.borderColor = '#2e7d32'}
            onBlur={(e) => e.target.style.borderColor = '#333'}
          />
        </div>
        
        {/* GRILLA DE PRODUCTOS */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((prod) => (
              <ProductCard 
                key={prod.id}
                name={prod.name}
                specs={prod.specs}
                price={prod.price}
                img={prod.img}
                onAddToCart={() => handlePedirPorWhatsApp(prod)}
                onOpenModal={() => setProductoSeleccionado(prod)} 
              />
            ))
          ) : (
            <p style={{ color: '#888', fontStyle: 'italic', marginTop: '2rem' }}>
              No se encontraron equipos que coincidan con "{searchTerm}"
            </p>
          )}
        </div>
      </main>

      {/* MODAL */}
      {productoSeleccionado && (
        <div className={styles.modalOverlay} onClick={() => setProductoSeleccionado(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setProductoSeleccionado(null)}>&times;</button>
            <h2 style={{ margin: '0 0 1rem 0', fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>{productoSeleccionado.name}</h2>
            <img src={productoSeleccionado.img} alt={productoSeleccionado.name} style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '1rem' }} />
            <p style={{ fontWeight: '600', margin: '0' }}>Características técnicas:</p>
            <p className={styles.modalSpecs}>{productoSeleccionado.specs}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '700', color: '#2e7d32' }}>${productoSeleccionado.price}</span>
              <button className={styles.button} onClick={() => { handlePedirPorWhatsApp(productoSeleccionado); setProductoSeleccionado(null); }}>
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