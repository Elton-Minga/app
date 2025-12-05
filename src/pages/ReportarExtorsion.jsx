// src/pages/ReportarExtorsion.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReportarExtorsion() {
  const navigate = useNavigate();
  const maxCaracteres = 500;

  // Estados del formulario
  const [tipoIncidente, setTipoIncidente] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaHecho, setFechaHecho] = useState('');
  const [horaHecho, setHoraHecho] = useState('');
  const [compartirIdentidad, setCompartirIdentidad] = useState(null);
  const [medioContacto, setMedioContacto] = useState('');
  const [contactoExtorsionador, setContactoExtorsionador] = useState('');
  const [archivos, setArchivos] = useState([]);

  // Estados de modales
  const [mostrarModalAviso, setMostrarModalAviso] = useState(false);
  const [mostrarModalExito, setMostrarModalExito] = useState(false);

  // Manejo de archivos
  const handleFileChange = (e) => {
    const nuevosArchivos = Array.from(e.target.files);
    const archivosValidos = nuevosArchivos.filter(file => {
      const esImagen = file.type.startsWith('image/');
      const esPDF = file.type === 'application/pdf';
      const tamanoValido = file.size <= 5 * 1024 * 1024; // 5MB máximo
      return (esImagen || esPDF) && tamanoValido;
    });

    if (archivos.length + archivosValidos.length <= 5) {
      setArchivos([...archivos, ...archivosValidos]);
    } else {
      alert('Máximo 5 archivos permitidos');
    }
  };

  const eliminarArchivo = (index) => {
    setArchivos(archivos.filter((_, i) => i !== index));
  };

  // Validar formulario
  const formularioValido = () => {
    return (
      tipoIncidente &&
      descripcion.trim() &&
      fechaHecho &&
      horaHecho &&
      compartirIdentidad !== null &&
      medioContacto &&
      contactoExtorsionador.trim()
    );
  };

  // Generar ID único para el reporte
  const generarIdReporte = () => {
    const year = new Date().getFullYear();
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `RPT-${year}-${random}${timestamp.toString().slice(-3)}`;
  };

  // Guardar reporte en localStorage
  const guardarReporte = () => {
    const nuevoReporte = {
      id: generarIdReporte(),
      tipo: tipoIncidente === 'fraude' ? 'Fraude' : 'Extorsión',
      fecha: fechaHecho,
      hora: horaHecho,
      estado: 'En revisión',
      descripcion: descripcion.substring(0, 50) + (descripcion.length > 50 ? '...' : ''),
      descripcionCompleta: descripcion,
      compartirIdentidad: compartirIdentidad,
      medioContacto: medioContacto,
      contactoExtorsionador: contactoExtorsionador,
      archivosAdjuntos: archivos.length,
      fechaReporte: new Date().toISOString(),
      tipoOriginal: tipoIncidente
    };

    // Obtener reportes existentes
    const reportesExistentes = JSON.parse(localStorage.getItem('reportes') || '[]');

    // Agregar el nuevo reporte al inicio
    reportesExistentes.unshift(nuevoReporte);

    // Guardar en localStorage
    localStorage.setItem('reportes', JSON.stringify(reportesExistentes));

    console.log('Reporte guardado:', nuevoReporte);
  };

  // Enviar formulario
  const handleEnviar = () => {
    if (formularioValido()) {
      setMostrarModalAviso(true);
    } else {
      alert('Por favor completa todos los campos obligatorios');
    }
  };

  const confirmarEnvio = () => {
    // Guardar el reporte
    guardarReporte();

    // Mostrar modal de éxito
    setMostrarModalAviso(false);
    setMostrarModalExito(true);
  };

  const finalizarReporte = () => {
    setMostrarModalExito(false);
    // Navegar a Mis Reportes para ver el reporte recién creado
    navigate('/mis-reportes');
  };

  return (
    <div className="app-container reporte-container">
      <div className="reporte-header">
        <button onClick={() => navigate('/necesito-ayuda')} className="back-btn-white">
          ‹
        </button>
        <h2>Reportar fraude o extorsión</h2>
      </div>

      <div className="reporte-content">
        {/* Información inicial */}
        <div className="reporte-info-section">
          <h3 className="reporte-titulo">Reporta tu caso</h3>

          <p className="reporte-parrafo">
            Detalla toda la información sobre el fraude o extorsión. La revisión será confidencial.
          </p>

          <p className="reporte-parrafo">
            La información brindada servirá para hacer la investigación correspondiente.
          </p>

          <p className="reporte-parrafo">
            Este canal es exclusivo para casos de fraude o extorsión. Para otros problemas, 
            contacta a nuestros canales oficiales de atención al cliente.
          </p>

          <p className="reporte-nota">
            Nota: Este reporte no genera respuestas automáticas. El banco se pondrá en contacto 
            si es necesario.
          </p>
        </div>

        {/* Formulario */}
        <div className="reporte-form-section">
          <h4 className="form-section-title">Información del reporte</h4>

          {/* Tipo de Incidente */}
          <div className="form-group">
            <label className="form-label">Tipo de incidente *</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="tipoIncidente"
                  value="fraude"
                  checked={tipoIncidente === 'fraude'}
                  onChange={(e) => setTipoIncidente(e.target.value)}
                />
                <span className="radio-custom"></span>
                <span className="radio-label">Fraude</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="tipoIncidente"
                  value="extorsion"
                  checked={tipoIncidente === 'extorsion'}
                  onChange={(e) => setTipoIncidente(e.target.value)}
                />
                <span className="radio-custom"></span>
                <span className="radio-label">Extorsión</span>
              </label>
            </div>
          </div>

          {/* Fecha y Hora */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Fecha del hecho *</label>
              <input
                type="date"
                className="form-input"
                value={fechaHecho}
                onChange={(e) => setFechaHecho(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Hora del hecho *</label>
              <input
                type="time"
                className="form-input"
                value={horaHecho}
                onChange={(e) => setHoraHecho(e.target.value)}
              />
            </div>
          </div>

          {/* Descripción */}
          <div className="form-group">
            <label className="form-label">Descripción del incidente *</label>
            <textarea
              className="reporte-textarea"
              placeholder="Describe detalladamente lo ocurrido. Incluye montos, nombres, lugares y cualquier información relevante..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              maxLength={maxCaracteres}
            />
            <div className="contador-caracteres">
              {descripcion.length}/{maxCaracteres}
            </div>
          </div>

          {/* Medio de Contacto */}
          <div className="form-group">
            <label className="form-label">Medio de contacto del extorsionador/fraude *</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="medioContacto"
                  value="telefono"
                  checked={medioContacto === 'telefono'}
                  onChange={(e) => setMedioContacto(e.target.value)}
                />
                <span className="radio-custom"></span>
                <span className="radio-label">Teléfono</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="medioContacto"
                  value="correo"
                  checked={medioContacto === 'correo'}
                  onChange={(e) => setMedioContacto(e.target.value)}
                />
                <span className="radio-custom"></span>
                <span className="radio-label">Correo electrónico</span>
              </label>
            </div>
          </div>

          {/* Campo de Contacto */}
          {medioContacto && (
            <div className="form-group">
              <label className="form-label">
                {medioContacto === 'telefono' ? 'Número de teléfono' : 'Correo electrónico'} *
              </label>
              <input
                type={medioContacto === 'telefono' ? 'tel' : 'email'}
                className="form-input"
                placeholder={
                  medioContacto === 'telefono' 
                    ? 'Ej: 987654321' 
                    : 'Ej: ejemplo@correo.com'
                }
                value={contactoExtorsionador}
                onChange={(e) => setContactoExtorsionador(e.target.value)}
              />
            </div>
          )}

          {/* Compartir Identidad */}
          <div className="form-group">
            <label className="form-label">
              ¿Desea que su identidad sea compartida con las autoridades? *
            </label>
            <div className="identidad-options">
              <button
                type="button"
                className={`identidad-btn ${compartirIdentidad === true ? 'selected' : ''}`}
                onClick={() => setCompartirIdentidad(true)}
              >
                <span className="identidad-icon">✓</span>
                <div className="identidad-text">
                  <strong>Sí</strong>
                  <span>Compartir mi identidad</span>
                </div>
              </button>
              <button
                type="button"
                className={`identidad-btn ${compartirIdentidad === false ? 'selected' : ''}`}
                onClick={() => setCompartirIdentidad(false)}
              >
                <span className="identidad-icon">✕</span>
                <div className="identidad-text">
                  <strong>No</strong>
                  <span>El reporte se envía con datos mínimos internos</span>
                </div>
              </button>
            </div>
          </div>

          {/* Evidencia */}
          <div className="form-group">
            <label className="form-label">Adjuntar evidencia (opcional)</label>
            <p className="form-help">
              Puedes adjuntar hasta 5 archivos (imágenes o PDF, máx. 5MB c/u)
            </p>

            <div className="upload-area">
              <input
                type="file"
                id="file-upload"
                className="file-input"
                accept="image/*,.pdf"
                multiple
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="upload-label">
                <span className="upload-icon">📎</span>
                <span className="upload-text">Seleccionar archivos</span>
              </label>
            </div>

            {/* Lista de archivos adjuntos */}
            {archivos.length > 0 && (
              <div className="archivos-lista">
                {archivos.map((file, index) => (
                  <div key={index} className="archivo-item">
                    <span className="archivo-icon">
                      {file.type.startsWith('image/') ? '🖼️' : '📄'}
                    </span>
                    <span className="archivo-nombre">{file.name}</span>
                    <span className="archivo-size">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                    <button
                      type="button"
                      className="archivo-delete"
                      onClick={() => eliminarArchivo(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botón Enviar */}
          <button
            className="btn-enviar-reporte"
            onClick={handleEnviar}
            disabled={!formularioValido()}
          >
            Enviar reporte
          </button>
        </div>
      </div>

      {/* Modal Aviso Legal */}
      {mostrarModalAviso && (
        <div className="modal-overlay">
          <div className="modal-content modal-aviso">
            <div className="modal-icon warning">⚠️</div>
            <h3 className="modal-title">Aviso Legal</h3>
            <p className="modal-message">
              El reporte será tratado de forma confidencial. 
              <strong> Presentar denuncias falsas constituye un delito.</strong>
            </p>
            <div className="modal-buttons">
              <button
                className="modal-btn btn-cancelar"
                onClick={() => setMostrarModalAviso(false)}
              >
                Cancelar
              </button>
              <button
                className="modal-btn btn-continuar"
                onClick={confirmarEnvio}
              >
                Continuar envío
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Éxito */}
      {mostrarModalExito && (
        <div className="modal-overlay">
          <div className="modal-content modal-exito">
            <div className="modal-icon success">✓</div>
            <h3 className="modal-title">Reporte registrado</h3>
            <p className="modal-message">
              Su reporte ha sido registrado exitosamente. El banco tomará las medidas 
              correspondientes y notificará a las autoridades competentes.
            </p>
            <button
              className="modal-btn btn-entendido"
              onClick={finalizarReporte}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportarExtorsion;