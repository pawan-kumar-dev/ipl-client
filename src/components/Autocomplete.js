import { useState } from "react";

const Autocomplete = ({
  suggestions,
  input,
  setInput,
  onKeyDown: onPressEnter,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const onChange = (e) => {
    const userInput = e.target.value;

    const unLinked = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const onClick = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul class="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li className={className} key={suggestion} onClick={onClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div class="no-suggestions">
        <em>No suggestions, you're on your own!</em>
      </div>
    );
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter" && filteredSuggestions.length > 0) {
      setFilteredSuggestions([]);
      setInput(filteredSuggestions[0]);
      setActiveSuggestionIndex(0);
      setShowSuggestions(false);
      onPressEnter();
    }
  };
  return (
    <>
      <div class="flex flex-col mb-8 justify-center flex-1 relative">
        <div class="w-full max-w-xl mr-6 focus-within:text-purple-500">
          <input
            class="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
            type="text"
            value={input}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="Search for Team"
            aria-label="Search"
          />
        </div>
        <div class="w-full relative max-w-xl mr-6 focus-within:text-purple-500">
          {showSuggestions && input && <SuggestionsListComponent />}
        </div>
      </div>
    </>
  );
};
export default Autocomplete;
