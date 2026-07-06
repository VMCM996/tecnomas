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
  // 1. Cálculos financieros base
  const precioEnDivisas = Number(price) || 0;
  const precioConAumento = precioEnDivisas * 1.08;
  const precioConAumentoBs = precioConAumento * Number(tasaDolar);

  // 2. Precio total Cashea: Redondeado hacia arriba (Math.ceil)
  const precioTotalCashea = Math.ceil(precioConAumentoBs / Number(tasaCashea));

  // 3. Inicial y Cuotas: Cálculo exacto sin redondeos adicionales
  const inicialDeCashea = precioTotalCashea * 0.2;
  const totalCuotas = precioTotalCashea - inicialDeCashea;
  const cuotasQuincenales = totalCuotas / 3;

  return (
    <div className={styles.card}>
      {/* Logo */}
      <div className={styles.logoPlaceholder}>
        {brandLogo && (
          <img src={brandLogo} alt="Logo" className={styles.logoImage} />
        )}
      </div>
      <h3 className={styles.title}>{name}</h3>

      {/* Specs y Precio */}
      <div className={styles.specsContainer}>
        <span className={styles.specs}>{specs}</span>
        <div className={styles.priceRow}>
          <span>
            {" "}
            -<strong>${precioTotalCashea.toFixed(2)}</strong>
          </span>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <img src={img} alt={name} className={styles.productImage} />
      </div>

      {/* Banner Cashea */}
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

      {/* Botón de WhatsApp */}
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
