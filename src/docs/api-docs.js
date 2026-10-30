// Spec dokumentasi menggunakan SwaggerUI
const swaggerSpec = {
     openapi: '3.0.0',
     info: { title: 'REST API Widya', version: '1.0.0', description: 'Dokumentasi REST API Test Software Engineer Intern Widya Robotics' },
     components: {
          securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } }
     },
     paths: {
          '/api/auth/register': {
               post: {
                    tags: ['Auth'],
                    summary: 'Register akun user baru',
                    requestBody: {
                         required: true,
                         content: {
                              'application/json': {
                                   schema: {
                                        type: 'object',
                                        required: ['name', 'email', 'password', 'gender'],
                                        properties: {
                                             name: { type: 'string', example: 'Budi Santoso' },
                                             email: { type: 'string', example: 'budi@example.com' },
                                             password: { type: 'string', example: 'Password@123' },
                                             gender: { type: 'string', enum: ['MALE', 'FEMALE'], example: 'MALE' }
                                        }
                                   }
                              }
                         }
                    },
                    responses: {
                         201: { description: 'Register User Berhasil' },
                         400: { description: 'Validasi gagal atau email sudah terdaftar' }
                    }
               }
          },
          '/api/auth/login': {
               post: {
                    tags: ['Auth'],
                    summary: 'Login user untuk mendapatkan token JWT',
                    requestBody: {
                         required: true,
                         content: {
                              'application/json': {
                                   schema: {
                                        type: 'object',
                                        required: ['email', 'password'],
                                        properties: {
                                             email: { type: 'string', example: 'budi@example.com' },
                                             password: { type: 'string', example: 'Password@123' }
                                        }
                                   }
                              }
                         }
                    },
                    responses: {
                         200: { description: 'Login Berhasil (mengembalikan JWT token)' },
                         400: { description: 'Validasi gagal' },
                         401: { description: 'Email atau password salah' }
                    }
               }
          },
          '/api/user/my-profile': {
               get: {
                    tags: ['User'],
                    summary: 'Ambil data profil user yang sedang login',
                    security: [{ bearerAuth: [] }],
                    responses: {
                         200: { description: 'Berhasil mengambil profil' },
                         401: { description: 'Token tidak ditemukan' },
                         403: { description: 'Token tidak valid atau kedaluwarsa' },
                         404: { description: 'User tidak ditemukan' }
                    }
               }
          }
     }
};

// fungsi dokumentasi utama swagger
export const swaggerDocs = (req, res) => {
     return res.type('html').send(
     `<!DOCTYPE html>
     <html>
          <head>
               <meta charset="utf-8" />
               <title>API Docs - REST API Widya</title>
               <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
          </head>
          <body>
               <div id="swagger-ui"></div>
               <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
               <script>window.onload = () => SwaggerUIBundle({ spec: ${JSON.stringify(swaggerSpec)}, dom_id: '#swagger-ui' });</script>
          </body>
     </html>`
     );
}