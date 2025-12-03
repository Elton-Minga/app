// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MisCuentas from './pages/MisCuentas';
import TransferirCelular from './pages/TransferirCelular';
import SeleccionarMonto from './pages/SeleccionarMonto';
import ResumenTransferencia from './pages/ResumenTransferencia';
import TransferenciaExitosa from './pages/TransferenciaExitosa';
import NecesitoAyuda from './pages/NecesitoAyuda';
import ReportarExtorsion from './pages/ReportarExtorsion';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mis-cuentas" element={<MisCuentas />} />
        <Route path="/transferir-celular" element={<TransferirCelular />} />
        <Route path="/seleccionar-monto" element={<SeleccionarMonto />} />
        <Route path="/resumen-transferencia" element={<ResumenTransferencia />} />
        <Route path="/transferencia-exitosa" element={<TransferenciaExitosa />} />
        <Route path="/necesito-ayuda" element={<NecesitoAyuda />} />
        <Route path="/reportar-extorsion" element={<ReportarExtorsion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;