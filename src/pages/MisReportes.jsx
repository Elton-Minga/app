// src/pages/MisReportes.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function MisReportes() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reportes, setReportes] = useState([]);
  const navigate = useNavigate();

  // Reportes de ejemplo (predeterminados)
  const reportesEjemplo = [
    {
      id: 'RPT-2025-001',
      tipo: 'Extorsión',
      fecha: '2025-12-01',
      hora: '14:30',
      estado: 'En revisión',
      descripcion: 'Llamada amenazante solicitando dinero...',
      esEjemplo: true
    },
    {
      id: 'RPT-2025-002',
      tipo: 'Fraude',
      fecha: '2025-11-28',
      hora: '10:15',
      estado: 'Resuelto',
      descripcion: 'Transacción no autorizada detectada...',
      esEjemplo: true
    },
    {
      id: 'RPT-2025-003',
      tipo: 'Extorsión',
      fecha: '2025-11-25',
      hora: '16:45',
      estado: 'En investigación',
      descripcion: 'Mensaje de WhatsApp con amenazas...',
      esEjemplo: true
    },
    {
      id: 'RPT-2025-004',
      tipo: 'Fraude',
      fecha: '2025-11-20',
      hora: '09:20',
      estado: 'Cerrado',
      descripcion: 'Intento de phishing por correo electrónico...',
      esEjemplo: true
    }
  ];

  // Cargar reportes al montar el componente
  useEffect(() => {
    cargarReportes();
  }, []);

  const cargarReportes = () => {
    // Obtener reportes guardados en localStorage
    const reportesGuardados = JSON.parse(localStorage.getItem('reportes') || '[]');

    // Combinar reportes guardados con ejemplos
    const todosReportes = [...reportesGuardados, ...reportesEjemplo];

    // Ordenar por fecha de reporte (más recientes primero)
    todosReportes.sort((a, b) => {
      const fechaA = new Date(a.fechaReporte || a.fecha);
      const fechaB = new Date(b.fechaReporte || b.fecha);
      return fechaB - fechaA;
    });

    setReportes(todosReportes);
    console.log('Reportes cargados:', todosReportes.length);
  };

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

  // Función para formatear fecha correctamente (sin conversión de zona horaria)
  const formatearFecha = (fechaStr) => {
    // Si la fecha viene en formato YYYY-MM-DD
    const [year, month, day] = fechaStr.split('-').map(Number);

    // Crear fecha en zona horaria local
    const fecha = new Date(year, month - 1, day);

    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleVerDetalle = (reporte) => {
    navigate('/detalle-reporte', { state: { reporte } });
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <button className="menu-btn" onClick={() => setIsSidebarOpen(true)}>
          ☰
        </button>
        <h2>Mis Reportes</h2>
        <div style={{ width: '40px' }}></div>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        usuario={localStorage.getItem('usuario') || 'CIPRA SALINAS EDDER PIER'}
      />

      <div className="main-content reportes-content">
        <div className="reportes-header">
          <div className="reportes-intro">
            <h3 className="reportes-title">Historial de reportes</h3>
            <p className="reportes-subtitle">
              Aquí puedes ver todos los reportes que has realizado
            </p>
          </div>

          <div className="reportes-stats">
            <div className="stat-card">
              <span className="stat-number">{reportes.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">
                {reportes.filter(r => r.estado === 'En revisión' || r.estado === 'En investigación').length}
              </span>
              <span className="stat-label">Activos</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">
                {reportes.filter(r => r.estado === 'Resuelto').length}
              </span>
              <span className="stat-label">Resueltos</span>
            </div>
          </div>
        </div>

        {reportes.length === 0 ? (
          <div className="reportes-empty">
            <div className="empty-icon">📋</div>
            <h3>No tienes reportes</h3>
            <p>Cuando realices un reporte aparecerá aquí</p>
            <button 
              className="btn-nuevo-reporte"
              onClick={() => navigate('/necesito-ayuda')}
            >
              Reportar problema
            </button>
          </div>
        ) : (
          <div className="reportes-lista-container">
            {reportes.map((reporte) => (
              <div key={reporte.id} className="reporte-card">
                <div className="reporte-card-header">
                  <div className="reporte-tipo-badge" style={{ 
                    background: reporte.tipo === 'Fraude' ? '#fee2e2' : '#fef3c7',
                    color: reporte.tipo === 'Fraude' ? '#991b1b' : '#92400e'
                  }}>
                    <span className="reporte-tipo-icon">{getTipoIcon(reporte.tipo)}</span>
                    <span className="reporte-tipo-text">{reporte.tipo}</span>
                  </div>
                  <span className="reporte-id">{reporte.id}</span>
                </div>

                <div className="reporte-card-body">
                  <div className="reporte-info-row">
                    <div className="reporte-info-item">
                      <span className="info-label">📅 Fecha</span>
                      <span className="info-value">
                        {formatearFecha(reporte.fecha)}
                      </span>
                    </div>
                    <div className="reporte-info-item">
                      <span className="info-label">🕐 Hora</span>
                      <span className="info-value">{reporte.hora}</span>
                    </div>
                  </div>

                  <div className="reporte-descripcion">
                    <p>{reporte.descripcion}</p>
                  </div>

                  <div className="reporte-card-footer">
                    <div className="reporte-estado" style={{ 
                      background: `${getEstadoColor(reporte.estado)}15`,
                      color: getEstadoColor(reporte.estado)
                    }}>
                      <span>{getEstadoIcon(reporte.estado)}</span>
                      <span>{reporte.estado}</span>
                    </div>

                    <button
                      className="btn-ver-detalle"
                      onClick={() => handleVerDetalle(reporte)}
                    >
                      Ver detalle
                      <span className="arrow-icon">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button 
          className="btn-nuevo-reporte-floating"
          onClick={() => navigate('/necesito-ayuda')}
        >
          <span className="plus-icon">+</span>
          Nuevo reporte
        </button>
      </div>
    </div>
  );
}

export default MisReportes;