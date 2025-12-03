// src/pages/ResumenTransferencia.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResumenTransferencia() {
  const [claveDinamica, setClaveDinamica] = useState('');
  const navigate = useNavigate();
  
  const destinatario = localStorage.getItem('destinatario');
  const monto = localStorage.getItem('montoTransferencia');
  const entidad = localStorage.getItem('entidadDestino');

  const handleConfirmar = () => {
    if (claveDinamica) {
      navigate('/transferencia-exitosa');
    } else {
      alert('Por favor ingrese la Clave Dinámica Digital');
    }
  };

  const reenviarCodigo = () => {
    alert('Código reenviado');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <button onClick={() => navigate('/seleccionar-monto')} className="back-btn">
          ‹
        </button>
        <h2>Resumen de transferencia</h2>
      </header>

      <div className="resumen-container">
        <p className="resumen-pregunta">
          ¿Estas seguro que deseas realizar la transferencia al celular?
        </p>

        <div className="resumen-card">
          <h3>{destinatario}</h3>
          <div className="resumen-detail">
            <span className="label">Entidad destino:</span>
            <span className="value">{entidad}</span>
          </div>
        </div>

        <div className="resumen-card">
          <h2 className="monto-grande">S/ {parseFloat(monto).toFixed(2)}</h2>
          <p className="cuenta-origen-label">Cuenta origen:</p>
        </div>

        <div className="resumen-card">
          <div className="resumen-detail">
            <span className="label">Comisión:</span>
            <span className="value">Gratis</span>
          </div>
          <div className="resumen-detail">
            <span className="label">Monto a cargar:</span>
            <span className="value">S/ {parseFloat(monto).toFixed(2)}</span>
          </div>
        </div>

        <div className="clave-dinamica-section">
          <h4>Clave Dinámica Digital</h4>
          <div className="clave-input-container">
            <input
              type="password"
              placeholder="••••••••"
              value={claveDinamica}
              onChange={(e) => setClaveDinamica(e.target.value)}
              maxLength="8"
              className="clave-input"
            />
            <button onClick={reenviarCodigo} className="reenviar-btn">
              Reenviar código ↻
            </button>
          </div>
          <button className="ayuda-clave">
            ¿Nunca llegó la Clave Dinámica Digital? ⓘ
          </button>
        </div>

        <button 
          className="btn-confirmar"
          onClick={handleConfirmar}
          disabled={!claveDinamica}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}

export default ResumenTransferencia;
