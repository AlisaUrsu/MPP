import { RequestHandler } from "express";
import GameModel from "../models/game.model"

const gamesService = require("../services/games.service");

export const getAllGames: RequestHandler = async(req, res, next) => {
    try{
        const games = gamesService.getAllGames();
        res.status(200).json(games);
    }catch (error){
        next(error);
    }
};

export const addGame: RequestHandler = async(req, res, next) => {
    try{
        const { title, description, genres, releaseYear, rating, image } = req.body;
        const newGame = gamesService.addGame(title, description, genres, releaseYear, rating, image);
        res.status(201).json(newGame);
    }catch (error){
        next(error);
    }
};

export const deleteGame: RequestHandler = async(req, res, next) => {
    try{
        const id = req.params.id;
        gamesService.deleteGame(id);
        const games = gamesService.getAllGames();
        res.status(200).json(games);
    }catch (error){
        next(error);
    }
};
export const updateGame: RequestHandler = async(req, res, next) => {
    try{
        const id = req.params.id;
        const {title, description, genres, releaseYear, rating, image } = req.body;
        gamesService.updateGame(id, title, description, genres, releaseYear, rating, image);
        const games = gamesService.getAllGames();
        res.status(200).json(games);
    }catch (error){
        next(error);
    }
};
