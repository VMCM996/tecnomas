import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";

// Componentes
import NavBar from "./components/NavBar";
import ToggleView from "./components/ToggleView";
import ProductCard from "./components/ProductCard";
import ProductCardCashea from "./components/ProductCardCashea";
import CategoryBar from "./components/CategoryBar";

// Estilos globales de App
import styles from "./App.module.css";

function App() {
  const [listaEquipos, setListaEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");

  // Estado para el Toggler (Divisas vs Cashea)
  const [isCasheaMode, setIsCasheaMode] = useState(false);

  // Tasas de cambio diarias editables
  const TASA_BOLIVARES = 880;
  const TASA_CASHEA = 736;

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const productosArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListaEquipos(productosArray);
      } catch (error) {
        console.error("Error al cargar equipos desde Firebase: ", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, []);

  const handlePedirPorWhatsApp = (producto) => {
    const telefono = "584126502901";

    const mensaje = isCasheaMode
      ? `¡Hola Tecnomas! 👋\n\nMe interesa el siguiente equipo con financiamiento Cashea:\n\n*${producto.name}*\n_${producto.specs}_\n\n🔹 *Inicial (20%):* $${Math.ceil(((Number(producto.price) * 1.07 * 815) / 612) * 0.2)}\n🔹 *3 Cuotas de:* $${Math.ceil(((Number(producto.price) * 1.07 * 815) / 612 - Math.ceil(((Number(producto.price) * 1.07 * 815) / 612) * 0.2)) / 3)}\n\n¿Tienen disponibilidad?`
      : `¡Hola Tecnomas! 👋\n\nMe interesa el siguiente equipo de tu catálogo:\n\n*${producto.name}*\n_${producto.specs}_\n*Precio:* $${producto.price}\n\n¿Tienen disponibilidad?`;

    const mensajeEncriptado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${telefono}?text=${mensajeEncriptado}`;
    window.open(urlWhatsApp, "_blank");
  };

  const filteredProducts = listaEquipos.filter((prod) => {
    const term = searchTerm.toLowerCase();
    const matchesCategory =
      selectedCategory === "todos" || prod.category === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(term) ||
      prod.specs.toLowerCase().includes(term);
    const isAvailable = prod.inStock !== false;

    return matchesCategory && matchesSearch && isAvailable;
  });

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        Cargando catálogo Tecnomas...
      </div>
    );
  }

  return (
    <div className={styles.appContainer}>
      <div className={styles.stickyNav}>
        <NavBar onSearch={setSearchTerm} />
      </div>

      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>Catálogo General</h1>

        <div className={styles.toggleWrapper}>
          <ToggleView isCashea={isCasheaMode} setIsCashea={setIsCasheaMode} />
        </div>

        <div className={styles.categoryWrapper}>
          <CategoryBar 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
        </div>

        <div
          key={`${selectedCategory}-${searchTerm}`}
          className={`${styles.gridContainer} ${styles.fadeIn}`}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((prod) =>
              isCasheaMode ? (
                <ProductCardCashea
                  key={prod.id}
                  brandLogo={prod.brandLogo}
                  name={prod.name}
                  specs={prod.specs}
                  price={prod.price}
                  tasaDolar={TASA_BOLIVARES}
                  tasaCashea={TASA_CASHEA}
                  img={prod.img}
                  onAddToCart={() => handlePedirPorWhatsApp(prod)}
                />
              ) : (
                <ProductCard
                  key={prod.id}
                  name={prod.name}
                  specs={prod.specs}
                  price={prod.price}
                  img={prod.img}
                  brandLogo={prod.brandLogo}
                  tasaDolar={TASA_BOLIVARES}
                  onAddToCart={() => handlePedirPorWhatsApp(prod)}
                />
              )
            )
          ) : (
            <div className={styles.emptyContainer}>
              <h3 className={styles.emptyTitle}>No encontramos lo que buscas</h3>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("todos");
                }}
                className={styles.clearButton}
              >
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;