import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import { Home, AppTitle } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';
import { 
  GameResult
  , getLeaderboard
  , getGeneralFacts
  , getPreviousPlayers
  , getAverageGameDurationsByPlayerCount
} from "./GameResults";
import { loadGamesFromCloud, saveGameToCloud } from "./tca-cloud-api";

const App = () => {

  const [gameResults, setGameResults] = useState<GameResult[]>([]);

  const [title, setTitle] = useState(AppTitle);

  const [chosenPlayers, setChosenPlayers] = useState<string[]>([]);

  useEffect(
    () => {
      const init = async () => {
        if (!ignore) {
          const cloudGameResults = await loadGamesFromCloud(
            "bschroeder10@madisoncollege.edu"
            , "tca-Pass-the-Pigs-24s"
          );

          setGameResults(cloudGameResults)
        }
      };

      let ignore = false;
      init();

      return () => {
        ignore = true;
      };
    }
    , []
  );

  const addNewGameResult = async (result: GameResult) => {

    //Save the game result to the Cloud.
    await saveGameToCloud(
      "bschroeder10@madisoncollege.edu" //hard coded for now
      , "tca-Pass-the-Pigs-24s"
      , result.end
      , result
    )

    //Optimistically update the lifted state with the new game result.

    setGameResults( 
      [
        ...gameResults
        , result
      ]
    );
  };

  const router = createHashRouter([
    {
      path: "/",
      element: <Home
        leaderboardData={getLeaderboard(gameResults)} 
        generalFacts={getGeneralFacts(gameResults)}
        setTitle={setTitle}
        avgGameDurationsByPlayerCount={getAverageGameDurationsByPlayerCount(gameResults)}
        />
    },
    {
      path: "/setup",
      element: <Setup 
        setTitle={setTitle}
        previousPlayers={getPreviousPlayers(gameResults)}
        setChosenPlayers={setChosenPlayers}
      />
    },
    {
      path: "/play",
      element: <Play
        addNewGameResult={addNewGameResult} 
        setTitle={setTitle}
        chosenPlayers={chosenPlayers}
        />
    },
  ]);

  return (
    <div 
      className="App"
    >
      <div
        className='navbar bg-primary'
      >
        {
          title === AppTitle &&
        
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
            </svg>
        }
        <span
          className='text-lg font-bold ml-3'
        >
          { title }
        </span>
      </div>
      <div
      className='p-3'
      >
        <RouterProvider 
            router={router} 
          />
      </div>
    </div>
  );
}

export default App;
