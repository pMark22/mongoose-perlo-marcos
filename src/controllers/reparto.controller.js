import { RepartoModel } from "../models/reparto.model.js";
import { PeliculaModel } from "../models/pelicula.model.js";
import { ActorModel } from "../models/actor.model.js";

export const agregarActorAPelicula = async (req, res) => {
  try {
    const { pelicula, actor, personaje } = req.body;

    const peliculaExiste = await PeliculaModel.findOne({
      _id: pelicula,
      activa: true,
    });

    if (!peliculaExiste) {
      return res.status(404).json({
        msg: "La pelicula no existe o esta inactiva",
      });
    }

    const actorExiste = await ActorModel.findOne({
      _id: actor,
      activo: true,
    });

    if (!actorExiste) {
      return res.status(404).json({
        msg: "El actor no existe o esta inactivo",
      });
    }

    const repartoExistente = await RepartoModel.findOne({
      pelicula,
      actor,
      activo: true,
    });

    if (repartoExistente) {
      return res.status(409).json({
        msg: "El actor ya esta relacionado con esta pelicula",
      });
    }

    const nuevoReparto = await RepartoModel.create({
      pelicula,
      actor,
      personaje,
    });

    return res.status(201).json({
      msg: "Actor agregado a la pelicula correctamente",
      data: nuevoReparto,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al agregar el actor a la pelicula",
    });
  }
};

export const obtenerRepartos = async (req, res) => {
  try {
    const repartos = await RepartoModel.find({ activo: true })
      .populate("pelicula")
      .populate("actor");

    return res.status(200).json({
      data: repartos,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al obtener los repartos",
    });
  }
};

export const obtenerReparto = async (req, res) => {
  try {
    const { id } = req.params;

    const reparto = await RepartoModel.findOne({
      _id: id,
      activo: true,
    })
      .populate("pelicula")
      .populate("actor");

    if (!reparto) {
      return res.status(404).json({
        msg: "Relacion de reparto no encontrada",
      });
    }

    return res.status(200).json({
      data: reparto,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al obtener el reparto",
    });
  }
};

export const eliminarReparto = async (req, res) => {
  try {
    const { id } = req.params;

    const reparto = await RepartoModel.findOneAndUpdate(
      { _id: id, activo: true },
      { activo: false },
      { new: true },
    );

    if (!reparto) {
      return res.status(404).json({
        msg: "Relacion de reparto no encontrada",
      });
    }

    return res.status(200).json({
      msg: "Relacion de reparto eliminada logicamente",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al eliminar el reparto",
    });
  }
};
