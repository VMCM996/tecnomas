import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";


// Importaciones para React Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Componentes y estilos
import NavBar from "./components/NavBar";
import ProductCard from "./components/ProductCard";
import ProductCardCashea from "./components/ProductCardCashea";
import styles from "./components/ProductCard.module.css";

function App() {
  const [listaEquipos, setListaEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");

  // 🎚️ Estado para el Toggler / Interruptor de Precios (Divisas vs Cashea)
  const [isCasheaMode, setIsCasheaMode] = useState(false);

  // 💱 Tasas de cambio diarias editables
  const TASA_BOLIVARES = 850;
  const TASA_CASHEA = 721;

  // 🔄 Efecto para cargar los productos y disparar la notificación verde
  useEffect(() => {
    toast.success("💳 Todos los precios reflejados son para pago en divisas", {
      position: "top-center",
      autoClose: 1000,
      theme: "dark",
    });

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

  // 🟢 Lógica adaptada para calcular los montos de Cashea en el mensaje de WhatsApp
  const handlePedirPorWhatsApp = (producto) => {
    const telefono = "584126502901";

    // 🟢 Declaramos el mensaje dependiendo de la condición directamente con const
    const mensaje = isCasheaMode
      ? `¡Hola Tecnomas! 👋\n\nMe interesa el siguiente equipo con financiamiento Cashea:\n\n*${producto.name}*\n_${producto.specs}_\n\n🔹 *Inicial (20%):* $${Math.ceil(((Number(producto.price) * 1.07 * 815) / 612) * 0.2)}\n🔹 *3 Cuotas de:* $${Math.ceil(((Number(producto.price) * 1.07 * 815) / 612 - Math.ceil(((Number(producto.price) * 1.07 * 815) / 612) * 0.2)) / 3)}\n\n¿Tienen disponibilidad?`
      : `¡Hola Tecnomas! 👋\n\nMe interesa el siguiente equipo de tu catálogo:\n\n*${producto.name}*\n_${producto.specs}_\n*Precio:* $${producto.price}\n\n¿Tienen disponibilidad?`;

    const mensajeEncriptado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${telefono}?text=${mensajeEncriptado}`;
    window.open(urlWhatsApp, "_blank");
  };

  const filteredProducts = listaEquipos.filter((prod) => {
    const term = searchTerm.toLowerCase();

    // Condición de categoría
    const matchesCategory =
      selectedCategory === "todos" || prod.category === selectedCategory;

    // Condición de búsqueda
    const matchesSearch =
      prod.name.toLowerCase().includes(term) ||
      prod.specs.toLowerCase().includes(term);

    // NUEVA CONDICIÓN: Solo productos que tengan inStock en true
    // (Si inStock no existe en el objeto, esta lógica los excluirá por seguridad)
    const isAvailable = prod.inStock !== false;

    return matchesCategory && matchesSearch && isAvailable;
  });

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "#141414",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "1.2rem",
        }}
      >
        Cargando catálogo Tecnomas...
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#141414",
        color: "white",
      }}
    >
      {/* Contenedor de notificaciones */}
      <ToastContainer style={{ zIndex: 999999 }} />

      <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <NavBar />
      </div>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            fontFamily: "'Syne', sans-serif",
            fontWeight: "800",
            fontSize: "2.5rem",
            background: "linear-gradient(to right, #ffffff, #b5b5b5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px",
          }}
        >
          Catálogo General
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <input
            type="text"
            placeholder="Buscar por procesador, RAM, nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "14px 24px",
              borderRadius: "30px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              backgroundColor: "rgba(31, 31, 31, 0.8)",
              backdropFilter: "blur(8px)",
              color: "white",
              fontSize: "16px",
              outline: "none",
              transition: "all 0.3s ease",
              fontFamily: "'Poppins', sans-serif",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#2563eb";
              e.target.style.boxShadow = "0 4px 20px rgba(37, 99, 235, 0.2)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.15)";
              e.target.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.2)";
            }}
          />
        </div>

        {/* 🎚️ Toggler / Interruptor de Precios */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            marginBottom: "2rem",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <span
            style={{
              fontSize: "0.9rem",
              color: !isCasheaMode ? "#ffffff" : "#888888",
              fontWeight: "600",
              cursor: "pointer",
            }}
            onClick={() => setIsCasheaMode(false)}
          >
            Precio en Divisas
          </span>

          <label
            style={{
              position: "relative",
              display: "inline-block",
              width: "60px",
              height: "34px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={isCasheaMode}
              onChange={(e) => setIsCasheaMode(e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span
              style={{
                position: "absolute",
                cursor: "pointer",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: isCasheaMode ? "#FDFA3D" : "#2563eb",
                border: isCasheaMode
                  ? "1px solid #e2e8f0"
                  : "1px solid #1d4ed8",
                transition: "0.4s",
                borderRadius: "34px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  content: "''",
                  height: "26px",
                  width: "26px",
                  left: "4px",
                  bottom: "3px",
                  backgroundColor: isCasheaMode ? "#111" : "white",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  transition: "0.4s",
                  borderRadius: "50%",
                  transform: isCasheaMode
                    ? "translateX(26px)"
                    : "translateX(0)",
                }}
              ></span>
            </span>
          </label>

          <span
            style={{
              fontSize: "0.9rem",
              color: isCasheaMode ? "#ffffff" : "#888888",
              fontWeight: "700",
              cursor: "pointer",
            }}
            onClick={() => setIsCasheaMode(true)}
          >
            Con Cashea
          </span>
        </div>

        {/* Botones de Categorías */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "3rem",
            flexWrap: "wrap",
          }}
        >
          {[
            "todos",
            "equipos",
            "laptops",
            "combos pc",
            "combos laptops",
            "mouse",
            "teclados",
            "impresoras",
            "ups",
            "monitores",
            "camaras WIFI",
          ].map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  backgroundColor: isActive
                    ? "#2563eb"
                    : "rgba(255, 255, 255, 0.06)",
                  color: isActive ? "white" : "#cccccc",
                  border: isActive
                    ? "1px solid #60a5fa"
                    : "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "10px 24px",
                  fontSize: "13px",
                  fontWeight: "600",
                  borderRadius: "20px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "0.5px",
                  backdropFilter: "blur(4px)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: isActive
                    ? "0 4px 15px rgba(37, 99, 235, 0.3)"
                    : "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 💳 Renderizado Inteligente de Tarjetas */}
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
                  tasaDolar={TASA_BOLIVARES} // Se envía la tasa para mostrar el equivalente en Bs si aplica
                  onAddToCart={() => handlePedirPorWhatsApp(prod)}
                />
              ),
            )
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "4rem 2rem",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(8px)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                marginTop: "1rem",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  color: "#ffffff",
                }}
              >
                No encontramos lo que buscas
              </h3>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("todos");
                }}
                style={{
                  backgroundColor: "transparent",
                  color: "#60a5fa",
                  border: "1px solid rgba(96, 165, 250, 0.3)",
                  padding: "10px 20px",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  borderRadius: "30px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  marginTop: "10px",
                }}
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
