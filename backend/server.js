const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
// NOTA: Usamos 'mysql-db' que es el nombre del contenedor de la base de datos
const db = mysql.createConnection({
  host: 'mysql-db', // ← ¡ESTA ES LA COMUNICACIÓN ENTRE CONTENEDORES!
  user: 'root',
  password: 'password',
  database: 'todolist'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error conectando a la BD:', err);
    // Reintentar conexión después de 2 segundos
    setTimeout(() => db.connect(), 2000);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Obtener todas las tareas
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Agregar una nueva tarea
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'El título es requerido' });
  }
  
  db.query('INSERT INTO tasks (title) VALUES (?)', [title], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: results.insertId, title, completed: false });
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${port}`);
});