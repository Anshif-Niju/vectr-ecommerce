(async () => {
  try {
    const login = await fetch('http://localhost:4000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user@gmail.com', password: '1234' }),
    });
    const loginBody = await login.text();
    console.log('login status', login.status, loginBody);
    if (login.status !== 200) return;
    const token = JSON.parse(loginBody).jwt_token;
    const cart = await fetch('http://localhost:4000/api/cart', {
      headers: { Authorization: token },
    });
    const cartBody = await cart.text();
    console.log('cart status', cart.status, cartBody);
  } catch (err) {
    console.error('error', err);
  }
})();
