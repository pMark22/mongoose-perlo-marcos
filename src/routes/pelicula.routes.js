import { Router } from "express";
import {
  crearPelicula,
  obtenerPeliculas,
  obtenerPelicula,
  actualizarPelicula,
  eliminarPelicula,
} from "../controllers/pelicula.controller.js";

const peliculaRouter = Router();

peliculaRouter.get("/peliculas", obtenerPeliculas);
peliculaRouter.get("/peliculas/:id", obtenerPelicula);
peliculaRouter.post("/peliculas", crearPelicula);
peliculaRouter.put("/peliculas/:id", actualizarPelicula);
peliculaRouter.delete("/peliculas/:id", eliminarPelicula);

export { peliculaRouter };
