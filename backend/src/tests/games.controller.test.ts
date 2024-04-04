import express, {NextFunction, Request, Response} from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import GameModel from "../models/game.model"
import gamesRouter from "../routes/games.routes"
import request from "supertest";


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/games", gamesRouter);

describe("Games Routes", () => {
    test("GET /games should respond with 200", async () => {
      const response = await request(app).get("/games");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(16);
    });

    test("GET / should respond with 404", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(404);
    })

    test("POST /games should respond with 200", async () => {
        const newGame = {
            title: "New Game",
            description: "A new game description",
            genres: ["Action", "Adventure"],
            releaseYear: 2022,
            rating: 4.5,
            image: "image.png"
        };
        const response = await request(app).post("/games").send(newGame);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(17);
    });

    test("DELETE /games/delete/:id should respond with 200", async () => {
        const gameIdToDelete = 1;
        const response = await request(app)
            .delete(`/games/delete/${gameIdToDelete}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(16);
    });

    test("DELETE /games/:id should respond with 404", async () => {
        const gameIdToDelete = 3;
        const response = await request(app).delete(`/games/${gameIdToDelete}`);

        expect(response.status).toBe(404);
    });

    test("PUT /games/update/:id should respond with 200", async () => {
        const gameIdToUpdate = 3;

        const updatedGame = {
            title: "Updated Game Title",
            description: "Updated game description",
            genres: ["Action", "Adventure"],
            releaseYear: 2023,
            rating: 4.7,
            image: "updated-image.jpg"
        };

        const response = await request(app).put(`/games/update/${gameIdToUpdate}`).send(updatedGame);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(16);
    });
  });
