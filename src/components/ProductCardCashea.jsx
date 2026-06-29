import styles from "./ProductCardCashea.module.css";
import logoCashea from "../assets/Cashea-negro.svg";
import logoWhatsapp from "../assets/wps.svg";

function ProductCardCashea({
  name,
  price,
  specs,
  img,
  tasaDolar,
  tasaCashea,
  onAddToCart,
}) {
  // Conversión a número seguro
  const precioEnDivisas = Number(price) || 0;
  const tasaBs = Number(tasaDolar) || 0;
  const tasaRetorno = Number(tasaCashea) || 0;

  // Cálculos financieros
  const resultadoCon8Porciento = precioEnDivisas * 1.08;
  const precio1 = resultadoCon8Porciento * tasaBs;
  const precioCasheaTotal = precio1 / tasaRetorno;

  const inicialDeCashea = Math.ceil(precioCasheaTotal * 0.20);
  const cuotasDeCashea = Math.ceil((precioCasheaTotal - inicialDeCashea) / 3);

  // Separamos las especificaciones por coma para colocarlas como viñetas limpias
  const specsArray = specs ? specs.split(",").map((s) => s.trim()) : [];

  return (
    <div className={styles.card}>
      {/* 1. Imagen del producto */}
      <div className={styles.imageWrapper}>
        <img src={img} alt={name} className={styles.productImage} />
      </div>

      {/* 2. Contenido principal */}
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>

        {/* Viñetas / Especificaciones (Alto contraste) */}
        <ul className={styles.specsList}>
          {specsArray.map((spec, index) => (
            <li key={index} className={styles.specItem}>
              <span className={styles.bulletPoint}>•</span> {spec}
            </li>
          ))}
        </ul>

        {/* Aviso de precio sujeto a cambios (Discreto y elegante) */}
        <div className={styles.priceWarning}>
          Precio sujeto a cambios
        </div>

        {/* 3. Módulo de Financiamiento Cashea */}
        <div className={styles.casheaBanner}>
          <div className={styles.casheaLogoBox}>
            <img src={logoCashea} alt="Cashea" className={styles.casheaLogo} />
          </div>

          <div className={styles.casheaBoxBlack}>
            <div className={styles.casheaBoxTitle}>20% inicial</div>
            <div className={styles.casheaAmount}>${inicialDeCashea}</div>
            <div className={styles.casheaSubtext}>quincenal</div>
          </div>

          <div className={styles.casheaBoxWhite}>
            <div className={styles.casheaBoxTitle}>+ 3 cuotas</div>
            <div className={styles.casheaAmount}>${cuotasDeCashea}</div>
            <div className={styles.casheaSubtext}>quincenales</div>
          </div>
        </div>

        {/* 4. Botón de WhatsApp (Área de toque amplia y cómoda) */}
        <button className={styles.whatsappButton} onClick={onAddToCart}>
          <img
            src={logoWhatsapp}
            alt="WhatsApp"
            className={styles.whatsappIcon}
          />
          <span>Pedir por WhatsApp</span>
        </button>

        <p className={styles.legal}>
          *Aprobación sujeta a evaluación de Cashea al momento de pagar.
        </p>
      </div>
    </div>
  );
}

export default ProductCardCashea;