const API_URL = 'http://localhost:3000/auth';
const message = document.getElementById('message');

const params = new URLSearchParams(window.location.search);
const token = params.get('token');

async function verify() {
  if (!token) {
    message.textContent = 'Token no encontrado en el enlace.';
    return;
  }

  try {
    const res = await fetch(`${API_URL}/verify-email?token=${token}`);
    const data = await res.json();

    if (res.ok) {
      message.textContent = data.message + ' Ya puedes iniciar sesión.';
    } else {
      message.textContent = data.error || 'No se pudo verificar el correo.';
    }
  } catch (err) {
    message.textContent = 'No se pudo conectar con el servidor.';
  }
}

verify();