// src/data/datosEjemplo.js
const datosEjemplo = {
  usuarios: [
    {
      id: 1,
      nombre: "CIPRA SALINAS EDDER PIER",
      dni: "72345678",
      cuentaNumero: "04-140-784287",
      cuentaCompleta: "4214 10** **** 1502",
      saldo: 916.43,
      claveInternet: "123456"
    },
    {
      id: 2,
      nombre: "HUARCAYA DIAZ LUZ ADRIANA",
      dni: "45678901",
      cuentaNumero: "04-150-892345",
      cuentaCompleta: "4215 08** **** 2345",
      saldo: 2450.80,
      claveInternet: "654321"
    },
    {
      id: 3,
      nombre: "GARCIA LOPEZ JUAN CARLOS",
      dni: "78901234",
      cuentaNumero: "04-160-345678",
      cuentaCompleta: "4216 03** **** 5678",
      saldo: 5780.25,
      claveInternet: "789456"
    }
  ],

  movimientos: [
    { fecha: "03/12/2025", hora: "14:23", descripcion: "Transferencia recibida", monto: "+78.92", tipo: "ingreso", numero_operacion: "45621" },
    { fecha: "03/12/2025", hora: "11:45", descripcion: "Devolución de compra", monto: "+146.01", tipo: "ingreso", numero_operacion: "45622" },
    { fecha: "02/12/2025", hora: "18:30", descripcion: "Retiro en cajero", monto: "-486.19", tipo: "egreso", numero_operacion: "45623" },
    { fecha: "02/12/2025", hora: "15:12", descripcion: "Transferencia enviada", monto: "-613.69", tipo: "egreso", numero_operacion: "45624" },
    { fecha: "02/12/2025", hora: "09:45", descripcion: "Transferencia recibida", monto: "+195.40", tipo: "ingreso", numero_operacion: "45625" },
    { fecha: "01/12/2025", hora: "16:20", descripcion: "Pago de servicios", monto: "-85.50", tipo: "egreso", numero_operacion: "45626" },
    { fecha: "01/12/2025", hora: "12:30", descripcion: "Compra en comercio", monto: "-125.00", tipo: "egreso", numero_operacion: "45627" },
    { fecha: "30/11/2025", hora: "10:15", descripcion: "Depósito en efectivo", monto: "+500.00", tipo: "ingreso", numero_operacion: "45628" },
    { fecha: "29/11/2025", hora: "14:50", descripcion: "Pago en tienda online", monto: "-230.45", tipo: "egreso", numero_operacion: "45629" },
    { fecha: "28/11/2025", hora: "08:30", descripcion: "Cobro de sueldo", monto: "+2500.00", tipo: "ingreso", numero_operacion: "45630" }
  ],

  contactos: [
    { nombre: "Abel Ramirez", numero: "945911443", banco: "BCP" },
    { nombre: "Abel Casa De Los Ensueños Azul", numero: "946526644", banco: "Interbank" },
    { nombre: "Abraham THB", numero: "912382065", banco: "BBVA" },
    { nombre: "Adam Tour Morada", numero: "953498828", banco: "Scotiabank" },
    { nombre: "Adriana Flores", numero: "991178882", banco: "Yape" },
    { nombre: "Adriana Lenes", numero: "934789327", banco: "Plin" },
    { nombre: "Adriana Quispe", numero: "989160954", banco: "Banco de la Nación" },
    { nombre: "Al Que Prestare", numero: "934591226", banco: "BCP" },
    { nombre: "Alanis Belcorp", numero: "922359874", banco: "Interbank" },
    { nombre: "Alberto Fernandez", numero: "987654321", banco: "BBVA" },
    { nombre: "Alejandra Martinez", numero: "965432109", banco: "Yape" },
    { nombre: "Alfonso Ruiz", numero: "978123456", banco: "Scotiabank" },
    { nombre: "Andrea Gonzales", numero: "980865438", banco: "Plin" },
    { nombre: "Andrea Jimenez", numero: "932145678", banco: "BCP" },
    { nombre: "Angelica Torres", numero: "921345987", banco: "Interbank" },
    { nombre: "Antonio Vargas", numero: "956789012", banco: "BBVA" },
    { nombre: "Bruno Castillo", numero: "943210987", banco: "Yape" },
    { nombre: "Carlos Mendoza", numero: "987321654", banco: "Banco de la Nación" },
    { nombre: "Carmen Silva", numero: "965123789", banco: "Scotiabank" },
    { nombre: "Cesar Morales", numero: "978456321", banco: "Plin" }
  ],

  entidades_bancarias: [
    { nombre: "Banco de la Nación", codigo: "BN", comision: 0.00 },
    { nombre: "BCP", codigo: "BCP", comision: 0.00 },
    { nombre: "Interbank", codigo: "IB", comision: 0.00 },
    { nombre: "BBVA", codigo: "BBVA", comision: 0.00 },
    { nombre: "Scotiabank", codigo: "SB", comision: 0.00 },
    { nombre: "Yape", codigo: "YAPE", comision: 0.00 },
    { nombre: "Plin", codigo: "PLIN", comision: 0.00 }
  ],

  tipo_cambio: { compra: 3.37, venta: 3.40 }
};

export default datosEjemplo;
