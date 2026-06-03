import styles from './ProductCard.module.css'

// 1. Revisa que ya NO esté la palabra "onAddToCart" si la cambiaste,
// o déjala así si la vas a seguir usando como puente:
function ProductCard({ name, specs, price, img, onAddToCart }) {
  return (
    <div className={styles.card}>
      <img src={img} alt={name} className={styles.productImage} />
      
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.specs}>
        {specs}
      </p>
      
      <div className={styles.footer}>
        <span className={styles.price}>${price}</span>
        
        {/* 2. REVISA ESTA LÍNEA CON LUPA */}
        <button className={styles.button} onClick={onAddToCart}>
          Pedir
        </button>
      </div>
    </div>
  )
}

export default ProductCard