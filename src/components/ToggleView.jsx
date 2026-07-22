import styles from "./ToggleView.module.css";

function ToggleView({ isCashea, setIsCashea }) {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.segment} ${!isCashea ? styles.activeContado : ""}`}
        onClick={() => setIsCashea(false)}
      >
        DE CONTADO
      </button>
      <button
        className={`${styles.segment} ${isCashea ? styles.activeCashea : ""}`}
        onClick={() => setIsCashea(true)}
      >
        CASHEA
      </button>
    </div>
  );
}

export default ToggleView;
