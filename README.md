# Rest API Test Software Engineer Intern

## Endpoint Live Utama
project ini sudah di deploy, menggunakan VM dari Microsoft Azure dengan URL:
https://test.fachriakbar.me/

## Dokumentasi API
Untuk mengetahui endpoint yang tersedia beserta contoh request, skema body, dan response-nya, jalankan aplikasi lalu buka dokumentasi interaktif Swagger UI di browser pada alamat:
https://test.fachriakbar.me/api/docs


## Deskripsi Folder dan file

```text
restapi-widya/
├── migrations/                              # Riwayat migrasi dan snapshot skema database (Prisma 8)
├── src/
│   ├── controllers/
│   │   ├── authController.js                # Logika bisnis autentikasi
│   │   └── userController.js                # Logika bisnis profil pengguna
│   ├── docs/
│   │   └── api-docs.js                      # Konfigurasi spesifikasi OpenAPI/Swagger
│   ├── middlewares/
│   │   ├── validation/
│   │   │   ├── schema/
│   │   │   │   └── password.js              # Skema validasi aturan kompleksitas password
│   │   │   ├── loginValidation.js           # Skema validasi request body login
│   │   │   └── registerValidation.js        # Skema validasi request body register
│   │   ├── auth.js                          # Middleware verifikasi token JWT Bearer
│   │   └── validator.js                     # Helper middleware untuk mengeksekusi skema Zod
│   ├── prisma/
│   │   ├── contract.prisma                  # Definisi model/skema tabel database
│   │   ├── contract.json                    # Hasil kompilasi kontrak skema
│   │   ├── contract.d.ts                    # Definisi tipe TypeScript kontrak (auto-generated)
│   │   └── db.js                            # Inisialisasi koneksi client database Prisma Postgres
│   ├── routes/
│   │   ├── authRoutes.js                    # Definisi endpoint autentikasi
│   │   └── userRoutes.js                    # Definisi endpoint pengguna
│   └── index.js                             # Entry point utama aplikasi
├── .env.example                             # Template variabel environment
├── docker-compose.yml                       # Konfigurasi container database PostgreSQL 17
├── package.json                             # Daftar dependensi dan script npm
├── prisma.config.ts                         # Konfigurasi CLI Prisma 8
└── tsconfig.json                            # Konfigurasi TypeScript untuk Prisma & type-checking
```


## Menjalankan App di Local

### Cloning Repository
lakukan cloning repository ke local device menggunakan:
```bash
git clone https://github.com/RyyzDev/restapi-test-widya
```

lalu masuk ke folder:
```bash
cd restapi-test-widya
```

### Dependensi
sebelum install dependensi, pastikan node dan npm terinstall di device, verifikasi:
```bash
node -v
```
```bash
npm -v
```

jika node dan npm ada, gunakan perintah berikut di terminal Anda untuk menginstall semua dependensi yang diperlukan oleh proyek ini:

```bash
npm install
```

### Environment
salin file contoh konfigurasi lingkungan `.env.example` menjadi `.env`, value konfigurasi sudah sesuai dengan db container pada docker-compose.yml, sehingga tidak perlu di edit lagi:

```bash
cp .env.example .env
```

untuk running database container pastikan di device terinstall **docker**, cukup jalankan:
``` bash
docker compose up -d
```

verifikasi container:
``` bash
docker compose ps
```

atau, gunakan url yang sudah kamu siapkan sebelumnya, dan ganti value DB_URL pada file `.env`

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
