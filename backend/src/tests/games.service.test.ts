import { getAllGames, getNextAvailableId, gameExists, addGame, deleteGame, updateGame, getGameById } from "../services/games.service";
import { games } from "../models/games";

describe("Game functions", () =>{
  
    test("getAllGames should return all games", () => {
        expect(getAllGames()).toEqual(games);
      });

      test("getNextAvailableId should return the next available ID", () => {
        expect(getNextAvailableId()).toBe(17);
      });
    
      test("gameExists test", () => {
        expect(gameExists("Lies of P", 2023)).toBe(true);
        expect(gameExists("Elden Bling", 2023)).toBe(false);
      });

      test("addGame - test when all inputs are alright", () => {
        const newGame = {
          title: "Game 1",
          releaseYear: 2021,
          description: "This is a new game.",
          genres: ["Action", "Adventure"],
          rating: 8.5
        };
    
        const addedGame = addGame(newGame.title, newGame.description, newGame.genres, newGame.releaseYear, newGame.rating);
    
        expect(addedGame.title).toBe(newGame.title);
        expect(addedGame.releaseYear).toBe(newGame.releaseYear);
        expect(addedGame.description).toBe(newGame.description);
        expect(addedGame.genres).toEqual(newGame.genres);
        expect(addedGame.rating).toBe(newGame.rating);
    
        expect(games).toContainEqual(addedGame);
        expect(games.length).toBe(17);
      });

      test("deleteGame", () => {
          deleteGame(1);
          expect(games.length).toBe(16);
          expect(games.find(game => game.id === 1)).toBeUndefined();
          deleteGame(10);
          expect(games.length).toBe(15);
      });

      test('updateGame', () => {
        updateGame(2, "New Title", "New Description", ["Indie"], 2022, 8.0, "newImage.png");
        const updatedGame = getGameById(2);
        expect(updatedGame.title).toBe("New Title");
        expect(updatedGame.description).toBe("New Description");
        expect(updatedGame.genres).toEqual(["Indie"]);
        expect(updatedGame.releaseYear).toBe(2022);
        expect(updatedGame.rating).toBe(8.0);
        expect(updatedGame.image).toBe("newImage.png");
        expect(games.length).toBe(15);
    });

    
})