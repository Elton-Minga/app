// src/pages/TransferenciaExitosa.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function TransferenciaExitosa() {
  const navigate = useNavigate();
  const movimientoGuardado = useRef(false); // Flag para evitar duplicados

  const destinatario = localStorage.getItem('destinatario');
  const monto = localStorage.getItem('montoTransferencia');
  const entidad = localStorage.getItem('entidadDestino');
  const celular = localStorage.getItem('celularDestinatario');

  // Generar número de operación y fecha actual
  const numeroOperacion = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  const fecha = new Date().toLocaleString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const numeroTransferencia = '000000000' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

  // Guardar movimiento en localStorage cuando se carga la pantalla (solo una vez)
  useEffect(() => {
    if (!movimientoGuardado.current) {
      guardarMovimiento();
      movimientoGuardado.current = true;
    }
  }, []);

  const guardarMovimiento = () => {
    // Crear objeto del movimiento
    const nuevoMovimiento = {
      id: Date.now(), // ID único basado en timestamp
      fecha: new Date().toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      hora: new Date().toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      descripcion: `Transferencia a ${destinatario}`,
      monto: `-${parseFloat(monto).toFixed(2)}`,
      tipo: 'egreso',
      numeroOperacion: numeroOperacion,
      destinatario: destinatario,
      entidad: entidad,
      celular: celular,
      comision: 'Gratis',
      numeroTransferencia: numeroTransferencia
    };

    // Obtener movimientos existentes
    const movimientosExistentes = JSON.parse(localStorage.getItem('movimientos') || '[]');

    // Verificar que no exista ya este movimiento (por ID único)
    const yaExiste = movimientosExistentes.some(mov => mov.id === nuevoMovimiento.id);

    if (!yaExiste) {
      // Agregar el nuevo movimiento al inicio
      movimientosExistentes.unshift(nuevoMovimiento);

      // Guardar en localStorage
      localStorage.setItem('movimientos', JSON.stringify(movimientosExistentes));

      // Actualizar el saldo
      const saldoActual = parseFloat(localStorage.getItem('saldo') || '0');
      const nuevoSaldo = saldoActual - parseFloat(monto);
      localStorage.setItem('saldo', nuevoSaldo.toFixed(2));
    }
  };

  const handleFinalizar = () => {
    navigate('/mis-cuentas');
  };

  const handleCompartir = () => {
    alert('Función de compartir');
  };

  const handleNecesitoAyuda = () => {
    navigate('/necesito-ayuda');
  };

  return (
    <div className="app-container exitosa">
      <button onClick={handleCompartir} className="share-btn">
        🔗
      </button>

      <div className="exitosa-container">
        <div className="success-icon">✓</div>
        <h2>¡Gracias, {localStorage.getItem('usuario')}!</h2>
        <p className="success-message">La operación fue realizada con éxito</p>

        <div className="operacion-card">
          <div className="operacion-header">
            <span>Nro. operación: {numeroOperacion}</span>
            <span>{fecha}</span>
          </div>

          <h1 className="monto-final">S/ {parseFloat(monto).toFixed(2)}</h1>

          <div className="operacion-detalle">
            <div className="detalle-row">
              <span className="label">Entidad destino:</span>
              <span className="value">{entidad}</span>
            </div>
            <div className="detalle-row">
              <span className="label">Beneficiario:</span>
              <span className="value">{destinatario}</span>
            </div>
            <div className="detalle-row">
              <span className="label">Nro. celular:</span>
              <span className="value">{celular}</span>
            </div>
            <div className="detalle-row">
              <span className="label">Cuenta origen:</span>
              <div className="banco-logo">
                <span>››</span> Banco de la Nación
              </div>
            </div>
            <div className="detalle-row">
              <span className="label">Comisión:</span>
              <span className="value">Gratis</span>
            </div>
            <div className="detalle-row">
              <span className="label">Monto cargado:</span>
              <span className="value">S/ {parseFloat(monto).toFixed(2)}</span>
            </div>
            <div className="detalle-row">
              <span className="label">Nro. transferencia:</span>
              <span className="value">{numeroTransferencia}</span>
            </div>
          </div>
        </div>

        <div className="guardar-operacion">
          <label>
            <input type="checkbox" />
            <span>Guardar operación frecuente</span>
          </label>
        </div>

        <button className="btn-listo" onClick={handleFinalizar}>
          ¡Listo!
        </button>

        <button className="btn-necesito-ayuda" onClick={handleNecesitoAyuda}>
          <span className="ayuda-icon">🎧</span>
          <span>Necesito ayuda</span>
        </button>
      </div>
    </div>
  );
}

export default TransferenciaExitosa;