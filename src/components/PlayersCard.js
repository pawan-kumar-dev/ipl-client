import React from "react";
import { Link } from "react-router-dom";

const PlayersCard = ({ players }) => (
  <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
    {players.map((player) => {
      return (
        <Link to={`/player/${player._id}`} key={player._id}>
          <div className="flex flex-col items-start p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <img
              className="rounded-lg h-20 w-20"
              src={player.imageUri}
              alt="player"
            />
            <div className="mt-2">
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Name: {player.playerName}
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Team: {player.from}
              </p>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Price: {player.price}
              </p>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Status: {player.isPlaying ? "Playing" : "On-bench"}
              </p>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Role: {player.description}
              </p>
            </div>
          </div>
        </Link>
      );
    })}
  </div>
);

export default PlayersCard;
