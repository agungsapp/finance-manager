# Docker Deployment Guide

## Struktur Project untuk Docker Compose

Untuk merge dengan project lain, struktur folder harus seperti ini:

```
project-root/
├── docker-compose.yml
├── sanca_app/
│   └── Dockerfile
├── satu/
│   └── Dockerfile
└── dua/              # <- Finance Manager App (project ini)
    ├── Dockerfile
    ├── .dockerignore
    ├── package.json
    └── ... (semua file project)
```

## Build dan Run dengan Docker

### Build Image
```bash
docker build -t finance-manager .
```

### Run Container Standalone
```bash
docker run -p 8002:80 --name dua_app finance-manager
```

### Run dengan Docker Compose
Setelah di-merge ke project utama dengan struktur di atas, jalankan:

```bash
docker-compose up -d
```

## Environment Variables

Untuk production, pastikan membuat file `.env.production` dengan konfigurasi yang sesuai:

```env
NEXTAUTH_SECRET=your-production-secret-here
NEXTAUTH_URL=http://localhost:8002
DATABASE_URL=file:./sqlite.db
```

**PENTING**: Jangan lupa update `NEXTAUTH_SECRET` dengan value yang aman untuk production!

## Port Mapping

Berdasarkan docker-compose.yml yang diberikan:
- **sanca_app**: Port 8000 (host) → 80 (container)
- **satu_app**: Port 8001 (host) → 80 (container)  
- **dua_app** (Finance Manager): Port 8002 (host) → 80 (container)

Akses aplikasi di: `http://localhost:8002`

## Database SQLite

Database SQLite akan di-copy ke dalam container. Untuk production yang lebih robust, pertimbangkan:
1. Menggunakan Docker volume untuk persist data
2. Atau migrate ke PostgreSQL/MySQL

### Menggunakan Volume (Opsional)
Tambahkan di `docker-compose.yml`:

```yaml
dua:
  build: ./dua
  container_name: dua_app
  ports:
    - "8002:80"
  volumes:
    - ./dua/data:/app/sqlite.db
```

## Troubleshooting

### Container tidak bisa start
```bash
docker logs dua_app
```

### Rebuild setelah perubahan code
```bash
docker-compose build dua
docker-compose up -d dua
```

### Masuk ke dalam container untuk debugging
```bash
docker exec -it dua_app sh
```

## Production Checklist

- [ ] Update `NEXTAUTH_SECRET` dengan value yang aman
- [ ] Update `NEXTAUTH_URL` sesuai domain production
- [ ] Pertimbangkan menggunakan database external (PostgreSQL)
- [ ] Setup backup untuk SQLite database
- [ ] Configure reverse proxy (Nginx/Traefik) jika diperlukan
- [ ] Setup SSL/TLS certificates
- [ ] Configure logging dan monitoring
