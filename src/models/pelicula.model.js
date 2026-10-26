import { model, Schema, Types } from "mongoose";

const clasificacionSchema = new Schema(
  {
    edadMinima: {
      type: Number,
      required: true,
      min: 0,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const peliculaSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    anio: {
      type: Number,
      required: true,
      min: 1888,
    },
    autor: {
      type: Types.ObjectId,
      ref: "Autor",
      required: true,
    },
    clasificacion: {
      type: clasificacionSchema,
      required: true,
    },
    activa: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const PeliculaModel = model("Pelicula", peliculaSchema);
