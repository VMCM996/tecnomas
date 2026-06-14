// src/components/ProductCard.jsx
import styles from './ProductCard.module.css';

function ProductCard({ name, specs, price, img, onAddToCart, onOpenModal }) {
  
  // 🧹 RENDERIZADO DE ESPECIFICACIONES
  // Ahora solo toma el texto original y lo convierte en lista
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
      
      {/* IMAGEN */}
      <img src={img} alt={name} className={styles.productImage} onClick={onOpenModal} />
      
      {/* TÍTULO */}
      <h3 className={styles.title} onClick={onOpenModal}>{name}</h3>
      
      {/* 📋 ESPECIFICACIONES (Lista limpia) */}
      <div className={styles.specs}>
        {renderSpecs()}
      </div>
      
      {/* FOOTER (Precio + Botón Consultar) */}
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