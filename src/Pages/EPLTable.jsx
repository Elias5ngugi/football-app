import React, { useEffect, useState } from "react";
import "./EPLTable.css";

function EPLTable() {
    const [standings, setStandings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const API_KEY = "ba9db9c04dc363d5097e3ae1a6df0c17";
        const url = "https://v3.football.api-sports.io/standings?league=39&season=2023";

        fetch(url, {
            method: "GET",
            headers: {
                "x-apisports-key": API_KEY,
                "Accept": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            return response.json();
        })
        .then(data => {
            setStandings(data.response[0].league.standings[0]); 
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            setError(error.message);
        });
    }, []);

    return (
        <div className="epl-table-container">
            <h2 className="epl-table-title">EPL Table</h2>
            {error ? (
                <p className="error-message">Error: {error}</p>
            ) : (
                <table className="epl-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Team</th>
                            <th>Points</th>
                            <th>Played</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map((team) => (
                            <tr key={team.team.id}>
                                <td>{team.rank}</td>
                                <td>
                                    <img className="epl-team-logo" src={team.team.logo} alt={team.team.name} />
                                    {team.team.name}
                                </td>
                                <td>{team.points}</td>
                                <td>{team.all.played}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default EPLTable;
