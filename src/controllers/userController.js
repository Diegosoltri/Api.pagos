const prisma = require("../prisma");

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

exports.getAllUsers = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.status(200).json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};