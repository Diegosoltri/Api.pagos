const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

// Crear nueva transacción
router.post("/", transactionController.createTransaction);

// Historial por usuario
router.get("/:userId", transactionController.getTransactionsByUser);

// Validar transacción
// Esta ruta valida una transacción pendiente y la marca como validada
router.post("/:id/validate", transactionController.validateTransaction);

module.exports = router;