import axios from 'axios';

(async () => {
  try {
    const base = 'http://localhost:4000/api';
    const reg = await axios.post(`${base}/users/register`, {
      username: 'adminuser2',
      email: 'adminuser2@example.com',
      password: 'P@ssw0rd123',
    });
    console.log('register', reg.data);

    const login = await axios.post(`${base}/users/login`, {
      email: 'adminuser2@example.com',
      password: 'P@ssw0rd123',
    });
    console.log('login', login.data);

    const token = login.data.jwt_token;
    const me = await axios.get(`${base}/users/me`, {
      headers: { Authorization: 'Bearer ' + token },
    });
    console.log('me', me.data);

    const cart = await axios.get(`${base}/cart`, {
      headers: { Authorization: 'Bearer ' + token },
    });
    console.log('cart', cart.data);
  } catch (error) {
    console.error(
      'ERR',
      error.response?.status,
      error.response?.data || error.message,
    );
  }
})();
