const Reserva = require("../models/Reserva");
const ctrl = {};

ctrl.renderListaReservas = (req, res) => {
  res.render("listadoReserva");
};

ctrl.renderFormNuevaReserva = (req, res) => {
  res.render("nuevaReserva");
};

ctrl.renderFormEditarReserva = (req, res) => {
  const { id } = req.params;
  res.render("editarReserva", { id });
};

// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas de la tabla reservas
// SELECT * FROM reservas WHERE estado=true
ctrl.obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      where: {
        estado: true,
      },
    });

    return res.json(reservas);
  } catch (error) {
    console.log("Error al obtener las reservas", error);
    return res.status(500).json({
      message: "Error al obtener las reservas",
    });
  }
};

// Obtener los datos de una reserva a través de la Primary Key (Pk)
ctrl.obtenerReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findByPk(id);
    return res.json(reserva);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al obtener la reserva",
    });
  }
};

// Crear una reserva
ctrl.crearReserva = async (req, res) => {
  const {
    nombre,
    apellido,
    fecha_ingreso,
    fecha_salida,
    cantidad_personas,
    telefono,
    email,
  } = req.body; // JSON.stringify(reserva);

  try {
    // Se crea una nueva instancia de reserva
    const nuevaReserva = new Reserva({
      nombre,
      apellido,
      fecha_ingreso,
      fecha_salida,
      cantidad_personas,
      codigo: new Date().getTime(),
      telefono,
      email,
    });

    // Se guarda en la BD
    await nuevaReserva.save();

    return res.status(201).json({ message: "Reserva creada con éxito" });
  } catch (error) {
    console.log("Error al crear la reserva", error);
    return res.status(500).json({ message: "Error al crear la reserva" });
  }
};

// Actualizar una reserva
ctrl.actualizarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findByPk(id);
    await reserva.update(req.body);
    return res.json({
      message: "Reserva actualizada exitosamente",
    });
  } catch (error) {
    console.log("Error al actualizar la reserva", error);
    return res.status(500).json({
      message: "Error al actualizar la reserva",
    });
  }
};

// Eliminar una reserva de forma lógica
ctrl.eliminarReserva = async (req, res) => {
  const { id } = req.params;
  try {
    const reserva = await Reserva.findByPk(id);
    await reserva.update({ estado: false });
    return res.json({ message: "Reserva se eliminó correctamente" });
  } catch (error) {
    console.log("Error al eliminar la reserva", error);
    return res.status(500).json({
      message: "Error al eliminar la reserva",
    });
  }
};

module.exports = ctrl;
