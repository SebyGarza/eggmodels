import React, { useEffect, useState } from 'react';

const Secret = () => {
  const [groupedData, setGroupedData] = useState([]);
  const [recentClosedBets, setRecentClosedBets] = useState([]);
  const [currentOpenBets, setCurrentOpenBets] = useState([]);
  const [statusMessage, setStatusMessage] = useState('Starting...');
  const [profitLast24, setProfitLast24] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const runProcess = async () => {
      try {
        setStatusMessage("Fetching wagers...");
        const res = await fetch('https://us-central1-egg-models.cloudfunctions.net/getBets');
        if (!res.ok) throw new Error("Server returned error");
        const data = await res.json();
        const wagers = data.data?.wagers || [];

        setStatusMessage("Fetching markets...");
        const openWagers = wagers.filter(w => w.status === 'open');
        const uniqueEventIds = [...new Set(openWagers.map(w => w.sport_event_id))];

        let allSelections = [];
        for (let eventId of uniqueEventIds) {
          const marketRes = await fetch(`https://us-central1-egg-models.cloudfunctions.net/getMarkets?event_id=${eventId}`);
          if (!marketRes.ok) continue;
          const marketData = await marketRes.json();
          const markets = marketData.data?.markets || [];

          markets.forEach(market => {
            if (market.name === 'Moneyline') {
              market.selections.flat().forEach(selection => {
                allSelections.push({
                  line_id: selection.line_id,
                  name: selection.name
                });
              });
            }
          });
        }

        const lineIdMap = {};
        allSelections.forEach(sel => {
          if (!lineIdMap[sel.line_id]) {
            lineIdMap[sel.line_id] = sel.name;
          }
        });

        const enrichedWagers = wagers.map(w => ({
          ...w,
          name: lineIdMap[w.line_id] || null
        }));

        // -------- Status of Open Bets --------
        const preMatch = enrichedWagers.filter(w =>
          w.winning_status === "tbd" &&
          w.status !== "canceled" &&
          w.status !== "wiped"
        );

        const groupMap = {};
        preMatch.forEach(w => {
          if (!groupMap[w.matching_status]) {
            groupMap[w.matching_status] = {
              matched_dlls: 0,
              allocated_dlls: 0,
              count: 0
            };
          }
          groupMap[w.matching_status].matched_dlls += w.matched_stake || 0;
          groupMap[w.matching_status].allocated_dlls += w.original_stake || 0;
          groupMap[w.matching_status].count += 1;
        });

        const grouped = Object.keys(groupMap).map(status => ({
          matching_status: status,
          ...groupMap[status]
        }));

        const fullyMatched = grouped.find(g => g.matching_status === "fully_matched");
        const partiallyMatched = grouped.find(g => g.matching_status === "partially_matched");
        const unmatched = grouped.find(g => g.matching_status === "unmatched");

        const newData = [];

        if (fullyMatched) {
          newData.push({
            matching_status: "fully_matched",
            dlls: fullyMatched.matched_dlls,
            count: fullyMatched.count
          });
        }

        if (partiallyMatched) {
          newData.push({
            matching_status: "partially_matched",
            dlls: partiallyMatched.matched_dlls,
            count: partiallyMatched.count
          });
          newData.push({
            matching_status: "partially_unmatched",
            dlls: partiallyMatched.allocated_dlls - partiallyMatched.matched_dlls,
            count: partiallyMatched.count
          });
        }

        if (unmatched) {
          newData.push({
            matching_status: "unmatched",
            dlls: unmatched.allocated_dlls,
            count: unmatched.count
          });
        }

        const totalDlls = newData.reduce((sum, r) => sum + r.dlls, 0);
        newData.forEach(r => {
          r["% dlls"] = totalDlls > 0 ? ((r.dlls / totalDlls) * 100).toFixed(1) : '0.0';
        });

        setGroupedData(newData);

        // -------- Bets Closed in Last 24 Hours --------
        const cutoffTime = new Date(Date.now() - 24 * 3600 * 1000);
        const closed = enrichedWagers
          .filter(w => w.winning_status !== "tbd" && w.settled_at && new Date(w.settled_at) >= cutoffTime)
          .sort((a, b) => (b.profit || 0) - (a.profit || 0));

        const profitSum = closed.reduce((sum, w) => sum + (w.profit || 0), 0);
        setRecentClosedBets(closed);
        setProfitLast24(profitSum);


        setRecentClosedBets(closed);

        // -------- Bets Currently Open --------
        const open = enrichedWagers
          .filter(w =>
            w.name &&
            w.winning_status === "tbd" &&
            w.status !== "wiped" &&
            w.status !== "canceled"
          )
          .sort((a, b) => (b.matched_stake || 0) - (a.matched_stake || 0));

        setCurrentOpenBets(open);

        setStatusMessage("Done!");
      } catch (e) {
        console.error(e);
        setError(e.message);
        setStatusMessage("Error occurred");
      }
    };

    runProcess();
  }, []);

  return (
    <div>
      <h1>Secret</h1>
      <h3>{statusMessage}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Status of Open Bets</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Status</th>
            <th>DLLs</th>
            <th>Count</th>
            <th>% DLLs</th>
          </tr>
        </thead>
        <tbody>
          {groupedData.map(row => (
            <tr key={row.matching_status}>
              <td>{row.matching_status}</td>
              <td>{row.dlls.toFixed(2)}</td>
              <td>{row.count}</td>
              <td>{row["% dlls"]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Bets Closed in Last 24 hrs</h2>
      <p>Profit in last 24 hrs: {profitLast24.toFixed(2)}</p>

      <table border="1">
        <thead>
          <tr>
            <th>Line ID</th>
            <th>Wager ID</th>
            <th>Odds</th>
            <th>Matched Stake</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {recentClosedBets.map(bet => (
            <tr key={bet.wager_id || bet.line_id}>
              <td>{bet.line_id}</td>
              <td>{bet.wager_id}</td>
              <td>{bet.odds}</td>
              <td>{bet.matched_stake}</td>
              <td>{bet.profit}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Bets Currently Open</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Odds</th>
            <th>Matched Stake</th>
            <th>Original Stake</th>
          </tr>
        </thead>
        <tbody>
          {currentOpenBets.map(bet => (
            <tr key={bet.wager_id || bet.line_id}>
              <td>{bet.name}</td>
              <td>{bet.odds}</td>
              <td>{bet.matched_stake}</td>
              <td>{bet.original_stake}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Secret;
