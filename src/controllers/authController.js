// panggil pool koneksi db prisma
import { db } from '../prisma/db.js';
// import package hashing bcrypt
import bcrypt from 'bcrypt';
// import package
import jwt from 'jsonwebtoken'
// import dotenv
import 'dotenv/config'

// panggil jwt secret di file .env
const jwtSecret = process.env.JWT_SECRET;
// kondisi jika value jwt_secret di .env belum ada
if (!jwtSecret) {
    throw new Error('JWT secret Belum di set')
}

// putaran algoritma enkripsi
const SALT_ROUNDS = 10;

// method register akun user
const register = async (req, res, next) => {
    try {
        // ambil key request body http
        const { name, email, gender, password } = req.body;

        // hashing password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // insert user ke database
        const user = await db.orm.public.User.create({
            name: name,
            email: email,
            gender: gender,
            password: hashedPassword
        })

        // pemisahan password dari data user hasil query database
        const { id, name: createdName, email: createdEmail, gender: createdGender } = user;

        // objek baru khusus untuk response tanpa menyertakan password
        const responseData = {
            id,
            name: createdName,
            email: createdEmail,
            gender: createdGender
        };

        // response
        return res.status(201).json({
            status: 201,
            message: "Register User Berhasil",
            data: responseData
        });


    } catch (err) {
        // handling erorr
        if (err.code === 'P2002' || (err.message && err.message.includes('unique'))) {
            return res.status(400).json({
                status: 400,
                message: "Email sudah terdaftar, silakan gunakan email lain."
            });
        }
        // teruskan ke client
        next(err)
    }
}

const login = async (req, res, next) => {
    try {

        // ambil key dari req body http 
        const { email, password } = req.body;


        // ambil user dari database
        const user = await db.orm.public.User.where({ email }).first();

        // verifikasi password dengan bcrypt
        const isPasswordValid = user && (await bcrypt.compare(password, user.password));
        if (!isPasswordValid) {
            return res.status(401).json({
                status: 401,
                message: "Email atau password salah"
            });
        }

        // tandatangani JWT
        const payload = { id: user.id }
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' })

        // destructuring response
        const responseData = {
            id: user.id,
            name: user.name,
            gender: user.gender
        }

        // response
        return res.status(200).json({
            status: 200,
            message: 'Login Berhasil',
            token: token,
            data: responseData
        })

    } catch (err) {
        next(err)
    }
}

export {
    login,
    register
}