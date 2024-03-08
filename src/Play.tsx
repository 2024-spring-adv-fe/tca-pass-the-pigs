import { useNavigate } from 'react-router-dom';
import { GameResult } from './GameResults';
import { FC, useEffect, useState } from 'react';

interface PlayProps {
    addNewGameResult: (result: GameResult) => void;
    setTitle: (t: string) => void;
}

export const Play: FC<PlayProps> = ({ addNewGameResult, setTitle }) => {

    const [start, setStart] = useState(new Date().toISOString());
    
    const [turnNumber, setTurnNumber] = useState(1);
    
    useEffect(   
        () => setTitle("Play Pass The Pigs")
         , []
    );

    const nav = useNavigate();

    return (
        <div
            className='flex flex-col gap-3'
        >
            <button
                className="btn btn-lg btn-primary"
                onClick={() => {
                    addNewGameResult({
                        winner: "Tom"
                        , players: [
                            "Tom"
                            , "Taylor"
                        ]
                        , start: start
                        , end: new Date().toISOString()
                        , totalTurns: turnNumber
                    });
                    nav(-2);
                }}
            >
                Done
            </button>
            <p
                className="text-xs"
            >
                Play the game and tap the app!!
            </p>
            <p>
                Current Turn: 1
            </p>
            <button
                className='btn btn-link'
                onClick={() => setTurnNumber(turnNumber + 1)}
            >
                Next Turn
            </button>
        </div>
    );
  };