// src/pages/DetalleMovimiento.jsx
import { useNavigate, useLocation } from 'react-router-dom';

function DetalleMovimiento() {
  const navigate = useNavigate();
  const location = useLocation();
  const movimiento = location.state?.movimiento;

  // Si no hay movimiento, redirigir
  if (!movimiento) {
    navigate('/mis-cuentas');
    return null;
  }

  const handleCompartir = () => {
    alert('Función de compartir constancia');
  };

  const handleDescargar = () => {
    alert('Descargando constancia...');
  };

  const handleNecesitoAyuda = () => {
    navigate('/necesito-ayuda');
  };

  const getTipoIcon = (tipo) => {
    return tipo === 'ingreso' ? '📥' : '📤';
  };

  const getTipoLabel = (tipo) => {
    return tipo === 'ingreso' ? 'Ingreso' : 'Egreso';
  };

  return (
    <div className="app-container detalle-movimiento-container">
      <header className="app-header">
        <button onClick={() => navigate('/mis-cuentas')} className="back-btn">
          ‹
        </button>
        <h2>Detalle de movimiento</h2>
        <button className="share-btn-header" onClick={handleCompartir}>
          🔗
        </button>
      </header>

      <div className="detalle-mov-content">
        {/* Header del movimiento */}
        <div className="detalle-mov-header">
          <div className={`tipo-badge ${movimiento.tipo}`}>
            <span className="tipo-icon">{getTipoIcon(movimiento.tipo)}</span>
            <span className="tipo-text">{getTipoLabel(movimiento.tipo)}</span>
          </div>
          <div className={`monto-destacado ${movimiento.tipo}`}>
            {movimiento.monto}
          </div>
        </div>

        {/* Información principal */}
        <div className="detalle-mov-card">
          <div className="detalle-mov-section">
            <h4 className="section-title">📋 Información de la operación</h4>

            <div className="info-grid">
              <div className="info-item">
                <span className="info-item-label">Fecha</span>
                <span className="info-item-value">{movimiento.fecha}</span>
              </div>

              {movimiento.hora && (
                <div className="info-item">
                  <span className="info-item-label">Hora</span>
                  <span className="info-item-value">{movimiento.hora}</span>
                </div>
              )}

              <div className="info-item full-width">
                <span className="info-item-label">Descripción</span>
                <span className="info-item-value">{movimiento.descripcion}</span>
              </div>

              {movimiento.numeroOperacion && (
                <div className="info-item full-width">
                  <span className="info-item-label">Nro. operación</span>
                  <span className="info-item-value monospace">{movimiento.numeroOperacion}</span>
                </div>
              )}

              {movimiento.destinatario && (
                <div className="info-item full-width">
                  <span className="info-item-label">Beneficiario</span>
                  <span className="info-item-value">{movimiento.destinatario}</span>
                </div>
              )}

              {movimiento.entidad && (
                <div className="info-item full-width">
                  <span className="info-item-label">Entidad destino</span>
                  <span className="info-item-value">{movimiento.entidad}</span>
                </div>
              )}

              {movimiento.celular && (
                <div className="info-item">
                  <span className="info-item-label">Nro. celular</span>
                  <span className="info-item-value">{movimiento.celular}</span>
                </div>
              )}

              <div className="info-item full-width">
                <span className="info-item-label">Cuenta</span>
                <div className="cuenta-info">
                  <span className="cuenta-icon">››</span>
                  <span>Banco de la Nación</span>
                </div>
              </div>

              {movimiento.comision !== undefined && (
                <div className="info-item">
                  <span className="info-item-label">Comisión</span>
                  <span className="info-item-value">{movimiento.comision}</span>
                </div>
              )}

              <div className="info-item">
                <span className="info-item-label">Monto {movimiento.tipo === 'ingreso' ? 'recibido' : 'enviado'}</span>
                <span className={`info-item-value monto-resaltado ${movimiento.tipo}`}>
                  {movimiento.monto}
                </span>
              </div>

              {movimiento.numeroTransferencia && (
                <div className="info-item full-width">
                  <span className="info-item-label">Nro. transferencia</span>
                  <span className="info-item-value monospace">{movimiento.numeroTransferencia}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Estado de la operación */}
        <div className="detalle-mov-estado">
          <div className="estado-icon">✓</div>
          <div className="estado-text">
            <strong>Operación completada</strong>
            <span>La transacción se realizó exitosamente</span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="detalle-mov-acciones">
          <button className="btn-accion" onClick={handleDescargar}>
            <span className="btn-icon">📄</span>
            <span>Descargar constancia</span>
          </button>

          <button className="btn-accion" onClick={handleCompartir}>
            <span className="btn-icon">📤</span>
            <span>Compartir</span>
          </button>
        </div>

        {/* Nota informativa */}
        <div className="detalle-mov-nota">
          <span className="nota-icon">ℹ️</span>
          <span className="nota-texto">
            Puedes consultar tus movimientos en cualquier momento desde "Mis cuentas"
          </span>
        </div>

        {/* Botón volver */}
        <button className="btn-volver-cuentas" onClick={() => navigate('/mis-cuentas')}>
          Volver a mis cuentas
        </button>

        {/* Botón Necesito ayuda */}
        <button className="btn-necesito-ayuda-detalle" onClick={handleNecesitoAyuda}>
          <span className="ayuda-icon">🎧</span>
          <span>Necesito ayuda</span>
        </button>
      </div>
    </div>
  );
}

export default DetalleMovimiento;