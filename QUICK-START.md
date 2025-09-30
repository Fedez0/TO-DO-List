# 🚀 Quick Start Guide

## Comandi Essenziali

### 🏃‍♂️ Avvio Rapido

```bash
# Clona e avvia tutto
git clone <repo-url>
cd TO-DO-List
docker-compose up -d --build
```

🌐 **Vai su**: http://localhost:80

### 📋 Comandi Principali

| Comando | Descrizione |
|---------|-------------|
| `docker-compose up -d` | Avvia tutti i servizi |
| `docker-compose up -d --build` | Avvia con rebuild |
| `docker-compose down` | Ferma tutto |
| `docker-compose ps` | Mostra container attivi |
| `docker-compose logs backend` | Logs del backend |

### 🔧 Debug

```bash
# Logs in tempo reale
docker-compose logs -f backend

# Accedi al container
docker exec -it to-do-list-backend sh

# Test API
curl http://localhost:3000/health
```

### 🗄️ Database

```bash
# Accedi a MySQL
docker exec -it <mysql-container> mysql -u root -p
# Password: Micai0mo!

# Visualizza tabelle
USE site;
SHOW TABLES;
SELECT * FROM list;
```

### 🔄 Reset Completo

```bash
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```