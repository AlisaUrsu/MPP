import express from "express";
import request from "supertest";
import { Controller } from "../controllers/games.controllers";
import { GameRepository } from "../repository/games.repository";
import { GameService } from "../services/games.service";

const repo = new GameRepository();
repo.populateRepo();
const service = new GameService(repo);
const controller = new Controller(service);
const router = express.Router();

router.get("/", controller.getAllGames);
router.post("/add", controller.addGame);
router.put("/update/:id", controller.updateGame);
router.delete("/delete/:id", controller.deleteGame);
router.get("/filter", controller.filterGamesByDescription);
router.get("/sort/:sortOption", controller.getGamesSorted);
router.get("/search", controller.searchGamesByTitle);
router.get("/pie-chart", controller.getPieChart);
router.get("/page", controller.getGamesByPage);
router.get("/filter/genres", controller.filterGamesByGenres);
export default router;  