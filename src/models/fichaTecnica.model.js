import { model, Schema, Types } from "mongoose";

const fichaTecnicaSchema = new Schema(
  {
    pelicula: {
      type: Types.ObjectId,
      ref: "Pelicula",
      required: true,
      unique: true,
    },
    duracion: {
      type: Number,
      required: true,
      min: 1,
    },
    genero: {
      type: String,
      required: true,
      trim: true,
    },
    idioma: {
      type: String,
      required: true,
      trim: true,
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const FichaTecnicaModel = model("FichaTecnica", fichaTecnicaSchema);
