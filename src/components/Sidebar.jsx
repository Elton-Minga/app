// src/components/Sidebar.jsx
import { useNavigate } from 'react-router-dom';

function Sidebar({ isOpen, onClose, usuario }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="edit-btn">✏️</button>
          <div className="user-info">
            <h3>¡Bienvenido!</h3>
            <p>{usuario}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button onClick={() => handleNavigation('/mis-cuentas')} className="nav-item">
            <span className="nav-icon">📄</span>
            <span>Mis cuentas</span>
          </button>

          <button className="nav-item">
            <span className="nav-icon">👤</span>
            <span>Actualización de datos</span>
          </button>

          <button onClick={() => handleNavigation('/transferir-celular')} className="nav-item nuevo">
            <span className="nav-icon">📱</span>
            <span>Transferir a celular</span>
            <span className="badge">NUEVO</span>
          </button>

          <button className="nav-item">
            <span className="nav-icon">↔️</span>
            <span>Transferir a cuentas</span>
          </button>

          <button className="nav-item">
            <span className="nav-icon">💵</span>
            <span>Giros</span>
          </button>

          <button className="nav-item">
            <span className="nav-icon">💳</span>
            <span>Pagos y recargas</span>
          </button>

          <button className="nav-item">
            <span className="nav-icon">🏪</span>
            <span>Retiro sin tarjeta</span>
          </button>

          <button className="nav-item">
            <span className="nav-icon">💰</span>
            <span>Préstamos</span>
          </button>

          <button className="nav-item">
            <span className="nav-icon">🔒</span>
            <span>Configuración y seguridad</span>
          </button>

          <button className="nav-item">
            <span className="nav-icon">📍</span>
            <span>Ubícanos</span>
          </button>

          <button className="nav-item">
            <span className="nav-icon">🔑</span>
            <span>Cambiar clave de internet</span>
          </button>
        </nav>

        <button onClick={handleLogout} className="logout-btn">
          <span className="nav-icon">⏻</span>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </>
  );
}

export default Sidebar;