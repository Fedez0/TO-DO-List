# 📝 TO-DO List App

Una moderna applicazione TO-DO List costruita con React, Node.js, MySQL e Docker.

## 🛠️ Tecnologie Utilizzate

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

### DevOps & Tools
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

### Package Managers
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

</div>

## 🚀 Caratteristiche

- ✅ **Frontend React** con Bootstrap per un design responsive
- ✅ **Backend Node.js** con Express e API REST
- ✅ **Database MySQL** per la persistenza dei dati
- ✅ **Docker Compose** per deployment facile
- ✅ **Modal interattivi** per creare nuove task
- ✅ **Real-time updates** con chiamate API
- ✅ **Font San Francisco** di Apple per un look moderno

## 🏗️ Architettura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   React + Vite  │◄──►│  Node.js + API  │◄──►│     MySQL       │
│   Port: 80      │    │   Port: 3000    │    │   Port: 3306    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Prerequisiti

Prima di iniziare, assicurati di avere installato:

- [Docker](https://www.docker.com/get-started) (versione 20.0+)
- [Docker Compose](https://docs.docker.com/compose/install/) (versione 2.0+)

## 🔧 Installazione e Setup

### 1. Clona il repository

```bash
git clone https://github.com/Fedez0/TO-DO-List.git
cd TO-DO-List
```

### 2. Verifica la struttura del progetto

```
TO-DO List/
├── src/                    # Frontend React
│   ├── main.jsx
│   ├── Wrapper.jsx
│   ├── Title.jsx
│   ├── TaskNumber.jsx
│   ├── Tasks.jsx
│   ├── ButtonTODO.jsx
│   └── Modal.jsx
├── backend/                # Backend Node.js
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── style/                  # CSS Files
├── docker-compose.yml      # Docker Compose configuration
├── dockerfile              # Frontend Dockerfile
├── dockerfile.dev          # Development Dockerfile
└── README.md
```

## 🐳 Comandi Docker

### Avvio dell'applicazione

#### Ambiente di Produzione
```bash
# Avvia tutti i servizi
docker-compose up -d

# Con rebuild forzato
docker-compose up -d --build
```

#### Ambiente di Sviluppo
```bash
# Avvia in modalità sviluppo con hot reload
docker-compose --profile dev up -d --build
```

#### Avvio di servizi singoli
```bash
# Solo backend
docker-compose up -d --build backend

# Solo database
docker-compose up -d db

# Solo frontend produzione
docker-compose up -d --build to-do-list-prod
```

### Gestione dei container

```bash
# Visualizza container attivi
docker-compose ps

# Visualizza logs
docker-compose logs backend
docker-compose logs -f to-do-list-dev  # follow mode

# Ferma tutti i servizi
docker-compose down

# Ferma e rimuove volumi
docker-compose down -v

# Ricostruisci senza cache
docker-compose build --no-cache
```

### Debug e troubleshooting

```bash
# Accedi al container backend
docker exec -it to-do-list-backend sh

# Accedi al database MySQL
docker exec -it <mysql-container-name> mysql -u root -p

# Visualizza tutti i container
docker ps -a

# Rimuovi container e immagini
docker system prune -a
```

## 🌐 Accesso all'applicazione

Una volta avviati i container:

| Servizio | URL | Descrizione |
|----------|-----|-------------|
| **Frontend Produzione** | http://localhost:80 | Interfaccia utente principale |
| **Frontend Sviluppo** | http://localhost:80 | Con hot reload per sviluppo |
| **Backend API** | http://localhost:3000 | API REST per gestione task |
| **Database** | localhost:3306 | MySQL database |

### Test dell'API

```bash
# Test connessione backend
curl http://localhost:3000/health

# Ottieni tutte le task per un utente
curl -X POST http://localhost:3000/get-all-tasks-for-user \
  -H "Content-Type: application/json" \
  -d '{"user": "rico"}'

# Ottieni numero di task pendenti
curl -X POST http://localhost:3000/get-number-of-tasks \
  -H "Content-Type: application/json" \
  -d '{"user": "rico"}'
```

## 🗄️ Database

### Configurazione MySQL

```yaml
Database: site
Username: root
Password: Micai0mo!
Host: db (internal), localhost:3306 (external)
```

### Schema della tabella

```sql
CREATE TABLE list (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(255) NOT NULL,
  task VARCHAR(255) NOT NULL,
  stare TINYINT DEFAULT 0,  -- 0: pending, 1: completed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📱 Utilizzo

### Creare una nuova task

1. Clicca sul pulsante **"New task"**
2. Inserisci il titolo della task nel modal
3. Clicca **"Create Task"**
4. La task verrà salvata nel database

### Visualizzare le task

- Il contatore delle task si aggiorna automaticamente
- Le task vengono visualizzate nel componente Tasks
- I dati sono visibili nella console del browser per debug

## 🎨 Personalizzazione

### Colori dell'interfaccia

Il design usa una palette personalizzata:

```css
--primary-color: #3F72AF;
--background-color: #DBE2EF;
--border-color: #3F72AF;
```

### Font

L'app utilizza il font San Francisco di Apple:

```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
```

## 🔧 Sviluppo

### Struttura dei componenti React

```
App (Wrapper)
├── Title - Titolo dell'applicazione
├── TaskNumber - Contatore task pendenti
├── Tasks - Lista delle task
└── ButtonTODO - Pulsante e Modal per nuove task
    └── Modal - Form per creare task
```

### API Endpoints

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| `GET` | `/health` | Health check del server |
| `POST` | `/get-all-tasks-for-user` | Ottieni tutte le task di un utente |
| `POST` | `/get-number-of-tasks` | Conteggio task pendenti |
| `POST` | `/add-new-task` | Crea una nuova task |

## 🐛 Troubleshooting

### Problemi comuni

#### "Cannot find module 'mysql2'"
```bash
# Ricostruisci il backend
docker-compose up -d --build backend
```

#### "Loading infinito"
- Verifica che il backend sia in esecuzione: `docker-compose ps`
- Controlla i logs: `docker-compose logs backend`
- Verifica la connessione database

#### "Modal non si apre"
- Assicurati che Bootstrap JS sia caricato nel `main.jsx`
- Verifica la console del browser per errori JavaScript

#### "Database connection failed"
```bash
# Verifica il container MySQL
docker-compose logs db

# Riavvia il database
docker-compose restart db
```

## 📸 Screenshots

### Interfaccia principale
![Main Interface](https://via.placeholder.com/600x400/DBE2EF/3F72AF?text=Main+Interface)

### Modal per nuove task
![New Task Modal](https://via.placeholder.com/500x300/FFFFFF/3F72AF?text=Create+New+Task)

### Lista delle task
![Task List](https://via.placeholder.com/600x300/F8F9FA/3F72AF?text=Task+List)

## 🤝 Contribuire

1. Fork del progetto
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## 📞 Supporto

Per supporto e domande:

- 🐛 **Issues**: [GitHub Issues](your-repo-url/issues)
- 📧 **Email**: your-email@example.com
- 💬 **Discord**: Your Discord Server

---

⭐ **Metti una stella al progetto se ti è piaciuto!**