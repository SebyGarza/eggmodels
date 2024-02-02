// Playoffs.js

import React from 'react';
import './Playoffs.css'; // Import the CSS file
import playoffsJSON from '/Users/sebygarza/Documents/portfolio/eggmodels/src/python/playoffs.json';

// Dummy data for the playoffs bracket (you should replace this with actual data)
const playoffsData = [
    { side: "AFC", rounds: [
        { round: "Wild Card", matchups: [{ team1: playoffsJSON.AFC[2], team2: playoffsJSON.AFC[3] }, { team1: playoffsJSON.AFC[4], team2: playoffsJSON.AFC[5] }, { team1: playoffsJSON.AFC[6], team2: playoffsJSON.AFC[1] }] },
        { round: "Divisional", matchups: [{ team1: playoffsJSON.AFC[0], team2: "" }] },
        { round: "AFC Championship", matchups: [{ team1: "", team2: "" }] },
    ] },
    { side: "NFC", rounds: [
        { round: "Wild Card", matchups: [{ team1: playoffsJSON.NFC[2], team2: playoffsJSON.NFC[3] }, { team1: playoffsJSON.NFC[4], team2: playoffsJSON.NFC[5] }, { team1: playoffsJSON.NFC[6], team2: playoffsJSON.NFC[1] }] },
        { round: "Divisional", matchups: [{ team1: playoffsJSON.NFC[0], team2: "" }] },
        { round: "NFC Championship", matchups: [{ team1: "", team2: "" }] },
    ] },
];

// React component to render the playoffs bracket
const Playoffs = () => {
    return (
        <div className="playoffs-container">
            <div className="playoffs-side afc">
                {playoffsData[0].rounds.map((round, roundIndex) => (
                    <div key={roundIndex}>
                        <h3>{round.round}</h3>
                        {round.matchups.map((matchup, matchupIndex) => (
                            <div key={matchupIndex} className="matchup">
                                <div className="team">{matchup.team1}</div>
                                <div className="vs">VS</div>
                                <div className="team">{matchup.team2}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="playoffs-side nfc">
                {playoffsData[1].rounds.map((round, roundIndex) => (
                    <div key={roundIndex}>
                        <h3>{round.round}</h3>
                        {round.matchups.map((matchup, matchupIndex) => (
                            <div key={matchupIndex} className="matchup">
                                <div className="team">{matchup.team1}</div>
                                <div className="vs">VS</div>
                                <div className="team">{matchup.team2}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Playoffs;
