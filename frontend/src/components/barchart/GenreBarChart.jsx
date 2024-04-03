import "./GenreBarChart.styles.css";
import Chart from 'chart.js/auto';
import {useEffect, useRef} from "react";
import {IGame} from "../Games.type";
import {Genres} from "../Genres";
Chart.defaults.color = '#fff'
const GenreBarChart = ({games, onBackButton}) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const groupedData = Genres.reduce((acc, genre) => {
            const count = games.filter(game => game.genres.includes(genre)).length;
            acc[genre] = count;
            return acc;
        }, {});

        const labels = Object.keys(groupedData);
        const counts = Object.values(groupedData);

        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Games Count by Genres',
                    data: counts,
                    backgroundColor: 'rgba(174,85,234,1)',
                    borderColor: 'rgba(174,85,234,1)',
                    borderWidth: 1,
                }]
            },
            options: {

                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Count'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Genres'
                        }
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [games]);

    const handleBackButtonClick = () => {
        onBackButton();
    };

    return (
        <div>
            <button
                className="barchart-back-button"
                onClick={handleBackButtonClick}
            >
                Back
            </button>
            <canvas ref={chartRef} height={130}/>

        </div>
    );
}

export default GenreBarChart;
