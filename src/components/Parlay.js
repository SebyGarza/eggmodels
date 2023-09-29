import React, { useState, useEffect } from 'react';
import '../Parlay.css';
import nflScheduleData from '../python/nflModel.json';

const Parlay = ({ activeTab }) => {
    const [selectedWinners, setSelectedWinners] = useState([]);
    const [week, setWeek] = useState(4); // Set the default week to 3, you can change it as needed.

    // Function to handle winner selection for a game
    // Function to handle winner selection for a game
    const handleWinnerSelection = (gameId, team, index) => {
        setSelectedWinners((prevSelectedWinners) => {
            const updatedWinners = [...prevSelectedWinners];
            updatedWinners[index] = updatedWinners[index]?.team === team ? null : { gameId, team };
            return updatedWinners;
        });
    };

    const calculateParlayOdds = () => {
        let odds = 1;

        for (let index = 0; index < selectedWinners.length; index++) {
            const selection = selectedWinners[index];
            if (selection) {
                const { team } = selection;
                const game = nflScheduleData.find(
                    (game) => game.Week === week && (team === game.Away || team === game.Home)
                );
                if (game) {
                    odds *= team === game.Away ? game.probA : game.probH;
                }
            }
        }

        if (odds <= 0.5) {
            odds = (100 / odds) - 100;
        }
        else if (odds === 1) {
            return null
        }
        else {
            odds = -(odds * 100) / (1 - odds);
        }

        const sign = odds >= 0 ? '+' : '-';

        if (sign === '-') {
            return Math.round(odds);
        }

        return `${sign}` + Math.round(odds);
        
    };

    // Add an effect to recalculate odds when selectedWinners or week changes
    useEffect(() => {
        // Call calculateParleyOdds to recalculate odds when selectedWinners or week changes
        const odds = calculateParlayOdds();
        // Update the odds in your application as needed (e.g., send it to a server or update a state variable).
        // For now, we'll just log it.
        console.log(odds);
    }, [selectedWinners, week]);

    return (
        <div className='parley'>
            <h1></h1>
            <select
                value={week}
                onChange={(e) => setWeek(Number(e.target.value))}
            >
                {Array.from({ length: 4 }, (_, i) => (
                    <option key={i} value={i + 1}>
                        Week {i + 1}
                    </option>
                ))}
            </select>

            <h3>Selected Winners:</h3>

            <ul className='selected-winners'>
                {selectedWinners
                    .filter(selection => selection) // Filter out null or undefined entries
                    .map((selection, index) => (
                        <li key={index}>
                            {selection.team}
                        </li>
                    ))}
            </ul>


            <h3>Fair Odds: {calculateParlayOdds()}</h3>


            <div className='parley-container'>
            <table className="games-table">
                {nflScheduleData
                    .filter((game) => game.Week === week)
                    .map((game, index) => (
                    <tr key={index}>
                        <td className="left-column">
                        <input
                            type="checkbox"
                            value={game.Away}
                            onChange={() => handleWinnerSelection(game.id, game.Away, index)}
                            checked={
                            selectedWinners[index] &&
                            selectedWinners[index].gameId === game.id &&
                            selectedWinners[index].team === game.Away
                            }
                        />
                        <img
                            className="team-logo"
                            src={require(`../logosnfl/${game.Away}.png`)}
                            alt={`${game.Away} Logo`}
                        />
                        {game.Away}
                        </td>
                        <td className="separator">@</td>
                        <td className="right-column">
                        <img
                            className="team-logo"
                            src={require(`../logosnfl/${game.Home}.png`)}
                            alt={`${game.Home} Logo`}
                        />
                        {game.Home}
                        <input
                            type="checkbox"
                            value={game.Home}
                            onChange={() => handleWinnerSelection(game.id, game.Home, index)}
                            checked={
                            selectedWinners[index] &&
                            selectedWinners[index].gameId === game.id &&
                            selectedWinners[index].team === game.Home
                            }
                        />
                        </td>
                    </tr>
                    ))}
                </table>
                </div>

            </div>
    );
};

export default Parlay;
