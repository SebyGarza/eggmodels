import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale); // register English locale

const Tennis = ({ activeTab }) => {
  const [data, setData] = useState([]);
  const [latestDateStr, setLatestDateStr] = useState(null);
  const [breakEvenMap, setBreakEvenMap] = useState({});

  useEffect(() => {
    const fetchLatestMatches = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "model_outputs"));
        const allMatches = querySnapshot.docs.map(doc => doc.data());

        const dateMatchMap = {};
        allMatches.forEach(match => {
          const dateObj = match.uploaded_at.toDate();
          const dayStr = dateObj.toLocaleDateString("en-CA");
          if (!dateMatchMap[dayStr]) dateMatchMap[dayStr] = [];
          dateMatchMap[dayStr].push(match);
        });

        const allDates = Object.keys(dateMatchMap);
        const latestStr = allDates.sort((a, b) => new Date(b) - new Date(a))[0];
        const latestMatches = dateMatchMap[latestStr] || [];

        setLatestDateStr(latestStr);
        const seen = new Set();
        const dedupedMatches = [];
        const breakEvenMap = {};

        latestMatches.forEach(match => {
          const player = match.Player;
          const opponent = match.Opponent;
          breakEvenMap[player] = match["Breakeven Odds"];

          const key = [player, opponent].sort().join("|");
          if (!seen.has(key)) {
            seen.add(key);
            dedupedMatches.push(match);
          }
        });

        setData(dedupedMatches);
        setBreakEvenMap(breakEvenMap);
      } catch (err) {
        console.error("❌ Error fetching tennis data:", err);
      }
    };

    fetchLatestMatches();
  }, [activeTab]);

  const capitalizeFullName = (name) => {
    return name
      .split(" ")
      .map(part =>
        part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
      )
      .join(" ");
  };

  const countryToEmoji = (countryName) => {
    const code = countries.getAlpha2Code(countryName, 'en');
    if (!code) return '';
    return [...code.toUpperCase()].map(c => String.fromCodePoint(127397 + c.charCodeAt())).join('');
  };

  return (
    <div className="nfl-schedule">
      <div className="week-selector">
        <label>Latest Matches{latestDateStr ? ` – ${latestDateStr}` : ''}</label>
      </div>

      <div className="games-container">
        {data.map((match, index) => (
          <div key={index} className="game-box">
            <table className="game-table">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Win Odds</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="team-name">
                    {countryToEmoji(match.player_country)} {capitalizeFullName(match.Player) || "N/A"}
                  </td>
                  <td className="probability">
                    {Number(breakEvenMap[match.Player]) > 0
                      ? `+${Number(breakEvenMap[match.Player])}`
                      : Number(breakEvenMap[match.Player])}
                  </td>
                </tr>
                <tr>
                  <td>
                    {countryToEmoji(match.opponent_country)} {capitalizeFullName(match.Opponent) || "N/A"}
                  </td>
                  <td className="probability">
                    {Number(breakEvenMap[match.Opponent]) > 0
                      ? `+${Number(breakEvenMap[match.Opponent])}`
                      : Number(breakEvenMap[match.Opponent])}
                  </td>
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