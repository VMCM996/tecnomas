import styles from "./ProductCard.module.css";

function ProductCard({ name, specs, price, img, brandLogo, onAddToCart }) {
  return (
    <div className={styles.card}>
      {/* Logo */}
      <div className={styles.logoPlaceholder}>
        {brandLogo && (
          <img src={brandLogo} alt="Logo" className={styles.logoImage} />
        )}
      </div>

      {/* Título */}
      <h2 className={styles.title}>{name}</h2>

      {/* Specs */}
      <div className={styles.specsContainer}>
        <span className={styles.specs}>{specs}</span> -
        <span className={styles.price}> ${Number(price).toFixed(2)}</span>
      </div>

      {/* Imagen */}
      <img src={img} alt={name} className={styles.image} />

      {/* Botón de WhatsApp (CORREGIDO: Centrado y con ícono) */}
      <div className={styles.whatsappButtonWrapper}>
        <button onClick={onAddToCart} className={styles.whatsappButton}>
          <img
            src="/images/LogoWs.png"
            alt="WhatsApp"
            className={styles.whatsappIcon}
          />
          Consultar por WhatsApp
        </button>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        * Precios válido solo para cancelar en divisas.
      </footer>
    </div>
  );
}

export default ProductCard;
