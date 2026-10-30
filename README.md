# Rest API Test Software Engineer Intern

## Instalasi

### Dependensi
gunakan perintah berikut di terminal Anda untuk menginstall semua dependensi yang diperlukan oleh proyek ini:

```bash
npm install
```

### Environment
salin file contoh konfigurasi lingkungan `.env.example` menjadi `.env`, value konfigurasi sudah sesuai dengan db container pada docker-compose.yml, sehingga tidak perlu di edit lagi:

```bash
cp .env.example .env
```

untuk running database container, cukup jalankan:
``` bash
docker compose up -d
```

verifikasi container:
``` bash
docker compose ps
```

### Inisialisasi Database (Prisma 8)
Setelah langkah-langkah diatas dilakukan, jalankan rangkaian perintah berikut secara berurutan untuk menyiapkan database:

1. **Kompilasi Kontrak Skema:**
   ```bash
   npx prisma contract emit
   ```
2. **Buat Rencana Migrasi:**
   ```bash
   npx prisma migration plan --name init_db
   ```
3. **Terapkan Migrasi ke Database:**
   ```bash
   npx prisma db migrate --advance-ref db
   ```

### Menjalankan Aplikasi
Untuk menjalankan server aplikasi dalam mode pengembangan (*development mode*), gunakan perintah:

```bash
npm run dev
```

jika production mode, jalankan perintah berikut:
```bash
npm run start
```
