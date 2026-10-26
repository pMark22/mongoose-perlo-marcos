import { AutorModel } from "../models/autor.model.js";
import { PeliculaModel } from "../models/pelicula.model.js";
import { FichaTecnicaModel } from "../models/fichaTecnica.model.js";
import { RepartoModel } from "../models/reparto.model.js";

export const crearAutor = async (req, res) => {
  try {
    const autor = new AutorModel(req.body);
    await autor.save();

    res.status(201).json(autor);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el autor",
      error: error.message,
    });
  }
};

export const obtenerAutores = async (req, res) => {
  try {
    const autores = await AutorModel.find({ activo: true }).populate({
      path: "peliculas",
      match: { activa: true },
    });

    res.json(autores);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los autores",
      error: error.message,
    });
  }
};

export const obtenerAutor = async (req, res) => {
  try {
    const autor = await AutorModel.findOne({
      _id: req.params.id,
      activo: true,
    }).populate({
      path: "peliculas",
      match: { activa: true },
    });

    if (!autor) {
      return res.status(404).json({
        mensaje: "Autor no encontrado",
      });
    }

    res.json(autor);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el autor",
      error: error.message,
    });
  }
};

export const actualizarAutor = async (req, res) => {
  try {
    const autor = await AutorModel.findOneAndUpdate(
      { _id: req.params.id, activo: true },
      req.body,
      { new: true, runValidators: true },
    );

    if (!autor) {
      return res.status(404).json({
        mensaje: "Autor no encontrado",
      });
    }

    res.json(autor);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el autor",
      error: error.message,
    });
  }
};

export const eliminarAutor = async (req, res) => {
  try {
    const autor = await AutorModel.findOneAndUpdate(
      { _id: req.params.id, activo: true },
      { activo: false },
      { new: true },
    );

    if (!autor) {
      return res.status(404).json({
        mensaje: "Autor no encontrado",
      });
    }

    const peliculas = await PeliculaModel.find({
      autor: autor._id,
      activa: true,
    }).select("_id");

    const idsPeliculas = peliculas.map((pelicula) => pelicula._id);

    await PeliculaModel.updateMany(
      { _id: { $in: idsPeliculas } },
      { activa: false },
    );

    await FichaTecnicaModel.updateMany(
      { pelicula: { $in: idsPeliculas }, activo: true },
      { activo: false },
    );

    await RepartoModel.updateMany(
      { pelicula: { $in: idsPeliculas }, activo: true },
      { activo: false },
    );

    res.json({
      mensaje: "Autor y sus relaciones eliminados logicamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el autor",
      error: error.message,
    });
  }
};
