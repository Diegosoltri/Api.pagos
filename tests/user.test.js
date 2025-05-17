const request = require("supertest");
const express = require("express");
const cors = require("cors");
const userRoutes = require("../src/routes/userRoutes");
const prisma = require("../src/prisma");

// Simula una app Express solo para pruebas
const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);

// Limpia la tabla antes de cada prueba (⚠️ solo para pruebas locales)
beforeEach(async () => {
  await prisma.transaccion.deleteMany(); // Primero borra las hijas
  await prisma.usuario.deleteMany();     // Luego borra los padres
});

// Cierra conexión Prisma después de todas las pruebas
afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /users", () => {
  it("debería registrar un nuevo usuario", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        nombre: "Test User",
        correo: "testuser@mail.com"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.nombre).toBe("Test User");
    expect(res.body.correo).toBe("testuser@mail.com");
  });

  it("debería rechazar correos duplicados", async () => {
    // Crea uno primero
    await prisma.usuario.create({
      data: { nombre: "Test", correo: "test@mail.com" },
    });

    // Intenta crear el mismo correo otra vez
    const res = await request(app)
      .post("/users")
      .send({
        nombre: "Otro",
        correo: "test@mail.com",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});