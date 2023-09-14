import React, { useEffect, useState } from 'react';
import nflScheduleData from '../scraping/nfl_schedule.json'; // Import the JSON file

const Content = ({ activeTab }) => {
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState('1'); // Default to "Week 2"

  useEffect(() => {
    // Use the imported JSON data directly
    setScheduleData(nflScheduleData);
  }, [activeTab]);

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  const uniqueWeeks = Array.from(new Set(scheduleData.map((game) => game.Week)));

  const filteredScheduleData =
    selectedWeek === 'Week' ? scheduleData : scheduleData.filter((game) => game.Week === selectedWeek);

  if (activeTab === 'NFL') {
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
        <table>
          <thead>
            <tr>
              <th>Week</th>
              <th>Day</th>
              <th>Date</th>
              <th>Time</th>
              <th>Home</th>
              <th>Away</th>
            </tr>
          </thead>
          <tbody>
            {filteredScheduleData.map((game, index) => (
              <tr key={index}>
                <td>{game.Week}</td>
                <td>{game.Day}</td>
                <td>{game.Date}</td>
                <td>{game.Time}</td>
                <td>{game.TeamNames1}</td>
                <td>{game.TeamNames2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
};

export default Content;
