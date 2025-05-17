# 💳 API REST - Sistema de Pagos

Esta API REST permite gestionar usuarios y transacciones de pago. Incluye endpoints para registrar usuarios, iniciar pagos, consultar historial y validar transacciones.

---

## 🚀 Funcionalidades

- Registrar nuevos usuarios.
- Iniciar una transacción de pago.
- Consultar el historial de transacciones de un usuario.
- Validar que una transacción esté autorizada antes de procesarla.

---

## 🛠 Tecnologías utilizadas

- **Node.js** + **Express**
- **Prisma ORM**
- **PostgreSQL**
- **Jest** + **Supertest** (pruebas unitarias)
- **CI/CD** con GitHub Actions 
- Despliegue en [Render/Railway] (agrega link si lo haces)

---

## 📦 Instalación local

1. Clona el repositorio:

```bash
git clone https://github.com/Diegosoltri/Api.pagos.git
cd api.pagos

```
2.	Instala dependencias:
```bash
npm install
```


3.	Crea un archivo .env y agrega tu conexión a PostgreSQL:
```bash
DATABASE_URL="postgresql://pagos_user:supersegura123@localhost:5432/mydb?schema=public"
```

4. Ejecuta las migraciones:
```bash
npx prisma migrate dev --name init
```

5. Inicia el servidor en desarrollo:
```bash
npm run dev
```

---

## 📬 Endpoints disponibles

## 👤 Usuarios

### POST /users

Registrar un nuevo usuario

Body (JSON):
```bash
{
  "nombre": "Ana Torres",
  "correo": "ana@mail.com"
}
```

---

### GET /users

Obtener todos los usuarios registrados.

---

## 💰 Transacciones

### POST /transactions

Iniciar una nueva transacción de pago

Body (JSON):
```bash
{
  "monto": 150.0,
  "estado": "pendiente",
  "usuarioId": "ID_DEL_USUARIO"
}
```

---

### GET /transactions/:userId

Consultar el historial de transacciones de un usuario

Ejemplo:
```bash
GET /transactions/f47b26f8-1234-4567-8910-abcdef123456
```

---

### POST /transactions/:id/validate

Validar una transacción pendiente (cambiar su estado a "validada")

Ejemplo:
```bash
POST /transactions/1234abcd-5678-efgh-9101-ijklmnopqrst/validate
```

---

## 🧪 Pruebas

Para ejecutar las pruebas unitarias:
```bash
npm test
```
## 📌 Pruebas incluidas:
- ✅ Registro de usuarios correctamente.
- ❌ Rechazo de usuarios con correos duplicados.
- ✅ Creación de transacciones.
- ✅ Validación de transacciones solo si están pendientes.
- ❌ Rechazo de validación si ya fueron validadas.
- ❌ Error 404 si se intenta validar una transacción inexistente.

---