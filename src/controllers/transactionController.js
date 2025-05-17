const prisma = require("../prisma");

/**
 * Crea una nueva transacción de pago para un usuario.
 * 
 * @route POST /transactions
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {number} req.body.monto - Monto de la transacción.
 * @param {string} req.body.estado - Estado inicial (ej. "pendiente").
 * @param {string} req.body.usuarioId - ID del usuario relacionado.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} Transacción creada o mensaje de error.
 */
exports.createTransaction = async (req, res) => {
  const { monto, estado, usuarioId } = req.body;

  try {
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

/**
 * Obtiene el historial de transacciones de un usuario.
 * 
 * @route GET /transactions/:userId
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.params.userId - ID del usuario.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Array} Lista de transacciones o error del servidor.
 */
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

/**
 * Valida una transacción pendiente y actualiza su estado a "validada".
 * 
 * @route POST /transactions/:id/validate
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.params.id - ID de la transacción.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} Transacción validada o mensaje de error.
 */
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