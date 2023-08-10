const trabajo = require("../models/trabajo");
const ctrl = {};

ctrl.renderListatrabajo = (req, res) => {
  res.render("listadotrabajo");
};

ctrl.renderFormNuevatrabajo = (req, res) => {
  res.render("nuevatrabajo");
};

ctrl.renderFormEditar = (req, res) => {
  const { id } = req.params;
  res.render("editartrabajo", { id });
};

ctrl.obtener = async (req, res) => {
  try {
    const trabajo = await trabajo.findAll({
      where: {
        estado: true,
      },
    });

    return res.json(trabajo);
  } catch (error) {
    console.log("Error al obtener los trabajos", error);
    return res.status(500).json({
      message: "Error al obtener los trabajos",
    });
  }
};

// Obtener los datos de una trabajo a través de la Primary Key (Pk)
ctrl.obtenertrabajo = async (req, res) => {
  try {
    const { id } = req.params;
    const trabajo = await trabajo.findByPk(id);
    return res.json(trabajo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al obtener los trabajos",
    });
  }
};

// Crearuna trabajo
ctrl.creartrabajo = async (req, res) => {
  const {
    nombre,
    apellido,
    fecha_ingreso,
    fecha_salida,
    cantidad_personas,
    telefono,
    email,
  } = req.body;

  try {
    // Se crea una nueva instancia
    const nuevatrabajo = new trabajo({
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
    await nuevatrabajo.save();

    return res.status(201).json({ message: "creada con éxito" });
  } catch (error) {
    console.log("Error al crear", error);
    return res.status(500).json({ message: "Error al crear" });
  }
};

// Actualizar
ctrl.actualizartrabajo = async (req, res) => {
  try {
    const { id } = req.params;
    const trabajo = await trabajo.findByPk(id);
    await trabajo.update(req.body);
    return res.json({
      message: "trabajo actualizada exitosamente",
    });
  } catch (error) {
    console.log("Error al actualizar", error);
    return res.status(500).json({
      message: "Error al actualizar",
    });
  }
};

// Eliminar de forma lógica
ctrl.eliminartrabajo = async (req, res) => {
  const { id } = req.params;
  try {
    const trabajo = await trabajo.findByPk(id);
    await trabajo.update({ estado: false });
    return res.json({ message: "se eliminó correctamente" });
  } catch (error) {
    console.log("Error al eliminar", error);
    return res.status(500).json({
      message: "Error al eliminar",
    });
  }
};

module.exports = ctrl;
