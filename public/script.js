const API = 'http://localhost:4832';

const showResponse = (data) => {
  document.getElementById('response').innerText = JSON.stringify(data, null, 2);
};

const signup = async () => {
  const res = await fetch(`${API}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: document.getElementById('name').value,
      email: document.getElementById('email-signup').value,
      phone: document.getElementById('phone').value,
      password: document.getElementById('password-signup').value,
    }),
  });
  showResponse(await res.json());
};

const login = async () => {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: document.getElementById('email-login').value,
      password: document.getElementById('password-login').value,
    }),
  });
  showResponse(await res.json());
};

const sendOTP = async () => {
  const res = await fetch(`${API}/auth/otp/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: document.getElementById('otp-email').value }),
  });
  showResponse(await res.json());
};

const verifyOTP = async () => {
  const res = await fetch(`${API}/auth/otp/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: document.getElementById('otp-email').value,
      otp: document.getElementById('otp-code').value,
    }),
  });
  showResponse(await res.json());
};
