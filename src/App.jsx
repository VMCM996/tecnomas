// src/App.jsx
import { useState, useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase/config'; // Importamos la base de datos de Firebase

import NavBar from './components/NavBar'
import ProductCard from './components/ProductCard'
import styles from './components/ProductCard.module.css'

// 💳 Componente de Aviso Flotante Superior
function TopNotificationBar() {
  return (
    <div 
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        backgroundColor: '#2d3748', 
        color: '#ffffff',
        padding: '10px 20px',
        fontSize: '13px',
        fontWeight: '600',
        fontFamily: "'Poppins', sans-serif",
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center'
      }}
    >
      <span>💳</span> Todos los precios reflejados son para pago en divisas
    </div>
  )
}

function App() {
  const [listaEquipos, setListaEquipos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todos')

  // 🔄 Efecto para cargar los productos desde Firebase Firestore
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const productosArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setListaEquipos(productosArray);
      } catch (error) {
        console.error("Error al cargar equipos desde Firebase: ", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, []);

  const handlePedirPorWhatsApp = (producto) => {
    const telefono = "584126502901"; 
    const mensaje = `¡Hola Tecnomas! 👋\n\nMe interesa el siguiente equipo de tu catálogo:\n\n *${producto.name}*\n _${producto.specs}_\n *Precio:* $${producto.price}\n\n¿Tienen disponibilidad?`;
    const mensajeEncriptado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${telefono}?text=${mensajeEncriptado}`;
    window.open(urlWhatsApp, '_blank');
  };

  const filteredProducts = listaEquipos.filter((prod) => {
    const term = searchTerm.toLowerCase();
    const matchesCategory = selectedCategory === 'todos' || prod.category === selectedCategory;
    const matchesSearch = prod.name.toLowerCase().includes(term) || prod.specs.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  // Si aún está cargando los datos de Firebase, mostramos un mensaje
  if (loading) {
    return (
      <div style={{ 
        backgroundColor: '#141414', 
        color: 'white', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: "'Poppins', sans-serif",
        fontSize: '1.2rem'
      }}>
        Cargando catálogo Tecnomas...
      </div>
    );
  }

  return (
    <div style={{ 
      backgroundImage: "url('/background.png')", 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed', 
      minHeight: '100vh', 
      width: '100%',
      backgroundColor: '#141414',     
      color: 'white',
      paddingTop: '40px' 
    }}>
      {/* 💳 AVISO ARRIBA EN LA WEB */}
      <TopNotificationBar />

      <NavBar /> 
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem', 
          fontFamily: "'Syne', sans-serif", 
          fontWeight: '800',
          fontSize: '2.5rem',
          background: 'linear-gradient(to right, #ffffff, #b5b5b5)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.5px'
        }}>
          Catálogo de Equipos
        </h1>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Buscar por procesador, RAM, nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '500px',
              padding: '14px 24px',
              borderRadius: '30px',
              border: '1px solid rgba(255, 255, 255, 0.15)', 
              backgroundColor: 'rgba(31, 31, 31, 0.8)', 
              backdropFilter: 'blur(8px)',
              color: 'white',
              fontSize: '16px',
              outline: 'none',
              transition: 'all 0.3s ease',
              fontFamily: "'Poppins', sans-serif",
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#2563eb';
              e.target.style.boxShadow = '0 4px 20px rgba(37, 99, 235, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
            }}
          />
        </div>

        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '12px', 
            marginBottom: '3rem',
            flexWrap: 'wrap' 
          }}
        >
          {/* Agregamos 'equipos' dentro de este arreglo */}
          {['todos', 'equipos', 'laptops', 'combos pc', 'combos laptops'].map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  backgroundColor: isActive ? '#2563eb' : 'rgba(255, 255, 255, 0.06)', 
                  color: isActive ? 'white' : '#cccccc',
                  border: isActive ? '1px solid #60a5fa' : '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '10px 24px',
                  fontSize: '13px',
                  fontWeight: '600',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: '0.5px',
                  backdropFilter: 'blur(4px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isActive ? '0 4px 15px rgba(37, 99, 235, 0.3)' : '0 4px 10px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                    e.target.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                    e.target.style.color = '#cccccc';
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
        
        <div 
          key={`${selectedCategory}-${searchTerm}`} 
          className={`${styles.gridContainer} ${styles.fadeIn}`}
        >
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
            <div style={{
              gridColumn: '1 / -1',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4rem 2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(8px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginTop: '1rem',
              textAlign: 'center'
            }}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 512 512" 
                style={{ width: '50px', height: '50px', fill: 'rgba(255, 255, 255, 0.3)', marginBottom: '1.5rem' }}
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
              </svg>
              
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#ffffff' }}>
                No encontramos lo que buscas
              </h3>
              
              <p style={{ color: '#aaa', fontSize: '0.95rem', maxWidth: '360px', margin: '0 0 1.5rem 0', fontFamily: "'Poppins', sans-serif", lineHeight: '1.4' }}>
                Prueba verificando la ortografía o cambia los términos para encontrar laptops o combos disponibles.
              </p>

              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('todos');
                }}
                style={{
                  backgroundColor: 'transparent',
                  color: '#60a5fa',
                  border: '1px solid rgba(96, 165, 250, 0.3)',
                  padding: '10px 20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontFamily: "'Poppins', sans-serif",
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(96, 165, 250, 0.1)';
                  e.target.style.borderColor = '#60a5fa';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = 'rgba(96, 165, 250, 0.3)';
                }}
              >
                Limpiar Filtros
              </button>
            </div>
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
              
              <button 
                className={styles.button} 
                onClick={() => { handlePedirPorWhatsApp(productoSeleccionado); setProductoSeleccionado(null); }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 448 512" 
                  style={{ 
                    width: '19px', 
                    height: '19px', 
                    fill: 'currentColor', 
                    marginRight: '6px',
                    verticalAlign: 'middle'
                  }}
                >
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
                <span style={{ verticalAlign: 'middle' }}>Consultar Disponibilidad</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App