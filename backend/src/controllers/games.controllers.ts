import { RequestHandler } from "express";
import GameModel from "../models/game.model"
import { genres as validGenres } from "../models/genres";
import { GameService } from "../services/games.service";

export class Controller {
    private service: GameService;
    
    constructor(service: GameService){
        this.service = service;
    }

    public getAllGames: RequestHandler = async(req, res, next) => {
        try{
            const games = this.service.getAllGames();
            res.status(200).json(games);
        }catch (error){
            next(error);
        }
    };

    public addGame: RequestHandler = async(req, res, next) => {
        try{
            let { title, description, genres, releaseYear, rating, image } = req.body;

            releaseYear = Number(releaseYear);
            rating = Number(rating);

            if (!title) {
                throw new Error("Title is required.");
            }
            if (title.length < 3) {
                throw new Error("Title must be a string of at least 3 characters.");
            }
            if (!releaseYear){
                throw new Error("Release year is required.");
            } 
            if (releaseYear < 1958 || releaseYear > 2024) {
                throw new Error("Release year must be between 1958 and 2024");
            }
            if (!description){
                throw new Error("Description is required.");
            }
            if (description.length > 220) {
                throw new Error("Description must be of maximum 220 characters");
            }
            if (!genres){
                throw new Error("At least one genre must be selected.");
            } 
            if (!Array.isArray(genres) || genres.length === 0 || genres.length > 6 || !genres.every(genre => typeof genre === "string" && validGenres.includes(genre))) {
                throw new Error("Genres must be an array of up to 6 strings");
            }
            if (!rating){
                throw new Error("Rating is required.");
            }
            if (rating < 1 || rating > 10) {
                throw new Error("Rating must be between 1 and 10");
            }
            const newGame = this.service.addGame(title, description, genres, releaseYear, rating, image);
            res.status(200).json(newGame);
        }catch (error){
            next(error);
        }
    };

    public deleteGame: RequestHandler = async(req, res, next) => {
        try{
            const id = Number(req.params.id);
            this.service.deleteGame(id);
            const games = this.service.getAllGames();
            res.status(200).json(games);
        }catch (error){
            next(error);
        }
    };
    public updateGame: RequestHandler = async(req, res, next) => {
        try{
            const id = Number(req.params.id);
            let {title, description, genres, releaseYear, rating, image } = req.body;
            releaseYear = Number(releaseYear);
            rating = Number(rating);

            if (!title) {
                throw new Error("Title is required.");
            }
            if (title.length < 3) {
                throw new Error("Title must be a string of at least 3 characters.");
            }
            if (!releaseYear){
                throw new Error("Release year is required.");
            } 
            if (releaseYear < 1958 || releaseYear > 2024) {
                throw new Error("Release year must be between 1958 and 2024");
            }
            if (!description){
                throw new Error("Description is required.");
            }
            if (description.length > 220) {
                throw new Error("Description must be of maximum 220 characters");
            }
            if (!genres){
                throw new Error("At least one genre must be selected.");
            } 
            if (!Array.isArray(genres) || genres.length === 0 || genres.length > 6 || !genres.every(genre => typeof genre === "string" && validGenres.includes(genre))) {
                throw new Error("Genres must be an array of up to 6 strings");
            }
            if (!rating){
                throw new Error("Rating is required.");
            }
            if (rating < 1 || rating > 10) {
                throw new Error("Rating must be between 1 and 10");
            }
            const newGame = this.service.updateGame(id, title, description, genres, releaseYear, rating, image);
            res.status(200).json(newGame);
        } catch (error){
            next(error);
        }
    };

    public filterGamesByDescription: RequestHandler = async(req, res, next) => {
        try {
            const keyword = req.query.description;
            const filteredGames = this.service.filterGamesByDescription(keyword);
            res.status(200).json(filteredGames);
        } catch (error) {
            next(error);
        }
    };

    public getGamesSorted: RequestHandler = async(req, res, next) => {
        try {
            const sortOption = req.params.sortOption;
            let sortedList = this.service.getAllGames()
            switch (sortOption){
                case "alphabetically-decrease":
                    sortedList = this.service.sortDecreaseGamesByTitle();
                    break;
                case "alphabetically-increase":
                    sortedList = this.service.sortIncreaseGamesByTitle();
                    break;
                case "year-increase":
                    sortedList = this.service.sortIncreaseGamesByYear();
                    break;
                case "year-decrease":
                    sortedList = this.service.sortDecreaseGamesByYear();
                    break;
                case "rating-increase":
                    sortedList = this.service.sortIncreaseGamesByRating();
                    break;
                case "rating-decrease":
                    sortedList = this.service.sortDecreaseGamesByRating();
                    break;
                case "not-sorted":
                    sortedList = this.service.sortIncreaseGamesByID();
                    break;
                default:
                    sortedList = this.service.getAllGames();
                    break;
            }
            res.status(200).json(sortedList);
        } catch (error) {
            next(error);
        }
    };

    public searchGamesByTitle: RequestHandler = async(req, res, next) => {
        try {
            const title = String(req.query.title);
            const filteredGames = this.service.searchGamesByTitle(title);
            res.status(200).json(filteredGames);
        } catch (error) {
            next(error);
        
        }
    }

    public getChart: RequestHandler = async(req, res, next) => {
        try {
            const genres = this.service.getChartData();
            res.status(200).json(genres);
        } catch (error) {
            next(error);
        
        }
    }

    public getGamesByPage: RequestHandler = async(req, res, next) => {
        try {
            const page = Number(req.query.page);
            const records = Number(req.query.records);
            const { currentRecords, totalPages} = this.service.getGamesByPage(page, records);
            res.status(200).json({ currentRecords, totalPages });
        } catch (error) {
            next(error);
        
        }
    }

    public filterGamesByGenres: RequestHandler = async(req, res, next) => {
        try {
            let genres: string[] = [];

            if (req.query.genres) {
                genres = Array.isArray(req.query.genres)
                    ? (req.query.genres as string[]) 
                    : [req.query.genres as string];
            }
        
            const filteredGames = this.service.filterGamesByGenres(genres);
            res.status(200).json(filteredGames);
        } catch (error) {
            next(error);
        }
    };

}