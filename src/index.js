// import package
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// inisialisasi express
const app = express();
// ambil variabel Port di .env
const port = process.env.PORT;

// konfigurasi cors
const corsOptions = {
     origin: "*", // mengizinkan semua origin
     optionsSuccessStatus: 200
}

/* 
     Middlewares
*/

//cors
app.use(cors(corsOptions));
//json body parsing
app.use(express.json());

/*
  Routes
*/
// import file route
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

// prefix dan inisialisasi route
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


/*
  Dokumentasi API
*/
// import dokumentasi
import { swaggerDocs } from './docs/api-docs.js'
// route
app.get('/api/docs', swaggerDocs);


// init server
app.listen(port, () => {
     console.log("Server Berjalan di http://localhost:"+port);
});