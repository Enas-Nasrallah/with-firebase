import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadedIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef('');
  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value ) {
      }
      const query =
        enteredFilter.length === 0
          ? ""
          : `?orderBy='title'&equalTo='${enteredFilter}'`;
      fetch(
        `https://react-hooks-update.firebaseio.com/ingredients/` + query
      )
        .then((response) => response.json())
        .then((responseData) => {
          const LoadedIngredients = [];
          for (const key in responseData) {
            LoadedIngredients.push({
              id: key,
              title: responseData[key].title,
              amount: responseData[key].amount,
            });
          }
          onLoadedIngredients(LoadedIngredients);
        });
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, onLoadedIngredients, inputRef]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
