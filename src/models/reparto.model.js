import { model, Schema, Types } from "mongoose";

const repartoSchema = new Schema(
  {
    pelicula: {
      type: Types.ObjectId,
      ref: "Pelicula",
      required: true,
    },
    actor: {
      type: Types.ObjectId,
      ref: "Actor",
      required: true,
    },
    personaje: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

repartoSchema.index({ pelicula: 1, actor: 1 }, { unique: true });

export const RepartoModel = model("Reparto", repartoSchema);
