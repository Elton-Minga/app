// src/pages/NecesitoAyuda.jsx
import { useNavigate } from 'react-router-dom';

function NecesitoAyuda() {
  const navigate = useNavigate();
  const monto = localStorage.getItem('montoTransferencia') || '0.00';

  const problemas = [
    { texto: 'No llega el yapeo que envié', icono: '›' },
    { texto: 'Me equivoqué al yapear', icono: '›' },
    { texto: 'Cobraron mi yapeo más de una vez', icono: '›' },
    { texto: 'No reconozco yapeo', icono: '›' },
    { texto: 'Reportar extorsión', icono: '›', ruta: '/reportar-extorsion' }
  ];

  const handleOptionClick = (problema) => {
    if (problema.ruta) {
      navigate(problema.ruta);
    } else {
      alert(`Seleccionaste: ${problema.texto}`);
    }
  };

  return (
    <div className="app-container ayuda-container">
      <div className="ayuda-header">
        <button onClick={() => navigate('/transferencia-exitosa')} className="back-btn-white">
          ‹
        </button>
      </div>

      <div className="ayuda-content">
        <h2 className="ayuda-title">¿Qué problema tuviste con este movimiento?</h2>

        <div className="movimiento-card">
          <div className="movimiento-info-header">
            <span className="movimiento-numero">*** *** 618</span>
            <span className="movimiento-monto-neg">- S/ {parseFloat(monto).toFixed(2)}</span>
          </div>
          <span className="movimiento-fecha">Ayer 10:08 pm</span>
        </div>

        <div className="problemas-lista">
          {problemas.map((problema, index) => (
            <button
              key={index}
              className="problema-item"
              onClick={() => handleOptionClick(problema)}
            >
              <span className="problema-texto">{problema.texto}</span>
              <span className="problema-arrow">{problema.icono}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NecesitoAyuda;