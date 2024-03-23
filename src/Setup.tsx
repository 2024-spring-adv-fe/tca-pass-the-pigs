import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SetupProps {
    setTitle: (t: string) => void;
    previousPlayers: string[];
};

export const Setup: FC<SetupProps> = ({ 
    setTitle
, previousPlayers
}) => {

    const [availablePlayers, setAvailablePlayers] = useState(previousPlayers.map(x => ({
        name: x
        , checked: false
    })));

    useEffect(   
        () => setTitle("Game Setup")
         , []
    ); 

    const nav = useNavigate();

    return (
        <div
            className='flex flex-col gap-3'
        >
            <button 
            className="btn btn-lg btn-primary"
            onClick={() => nav('/play')}
            disabled={availablePlayers.filter(x => x.checked).length < 2}
            >
                Start the Game
            </button>
            <div
                className='card bg-base-100 shadow-xl'
            >
                {
                    availablePlayers.map(x => (
                        <div 
                            className="form-control"
                            key={x.name}
                        >
                            <label 
                                className="flex cursor-pointer"
                            >   
                                <input 
                                    type="checkbox" 
                                    className="checkbox checkbox-primary"
                                    checked={x.checked} 
                                    onChange={() => setAvailablePlayers([
                                        ...availablePlayers.map(y => ({
                                            name: y.name
                                            , checked: y.name === x.name
                                                ? !y.checked
                                                : y.checked
                                        }))
                                    ])}
                                />
                                <span 
                                    className="label-text ml-3"
                                >
                                    {x.name}
                                </span> 
                            </label>
                        </div>

                    ))
                }
            <div 
                className='card-body p-3'
            >
            </div>
            </div>                
        </div>
    );
  };