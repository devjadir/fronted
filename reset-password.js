const API_URL = 'http://localhost:3000/auth';
const form = document.getElementById('reset-form');
const message = document.getElementById('message');

const params = new URLSearchParams(window.location.search);
const token = params.get('token');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById('password').value;

  if (!token) {
    message.textContent = 'Token no encontrado en el enlace.';
    return;
  }

  const res = await fetch(`${API_URL}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password })
  });
  const data = await res.json();

  message.textContent = data.message || data.error;
});