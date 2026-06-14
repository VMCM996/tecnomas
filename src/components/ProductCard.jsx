// src/components/ProductCard.jsx
import styles from './ProductCard.module.css';

function ProductCard({ name, specs, price, img, onAddToCart, onOpenModal }) {
  
  // 🧠 DETECCIÓN DE COMPONENTES CLAVE
  const obtenerEtiquetas = () => {
    const s = specs.toLowerCase();
    let proc = '';
    let ram = '';

    if (s.includes('i7')) proc = 'Intel i7';
    else if (s.includes('i5')) proc = 'Intel i5';
    else if (s.includes('i3')) proc = 'Intel i3';
    else if (s.includes('ryzen 7')) proc = 'Ryzen 7';
    else if (s.includes('ryzen 5')) proc = 'Ryzen 5';
    else if (s.includes('ryzen 3')) proc = 'Ryzen 3';
    else if (s.includes('celeron')) proc = 'Celeron';

    if (s.includes('32gb')) ram = '32GB RAM';
    else if (s.includes('16gb')) ram = '16GB RAM';
    else if (s.includes('8gb')) ram = '8GB RAM';
    else if (s.includes('4gb')) ram = '4GB RAM';

    return { proc, ram };
  };

  const { proc, ram } = obtenerEtiquetas();

  // 🧹 RENDERIZADO DE ESPECIFICACIONES (Limpio y directo)
  const renderSpecs = () => {
    const items = specs.split('|').map(item => item.trim());
    return items.map((item, index) => (
      <span key={index} style={{ display: 'block', marginBottom: '2px' }}>{`• ${item}`}</span>
    ));
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardShine}></div>
      <div className={styles.cardGlow}></div>
      
      <img src={img} alt={name} className={styles.productImage} onClick={onOpenModal} />
      
      <h3 className={styles.title} onClick={onOpenModal}>{name}</h3>
      
      {/* 📋 ESPECIFICACIONES CON PROCESADOR Y RAM AL INICIO */}
      <div className={styles.specs}>
        {(proc || ram) && (
          <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#2563eb' }}>
            {proc} {ram}
          </div>
        )}
        {renderSpecs()}
      </div>
      
      <div className={styles.footer}>
        <span className={styles.price}>${price}</span>
        <button className={styles.button} onClick={(e) => { e.stopPropagation(); onAddToCart(); }}>
          <span>Consultar</span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;