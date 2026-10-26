import { FichaTecnicaModel } from "../models/fichaTecnica.model.js";
import { PeliculaModel } from "../models/pelicula.model.js";

export const crearFichaTecnica = async (req, res) => {
  try {
    const { pelicula } = req.body;

    const peliculaExiste = await PeliculaModel.findOne({
      _id: pelicula,
      activa: true,
    });

    if (!peliculaExiste) {
      return res.status(404).json({
        msg: "La pelicula no existe o esta inactiva",
      });
    }

    const fichaExistente = await FichaTecnicaModel.findOne({
      pelicula,
      activo: true,
    });

    if (fichaExistente) {
      return res.status(409).json({
        msg: "La pelicula ya tiene una ficha tecnica",
      });
    }

    const nuevaFicha = await FichaTecnicaModel.create(req.body);

    return res.status(201).json({
      msg: "Ficha tecnica creada correctamente",
      data: nuevaFicha,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al crear la ficha tecnica",
    });
  }
};

export const obtenerFichasTecnicas = async (req, res) => {
  try {
    const fichas = await FichaTecnicaModel.find({ activo: true }).populate(
      "pelicula",
    );

    return res.status(200).json({
      data: fichas,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al obtener las fichas tecnicas",
    });
  }
};

export const obtenerFichaTecnica = async (req, res) => {
  try {
    const { id } = req.params;

    const ficha = await FichaTecnicaModel.findOne({
      _id: id,
      activo: true,
    }).populate("pelicula");

    if (!ficha) {
      return res.status(404).json({
        msg: "Ficha tecnica no encontrada",
      });
    }

    return res.status(200).json({
      data: ficha,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al obtener la ficha tecnica",
    });
  }
};

export const actualizarFichaTecnica = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.body.pelicula) {
      const peliculaExiste = await PeliculaModel.findOne({
        _id: req.body.pelicula,
        activa: true,
      });

      if (!peliculaExiste) {
        return res.status(404).json({
          msg: "La pelicula no existe o esta inactiva",
        });
      }

      const fichaExistente = await FichaTecnicaModel.findOne({
        pelicula: req.body.pelicula,
        activo: true,
        _id: { $ne: id },
      });

      if (fichaExistente) {
        return res.status(409).json({
          msg: "La pelicula ya tiene una ficha tecnica",
        });
      }
    }

    const fichaActualizada = await FichaTecnicaModel.findOneAndUpdate(
      { _id: id, activo: true },
      req.body,
      { new: true, runValidators: true },
    );

    if (!fichaActualizada) {
      return res.status(404).json({
        msg: "Ficha tecnica no encontrada",
      });
    }

    return res.status(200).json({
      msg: "Ficha tecnica actualizada correctamente",
      data: fichaActualizada,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al actualizar la ficha tecnica",
    });
  }
};

export const eliminarFichaTecnica = async (req, res) => {
  try {
    const { id } = req.params;

    const ficha = await FichaTecnicaModel.findOneAndUpdate(
      { _id: id, activo: true },
      { activo: false },
      { new: true },
    );

    if (!ficha) {
      return res.status(404).json({
        msg: "Ficha tecnica no encontrada",
      });
    }

    return res.status(200).json({
      msg: "Ficha tecnica eliminada logicamente",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al eliminar la ficha tecnica",
    });
  }
};
