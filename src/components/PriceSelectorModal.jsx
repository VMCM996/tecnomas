import styles from "./PriceSelectorModal.module.css";
import logoCashea from "../assets/Cashea-negro.svg"; // Opcional, si quieres poner el logo

function PriceSelectorModal({ onSelectMode }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>¡Bienvenido a Tecnomas!</h2>
        <p className={styles.modalSubtitle}>
          Elige cómo prefieres visualizar los precios de nuestros equipos:
        </p>

        <div className={styles.optionsContainer}>
          {/* Opción Contado */}
          <button
            onClick={() => onSelectMode("contado")}
            className={`${styles.optionButton} ${styles.contadoButton}`}
          >
            <span className={styles.optionMainText}>Precio de Contado</span>
            <span className={styles.optionSubText}>
              Pago en divisas
            </span>
          </button>

          {/* Opción Cashea */}
          <button
            onClick={() => onSelectMode("cashea")}
            className={`${styles.optionButton} ${styles.casheaButton}`}
          >
            <img
              src={logoCashea}
              alt="Cashea"
              className={styles.casheaModalLogo}
            />
            <span className={styles.optionMainText}>Ver con Cashea</span>
            <span className={styles.optionSubText}>
              Inicial + 3 cuotas quincenales
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PriceSelectorModal;
