import { Router } from "express";
import {
  agregarActorAPelicula,
  obtenerRepartos,
  obtenerReparto,
  eliminarReparto,
} from "../controllers/reparto.controller.js";

const repartoRouter = Router();

repartoRouter.get("/repartos", obtenerRepartos);
repartoRouter.get("/repartos/:id", obtenerReparto);
repartoRouter.post("/repartos", agregarActorAPelicula);
repartoRouter.delete("/repartos/:id", eliminarReparto);

export { repartoRouter };
