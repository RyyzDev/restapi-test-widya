// import pool koneksi database
import { db } from '../prisma/db.js';

// fungsi get my profile
export const getMyProfile = async (req, res, next) => {
     try {
          // ambil user id pada payload jwt
          const userId = req.user.id; 

          // Ambil data user dari database menggunakan Prisma
          const user = await db.orm.public.User
               .where({ id: userId })
               .select('id', 'name', 'email', 'gender')
               .first();

          // kondisi jika user tidak ditemukan
          if (!user) {
               return res.status(404).json({ message: 'User tidak ditemukan' });
          }

          // response
          return res.status(200).json({
               status: 200,
               message: 'Berhasil mengambil profil',
               data: user
          });

     } catch (err) {
          // Oper error ke global error handler Express
          next(err); 
     }
}
