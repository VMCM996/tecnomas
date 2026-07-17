import styles from "./ProductCardCashea.module.css";
import logoCashea from "../assets/Cashea-negro.svg";

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
  // Cálculos financieros
  const precioEnDivisas = Number(price) || 0;
  const precioConAumento = precioEnDivisas / 0.92;
  const precioConAumentoBs = precioConAumento * Number(tasaDolar);
  const precioTotalCashea = Math.ceil(precioConAumentoBs / Number(tasaCashea));
  const inicialDeCashea = precioTotalCashea * 0.2;
  const totalCuotas = precioTotalCashea - inicialDeCashea;
  const cuotasQuincenales = totalCuotas / 3;

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

      <footer className={styles.footer}>
        * Aprobación sujeta a evaluación por Cashea.
      </footer>
    </div>
  );
}

export default ProductCardCashea;
