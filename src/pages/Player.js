import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "../api";
import { LoaderComponent } from "../components";

const Player = () => {
  const params = useParams();
  const [player, setPlayer] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get(`/players/${params.id}`).then((res) => {
      if (res && res.data) {
        setLoading(false);
        setPlayer(res.data);
      }
    });
  }, [params]);
  return loading ? (
    <LoaderComponent />
  ) : (
    <div
      class="max-w-sm rounded overflow-hidden shadow-lg mx-auto my-8"
      style={{ width: "100%", maxWidth: "450px" }}
    >
      {player.imageUri && (
        <img
          class="w-full"
          src={player.imageUri}
          alt="Sunset in the mountains"
        />
      )}
      <div class="px-6 py-4">
        {player.playerName && (
          <div class="font-bold text-xl mb-2">Name: {player.playerName}</div>
        )}
        {player.from && (
          <p class="text-gray-600 text-base">Team: {player.from}</p>
        )}
        {player.description && (
          <p class="text-gray-600 text-base">Role: {player.description}</p>
        )}
        <p class="text-gray-600 text-base">
          Status: {player.isPlaying ? "Playing" : "On-bench"}
        </p>
        {player.price && (
          <p class="text-gray-600 text-base">Price: {player.price}</p>
        )}
      </div>
    </div>
  );
};

export default Player;
