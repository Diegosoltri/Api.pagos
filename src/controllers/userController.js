const prisma = require("../prisma");

/**
 * Registra un nuevo usuario en la base de datos.
 * 
 * @route POST /users
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.body.nombre - Nombre del usuario.
 * @param {string} req.body.correo - Correo electrónico único del usuario.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} Usuario creado o error de validación.
 */
exports.registerUser = async (req, res) => {
  const { nombre, correo } = req.body;
  try {
    const usuario = await prisma.usuario.create({
      data: { nombre, correo },
    });
    res.status(201).json(usuario);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Correo duplicado o datos inválidos" });
  }
};

/**
 * Obtiene la lista de todos los usuarios registrados.
 * 
 * @route GET /users
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Array} Lista de usuarios o error del servidor.
 */
exports.getAllUsers = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.status(200).json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};