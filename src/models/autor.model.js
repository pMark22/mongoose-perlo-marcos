import { model, Schema } from "mongoose";

const autorSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    nacionalidad: {
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

autorSchema.virtual("peliculas", {
  ref: "Pelicula",
  localField: "_id",
  foreignField: "autor",
});

export const AutorModel = model("Autor", autorSchema);
