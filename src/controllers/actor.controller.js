import { ActorModel } from "../models/actor.model.js";
import { RepartoModel } from "../models/reparto.model.js";

export const crearActor = async (req, res) => {
  try {
    const nuevoActor = await ActorModel.create(req.body);

    return res.status(201).json({
      msg: "Actor creado correctamente",
      data: nuevoActor,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al crear el actor",
    });
  }
};

export const obtenerActores = async (req, res) => {
  try {
    const actores = await ActorModel.find({ activo: true });

    return res.status(200).json({
      data: actores,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al obtener los actores",
    });
  }
};

export const obtenerActor = async (req, res) => {
  try {
    const { id } = req.params;

    const actor = await ActorModel.findOne({
      _id: id,
      activo: true,
    });

    if (!actor) {
      return res.status(404).json({
        msg: "Actor no encontrado",
      });
    }

    return res.status(200).json({
      data: actor,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al obtener el actor",
    });
  }
};

export const actualizarActor = async (req, res) => {
  try {
    const { id } = req.params;

    const actorActualizado = await ActorModel.findOneAndUpdate(
      { _id: id, activo: true },
      req.body,
      { new: true, runValidators: true },
    );

    if (!actorActualizado) {
      return res.status(404).json({
        msg: "Actor no encontrado",
      });
    }

    return res.status(200).json({
      msg: "Actor actualizado correctamente",
      data: actorActualizado,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al actualizar el actor",
    });
  }
};

export const eliminarActor = async (req, res) => {
  try {
    const { id } = req.params;

    const actor = await ActorModel.findOneAndUpdate(
      { _id: id, activo: true },
      { activo: false },
      { new: true },
    );

    if (!actor) {
      return res.status(404).json({
        msg: "Actor no encontrado",
      });
    }

    await RepartoModel.updateMany(
      { actor: id, activo: true },
      { activo: false },
    );

    return res.status(200).json({
      msg: "Actor y sus relaciones eliminados logicamente",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al eliminar el actor",
    });
  }
};
