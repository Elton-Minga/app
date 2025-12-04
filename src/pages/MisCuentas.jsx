// src/pages/MisCuentas.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function MisCuentas() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarMovimientos, setMostrarMovimientos] = useState(false);
  const [movimientos, setMovimientos] = useState([]);
  const navigate = useNavigate();

  const usuario = localStorage.getItem('usuario') || 'Usuario';
  const saldo = localStorage.getItem('saldo') || '0.00';

  // Cargar movimientos desde localStorage al montar el componente
  useEffect(() => {
    cargarMovimientos();
  }, []);

  const cargarMovimientos = () => {
    // Movimientos predeterminados
    const movimientosDefault = [
      { 
        fecha: '02/12/2025',
        hora: '14:30:00',
        descripcion: 'Transferencia recibida', 
        monto: '+150.00', 
        tipo: 'ingreso',
        numeroOperacion: '0024561',
        destinatario: 'María González',
        comision: 'Gratis'
      },
      { 
        fecha: '01/12/2025',
        hora: '10:15:00',
        descripcion: 'Pago de servicios', 
        monto: '-45.50', 
        tipo: 'egreso',
        numeroOperacion: '0024560',
        comision: 'S/ 2.00'
      },
      { 
        fecha: '30/11/2025',
        hora: '16:45:00',
        descripcion: 'Compra en comercio', 
        monto: '-89.00', 
        tipo: 'egreso',
        numeroOperacion: '0024559',
        comision: 'Gratis'
      },
      { 
        fecha: '28/11/2025',
        hora: '09:20:00',
        descripcion: 'Depósito en efectivo', 
        monto: '+500.00', 
        tipo: 'ingreso',
        numeroOperacion: '0024558',
        comision: 'Gratis'
      },
    ];

    // Obtener movimientos guardados desde localStorage
    const movimientosGuardados = JSON.parse(localStorage.getItem('movimientos') || '[]');

    // Combinar movimientos guardados con los predeterminados
    const todosMovimientos = [...movimientosGuardados, ...movimientosDefault];

    // Ordenar por fecha (más recientes primero)
    todosMovimientos.sort((a, b) => {
      const fechaA = new Date(a.fecha.split('/').reverse().join('-'));
      const fechaB = new Date(b.fecha.split('/').reverse().join('-'));
      return fechaB - fechaA;
    });

    setMovimientos(todosMovimientos);
  };

  const handleClickMovimiento = (movimiento) => {
    navigate('/detalle-movimiento', { state: { movimiento } });
  };

  return (
    <div className="app-container">
      <Sidebar 
        isOpen={menuAbierto} 
        onClose={() => setMenuAbierto(false)}
        usuario={usuario}
      />

      <div className="main-content">
        <header className="app-header">
          <button 
            className="menu-btn"
            onClick={() => setMenuAbierto(true)}
          >
            ☰
          </button>
          <h2>Mis cuentas</h2>
          <button className="star-btn">⭐</button>
        </header>

        <div className="exchange-rate">
          <span>DÓLAR ref. Compra 3.34 Venta 3.40</span>
          <button className="dropdown-btn">▼</button>
        </div>

        <div className="greeting-section">
          <h3>¡Hola!</h3>
          <h1>{usuario}</h1>
        </div>

        <div className="accounts-section">
          <h4>Mis cuentas en soles</h4>

          <div className="account-card" onClick={() => setMostrarMovimientos(!mostrarMovimientos)}>
            <div className="account-info">
              <span className="account-type">Cuenta Ahorro</span>
              <span className="account-number">••-•••-•••4287</span>
            </div>
            <div className="account-balance">
              <span className="balance-amount">S/ {saldo}</span>
              <span className="balance-label">Saldo disponible</span>
              <button className="arrow-btn">›</button>
            </div>
          </div>

          {mostrarMovimientos && (
            <div className="movimientos-lista">
              <h4>Movimientos recientes</h4>
              {movimientos.map((mov, index) => (
                <div 
                  key={index} 
                  className={`movimiento-item ${mov.tipo}`}
                  onClick={() => handleClickMovimiento(mov)}
                >
                  <div className="mov-info">
                    <span className="mov-desc">{mov.descripcion}</span>
                    <span className="mov-fecha">{mov.fecha}</span>
                  </div>
                  <div className="mov-monto-container">
                    <span className="mov-monto">{mov.monto}</span>
                    <span className="mov-arrow">›</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MisCuentas;