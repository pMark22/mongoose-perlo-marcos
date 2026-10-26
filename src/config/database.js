import mongoose from "mongoose";

export const startDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/db-mongoose");

    console.log("Conexion a MongoDB exitosa");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
  }
};
