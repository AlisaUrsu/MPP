import "./Home.styles.css";
import "../Games.type";
import GamesContainer from "../game-list/GamesContainer";
import {useEffect, useState} from "react";
import {Games} from "../Games";
import {IGame} from "../Games.type";
import AddGame from "../game-add/AddGame";
import {PageEnum} from "../Page.Operations";
import UpdateGame from "../game-update/UpdateGame";
import {
    sortDecreaseGamesByRating,
    sortDecreaseGamesByTitle,
    sortDecreaseGamesByYear,
    sortIncreaseGamesByID,
    sortIncreaseGamesByRating,
    sortIncreaseGamesByTitle,
    sortIncreaseGamesByYear
} from "../Service";
import {BarChart} from "@mui/x-charts";
import {Genres} from "../Genres";
import GenreBarChart from "../barchart/GenreBarChart";
import {GenreLineChart} from "../linechart/GenreLineChart";


const Home = () => {
    const [gameList, setGameList] = useState([] as IGame[]);
    const [shownPage, setShownPage] = useState(PageEnum.list);
    const [gameToEdit, setGameToEdit] = useState({} as IGame);
    const [selectedSortOption, setSelectedSortOption] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);

    /*useEffect(() => {
        const listString = window.localStorage.getItem("Games");
        if (listString) {
            setGameList(JSON.parse(listString));
            sortIncreaseGamesByID(gameList);
        } else {
            setGameList(Games);
        }
    }, []);*/

    useEffect(() => {
        async function loadGames() {
            try {
                const response = await fetch("http://localhost:5000/games", {method: "GET"});
                const games = await response.json();
                setGameList(games);
            }
            catch (error){
                console.error(error);
                alert(error);
            }
        }
        loadGames();
    }, []);


    const onAddGame = () => {
        setShownPage(PageEnum.add);
    };

    const showGamesPage = () => {
        setShownPage(PageEnum.list);
    };

    /*const addGame = (data: IGame) => {
        setGameList([...gameList, data]);
        updateLocalStorage([...gameList, data]);
    };*/

    const addGame = async (data:IGame) => {
        try {
            const response = await fetch("http://localhost:5000/games", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const newGame = await response.json();
            setGameList([...gameList, newGame]);
        } catch (error) {
            console.error(error);
            alert("Error adding game");
        }
    };

    const deleteGame = (data: IGame) => {
        const updatedGameList = gameList.filter((game) => game.id !== data.id);
        setGameList(updatedGameList);
        updateLocalStorage(updatedGameList);
    };

    const onUpdateGame = (data: IGame) => {
        setShownPage(PageEnum.update);
        setGameToEdit(data);
    };

    const onBarchart = () =>{
        setShownPage(PageEnum.barchart);
    }

    const updateGame = (data: IGame) => {
        const updatedGameList = gameList.map((game) =>
            game.id === data.id ? data : game
        );
        setGameList(updatedGameList);
        updateLocalStorage(updatedGameList);
    };

    const updateLocalStorage = (list: IGame[]) => {
        window.localStorage.setItem("Games", JSON.stringify(list));
    };

    const handleSortOptionChanged = (e:any) => {
        const selectedOption = e.target.value;
        setSelectedSortOption(selectedOption);

        let sortedList : IGame[] = [];

        switch (selectedOption){
            case "alphabetically-decrease":
                sortedList = sortDecreaseGamesByTitle(gameList);
                break;
            case "alphabetically-increase":
                sortedList = sortIncreaseGamesByTitle(gameList);
                break;
            case "year-increase":
                sortedList = sortIncreaseGamesByYear(gameList);
                break;
            case "year-decrease":
                sortedList = sortDecreaseGamesByYear(gameList);
                break;
            case "rating-increase":
                sortedList = sortIncreaseGamesByRating(gameList);
                break;
            case "rating-decrease":
                sortedList = sortDecreaseGamesByRating(gameList);
                break;
            case "not-sorted":
                sortedList = sortIncreaseGamesByID(gameList);
                break;
            default:
                sortedList = gameList;
                break;
        }
        setGameList(sortedList);
    }

    const handleSearchInputChange = (e: any) => {
        setSearchInput(e.target.value);
    };

    const handleGenreFilterChange = (e: any) => {
        const genre = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setSelectedGenres([...selectedGenres, genre]);
        } else {
            setSelectedGenres(selectedGenres.filter(item => item !== genre));
        }
    };

    const filteredGames = gameList.filter((game) =>
        game.title.toLowerCase().includes(searchInput.toLowerCase()) &&
        (selectedGenres.length === 0 || selectedGenres.some((genre) => game.genres.includes(genre)))
    );

    const handleRecordsPerPageChange = (e:any) => {
        setRecordsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredGames.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredGames.length / recordsPerPage);

    return (
        <>
            <div>
                {shownPage === PageEnum.list && (
                    <>
                        <div className="filter-container">
                            <div className="genre-filter">
                                {Genres.map((genre, index) => (
                                    <label key={index} className="filter-label">
                                        <input
                                            className="filter-checkbox"
                                            type="checkbox"
                                            value={genre}
                                            checked={selectedGenres.includes(genre)}
                                            onChange={handleGenreFilterChange}
                                        />
                                        {genre}
                                    </label>
                                ))}
                            </div>
                            <div className="barchart-container">
                                <h3>Most popular genres: </h3>
                                <button
                                    className="add-button"
                                    onClick={onBarchart}
                                >
                                    See Barchart
                                </button>
                            </div>
                        </div>
                        <div className="search-add-space">
                            <input
                                type="text"
                                placeholder="Search a game"
                                className="search-game"
                                onChange={handleSearchInputChange}
                            />
                            <select className="sort-options" id="sort-options" data-testid="sort-options"
                                    onChange={handleSortOptionChanged}>
                                <option value="sort-by">Sort By</option>
                                <option value="alphabetically-increase">Alphabetically ↑</option>
                                <option value="alphabetically-decrease">Alphabetically ↓</option>
                                <option value="year-increase">Release year ↑</option>
                                <option value="year-decrease">Release year ↓</option>
                                <option value="rating-increase">Rating ↑</option>
                                <option value="rating-decrease">Rating ↓</option>
                                <option value="not-sorted">Not sorted</option>
                            </select>
                            <select className="records-display-options" data-testid="records-display-options" value={recordsPerPage} onChange={handleRecordsPerPageChange}>
                                <option value={5}>5 per page</option>
                                <option value={10}>10 per page</option>
                                <option value={20}>20 per page</option>
                                <option value={filteredGames.length}>All</option>
                            </select>
                            <button
                                className="add-button"
                                onClick={onAddGame}
                            >
                                Add Game
                            </button>
                        </div>
                        <section className="filter"></section>
                        <section className="content">
                            <GamesContainer
                                list={currentRecords}
                                onDeleteButton={deleteGame}
                                onUpdateButton={onUpdateGame}
                            />
                        </section>
                        {recordsPerPage !== filteredGames.length && (
                        <div className="pagination">
                            <button
                                onClick={() => onPageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <div className="page-numbers">
                                {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => onPageChange(page)}
                                        className={page === currentPage ? "active" : ""}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => onPageChange(currentPage + 1)}
                                disabled={indexOfLastRecord >= gameList.length}
                            >
                                Next
                            </button>
                        </div>
                            )}
                    </>
                )}
                {shownPage === PageEnum.add && (
                    <AddGame
                        onBackButton={showGamesPage}
                        onSubmitButton={addGame}
                    />
                )}
                {shownPage === PageEnum.update && (
                    <UpdateGame
                        data={gameToEdit}
                        onBackButton={showGamesPage}
                        onUpdateButton={updateGame}
                    />
                )}
                {shownPage === PageEnum.barchart && (
                    <>
                    <GenreBarChart games={gameList} onBackButton={showGamesPage}/>
                    <GenreLineChart games={gameList}/>
                    </>
                )}
            </div>
        </>
    );
};
export default Home;
