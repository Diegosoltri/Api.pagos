const request = require("supertest");
const express = require("express");
const cors = require("cors");
const transactionRoutes = require("../src/routes/transactionRoutes");
const prisma = require("../src/prisma");

// App para pruebas
const app = express();
app.use(cors());
app.use(express.json());
app.use("/transactions", transactionRoutes);

let transaccionPendiente;
let transaccionValidada;

// Antes de cada prueba
beforeEach(async () => {
  await prisma.transaccion.deleteMany();
  await prisma.usuario.deleteMany();

  // Crear un usuario
  const usuario = await prisma.usuario.create({
    data: { nombre: "Tester", correo: "tester@mail.com" },
  });

  // Transacción pendiente
  transaccionPendiente = await prisma.transaccion.create({
    data: {
      monto: 100,
      estado: "pendiente",
      usuarioId: usuario.id,
    },
  });

  // Transacción ya validada
  transaccionValidada = await prisma.transaccion.create({
    data: {
      monto: 200,
      estado: "validada",
      usuarioId: usuario.id,
    },
  });
});

// Cerrar conexión
afterAll(async () => {
  await prisma.$disconnect();
});

// Agrupa las pruebas relacionadas con la validación de transacciones
describe("POST /transactions/:id/validate", () => {
    /**
   * Valida que una transacción con estado "pendiente" pueda ser validada correctamente.
   */
  it("debería validar una transacción pendiente", async () => {
    const res = await request(app)
      .post(`/transactions/${transaccionPendiente.id}/validate`);

    expect(res.statusCode).toBe(200);
    expect(res.body.estado).toBe("validada");
  });

  /**
   * Verifica que una transacción ya validada no se pueda volver a validar.
   */
  it("no debería validar una transacción ya validada", async () => {
    const res = await request(app)
      .post(`/transactions/${transaccionValidada.id}/validate`);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  /**
   * Verifica que el servidor responda con 404 si la transacción no existe.
   */
  it("debería devolver 404 si la transacción no existe", async () => {
    const res = await request(app)
      .post("/transactions/12345678-0000-0000-0000-nonexistent/validate");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});