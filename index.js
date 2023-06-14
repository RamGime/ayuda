const express = require('express');
const mariadb = require('mariadb');

const app = express();
const port = 3000;

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'contraseña',
  database: 'mydatabase'
});

app.get('/productos', async (req, res) => {
  const conn = await pool.getConnection();
  const rows = await conn.query('SELECT * FROM productos');
  conn.release();
  res.json(rows);
});

app.post('/productos', async (req, res) => {
  const { nombre, precio } = req.body;
  const conn = await pool.getConnection();
  await conn.query('INSERT INTO productos (nombre, precio) VALUES (?, ?)', [nombre, precio]);
  conn.release();
  res.send('Producto creado');
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
