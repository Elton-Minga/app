// src/pages/MisCuentas.jsx
import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function MisCuentas() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarMovimientos, setMostrarMovimientos] = useState(false);
 // const navigate = useNavigate();
  const usuario = localStorage.getItem('usuario') || 'Usuario';
  const saldo = localStorage.getItem('saldo') || '0.00';

  const movimientos = [
    { fecha: '02/12/2025', descripcion: 'Transferencia recibida', monto: '+150.00', tipo: 'ingreso' },
    { fecha: '01/12/2025', descripcion: 'Pago de servicios', monto: '-45.50', tipo: 'egreso' },
    { fecha: '30/11/2025', descripcion: 'Compra en comercio', monto: '-89.00', tipo: 'egreso' },
    { fecha: '28/11/2025', descripcion: 'Depósito en efectivo', monto: '+500.00', tipo: 'ingreso' },
  ];

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
                <div key={index} className={`movimiento-item ${mov.tipo}`}>
                  <div className="mov-info">
                    <span className="mov-desc">{mov.descripcion}</span>
                    <span className="mov-fecha">{mov.fecha}</span>
                  </div>
                  <span className="mov-monto">{mov.monto}</span>
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
