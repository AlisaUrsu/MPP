import {getAllGames, addGame, deleteGame, updateGame} from "../controllers/games.controllers";
import express from "express";

const router = express.Router();

router.get("/", getAllGames);
router.post("/", addGame);
router.put("/:id", updateGame);
router.delete("/:id", deleteGame);


export default router;