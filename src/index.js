// Importa dependencias principales
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Importa las rutas del sistema
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

// Inicializa la aplicación Express
const app = express();

// Define el puerto (desde variable de entorno o 3000 por defecto)
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors()); // Permite peticiones desde otros orígenes
app.use(express.json()); // Habilita parsing de JSON en body

// Ruta raíz de prueba
app.get("/", (req, res) => {
  res.send("API de sistema de pagos funcionando");
});

// Monta el módulo de usuarios en /users
app.use("/users", userRoutes);

// Monta el módulo de transacciones en /transactions
app.use("/transactions", transactionRoutes);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});