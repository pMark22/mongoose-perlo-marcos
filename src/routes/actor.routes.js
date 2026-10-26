import { Router } from "express";
import {
  crearActor,
  obtenerActores,
  obtenerActor,
  actualizarActor,
  eliminarActor,
} from "../controllers/actor.controller.js";

const actorRouter = Router();

actorRouter.get("/actores", obtenerActores);
actorRouter.get("/actores/:id", obtenerActor);
actorRouter.post("/actores", crearActor);
actorRouter.put("/actores/:id", actualizarActor);
actorRouter.delete("/actores/:id", eliminarActor);

export { actorRouter };
