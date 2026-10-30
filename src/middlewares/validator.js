// fungsi untuk memvalidasi req body, terhadap schema zod
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      status: 400,
      message: result.error.issues[0]?.message || 'Validasi gagal',
    });
  }
  req.body = result.data;
  next();
};