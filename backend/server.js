const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3000;

// CORS middleware (importante per React!)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware per il parsing del JSON
app.use(express.json());



// Configurazione connessione
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Micai0mo!',
  database: process.env.DB_NAME || 'site'
});

// Test della connessione
connection.connect((err) => {
  if (err) {
    console.error('❌ Errore di connessione al database:', err.code);
    console.error('Dettagli:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Connessione al database MySQL riuscita!');
    console.log('Database:', connection.config.database);
    console.log('Host:', connection.config.host);
    console.log('User:', connection.config.user);

    // Crea la tabella list se non esiste
    createTableIfNotExists();
  }
});

// Funzione per creare la tabella list se non esiste
function createTableIfNotExists() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS list (
      user VARCHAR(255) NOT NULL,
      todo VARCHAR(255) NOT NULL,
      created VARCHAR(50),
      deadline VARCHAR(50),
      stare TINYINT DEFAULT 0,
    )
  `;

  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('❌ Errore nella creazione della tabella:', err.message);
    } else {
      console.log('✅ Tabella "list" verificata/creata con successo');
      
      // Test query per verificare la tabella
      connection.query('SELECT * from list', (err, results) => {
        if (err) {
          console.error('❌ Errore nella query di test:', err.message);
        } else {
          console.log('✅ Dati registrati:', results.length, 'record trovati');
        }
      });
    }
  });
}

// Test query semplice
connection.query('SELECT * from list', (err, results) => {
  if (err) {
    console.error('❌ Errore nella query di test:', err.message);

  } else {
    console.log('✅ Dati registrati:', results.length, 'record trovati');
  }
});

// Route di test
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'Backend funziona!'
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server in ascolto su http://0.0.0.0:${port}`);
});

app.post('/get-number-of-tasks', (req, res) => {
  const { user } = req.body;
  console.log(`📊 Richiesta conteggio task per utente: ${user}`);

  const query = 'select count(*) as \'number\' from list where user = ? and stare = 0;';
  connection.query(query, [user], (err, results) => {
    if (err) {
      console.error('❌ Errore nella query:', err);
      return res.status(500).json({ error: 'Errore del server', details: err.message });
    }

    console.log('✅ Risultato query:', results[0]);
    res.json(results[0]);
  });
});

app.post('/get-all-tasks-for-user', (req, res) => {
  const { user } = req.body;
  console.log(`📋 Richiesta tutte le task per utente: ${user}`)
  const query = 'select * from list where user = ?;';
  connection.query(query, [user], (err, results) => {
    if (err) {
      console.error('❌ Errore nella query:', err);
      return res.status(500).json({ error: 'Errore del server', details: err.message });
    }

    console.log('✅ Risultato query:', results);
    res.json(results);
  });
});
app.post('/mark-task-as-completed', (req, res) => {
  const { user, todo } = req.body;
  console.log(`✅ Segna come completato il task per utente: ${user}, todo: ${todo}`);

  const query = 'UPDATE list SET stare = 1 WHERE user = ? AND todo = ?;';
  connection.query(query, [user, todo], (err, results) => {
    if (err) {
      console.error('❌ Errore nella query:', err);
      return res.status(500).json({ error: 'Errore del server', details: err.message });
    }

    console.log('✅ Task contrassegnato come completato:', results);
    res.json({ message: 'Task contrassegnato come completato' });
  });
});
app.post('/delete-task', (req, res) => {
  const { user, todo } = req.body;
  console.log(`✅ Segna come eliminato utente: ${user}, todo: ${todo}`);

  const query = 'DELETE FROM list WHERE user = ? AND todo = ?;';
  connection.query(query, [user, todo], (err, results) => {
    if (err) {
      console.error('❌ Errore nella query:', err);
      return res.status(500).json({ error: 'Errore del server', details: err.message });
    }

    console.log('✅ Task eliminato:', results);
    res.json({ message: 'Task eliminato' });
  });
});
app.post('/add-new-task', (req, res) => {
  const { user, todo, created, deadline } = req.body;
  console.log(`➕ Aggiungi nuovo task per utente: ${user}, todo: ${todo}`);
  const query = 'INSERT INTO list (user, todo, created, deadline, stare) VALUES (?, ?, ?, ?, 0);';
  connection.query(query, [user, todo, created, deadline], (err, results) => {
    if (err) {
      console.error('❌ Errore nella query:', err);
      return res.status(500).json({ error: 'Errore del server', details: err.message });
    }

    console.log('✅ Nuovo task aggiunto:', results);
    res.json({ message: 'Nuovo task aggiunto', taskId: results.insertId });
  });
});