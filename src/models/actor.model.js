import { model, Schema } from "mongoose";

const actorSchema = new Schema(
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
  },
);

export const ActorModel = model("Actor", actorSchema);
