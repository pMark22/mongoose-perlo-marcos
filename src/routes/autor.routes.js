import { Router } from "express";
import {
  crearAutor,
  obtenerAutores,
  obtenerAutor,
  actualizarAutor,
  eliminarAutor,
} from "../controllers/autor.controller.js";

const autorRouter = Router();

autorRouter.get("/autores", obtenerAutores);
autorRouter.get("/autores/:id", obtenerAutor);
autorRouter.post("/autores", crearAutor);
autorRouter.put("/autores/:id", actualizarAutor);
autorRouter.delete("/autores/:id", eliminarAutor);

export { autorRouter };
