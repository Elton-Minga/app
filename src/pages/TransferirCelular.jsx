// src/pages/TransferirCelular.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TransferirCelular() {
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();
  const saldo = localStorage.getItem('saldo') || '0.00';

  const contactos = [
    { nombre: 'Abel', numero: '945911443' },
    { nombre: 'Abel Casa De Los Ensueños Azul', numero: '946526644' },
    { nombre: 'Abraham THB', numero: '912382065' },
    { nombre: 'Adam Tour Morada', numero: '953498828' },
    { nombre: 'Adriana', numero: '991178882' },
    { nombre: 'Adriana Lenes', numero: '934789327' },
    { nombre: 'Adriana Quispe', numero: '989160954' },
    { nombre: 'Al Que Prestare', numero: '934591226' },
    { nombre: 'Alanis Belcorp', numero: '922359874' },
  ];

  const contactosFiltrados = contactos.filter(c => 
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.numero.includes(busqueda)
  );

  const handleSelectContact = (contacto) => {
    localStorage.setItem('destinatario', contacto.nombre);
    localStorage.setItem('celularDestinatario', contacto.numero);
    navigate('/seleccionar-monto');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <button onClick={() => navigate('/mis-cuentas')} className="back-btn">
          ‹
        </button>
        <h2>Transferir a celular</h2>
        <button className="star-btn">⭐</button>
      </header>

      <div className="transfer-container">
        <div className="cuenta-origen">
          <h4>1. Cuenta origen:</h4>
          <div className="cuenta-box">
            <div>
              <p className="cuenta-label">Cuenta ahorro soles</p>
              <p className="cuenta-num">04-140-784287</p>
            </div>
            <div className="saldo-info">
              <p className="saldo-amount">S/ {saldo}</p>
              <p className="saldo-label">saldo disponible</p>
            </div>
          </div>
        </div>

        <div className="destinatario-section">
          <h4>2. Destinatario / Beneficiario:</h4>
          
          <div className="search-container">
            <input
              type="text"
              placeholder="Busca o ingresa el celular"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="search-input"
            />
            <button className="qr-btn">
              <span>⊞</span> Pago QR
            </button>
          </div>

          <div className="contactos-lista">
            {contactosFiltrados.map((contacto, index) => (
              <button
                key={index}
                className="contacto-item"
                onClick={() => handleSelectContact(contacto)}
              >
                <div className="contacto-avatar">👤</div>
                <div className="contacto-info">
                  <p className="contacto-nombre">{contacto.nombre}</p>
                  <p className="contacto-numero">{contacto.numero}</p>
                </div>
                <div className="check-circle">✓</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferirCelular;
