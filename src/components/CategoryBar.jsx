import CategoryMenu from "./CategoryMenu";
import styles from "./CategoryBar.module.css";

function CategoryBar({ selectedCategory, onSelectCategory }) {
  const quickCategories = [
    "equipos",
    "laptops",
    "monitores",
    "combos",
    "router",
    "ups",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.quickButtons}>
        {quickCategories.map((cat) => (
          <button
            key={cat}
            className={`${styles.button} ${selectedCategory === cat ? styles.active : ""}`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className={styles.menuWrapper}>
        {/* Ya no le pasamos el 'selectedCategory', para que sea independiente */}
        <CategoryMenu onSelectCategory={onSelectCategory} />
      </div>
    </div>
  );
}

export default CategoryBar;
