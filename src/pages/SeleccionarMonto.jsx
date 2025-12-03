// src/pages/SeleccionarMonto.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function SeleccionarMonto() {
  const navigate = useNavigate();
  const [monto, setMonto] = useState('');
  const [entidadSeleccionada, setEntidadSeleccionada] = useState('Banco de la Nación');
  const destinatario = localStorage.getItem('destinatario');
  const celular = localStorage.getItem('celularDestinatario');

  const entidades = [
    {
      nombre: 'Banco de la Nación',
      logo: '››',
      color: '#d32f2f',
      destacado: true
    },
    {
      nombre: 'BCP',
      logo: 'BCP',
      color: '#002b7f',
      destacado: false
    },
    {
      nombre: 'Yape',
      logo: 'Yape',
      color: '#702283',
      destacado: false
    },
    {
      nombre: 'Plin',
      logo: 'Plin',
      color: '#00bfa5',
      destacado: false
    }
  ];

  const handleMontoChange = (e) => {
    const valor = e.target.value;
    // Solo permitir números y punto decimal
    if (valor === '' || /^\d*\.?\d{0,2}$/.test(valor)) {
      setMonto(valor);
    }
  };

  const handleSiguiente = () => {
    const montoNumerico = parseFloat(monto);

    if (!monto || montoNumerico < 1 || montoNumerico > 10000) {
      alert('El monto debe estar entre S/ 1.00 y S/ 10,000.00');
      return;
    }

    localStorage.setItem('montoTransferencia', monto);
    localStorage.setItem('entidadDestino', entidadSeleccionada);
    navigate('/resumen-transferencia');
  };

  return (
    <div className="app-container">
      <div className="header">
        <button onClick={() => navigate(-1)} className="back-btn">‹</button>
        <h2>Transferir a</h2>
        <div className="header-placeholder"></div>
      </div>

      <div className="content seleccionar-monto-content">
        <div className="destinatario-info">
          <h3 className="destinatario-nombre">{destinatario}</h3>
          <p className="destinatario-celular">{celular}</p>
        </div>

        {/* Monto a transferir */}
        <div className="monto-section">
          <h4 className="section-title">1. Monto a transferir:</h4>
          <div className="monto-input-container">
            <span className="moneda-simbolo">S/</span>
            <input
              type="text"
              value={monto}
              onChange={handleMontoChange}
              placeholder="0.00"
              className="monto-input-right"
            />
          </div>
          <p className="monto-rango">(Monto a transferir entre S/ 1.00 y S/ 10,000.00)</p>
        </div>

        {/* Entidad financiera */}
        <div className="entidad-section">
          <h4 className="section-title">2. Entidad financiera a transferir:</h4>

          {/* Banco de la Nación - Fila completa */}
          <div className="entidades-grid">
            <button
              className={`entidad-card entidad-destacada ${
                entidadSeleccionada === entidades[0].nombre ? 'seleccionada' : ''
              }`}
              onClick={() => setEntidadSeleccionada(entidades[0].nombre)}
            >
              <div className="entidad-logo" style={{ color: entidades[0].color }}>
                {entidades[0].logo}
              </div>
              <span className="entidad-nombre">{entidades[0].nombre}</span>
            </button>

            {/* Otras entidades - 3 en fila */}
            <div className="entidades-row">
              {entidades.slice(1).map((entidad, index) => (
                <button
                  key={index}
                  className={`entidad-card entidad-pequena ${
                    entidadSeleccionada === entidad.nombre ? 'seleccionada' : ''
                  }`}
                  onClick={() => setEntidadSeleccionada(entidad.nombre)}
                >
                  <div className="entidad-logo-pequeno" style={{ color: entidad.color }}>
                    {entidad.logo}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Botón Siguiente */}
        <button 
          className="btn-siguiente"
          onClick={handleSiguiente}
          disabled={!monto || !entidadSeleccionada}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default SeleccionarMonto;