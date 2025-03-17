import React, { useState, useEffect } from "react";
import "./TopAssists.css";

function TopAssists() {
  const [assists, setAssists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAssists() {
      try {
        const response = await fetch(
          "https://v3.football.api-sports.io/players/topassists?league=39&season=2023",
          {
            method: "GET",
            headers: {
              "x-apisports-key": "ba9db9c04dc363d5097e3ae1a6df0c17",
            },
          }
        );

        console.log("Raw Response:", response);

        const data = await response.json();
        console.log("API Response:", data);

        if (data.response && data.response.length > 0) {
          setAssists(data.response);
        } else {
          setError("No assist data available.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    }

    fetchAssists();
  }, []);

  return (
    <div className="top-assists-container">
      <h2 className="top-assists-title">Top Assists</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {assists.length > 0 ? (
        <table className="top-assists-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Team</th>
              <th>Assists</th>
            </tr>
          </thead>
          <tbody>
            {assists.map((player, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="top-assists-player">
                  <img
                    src={player.player.photo}
                    alt={player.player.name}
                  />{" "}
                  {player.player.name}
                </td>
                <td className="top-assists-team">
                  <img
                    src={player.statistics[0].team.logo}
                    alt={player.statistics[0].team.name}
                  />{" "}
                  {player.statistics[0].team.name}
                </td>
                <td>{player.statistics[0].goals.assists || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}

export default TopAssists;
