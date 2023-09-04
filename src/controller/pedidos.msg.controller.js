const { Client } = require("whatsapp-web.js");
const qrcode = require('qrcode-terminal');

class PedidosMsg {
  constructor() {
    this.cliente = new Client();
    this.cliente.on('qr', (qrCode) => {
      console.log('Escanea este código QR con WhatsApp:');
      qrcode.generate(qrCode, { small: true });
    });
    
    this.cliente.on('ready', () => {
      console.log("Cliente logeado");
      
      // Número de teléfono de la dueña
      const numeroDuenia = '72884186'; // Reemplaza con el número correcto
      
      // Lista de productos seleccionados
      const productosSeleccionados = [
        'Producto 1',
        'Producto 2',
        'Producto 3'
      ];
      
      // Crear el mensaje con la lista de productos
      const mensaje = `Productos seleccionados:\n${productosSeleccionados.join('\n')}`;
      
      // Enviar el mensaje a la dueña
      this.cliente.sendMessage(numeroDuenia, mensaje)
        .then((response) => {
          console.log('Mensaje enviado con éxito:', response);
        })
        .catch((error) => {
          console.error('Error al enviar el mensaje:', error);
        });
    });

    this.cliente.initialize();
  }
}

// Crear una instancia de la clase
module.exports =PedidosMsg
