import React, { useEffect, useState } from 'react';
import nflScheduleData from '../python/nflModel.json';
import '../App.css';

const ScheduleNFL = ({ activeTab }) => {
    const [scheduleData, setScheduleData] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState('2');

    useEffect(() => {
        // Use the imported JSON data directly
        setScheduleData(nflScheduleData);
    }, [activeTab]);

    const handleWeekChange = (event) => {
        setSelectedWeek(event.target.value);
    };

    const uniqueWeeks = Array.from(new Set(scheduleData.map((game) => game.Week)))
    .filter((week) => week !== 'Week' && parseInt(week) >= 1);

    // Function to calculate and format the win probability
    const calculateWinProbability = (prob) => {
        return `${(prob * 100).toFixed(2)}%`;
    };

    const rounding = (spread) => {
        return `${spread.toFixed(2)}`;
    };

    return (
        <div className="nfl-schedule">
        <div className="week-selector">
          <label>Week 2</label> 
          {/* <select onChange={handleWeekChange} value={selectedWeek}>
            {uniqueWeeks.map((week, index) => (
              <option key={index} value={week}>
                {week}
              </option>
            ))}
          </select> */}
        </div>

        <div className="games-container">
        {scheduleData
            .filter((game) => game.Week === 2) // Change 2 to selectedWeek variable
            .map((game, index) => (
              <div key={index} className="game-box">
                <table className="game-table">
                  <tr>
                    <th>Teams</th>
                    <th>Win Prob.</th>
                    <th>EloSpread</th>
                    <th>Score</th>
                  </tr>
                    
                  <tr>
                    <td className='team-name'>
                      <img className='team-logo' src={require(`../logosnfl/${game.Away}.png`)} alt={`${game.Away} Logo`} />
                      {game.Away} 
                    </td>
                    <td>{calculateWinProbability(game.probA)}</td>
                    <td></td>
                    <td className='score'>{game.ScoreA}</td>
                  </tr>

                  <tr>
                    <td className='team-name'>
                    <img className='team-logo' src={require(`../logosnfl/${game.Home}.png`)} alt={`${game.Home} Logo`} />
                      {game.Home}
                    </td>
                    <td>{calculateWinProbability(game.probH)}</td>
                    <td>{rounding(game.eloSpread)}</td>
                    <td className='score'>{game.ScoreH}</td>
                  </tr>

                </table>
                
              </div>
            ))
          }
        </div>
      </div>
    )
}

export default ScheduleNFL;