// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [cuenta, setCuenta] = useState('4214 10•• •••• 1502');
  const [tipoDocumento, setTipoDocumento] = useState('DNI');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [claveInternet, setClaveInternet] = useState('');
  const [mostrarCuenta, setMostrarCuenta] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simular login exitoso
    localStorage.setItem('usuario', 'CIPRA SALINAS EDDER PIER');
    localStorage.setItem('saldo', '916.43');
    navigate('/mis-cuentas');
  };

  return (
    <div className="login-screen">
      {/* Logo */}
      <div className="login-logo-section">
        <div className="login-logo"></div>
        <div className="login-brand">
            <span>Banco</span>
            <span>de la Nación</span>
        </div>
      </div>

      {/* Formulario de login */}
      <div className="login-form-wrapper">
        <form onSubmit={handleLogin} className="login-form-card">

          {/* Campo de cuenta con toggle switch */}
          <div className="login-input-group">
            <input
              type="text"
              value={cuenta}
              onChange={(e) => setCuenta(e.target.value)}
              placeholder="Número de cuenta"
              className="login-input with-toggle"
              readOnly
            />
            <div className="toggle-switch-container">
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={mostrarCuenta}
                  onChange={() => setMostrarCuenta(!mostrarCuenta)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          {/* Fila con selector de documento y número */}
          <div className="documento-row">
            <div className="login-input-group documento-tipo">
              <select
                value={tipoDocumento}
                onChange={(e) => setTipoDocumento(e.target.value)}
                className="login-select"
              >
                <option value="DNI">DNI</option>
                <option value="CE">CE</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
              <span className="select-arrow">▼</span>
            </div>

            <div className="login-input-group documento-numero">
              <input
                type="text"
                value={numeroDocumento}
                onChange={(e) => setNumeroDocumento(e.target.value)}
                placeholder="Número de documento"
                className="login-input"
                maxLength="8"
              />
            </div>
          </div>

          {/* Campo de clave de internet */}
          <div className="login-input-group">
            <input
              type="password"
              value={claveInternet}
              onChange={(e) => setClaveInternet(e.target.value)}
              placeholder="Clave de internet"
              className="login-input"
            />
            <button type="button" className="info-icon-btn" title="Información">
              ⓘ
            </button>
          </div>

          {/* Link olvidé contraseña */}
          <button type="button" className="forgot-password-link">
            ¡La olvidé!
          </button>

          {/* Botón Ingresar */}
          <button type="submit" className="login-submit-btn">
            Ingresar
          </button>
        </form>

        {/* Link generar clave */}
        <button type="button" className="generate-password-link">
          Generar tu clave de internet
        </button>
      </div>

      {/* Botones inferiores */}
      <div className="login-bottom-buttons">
        <button className="login-icon-button" title="Ubicación">
          📍
        </button>
        <button className="login-icon-button" title="Soporte">
          🎧
        </button>
      </div>
    </div>
  );
}

export default Login;