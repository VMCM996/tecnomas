import styles from './ProductCard.module.css'

function ProductCard({ name, specs, price, img, onAddToCart, onOpenModal }) {
  return (
    /* Al hacer clic en la tarjeta se abre el modal */
    <div className={styles.card} onClick={onOpenModal} style={{ cursor: 'pointer' }}>
      
      <img src={img} alt={name} className={styles.productImage} />
      
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.specs}>
        {specs}
      </p>
      
      <div className={styles.footer}>
        <span className={styles.price}>${price}</span>
        
        {/* El e.stopPropagation() evita que al dar clic al botón se abra el modal por error */}
        <button 
          className={styles.button} 
          onClick={(e) => {
            e.stopPropagation(); 
            onAddToCart();
          }}
        >
          Pedir
        </button>
      </div>
    </div>
  )
}

export default ProductCard