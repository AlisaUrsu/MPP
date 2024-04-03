import logo from './logo.svg';
import './App.css';

function App() {
  const games = [
    {
      id: 1,
      title: 'Lies of P',
      description: 'An action Souls-like game inspired by the story of Pinocchio.',
      release: 2023
    },
    {
      id: 2,
      title: 'Blasphemous',
      description: 'A Metroidvania action-adventure game taking place in the fictional region of Cvstodia.',
      release: 2019
    }
  ]
  return (
      <div>
        {
          games.map(game => (
              <div>
                <h2>{game.title}</h2>
                <p>{game.description}</p>
                <h4>Released in: {game.release}</h4>
              </div>
          ))
        }
      </div>
  );
}

export default App;
