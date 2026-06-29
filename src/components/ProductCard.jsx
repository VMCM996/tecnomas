import styles from "./ProductCard.module.css";
import logoWhatsapp from "../assets/wps.svg";

function ProductCard({ name, price, specs, img, onAddToCart }) {
  const precioEnDivisas = Number(price) || 0;
  const specsArray = specs ? specs.split(",").map((s) => s.trim()) : [];

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={img} alt={name} className={styles.productImage} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        
        <ul className={styles.specsList}>
          {specsArray.slice(0, 4).map((spec, index) => (
            <li key={index} className={styles.specItem}>
              <span className={styles.bulletPoint}>•</span> {spec}
            </li>
          ))}
        </ul>

        <div className={styles.priceBox}>
          <div className={styles.priceAmount}>${precioEnDivisas} USD</div>
          <div className={styles.priceDisclaimer}>Precio valido para pago en divisas</div>
        </div>

        <button className={styles.whatsappButton} onClick={onAddToCart}>
          <img src={logoWhatsapp} alt="WPS" className={styles.whatsappIcon} />
          PEDIR POR WHATSAPP
        </button>
      </div>
    </div>
  );
}

export default ProductCard;