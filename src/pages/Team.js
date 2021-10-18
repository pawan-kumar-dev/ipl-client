import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "../api";
import { LoaderComponent, PlayersCard } from "../components";

const Team = () => {
  const params = useParams();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get(`/players/search?from=${params.team}`).then((res) => {
      if (res && res.data) {
        setLoading(false);
        setPlayers(res.data);
      }
    });
  }, [params]);
  const topBatsman = players.filter(
    (player) => player.description === "Batsman"
  );
  const topBowler = players.filter((player) => player.description === "Bowler");
  return loading ? (
    <LoaderComponent />
  ) : (
    <div>
      <div className="flex items-start justify-between flex-col p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span>Team {params.team}</span>
        </div>
      </div>
      <div className="flex items-start justify-between flex-col p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
          </svg>
          <span>Total Players {players.length}</span>
        </div>
      </div>
      <div className="flex items-start justify-between flex-col p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            aria-hidden="true"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          <span>Top Batsman {topBatsman[0]?.playerName || "N/A"}</span>
        </div>
      </div>
      <div className="flex items-start justify-between flex-col p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            aria-hidden="true"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
            <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
          </svg>
          <span>Top Batsman {topBowler[0]?.playerName || "N/A"}</span>
        </div>
      </div>
      <PlayersCard players={players} />
    </div>
  );
};

export default Team;
