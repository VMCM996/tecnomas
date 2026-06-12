// src/components/ProductCard.jsx
import React from 'react'
import styles from './ProductCard.module.css'

function ProductCard({ name, specs, price, img, onAddToCart, onOpenModal }) {
  
  // 🧠 LÓGICA DE DETECCIÓN Y CONFIGURACIÓN DE BADGES
  const obtenerEtiquetas = () => {
    const specsLower = specs.toLowerCase();
    let procesador = null;
    let ram = null;

    // Evaluamos procesadores antiguos primero para evitar falsos positivos
    if (specsLower.includes('core 2 duo') || specsLower.includes('core2duo')) procesador = 'Core 2 Duo';
    else if (specsLower.includes('pentium')) procesador = 'Pentium';
    // Evaluamos de mayor a menor para evitar falsos positivos con los modelos (ej. 7520U)
    else if (specsLower.includes('core i7') || specsLower.includes('i7')) procesador = 'Intel i7';
    else if (specsLower.includes('core i5') || specsLower.includes('i5')) procesador = 'Intel i5';
    else if (specsLower.includes('core i3') || specsLower.includes('i3')) procesador = 'Intel i3';
    else if (specsLower.includes('ryzen 7') || specsLower.includes('r7')) procesador = 'Ryzen 7';
    else if (specsLower.includes('ryzen 5') || specsLower.includes('r5')) procesador = 'Ryzen 5';
    else if (specsLower.includes('ryzen 3') || specsLower.includes('r3')) procesador = 'Ryzen 3';
    else if (specsLower.includes('celeron')) procesador = 'Celeron';

    if (specsLower.includes('4gb') || specsLower.includes('4 gb') || specsLower.includes('4dr')) ram = '4GB RAM';
    else if (specsLower.includes('8gb') || specsLower.includes('8 gb') || specsLower.includes('8dr')) ram = '8GB RAM';
    else if (specsLower.includes('16gb') || specsLower.includes('16 gb') || specsLower.includes('16dr')) ram = '16GB RAM';
    else if (specsLower.includes('32gb') || specsLower.includes('32 gb') || specsLower.includes('32dr')) ram = '32GB RAM';

    return { procesador, ram };
  };

  const { procesador, ram } = obtenerEtiquetas();

  // 🧹 LIMPIEZA TOTAL Y FORMATEO UNIFORME (SIN EMOJIS)
  const formatearSpecs = () => {
    const fragmentos = specs.split('|').map(item => item.trim());

    const fragmentosLimpios = fragmentos.filter(frag => {
      const fragLower = frag.toLowerCase();
      
      if (fragLower.includes('case') || fragLower.includes('monitor') || fragLower.includes('pantalla') || fragLower.includes('fhd')) return true;

      const esProcesador = fragLower.includes('intel') || fragLower.includes('ryzen') || fragLower.includes('core i') || fragLower.includes('celeron');
      const esRam = fragLower.includes('ram') || fragLower.includes('ddr') || fragLower.includes('dr5') || fragLower.includes('dr4');
      
      return !esProcesador && !esRam;
    });

    return fragmentosLimpios.map((item, index) => {
      if (!item) return null;

      return (
        <span 
          key={index} 
          style={{ 
            display: 'block',
            marginBottom: '5px',
            color: '#2d3748',          /* Gris Oscuro Premium */
            fontWeight: '600',         /* Grosor semi-bold nítido */
            fontSize: '13px',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          {`• ${item}`}
        </span>
      );
    });
  };

  return (
    <div className={styles.card}>
      {/* IMAGEN */}
      <img 
        src={img} 
        alt={name} 
        className={styles.productImage} 
        onClick={onOpenModal}
        style={{ cursor: 'pointer' }}
      />
      
      {/* TÍTULO */}
      <h3 className={styles.title} onClick={onOpenModal} style={{ cursor: 'pointer' }}>
        {name}
      </h3>
      
      {/* 🏷️ MÓDULO DE BADGES */}
      {(procesador || ram) && (
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '1rem', 
          flexWrap: 'wrap'
        }}>
          {procesador && (
            <span style={{
              backgroundColor: '#3b3db6',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase',
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: '0.3px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {procesador}
            </span>
          )}
          {ram && (
            <span style={{
              backgroundColor: '#1b6363',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase',
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: '0.3px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {ram}
            </span>
          )}
        </div>
      )}
      
      {/* 📋 LISTA DE ESPECIFICACIONES CON FORMATO PREMIUM */}
      <div style={{ 
        textAlign: 'left', 
        marginBottom: '1.5rem',
        fontFamily: "'Poppins', sans-serif",
        lineHeight: '1.5'
      }}>
        {formatearSpecs()}
      </div>
      
      {/* FOOTER (Precio + Botón Consultar) */}
      <div className={styles.footer}>
        <span className={styles.price}>${price}</span>
        
        <button className={styles.button} onClick={onAddToCart}>
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
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
          </svg>
          <span style={{ verticalAlign: 'middle' }}>Consultar</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard