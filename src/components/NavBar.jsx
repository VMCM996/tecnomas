function Navbar({ cartCount }) {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#202020', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2>TecnoApp 🚀</h2>
      <ul style={{ display: 'flex', gap: '15px', listStyle: 'none', alignItems: 'center', margin: 0 }}>
        <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Inicio</a></li>
        <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Productos</a></li>
        <li><span style={{ 
          backgroundColor: '#4caf50', 
          padding: '0.3rem 0.8rem', 
          borderRadius: '20px', 
          fontWeight: 'bold',
          fontSize: '0.9rem'
        }}>🛒 Carrito: {cartCount}</span></li>
      </ul>
    </nav>
  )
}

export default Navbar