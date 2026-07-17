import styles from "./ToggleView.module.css";

function ToggleView({ isCashea, setIsCashea }) {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.segment} ${!isCashea ? styles.active : ""}`}
        onClick={() => setIsCashea(false)}
      >
        DE CONTADO
      </button>
      <button
        className={`${styles.segment} ${isCashea ? styles.active : ""}`}
        onClick={() => setIsCashea(true)}
      >
        CASHEA
      </button>
    </div>
  );
}

export default ToggleView;
