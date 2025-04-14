import React from "react";

//function Search(props) {props.searchTerm }
function Search({ searchTerm, setSearchTerm }) {
  // should not mutate props like this 'searchTerm = "hello"'
  // and never update or mutate the state directly like this 'setSearchTerm("hello")'
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search Movie"
          value={searchTerm}
          onChange={
            //setSearchTerm get fired when the value of the input changes (or key presses)
            (event) => setSearchTerm(event.target.value)
          }
        />
      </div>
    </div>
  );
}

export default Search;
