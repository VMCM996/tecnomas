import styles from "./Navbar.module.css";
import logo from "../assets/logo.png";

function Navbar({ onSearch }) {
  const mensaje = "Hola Tecnomas, tengo una duda sobre un producto.";
  const whatsappUrl = `https://wa.me/584126502901?text=${encodeURIComponent(mensaje)}`;
  return (
    <header className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Tecnomas" className={styles.logo} />
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar por procesador, RAM, nombre..."
          className={styles.searchInput}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className={styles.navActions}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappButton}
        >
          Consulta a un asesor
        </a>
      </div>
    </header>
  );
}

export default Navbar;
