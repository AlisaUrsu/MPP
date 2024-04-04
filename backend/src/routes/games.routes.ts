import {getAllGames, addGame, deleteGame, updateGame} from "../controllers/games.controllers";
import express from "express";
import request from "supertest";

const router = express.Router();

router.get("/", getAllGames);
router.post("/", addGame);
router.put("/update/:id", updateGame);
router.delete("/delete/:id", deleteGame);


export default router;