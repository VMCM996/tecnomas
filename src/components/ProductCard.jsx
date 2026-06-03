import styles from './ProductCard.module.css'

// 1. Asegúrate de recibir la propiedad "img" aquí adentro de las llaves
function ProductCard({ name, specs, price, img, onAddToCart }) {
  return (
    <div className={styles.card}>
      
      {/* 2. REVISA ESTA LÍNEA: Debe tener src={img} sin comillas externas */}
      <img src={img} alt={name} className={styles.productImage} />
      
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.specs}>
        {specs}
      </p>
      
      <div className={styles.footer}>
        <span className={styles.price}>${price}</span>
        <button className={styles.button} onClick={onAddToCart}>
          Pedir
        </button>
      </div>
    </div>
  )
}

export default ProductCard