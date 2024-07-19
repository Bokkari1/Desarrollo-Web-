const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv'); // Para cargar variables de entorno desde un archivo .env
const app = express();
const PORT = process.env.PORT || 5000;

// Cargar variables de entorno desde un archivo .env
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Ruta para enviar el correo electrónico de recuperación de contraseña
app.post('/api/sendPasswordResetEmail', async (req, res) => {
  const { email } = req.body;

  // Verificar si el correo electrónico está presente en la solicitud
  if (!email) {
    return res.status(400).json({ success: false, message: 'Por favor, proporciona un correo electrónico.' });
  }

  // Configurar el contenido del correo electrónico (usando plantilla HTML)
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Recuperación de Contraseña',
    html: `
      <p>¡Hola!</p>
      <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
      <p>Por favor, sigue este <a href="https://tuweb.com/reset-password">enlace</a> para restablecer tu contraseña.</p>
      <p>Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
      <p>Gracias,</p>
      <p>Equipo de Soporte</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Correo de recuperación enviado exitosamente.' });
  } catch (error) {
    console.error('Error al enviar correo de recuperación:', error);
    res.status(500).json({ success: false, message: 'Error al enviar correo de recuperación. Inténtalo de nuevo más tarde.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
