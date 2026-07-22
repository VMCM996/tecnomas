import styles from "./Navbar.module.css";
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";

function Navbar({ onSearch }) {
  const mensaje = "Hola Tecnomas, tengo una duda sobre un producto.";
  const whatsappUrl = `https://wa.me/584126502901?text=${encodeURIComponent(mensaje)}`;
  return (
    <header className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Tecnomas" className={styles.logo} />
      </div>

      <div className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Buscar equipos, laptops..."
          onChange={(e) => onSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.navActions}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappButton}
        >
          Consulta al asesor
        </a>
      </div>
    </header>
  );
}

export default Navbar;
