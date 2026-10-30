import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authenticateToken = async (req, res, next) => {
     try {
          // ambil header Authorization
          const authHeader = req.get('Authorization');
          // parsing value token
          const token = authHeader && authHeader.split(' ')[1];

          // Cek jika token tidak dilampirkan
          if (!token) {
               return res.status(401).json({ message: 'Token tidak ditemukan' });
          }

          // ambil jwt secret di env
          const secretKey = process.env.JWT_SECRET;

          // decode payload jwt
          const decodedPayload = jwt.verify(token, secretKey);
          
          // Simpan data payload ke req.user
          req.user = decodedPayload;
          
          next();
     } catch (err) {
          // Menangani error token kedaluwarsa atau tidak valid
          return res.status(403).json({ message: 'Token tidak valid atau kedaluwarsa' });
     }
}
