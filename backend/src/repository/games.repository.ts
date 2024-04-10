import { Game } from "../models/game";

export class GameRepository {
    private games: Game[];

    constructor() {
        this.games = [];
    }

    addGame(game: Game): void {
        this.games.push(game);
    }

    updateGame(updatedGame: Game): void {
        const index = this.games.findIndex(game => game.id === updatedGame.id);
        if (index !== -1) {
            this.games[index] = updatedGame;
        }
    }

    deleteGame(gameId: number): void {
        this.games = this.games.filter(game => game.id !== gameId);
    }

    getAllGames(): Game[] {
        return this.games;
    }

    getGameById(gameId: number): Game | undefined {
        return this.games.find(game => game.id === gameId);
    }

    populateRepo(): void {
        const initialGames: Game[] = [
            new Game(
                1,
                "Lies of P",
                2023,
                "Lies of P is a thrilling souls-like that takes the story of Pinocchio, " +
                    "turns it on its head, and sets it against the darkly elegant backdrop of the Belle Epoque era.",
                ["Action", "Dark Fantasy", "Souls-Like"],
                9.21,
                "https://images.igdb.com/igdb/image/upload/t_cover_big/co6lxr.png"
            ),
            new Game(
                2,
                "No Man's Sky",
                2016,
                "Inspired by the adventure and imagination that we love from classic science-fiction, " +
                    "No Man's Sky presents you with a galaxy to explore, filled with unique planets and lifeforms, " +
                    "and constant danger and action.",
                ["Sci-fi", "Open World", "Adventure", "Exploration", "Survival", "Space"],
                7.53,
                "https://images.igdb.com/igdb/image/upload/t_cover_big/co6zat.png"
            ),
            new Game(
                3,
                "Blasphemous",
                2019,
                "Blasphemous is a brutal action-platformer with skilled hack’n slash combat set in the nightmare " +
                    "world of Cvstodia.",
                ["Metroidvania", "Souls-Like", "Action", "Platformer", "Indie"],
                8.25,
                "https://images.igdb.com/igdb/image/upload/t_cover_big/co2eyn.png"
            ),
            new Game(
                4,
                "Steins Gate",
                2009,
                 "-Decide The Fate Of All Mankind-CAN YOU CHANGE THE COURSE OF FATE? AND SAVE THE ONES CLOSEST TO YOU?",
                 ["Anime", "Visual Novel", "Sci-fi"],
                 9.64,
                 "https://images.igdb.com/igdb/image/upload/t_cover_big/co5ff7.png"
            ),
            new Game(
                 5,
                "Elden Ring",
                 2022,
                 "A vast world where open fields with a variety of situations and huge dungeons. As you explore, the joy of discovering unknown and overwhelming threats await you, leading to a high sense of accomplishment.",
                
                    ["Dark Fantasy", "Souls-Like", "Open World", "Action", "Exploration", "RPG"],
                8.76,
                "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.png"
            ),
            new Game(
                6,
                 "Silent Hill 2",
                2001,
            
                    "Having received a letter from his deceased wife, James heads to where they shared so many memories, in the hope of seeing her one more time: Silent Hill.There, by the lake, he finds a woman eerily similar to her...",
                ["Horror", "Survival", "Action", "Mystery"],
                 8.34,
                "https://images.igdb.com/igdb/image/upload/t_cover_big/co5wkr.png"
            ),
            new Game(
                7,
                "Risk of Rain",
                 2013,
                
                    "Risk of Rain is an action platformer with roguelike elements. With permanent death as a primary feature, players will have to play their best to get as far as possible.",
                    ["Action", "Indie", "Platformer", "Survival"],
                 7.85,
                 "https://images.igdb.com/igdb/image/upload/t_cover_big/co2k2z.png"
            ),
            new Game(
                8,
                "Hello Neighbor",
                2017,
                
                    "The Literature Club is full of cute girls! Will you write the way into their heart?",
                
                    ["Horror", "Strategy", "Puzzle", "Action"],
                 6.96,
                 "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7c.png"
            ),
            new Game(
                 9,
                 "Doki Doki Literature Club!",
                 2017,
                
                    "Hello Neighbor is a stealth horror game about sneaking into your neighbor's house to figure out what horrible secrets he's hiding in the basement.",
                
                    ["Anime", "Horror", "Visual Novel"],
                 7.28,
                 "https://images.igdb.com/igdb/image/upload/t_cover_big/co6p5e.png"
            ),
            new Game(
                 10,
                 "WORLD OF HORROR",
                 2023,
                 "Experience the quiet terror of this 1-bit love letter to Junji Ito and H.P. Lovecraft. Navigate a hellish roguelite reality with turn-based combat and unforgiving choices.",
                 ["Anime", "Turn-Based", "Indie", "Horror", "Survival"],
                 8.37,
                 "https://images.igdb.com/igdb/image/upload/t_cover_big/co1xh7.png"
            ),
            new Game(
                 11,
                 "NieR:Automata",
                 2017,
                
                    "Humanity has been driven from the Earth by mechanical beings from another world. In a final effort to take back the planet, the human resistance sends a force of android soldiers to destroy the invaders.",
                 ["Action", "Open World", "Fighting", "Sci-fi", "Adventure"],
                 9.54,
                 "https://images.igdb.com/igdb/image/upload/t_cover_big/co5pcj.png"
            ),
            new Game(
                 12,
                 "Prototype",
                 2009,
                 "You are the Prototype, Alex Mercer, a man without memory armed with amazing shape-shifting abilities, hunting your way to the heart of the conspiracy which created you; making those responsible pay.",
                
                    ["Action", "Horror", "Open World", "Adventure"],
                 7.72,
                 "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ql2.png"
            ),
            new Game(
                13,
                 "Postal 2",
                 2003,
                 "Live a week in the life of \"The Postal Dude\"; a hapless everyman just trying to check off some chores. Buying milk, returning an overdue library book, getting Gary Coleman's autograph, what could possibly go wrong?",
                ["Action", "Adventure", "Fighting", "FPS", "Open World"] ,
                 6.48,
                 "https://images.igdb.com/igdb/image/upload/t_cover_big/co2qzl.png"
            ),
            new Game(
                 14,
                 "Subnautica",
                 2018,
                 "Descend into the depths of an alien underwater world filled with wonder and peril. Craft equipment, pilot submarines and out-smart wildlife to explore lush coral reefs cave systems - all while trying to survive.",
                
                    ["Horror", "Strategy", "Puzzle", "Action"],
                 7.19,
                 "https://images.igdb.com/igdb/image/upload/t_cover_big/co1iqw.png"
            ),
            new Game(
                 15,
                 "Sleeping Dogs: Definitive Edition",
                 2014,
                 "You'll have to prove yourself, a highly skilled undercover cop, worthy as you fight your way up the organization, taking part in brutal criminal activities without blowing your cover.",
                
                    ["Fighting", "Action", "Open World", "TPS"],
                 8.27,
                 "https://images.igdb.com/igdb/image/upload/t_cover_big/co2i0n.png"
            ),
            new Game(
                 16,
                 "Stardew Valley",
                 2016,
                 "You've inherited your grandfather's old farm plot. Armed with tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home?",
                
                    ["Strategy", "Immersive", "Casual", "Indie"],
                 8.43,
                 "https://images.igdb.com/igdb/image/upload/t_cover_big/xrpmydnu9rpxvxfjkiu7.png"
            )
        ];

        initialGames.forEach(game => this.addGame(game));
        this.games = initialGames;
    }
}
