// src/components/ProductCard.jsx
import React from 'react';
import styles from './ProductCard.module.css';

function ProductCard({ name, specs, price, img, onAddToCart, onOpenModal }) {
  
  // 🧠 LÓGICA DE DETECCIÓN Y CONFIGURACIÓN DE BADGES
  const obtenerEtiquetas = () => {
    const specsLower = specs.toLowerCase();
    let procesador = null;
    let ram = null;

    // Prioridad a procesadores específicos
    if (specsLower.includes('core 2 duo') || specsLower.includes('core2duo')) procesador = 'Core 2 Duo';
    else if (specsLower.includes('pentium')) procesador = 'Pentium';
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

  // 🧹 LIMPIEZA PARA EL ÁREA DE ESPECIFICACIONES
  const formatearSpecs = () => {
    const fragmentos = specs.split('|').map(item => item.trim());
    const fragmentosLimpios = fragmentos.filter(frag => {
      const fragLower = frag.toLowerCase();
      if (fragLower.includes('case') || fragLower.includes('monitor') || fragLower.includes('pantalla') || fragLower.includes('fhd')) return true;
      const esProcesador = fragLower.includes('intel') || fragLower.includes('ryzen') || fragLower.includes('core i') || fragLower.includes('celeron');
      const esRam = fragLower.includes('ram') || fragLower.includes('ddr') || fragLower.includes('dr5') || fragLower.includes('dr4');
      return !esProcesador && !esRam;
    });

    return fragmentosLimpios.map((item, index) => (
      <span key={index} style={{ display: 'block', marginBottom: '2px' }}>{`• ${item}`}</span>
    ));
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardShine}></div>
      <div className={styles.cardGlow}></div>
      
      {/* IMAGEN */}
      <img 
        src={img} 
        alt={name} 
        className={styles.productImage} 
        onClick={onOpenModal}
      />
      
      {/* TÍTULO */}
      <h3 className={styles.title} onClick={onOpenModal}>
        {name}
      </h3>
      
      {/* 📋 ESPECIFICACIONES */}
      <div className={styles.specs}>
        {formatearSpecs()}
      </div>
      
      {/* FOOTER (Precio + Botón Consultar) */}
      <div className={styles.footer}>
        <span className={styles.price}>${price}</span>
        
        <button className={styles.button} onClick={(e) => { e.stopPropagation(); onAddToCart(); }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ width: '16px', height: '16px', fill: 'currentColor' }}>
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6z"/>
          </svg>
          <span>Consultar</span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;