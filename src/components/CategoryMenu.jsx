import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import styles from './CategoryMenu.module.css';

const categories = [
  { name: 'todos', icon: <FaIcons.FaList /> },
  { name: 'equipos', icon: <FaIcons.FaDesktop /> },
  { name: 'laptops', icon: <FaIcons.FaLaptop /> },
  { name: 'monitores', icon: <FaIcons.FaTv /> },
  { name: 'ups', icon: <FaIcons.FaBatteryFull /> },
  { name: 'router', icon: <FaIcons.FaRoute /> }, // Nota: Muchas veces es FaRoute en lugar de FaRouter
  { name: 'impresoras', icon: <FaIcons.FaPrint /> },
  { name: 'teclados', icon: <FaIcons.FaKeyboard /> },
  { name: 'CCTV', icon: <FaIcons.FaVideo /> },
];

function CategoryMenu({ onSelectCategory }) { // Ya no necesitamos selectedCategory aquí
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      {/* Título fijo para que no cambie el nombre */}
      <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        CATEGORÍAS ▼
      </button>

      {isOpen && (
        <div className={styles.menu}>
          {categories.map((cat) => (
            <button 
              key={cat.name} 
              className={styles.item}
              onClick={() => {
                onSelectCategory(cat.name); // Esto sí debe actualizar el filtro en App.jsx
                setIsOpen(false);
              }}
            >
              <span className={styles.icon}>{cat.icon}</span>
              {cat.name.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryMenu;