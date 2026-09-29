const API_URL = 'http://localhost:3000/auth';

const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const message = document.getElementById('message');
const authForms = document.getElementById('auth-forms');
const dashboard = document.getElementById('dashboard');
const userEmail = document.getElementById('user-email');

function showMessage(text) {
  message.textContent = text;
}

async function checkSession() {
  try {
    const res = await fetch(`${API_URL}/me`, { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      userEmail.textContent = data.user.email;
      authForms.style.display = 'none';
      dashboard.style.display = 'block';
    } else {
      authForms.style.display = 'block';
      dashboard.style.display = 'none';
    }
  } catch (err) {
    showMessage('No se pudo conectar con el servidor');
  }
}

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;

  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();

  if (res.ok) {
    showMessage('Registro exitoso. Ahora inicia sesión.');
    registerForm.reset();
  } else {
    showMessage(data.error || 'Error al registrar');
  }
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();

  if (res.ok) {
    showMessage('');
    loginForm.reset();
    checkSession();
  } else {
    showMessage(data.error || 'Error al iniciar sesión');
  }
});

logoutBtn.addEventListener('click', async () => {
  await fetch(`${API_URL}/logout`, { method: 'POST', credentials: 'include' });
  showMessage('Sesión cerrada');
  checkSession();
});

checkSession();