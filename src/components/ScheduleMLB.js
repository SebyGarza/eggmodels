import React, { useEffect, useState, useMemo } from 'react';
import mlbScheduleData from '../python/mlb/csv/mlb-elo-2024.json';
import '../App.css';

const ScheduleMLB = ({ activeTab }) => {
    const [scheduleData, setScheduleData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('May');

    useEffect(() => {
        const dataWithParsedDates = mlbScheduleData.map(game => ({
            ...game,
            parsedDate: new Date(game.date)
        }));
        setScheduleData(dataWithParsedDates);
    }, [activeTab]);

    const uniqueMonths = useMemo(() => {
        return Array.from(new Set(scheduleData.map((game) => 
            game.parsedDate.toLocaleString('default', { month: 'long' })
        ))).filter(Boolean);
    }, [scheduleData]);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('default', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        });
    };

    return (
        <div className="mlb-schedule">
            <div className="month-selector">
                <label htmlFor="month-select">Month:&nbsp;</label>
                <select id="month-select" onChange={handleMonthChange} value={selectedMonth}>
                    {uniqueMonths.map((month, index) => (
                        <option key={index} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            <div className="games-container">
                {scheduleData
                    .filter((game) => game.parsedDate.toLocaleString('default', { month: 'long' }) === selectedMonth)
                    .map((game, index) => (
                        <div key={index} className="game-container">
                            <div className="game-date">
                                {formatDate(game.parsedDate)}
                            </div>
                            <div className="game-box">
                                <table className="game-table">
                                    <thead>
                                        <tr>
                                            <th>Teams</th>
                                            <th>Win %</th>
                                            <th>Spread</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='team-name'>
                                                <img className='team-logo' src={require(`../logosmlb/${game.team2}.png`)} alt={`${game.team2} Logo`} />
                                                {game.team2}
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td className='score'>{game.score2 ?? 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <td className='team-name'>
                                                <img className='team-logo' src={require(`../logosmlb/${game.team1}.png`)} alt={`${game.team1} Logo`} />
                                                {game.team1}
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td className='score'>{game.score1 ?? 'N/A'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ScheduleMLB;
