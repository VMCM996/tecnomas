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

  // 🔘 Estado para rastrear la categoría seleccionada (por defecto "todos")
  const [selectedCategory, setSelectedCategory] = useState('todos')

  const handlePedirPorWhatsApp = (producto) => {
    const telefono = "584126502901"; 
    const mensaje = `¡Hola Tecnomas! 👋\n\nMe interesa el siguiente equipo de tu catálogo:\n\n *${producto.name}*\n _${producto.specs}_\n *Precio:* $${producto.price}\n\n¿Tienen disponibilidad?`;
    const mensajeEncriptado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${telefono}?text=${mensajeEncriptado}`;
    window.open(urlWhatsApp, '_blank');
  };

  // 🔍 Filtramos combinando la Categoría Y el Texto de búsqueda al mismo tiempo
  const filteredProducts = listaEquipos.filter((prod) => {
    const term = searchTerm.toLowerCase();
    
    // 1. Validamos si coincide con la categoría seleccionada
    const matchesCategory = selectedCategory === 'todos' || prod.category === selectedCategory;

    // 2. Validamos si coincide con el texto escrito
    const matchesSearch = prod.name.toLowerCase().includes(term) || prod.specs.toLowerCase().includes(term);

    // El producto solo pasa si cumple ambas condiciones
    return matchesCategory && matchesSearch;
  });

  return (
  <div style={{ 
    backgroundImage: "url('/background.png')", 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    
    // 🎯 CLAVE 1: Dejamos el fondo fijo para que el contenido se desplace por encima
    backgroundAttachment: 'fixed', 
    
    // 🎯 CLAVE 2: Forzamos a que el contenedor ocupe siempre, como mínimo, el 100% de la pantalla visible
    minHeight: '100vh', 
    width: '100%',
    backgroundColor: '#141414',     
    color: 'white' 
  }}>
      <NavBar /> 
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', fontFamily: "'Syne', sans-serif", fontWeight: '800' }}>
          Catálogo de Equipos
        </h1>

        {/* INPUT DE BÚSQUEDA */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
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
            onFocus={(e) => e.target.style.borderColor = '#2563eb'}
            onBlur={(e) => e.target.style.borderColor = '#333'}
          />
        </div>

        {/* 🔘 BOTONES DE CATEGORÍAS ACTUALIZADOS */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '12px', 
            marginBottom: '2.5rem',
            flexWrap: 'wrap' // Permite que en celulares se acomoden en filas si no caben
          }}
        >
          {/* 🎯 Agregamos las dos nuevas categorías separadas aquí: */}
          {['todos', 'laptops', 'combos pc', 'combos laptops'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                backgroundColor: selectedCategory === cat ? '#2563eb' : '#b1b1b1', 
                color: 'white',
                border: selectedCategory === cat ? '1px solid #60a5fa' : '1px solid #444',
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '20px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontFamily: "'Poppins', sans-serif",
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* GRILLA DE PRODUCTOS */}
        <div className={styles.gridContainer}>
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
            <p style={{ color: '#888', fontStyle: 'italic', marginTop: '2rem', gridColumn: '1 / -1', textAlign: 'center' }}>
              No se encontraron equipos en esta sección.
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
            <img 
              src={productoSeleccionado.img} 
              alt={productoSeleccionado.name} 
              style={{ 
                width: '100%', 
                height: '180px', 
                objectFit: 'contain', 
                marginBottom: '1rem',
                borderRadius: '12px',                  
                backgroundColor: 'transparent',
                padding: '0.5rem' 
              }} 
            />
            <p style={{ fontWeight: '600', margin: '0' }}>Características técnicas:</p>
            <p className={styles.modalSpecs}>{productoSeleccionado.specs}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '700', color: '#2563eb' }}>${productoSeleccionado.price}</span>
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