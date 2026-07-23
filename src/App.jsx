import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";

// Componentes
import NavBar from "./components/NavBar";
import ToggleView from "./components/ToggleView";
import ProductCard from "./components/ProductCard";
import ProductCardCashea from "./components/ProductCardCashea";
import CategoryBar from "./components/CategoryBar";
import PriceSelectorModal from "./components/PriceSelectorModal"; // 👈 Nuevo componente del selector inicial

// 🧮 Lógica de cálculo externa
import { calculateCasheaDetails } from "./components/casheaCalculator";

// Estilos globales de App
import styles from "./App.module.css";

function App() {
  const [listaEquipos, setListaEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");

  // Estado para el Toggler (Divisas vs Cashea)
  const [isCasheaMode, setIsCasheaMode] = useState(false);

  // Estado para el Modal Selector Inicial de Precios
  const [showPriceSelector, setShowPriceSelector] = useState(false);

  // Tasas de cambio diarias editables
  const TASA_BOLIVARES = 880;
  const TASA_CASHEA = 737;

  useEffect(() => {
    // Revisar si el usuario ya eligió un modo previamente en localStorage
    const savedMode = localStorage.getItem("tecnomas_price_mode");
    if (savedMode) {
      setIsCasheaMode(savedMode === "cashea");
    } else {
      // Si nunca ha entrado, mostramos el modal selector inicial
      setShowPriceSelector(true);
    }

    const obtenerProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const productosArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 🔢 Ordenar los productos por su ID al inicio
        productosArray.sort((a, b) => {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        });

        setListaEquipos(productosArray);
      } catch (error) {
        console.error("Error al cargar equipos desde Firebase: ", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, []);

  const handleSelectInitialMode = (mode) => {
    const casheaActive = mode === "cashea";
    setIsCasheaMode(casheaActive);
    localStorage.setItem("tecnomas_price_mode", mode);
    setShowPriceSelector(false); // Ocultamos el modal al elegir
  };

  const handlePedirPorWhatsApp = (producto) => {
    const telefono = "584126502901";

    // 👉 Quitamos el = "" y solo declaramos que la variable existirá
    let mensaje;

    if (isCasheaMode) {
      const { inicialDeCashea, cuotasQuincenales } = calculateCasheaDetails(
        producto.price,
        TASA_BOLIVARES,
        TASA_CASHEA,
      );

      // Aquí es donde realmente se arma el mensaje para el cliente
      mensaje = `¡Hola Tecnomas! 👋\n\nMe interesa el siguiente equipo con financiamiento Cashea:\n\n*${producto.name}*\n_${producto.specs}_\n\n🔹 *Inicial (20%):* $${inicialDeCashea.toFixed(2)}\n🔹 *3 Cuotas de:* $${cuotasQuincenales.toFixed(2)}\n\n¿Tienen disponibilidad?`;
    } else {
      // Y aquí el mensaje si es de contado
      mensaje = `¡Hola Tecnomas! 👋\n\nMe interesa el siguiente equipo de tu catálogo:\n\n*${producto.name}*\n_${producto.specs}_\n*Precio:* $${producto.price}\n\n¿Tienen disponibilidad?`;
    }

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

    // 🛑 Validación de datos obligatorios: si falta nombre, precio o imagen, se descarta
    const hasValidData = prod.name && prod.price && prod.img;

    return matchesCategory && matchesSearch && isAvailable && hasValidData;
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
      {/* Modal de bienvenida para elegir modo de precios (solo si no se ha elegido antes) */}
      {showPriceSelector && (
        <PriceSelectorModal onSelectMode={handleSelectInitialMode} />
      )}

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
              ),
            )
          ) : (
            <div className={styles.emptyContainer}>
              <h3 className={styles.emptyTitle}>
                No encontramos lo que buscas
              </h3>
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
