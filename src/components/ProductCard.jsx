import styles from './ProductCard.module.css'
function ProductCard({ name, specs, price, onAddToCart }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}></h3>
      <p className={styles.specs}>
        <strong>Especificaciones:</strong> {specs}
        </p>
      <div className={styles.footer}>
        <span className={styles.price}>${price}</span>
        <button className={styles.button} onClick={onAddToCart}>
            Agregar
        </button>
        </div>
        </div>
  )
}

export default ProductCard