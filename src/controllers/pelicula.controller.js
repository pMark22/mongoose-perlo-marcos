import { PeliculaModel } from "../models/pelicula.model.js";
import { FichaTecnicaModel } from "../models/fichaTecnica.model.js";
import { RepartoModel } from "../models/reparto.model.js";

export const crearPelicula = async (req, res) => {
  try {
    const nuevaPelicula = await PeliculaModel.create(req.body);

    return res.status(201).json({
      msg: "Pelicula creada correctamente",
      data: nuevaPelicula,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al crear la pelicula",
    });
  }
};

export const obtenerPeliculas = async (req, res) => {
  try {
    const peliculas = await PeliculaModel.find({ activa: true }).populate(
      "autor",
    );

    return res.status(200).json({
      data: peliculas,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al obtener las peliculas",
    });
  }
};

export const obtenerPelicula = async (req, res) => {
  try {
    const { id } = req.params;

    const pelicula = await PeliculaModel.findOne({
      _id: id,
      activa: true,
    }).populate("autor");

    if (!pelicula) {
      return res.status(404).json({
        msg: "Pelicula no encontrada",
      });
    }

    return res.status(200).json({
      data: pelicula,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al obtener la pelicula",
    });
  }
};

export const actualizarPelicula = async (req, res) => {
  try {
    const { id } = req.params;

    const peliculaActualizada = await PeliculaModel.findOneAndUpdate(
      { _id: id, activa: true },
      req.body,
      { new: true, runValidators: true },
    );

    if (!peliculaActualizada) {
      return res.status(404).json({
        msg: "Pelicula no encontrada",
      });
    }

    return res.status(200).json({
      msg: "Pelicula actualizada correctamente",
      data: peliculaActualizada,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al actualizar la pelicula",
    });
  }
};

export const eliminarPelicula = async (req, res) => {
  try {
    const { id } = req.params;

    const pelicula = await PeliculaModel.findOneAndUpdate(
      { _id: id, activa: true },
      { activa: false },
      { new: true },
    );

    if (!pelicula) {
      return res.status(404).json({
        msg: "Pelicula no encontrada",
      });
    }

    await FichaTecnicaModel.updateMany(
      { pelicula: id, activo: true },
      { activo: false },
    );

    await RepartoModel.updateMany(
      { pelicula: id, activo: true },
      { activo: false },
    );

    return res.status(200).json({
      msg: "Pelicula y sus relaciones eliminadas logicamente",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al eliminar la pelicula",
    });
  }
};
