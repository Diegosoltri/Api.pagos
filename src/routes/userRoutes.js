const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Crear nuevo usuario
router.post("/", userController.registerUser);
// Obtener todos los usuarios
router.get("/", userController.getAllUsers);

module.exports = router;