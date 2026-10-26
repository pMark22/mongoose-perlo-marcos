import { Router } from "express";
import {
  crearFichaTecnica,
  obtenerFichasTecnicas,
  obtenerFichaTecnica,
  actualizarFichaTecnica,
  eliminarFichaTecnica,
} from "../controllers/fichaTecnica.controller.js";

const fichaTecnicaRouter = Router();

fichaTecnicaRouter.get("/fichas-tecnicas", obtenerFichasTecnicas);
fichaTecnicaRouter.get("/fichas-tecnicas/:id", obtenerFichaTecnica);
fichaTecnicaRouter.post("/fichas-tecnicas", crearFichaTecnica);
fichaTecnicaRouter.put("/fichas-tecnicas/:id", actualizarFichaTecnica);
fichaTecnicaRouter.delete("/fichas-tecnicas/:id", eliminarFichaTecnica);

export { fichaTecnicaRouter };
