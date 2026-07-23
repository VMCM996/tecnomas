import styles from "./ProductCardCashea.module.css";
import logoCashea from "../assets/Cashea-negro.svg";
import { calculateCasheaDetails } from "./casheaCalculator";

function ProductCardCashea({
  name,
  specs,
  price,
  img,
  tasaDolar,
  tasaCashea,
  brandLogo,
  onAddToCart,
}) {
  // Obtenemos los valores ya calculados desde la función externa
  const { precioTotalCashea, inicialDeCashea, cuotasQuincenales } =
    calculateCasheaDetails(price, tasaDolar, tasaCashea);

  return (
    <div className={styles.card}>
      {/* Logo posicionado en la esquina superior izquierda */}
      {brandLogo && (
        <div className={styles.logoPlaceholder}>
          <img
            src={brandLogo}
            alt={`${name} logo`}
            className={styles.logoImage}
          />
        </div>
      )}

      <h3 className={styles.title}>{name}</h3>

      <div className={styles.specsContainer}>
        <span className={styles.specs}>{specs}</span> -
        <span className={styles.price}>${precioTotalCashea.toFixed(2)}</span>
      </div>

      <div className={styles.imageWrapper}>
        <img src={img} alt={name} className={styles.productImage} />
      </div>

      <div className={styles.casheaContainer}>
        <div className={styles.casheaYellowBox}>
          <img src={logoCashea} alt="Cashea" className={styles.casheaLogo} />
          <span className={styles.casheaText}>¡Cashéalo!</span>
        </div>

        <div className={styles.casheaInfo}>
          <div className={styles.casheaBox}>
            <span className={styles.casheaTitle}>Desde el 20% de inicial*</span>
            <span className={styles.casheaAmount}>
              ${inicialDeCashea.toFixed(2)}
            </span>
          </div>
          <div className={styles.verticalDivider}></div>
          <div className={styles.casheaBox}>
            <span className={styles.casheaTitle}>
              + 3 cuotas sin interés de*
            </span>
            <span className={styles.casheaAmount}>
              ${cuotasQuincenales.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* 📍 Texto de aprobación ubicado debajo de toda la info de Cashea */}
      <div className={styles.casheaApprovalText}>
        * Aprobación sujeta a evaluación por Cashea
      </div>

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
    </div>
  );
}

export default ProductCardCashea;