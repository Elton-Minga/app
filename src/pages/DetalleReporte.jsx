// src/pages/DetalleReporte.jsx
import { useNavigate, useLocation } from 'react-router-dom';

function DetalleReporte() {
  const navigate = useNavigate();
  const location = useLocation();
  const reporte = location.state?.reporte;

  // Si no hay reporte, redirigir
  if (!reporte) {
    navigate('/mis-reportes');
    return null;
  }

  const getEstadoColor = (estado) => {
    const colores = {
      'En revisión': '#f59e0b',
      'En investigación': '#3b82f6',
      'Resuelto': '#10b981',
      'Cerrado': '#6b7280'
    };
    return colores[estado] || '#999';
  };

  const getEstadoIcon = (estado) => {
    const iconos = {
      'En revisión': '🔍',
      'En investigación': '⚠️',
      'Resuelto': '✅',
      'Cerrado': '📁'
    };
    return iconos[estado] || '📄';
  };

  const getTipoIcon = (tipo) => {
    return tipo === 'Fraude' ? '🚨' : '⚠️';
  };

  // Datos adicionales simulados
  const detallesAdicionales = {
    medioContacto: 'Teléfono',
    contacto: '987654321',
    compartirIdentidad: 'No',
    fechaHecho: reporte.fecha,
    horaHecho: reporte.hora,
    archivosAdjuntos: [
      { nombre: 'captura_llamada.jpg', size: '125.3 KB', tipo: 'imagen' },
      { nombre: 'conversacion.pdf', size: '230.8 KB', tipo: 'pdf' }
    ],
    timeline: [
      { fecha: reporte.fecha, hora: '14:35', evento: 'Reporte recibido', icon: '✓' },
      { fecha: reporte.fecha, hora: '15:20', evento: 'En revisión por equipo de seguridad', icon: '👁️' },
      { fecha: '2025-12-02', hora: '10:00', evento: 'Notificado a autoridades competentes', icon: '🏛️' }
    ]
  };

  return (
    <div className="app-container detalle-reporte-container">
      <div className="detalle-header">
        <button onClick={() => navigate('/mis-reportes')} className="back-btn-white">
          ‹
        </button>
        <h2>Detalle del Reporte</h2>
        <div style={{ width: '40px' }}></div>
      </div>

      <div className="detalle-content">
        {/* Header del reporte */}
        <div className="detalle-card-header">
          <div className="detalle-top">
            <div className="detalle-tipo-badge" style={{ 
              background: reporte.tipo === 'Fraude' ? '#fee2e2' : '#fef3c7',
              color: reporte.tipo === 'Fraude' ? '#991b1b' : '#92400e'
            }}>
              <span className="detalle-tipo-icon">{getTipoIcon(reporte.tipo)}</span>
              <span className="detalle-tipo-text">{reporte.tipo}</span>
            </div>
            <div className="detalle-estado-badge" style={{ 
              background: `${getEstadoColor(reporte.estado)}`,
              color: 'white'
            }}>
              <span>{getEstadoIcon(reporte.estado)}</span>
              <span>{reporte.estado}</span>
            </div>
          </div>
          <h3 className="detalle-id">Reporte #{reporte.id}</h3>
        </div>

        {/* Información principal */}
        <div className="detalle-section">
          <h4 className="detalle-section-title">📋 Información del incidente</h4>
          <div className="detalle-info-card">
            <div className="detalle-info-row">
              <span className="detalle-label">Tipo de incidente</span>
              <span className="detalle-value">{reporte.tipo}</span>
            </div>
            <div className="detalle-info-row">
              <span className="detalle-label">Fecha del hecho</span>
              <span className="detalle-value">
                {new Date(detallesAdicionales.fechaHecho).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="detalle-info-row">
              <span className="detalle-label">Hora del hecho</span>
              <span className="detalle-value">{detallesAdicionales.horaHecho}</span>
            </div>
            <div className="detalle-info-row">
              <span className="detalle-label">Medio de contacto</span>
              <span className="detalle-value">{detallesAdicionales.medioContacto}</span>
            </div>
            <div className="detalle-info-row">
              <span className="detalle-label">Contacto del extorsionador</span>
              <span className="detalle-value">{detallesAdicionales.contacto}</span>
            </div>
            <div className="detalle-info-row">
              <span className="detalle-label">Identidad compartida</span>
              <span className="detalle-value">{detallesAdicionales.compartirIdentidad}</span>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div className="detalle-section">
          <h4 className="detalle-section-title">📝 Descripción</h4>
          <div className="detalle-descripcion-card">
            <p>{reporte.descripcion}</p>
          </div>
        </div>

        {/* Archivos adjuntos */}
        {detallesAdicionales.archivosAdjuntos.length > 0 && (
          <div className="detalle-section">
            <h4 className="detalle-section-title">📎 Evidencia adjunta</h4>
            <div className="detalle-archivos-lista">
              {detallesAdicionales.archivosAdjuntos.map((archivo, index) => (
                <div key={index} className="detalle-archivo-item">
                  <span className="detalle-archivo-icon">
                    {archivo.tipo === 'imagen' ? '🖼️' : '📄'}
                  </span>
                  <div className="detalle-archivo-info">
                    <span className="detalle-archivo-nombre">{archivo.nombre}</span>
                    <span className="detalle-archivo-size">{archivo.size}</span>
                  </div>
                  <button className="detalle-archivo-download">↓</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="detalle-section">
          <h4 className="detalle-section-title">📅 Línea de tiempo</h4>
          <div className="detalle-timeline">
            {detallesAdicionales.timeline.map((evento, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-icon">{evento.icon}</div>
                <div className="timeline-content">
                  <div className="timeline-evento">{evento.evento}</div>
                  <div className="timeline-fecha">
                    {new Date(evento.fecha).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })} • {evento.hora}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nota informativa */}
        <div className="detalle-nota">
          <div className="nota-icon">ℹ️</div>
          <div className="nota-text">
            <strong>Nota:</strong> El banco está trabajando en tu reporte. 
            Te contactaremos si necesitamos información adicional.
          </div>
        </div>

        {/* Botones de acción */}
        <div className="detalle-acciones">
          <button 
            className="btn-accion-secundario"
            onClick={() => navigate('/mis-reportes')}
          >
            Volver a mis reportes
          </button>
          {reporte.estado !== 'Cerrado' && reporte.estado !== 'Resuelto' && (
            <button className="btn-accion-primario">
              Agregar información
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalleReporte;