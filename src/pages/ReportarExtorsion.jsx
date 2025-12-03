// src/pages/ReportarExtorsion.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReportarExtorsion() {
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();
  const maxCaracteres = 200;

  const handleEnviar = () => {
    if (descripcion.trim()) {
      alert('Reporte enviado exitosamente. Nos pondremos en contacto contigo.');
      navigate('/mis-cuentas');
    } else {
      alert('Por favor ingresa una descripción del problema');
    }
  };

  return (
    <div className="app-container reporte-container">
      <div className="reporte-header">
        <button onClick={() => navigate('/necesito-ayuda')} className="back-btn-white">
          ‹
        </button>
        <h2>Reportar extorsión</h2>
      </div>

      <div className="reporte-content">
        <div className="reporte-info-section">
          <h3 className="reporte-titulo">Reporta tu caso</h3>

          <p className="reporte-parrafo">
            Detalla toda la información sobre la extorsión. La revisión será confidencial y 100% anónima.
          </p>

          <p className="reporte-parrafo">
            La información brindada servirá para hacer la investigación.
          </p>

          <p className="reporte-parrafo">
            Este canal es solo para casos de extorsión, si tienes otro problema con tu Yape, repórtalo por los canales oficiales de atención al cliente.
          </p>

          <p className="reporte-parrafo">
            Te recordamos que realizar un reporte de extorsión falso es un delito.
          </p>

          <p className="reporte-nota">
            Nota: este reporte no genera respuestas automáticas.
          </p>
        </div>

        <div className="reporte-form-section">
          <h4 className="form-section-title">Información del reporte</h4>

          <div className="textarea-container">
            <textarea
              className="reporte-textarea"
              placeholder="Descripción del reporte (puedes incluir monto y fecha si lo deseas)"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              maxLength={maxCaracteres}
            />
            <div className="contador-caracteres">
              {descripcion.length}/{maxCaracteres}
            </div>
          </div>

          <button 
            className="btn-enviar-reporte"
            onClick={handleEnviar}
            disabled={!descripcion.trim()}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportarExtorsion;