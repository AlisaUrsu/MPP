import {games} from "../models/games";
import { genres as validGenres } from "../models/genres";

export function getAllGames() {
    return games;
}

export function getNextAvailableId() {
    if (games){
       const nextAvailableId = games.reduce((maxId, game) => Math.max(maxId, game.id), 0);
       return nextAvailableId + 1;
    }
    else return 1;
}

export function gameExists(title: string, releaseYear: number) {
    return games.some(game => game.title === title && game.releaseYear === releaseYear);
}

export function addGame(title: string, description: string, genres: string[], releaseYear: number, rating: number, image= "../assets/placeholder.png") {
    if (!title || typeof title !== "string" || title.length < 3) {
        throw new Error("Title must be a string of at least 3 characters");
    }
    if (!releaseYear || typeof releaseYear !== "number" || releaseYear < 1958 || releaseYear > 2024) {
        throw new Error("Release year must be a number between 1958 and 2024");
    }
    if (gameExists(title, releaseYear)){
        throw new Error("Game already exists!");
    }
    if (!description || typeof description !== "string" || description.length > 220) {
        throw new Error("Description must be a string of maximum 220 characters");
    }
    if (!genres || !Array.isArray(genres) || genres.length === 0 || genres.length > 6 || !genres.every(genre => typeof genre === "string" && validGenres.includes(genre))) {
        throw new Error("Genres must be an array of up to 6 strings");
    }
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 10) {
        throw new Error("Rating must be a number between 1 and 10");
    }

    const id = getNextAvailableId();
    const newGame = {id, title, releaseYear, description, genres, rating, image};
    games.push(newGame);
    return newGame;
}

export function deleteGame(id: number){
    const index = games.findIndex(game => game.id === id);
    if (index !== -1) {
        games.splice(index, 1);
    }
    else {
        throw new Error("Game not found");
    }
}

export function updateGame(id:number, newTitle: string, newDescription: string, newGenres: string[], newReleaseYear: number, newRating: number, newImage= "../assets/placeholder.png"){
    const index = games.findIndex(game => game.id === id);
    
    if (!newTitle || typeof newTitle !== "string" || newTitle.length < 3) {
        throw new Error("Title must be a string of at least 3 characters");
    }
    if (!newReleaseYear || typeof newReleaseYear !== "number" || newReleaseYear < 1958 || newReleaseYear > 2024) {
        throw new Error("Release year must be a number between 1958 and 2024");
    }
    if (gameExists(newTitle, newReleaseYear)){
        throw new Error("Game already exists!");
    }
    if (!newDescription || typeof newDescription !== "string" || newDescription.length > 220) {
        throw new Error("Description must be a string of maximum 220 characters");
    }
    if (!newGenres || !Array.isArray(newGenres) || newGenres.length === 0 || newGenres.length > 6 || !newGenres.every(genre => typeof genre === "string" && validGenres.includes(genre))) {
        throw new Error("Genres must be an array of up to 6 strings");
    }
    if (!newRating || typeof newRating !== "number" || newRating < 1 || newRating > 10) {
        throw new Error("Rating must be a number between 1 and 10");
    }

    games[index].title = newTitle;
    games[index].releaseYear = newReleaseYear;
    games[index].description = newDescription;
    games[index].genres = newGenres;
    games[index].rating = newRating;
    games[index].image = newImage;

    return games[index];
}

export function getGameById(id: number) {
    const foundGame = games.find(game => game.id === id);
    if (!foundGame){
        throw new Error("Game not found.")
    }
    return foundGame;
}