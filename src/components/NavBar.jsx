import logoImg from '../assets/logo.png'
function Navbar({ cartCount }) {
  return (
    <nav style={{ 
      padding: '0.8rem 1.5rem', 
      backgroundColor: '#ffffff', 
      color: 'white', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center' 
    }}>
      <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={logoImg} 
          alt="TecnoMas Logo" 
          style={{ 
            height: '90px',  /* Controla la altura del logo para que no deforme el Navbar */
            width: '100px',    /* Mantiene la proporción original de la imagen */
            objectFit: 'contain'
          }} 
        />
      </a>
      <ul style={{ display: 'flex', gap: '15px', listStyle: 'none', alignItems: 'center', margin: 0 }}>
        <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Productos</a></li>
        <li>
          <span style={{ 
            backgroundColor: '#4caf50', 
            padding: '0.3rem 0.8rem', 
            borderRadius: '20px', 
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}>
            Total 🛒 {cartCount}
          </span>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar