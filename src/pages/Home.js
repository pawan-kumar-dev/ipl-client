import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api";
import { Autocomplete, LoaderComponent, PlayersCard } from "../components";

const Home = () => {
  const [teams, setTeams] = useState({});
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    if (!input) {
      setSearchInput("");
      setLoading(true);
      axios.get("/players").then((res) => {
        if (res && res.data && Array.isArray(res.data)) {
          const newTeams = res.data.reduce((acc, currVal) => {
            if (acc && acc[currVal.from]) {
              acc[currVal.from].push(currVal);
            } else {
              acc[currVal.from] = [currVal];
            }
            return acc;
          }, {});
          setLoading(false);
          setTeams(newTeams);
        }
      });
    }
  }, [input]);
  const onKeyDown = () => {
    const teamValue = Object.keys(teams).find((team) =>
      team.toLowerCase().includes(input.toLowerCase())
    );
    if (teamValue) {
      setSearchInput(teamValue);
      setInput(teamValue);
      axios.get(`/players/search?from=${teamValue}`).then((res) => {
        if (res && res.data) {
          setPlayers(res.data);
        }
      });
    }
  };
  return loading ? (
    <LoaderComponent />
  ) : (
    <div>
      <Autocomplete
        suggestions={Object.keys(teams)}
        input={input}
        setInput={setInput}
        onKeyDown={onKeyDown}
      />
      {searchInput ? (
        <PlayersCard players={players} />
      ) : (
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          {Object.keys(teams).map((key) => {
            return (
              <Link to={`/${key}`} key={key}>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                  <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Team {key}
                    </p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                      Total Players {teams[key].length}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
