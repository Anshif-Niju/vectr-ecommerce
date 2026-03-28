const axios = require('axios');
(async () => {
  try {
    const r = await axios.post('http://localhost:4000/api/user/login', {
      email: 'user@gmail.com',
      password: '1234',
    });
    console.log('token', r.data);
    const t = r.data.jwt_token;
    const c = await axios.get('http://localhost:4000/api/cart', {
      headers: { Authorization: t },
    });
    console.log('cart', c.status, c.data);
  } catch (err) {
    console.error(
      'err',
      err.response ? err.response.status : err.message,
      err.response ? err.response.data : undefined,
    );
  }
})();
