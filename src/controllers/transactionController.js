const prisma = require("../prisma");

// Crear nueva transacción
exports.createTransaction = async (req, res) => {
  const { monto, estado, usuarioId } = req.body;

  try {
    // Verifica que el usuario exista
    const usuario = await prisma.usuario.findUnique({ where: { id: usuarioId } });
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const nueva = await prisma.transaccion.create({
      data: { monto, estado, usuarioId },
    });

    res.status(201).json(nueva);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear transacción" });
  }
};

// Obtener historial de un usuario
exports.getTransactionsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const transacciones = await prisma.transaccion.findMany({
      where: { usuarioId: userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(transacciones);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener historial" });
  }
};

exports.validateTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaccion = await prisma.transaccion.findUnique({
      where: { id }
    });

    if (!transaccion) {
      return res.status(404).json({ error: "Transacción no encontrada" });
    }

    if (transaccion.estado !== "pendiente") {
      return res.status(400).json({ error: "La transacción ya fue validada o no es válida para esta operación" });
    }

    const actualizada = await prisma.transaccion.update({
      where: { id },
      data: { estado: "validada" }
    });

    res.status(200).json(actualizada);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al validar transacción" });
  }
};