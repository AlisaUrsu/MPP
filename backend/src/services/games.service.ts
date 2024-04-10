import { genres as validGenres } from "../models/genres";
import { GameRepository } from "../repository/games.repository";
import {Game} from "../models/game";

export class GameService{
    private repository: GameRepository;

    constructor(gameRepository: GameRepository) {
        this.repository = gameRepository;
    }

    public getAllGames() {
        return this.repository.getAllGames();
    }

    public getNextAvailableId() {
        if (this.getAllGames()){
        const nextAvailableId = this.getAllGames().reduce((maxId, game) => Math.max(maxId, game.id), 0);
        return nextAvailableId + 1;
        }
        else return 1;
    }

    public gameExists(title: string, releaseYear: number) {
        return this.getAllGames().some(game => game.title === title && game.releaseYear === releaseYear);
    }

    public gameExistsWithDifferentID(title: string, releaseYear: number, id:number) {
        return this.getAllGames().some(game => game.title === title && game.releaseYear === releaseYear && game.id !== id);
    }

    public addGame(title: string, description: string, genres: string[], releaseYear: number, rating: number, image: string) {
        if (this.gameExists(title, releaseYear)){
            throw new Error("Game already exists!");
        }
        const id = this.getNextAvailableId();
        const newGame = new Game(id, title, releaseYear, description, genres, rating, image);
        this.repository.addGame(newGame);
        return newGame;
    }

    public getGameById(id: number) {
        const foundGame = this.repository.getGameById(id);
        if (!foundGame){
            throw new Error("Game not found.")
        }
        return foundGame;
    }

    public deleteGame(id: number){
        id = Number(id);
        const index = this.getAllGames().findIndex(game => game.id === id);
        if (index !== -1) {
            this.getAllGames().splice(index, 1);
        }
        else {
            throw new Error("Game not found");
        }
    }

    public updateGame(id:number, newTitle: string, newDescription: string, newGenres: string[], newReleaseYear: number, newRating: number, newImage= "placeholder.png"){
        id = Number(id);
        const index = this.getAllGames().findIndex(game => game.id === id);

        if (index === -1){
            throw new Error("Game not found.")
        }
        
        if (this.gameExistsWithDifferentID(newTitle, newReleaseYear, id)){
            throw new Error("Game already exists!");
        }

        const modifiedGame = new Game(id, newTitle, newReleaseYear, newDescription, newGenres, newRating, newImage);

        this.repository.updateGame(modifiedGame);
        return modifiedGame;
    }
 

    public filterGamesByDescription(keyword: any) {
        return this.getAllGames().filter((game) => game.description.toLowerCase().includes(keyword.toString().toLowerCase()));
    }

    
    public sortDecreaseGamesByTitle() {
        return this.getAllGames().sort((a, b) => b.title.localeCompare(a.title));
    };

    public sortIncreaseGamesByTitle() {
        return this.getAllGames().sort((a, b) => a.title.localeCompare(b.title));
    };

    public sortIncreaseGamesByYear() {
        return this.getAllGames().sort((a, b) => a.releaseYear - b.releaseYear);
    };

    public sortDecreaseGamesByYear() {
        return this.getAllGames().sort((a, b) => b.releaseYear - a.releaseYear);
    };

    public sortIncreaseGamesByRating() {
        return this.getAllGames().sort((a, b) => a.rating - b.rating);
    };

    public sortDecreaseGamesByRating() {
        return this.getAllGames().sort((a, b) => b.rating - a.rating);
    };

    public sortIncreaseGamesByID() {
        return this.getAllGames().sort((a, b) => a.id - b.id);
    };

    public getGamesByPage(currentPage: number, recordsPerPage: any) {
        const indexOfLastRecord = currentPage * recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
        const currentRecords = this.getAllGames().slice(indexOfFirstRecord, indexOfLastRecord);
        const totalPages = Math.ceil(this.getAllGames().length / recordsPerPage);

        return { currentRecords, totalPages};
    }

    public getChartData() {
        const games = this.getAllGames();
        const genreFrequency: { [genre: string]: number } = {};

        validGenres.forEach(genre => {
            genreFrequency[genre] = 0;
        });

        games.forEach(game => {
            game.genres.forEach(genre => {genreFrequency[genre]++;});
        });

        return genreFrequency;
    }

    public filterGamesByGenres(genres: string[]): Game[] {
        if (genres.length === 0) {
            return this.getAllGames();
        }

        return this.getAllGames().filter(game =>
            genres.some(selectedGenre => game.genres.includes(selectedGenre))
        );
    }
    
    public searchGamesByTitle(searchText: string): Game[] {
        const searchQuery = searchText.toLowerCase().trim();
       
        return this.getAllGames().filter(game =>
            game.title.toLowerCase().includes(searchQuery)
        );
    }
}