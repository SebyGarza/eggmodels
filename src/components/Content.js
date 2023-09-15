import React, { useEffect, useState } from 'react';
import nflScheduleData from '../python/nflModel.json';
import '../App.css';

const Content = ({ activeTab }) => {
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

  if (activeTab === 'NFL') {
     // const selectedWeek = '2';
    return (
      <div className="nfl-schedule">
        <div className="week-selector">
          <label htmlFor="weekSelect">Select Week:</label>
          <select id="weekSelect" onChange={handleWeekChange} value={selectedWeek}>
            {uniqueWeeks.map((week, index) => (
              <option key={index} value={week}>
                {week}
              </option>
            ))}
          </select>
        </div>
        <div className="games-container">
  {scheduleData
    .filter((game) => game.Week === selectedWeek)
    .map((game, index) => (
      <div key={index} className="game-box">
        <div className="header-row">
          <div className="box-label">Teams</div>
          <div className="box-label">Score</div>
          <div className="box-label">Win Prob.</div>
        </div>
        <div className="away-team-row">
          <div className="team-logo">
            <img src={require(`../logosnfl/${game.Away}.gif`)} alt={`${game.Away} Logo`} />
          </div>
          <div className="team-names">
            <div>{game.Away}</div>
          </div>
          <div className="score">
            <div>{game.ScoreA}</div>
          </div>
          <div className="win-probability">
            <div>{calculateWinProbability(game.probA)}</div>
          </div>
        </div>
        <div className="home-team-row">
          <div className="team-logo">
            <img src={require(`../logosnfl/${game.Home}.gif`)} alt={`${game.Home} Logo`} />
          </div>
          <div className="team-names">
            <div>@&nbsp;{game.Home}</div>
          </div>
          <div className="score">
            <div>{game.ScoreH}</div>
          </div>
          <div className="win-probability">
            <div>{calculateWinProbability(game.probH)}</div>
          </div>
        </div>
      </div>
    ))}
</div>


      </div>
    );
  }

  return null;
};

export default Content;
