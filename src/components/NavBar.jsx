import logoImg from "../assets/logo.png";

function NavBar() {
  return (
    <nav
      style={{
        padding: "0.2rem 1.5rem",
        backgroundColor: "rgb(255, 255, 255)",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* 1. Bloque izquierdo vacío para equilibrar el espacio */}
      <div style={{ flex: 1 }}></div>

      {/* 2. El Logo centrado perfectamente */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <a href="/" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logoImg}
            alt="TecnoMas Logo"
            style={{
              height: "80px",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </a>
      </div>
      <div style={{ flex: 1 }}></div>
    </nav>
  );
}

export default NavBar;
