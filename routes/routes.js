// TODO: Importar controladores de trabajo, luego vincular rutas con controladores

const { Router } = require("express");
const router = Router();

const {
  renderListatrabajo,
  renderFormNuevaReserva,
  renderFormEditarReserva,
  obtenertrabajo, // Obtener todas
  obtenerReserva, // Obtener un única reserva
  crearReserva,
  actualizarReserva,
  eliminarReserva,
} = require("../controllers/reserva.controllers");

// ==========================================
//         Rutas para renderizar vistas
// ==========================================

// Obtener todas las trabajo localhost:4002/
router.get("/", renderListatrabajo);

// Formulario para crear una reserva
router.get("/crearReserva", renderFormNuevaReserva);

// ==========================================
//         Rutas para CRUD de trabajo
// ==========================================

// Obtener todas las trabajo
router.get("/api", obtenertrabajo);

// Crear una reserva
router.post("/api", crearReserva);

router.get("/api/:id", obtenerReserva);

// Actualizar una reserva
router.put("/api/:id", actualizarReserva);

// Eliminar una reserva de forma lógica
router.delete("/api/:id", eliminarReserva);

// Formulario para actualizar una reserva
router.get("/actualizarReserva/:id", renderFormEditarReserva); // para capturar :id -> req.params.id

module.exports = router;
