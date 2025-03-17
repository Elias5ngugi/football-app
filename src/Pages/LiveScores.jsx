import React, { useEffect, useState } from "react";
import "./LiveScores.css"; 

function LiveScores() {
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const API_KEY = "ba9db9c04dc363d5097e3ae1a6df0c17";
        const url = "https://v3.football.api-sports.io/fixtures?live=all";

        fetch(url, {
            method: "GET",
            headers: {
                "x-apisports-key": API_KEY,
                "Accept": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch live scores");
            }
            return response.json();
        })
        .then(data => {
            setMatches(data.response);
        })
        .catch(error => {
            console.error("Error fetching live scores:", error);
            setError(error.message);
        });
    }, []);

    return (
        <div className="live-scores-container">
            <h2>Live Scores</h2>
            {error ? (
                <p className="error">Error: {error}</p>
            ) : matches.length === 0 ? (
                <p className="no-matches">No live matches at the moment.</p>
            ) : (
                <div className="matches">
                    {matches.map((match) => (
                        <div key={match.fixture.id} className="match-card">
                            <div className="team">
                                <img src={match.teams.home.logo} alt={match.teams.home.name} />
                                <p>{match.teams.home.name}</p>
                            </div>
                            <div className="score">
                                <p>{match.goals.home} - {match.goals.away}</p>
                                <span className="status">{match.fixture.status.short === "FT" ? "Full Time" : match.fixture.status.elapsed + "′"}</span>
                            </div>
                            <div className="team">
                                <img src={match.teams.away.logo} alt={match.teams.away.name} />
                                <p>{match.teams.away.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LiveScores;
