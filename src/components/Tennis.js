import React, { useState, useEffect } from 'react';
import tennisData from '../python/tennis/tennisMatchups.json'; // ✅ matches your matchup-style JSON

const Tennis = ({ activeTab }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(tennisData);
  }, [activeTab]);

  return (
    <div className="nfl-schedule">
      <div className="week-selector">
        <label>French Open</label>
      </div>

      <div className="games-container">
        {data.map((match, index) => (
          <div key={index} className="game-box">
            <table className="game-table">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Win %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='team-name'>{match["Player 1"]}</td>
                  <td className="probability">{(match["Player 1 Win Probability"] * 100).toFixed(1)}%</td>
                </tr>
                <tr>
                  <td>{match["Player 2"]}</td>
                  <td className="probability">{(match["Player 2 Win Probability"] * 100).toFixed(1)}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tennis;
