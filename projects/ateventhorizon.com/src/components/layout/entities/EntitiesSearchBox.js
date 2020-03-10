import React from "react";

const EntitiesSearchBox = ({
  updatePartialSearch,
  placeHolderText,
  extraClassName
}) => {
  const computedInputClassName = "search-bar " + extraClassName;
  return (
    <div className="searchbar-a entitiesSearchBox">
      <input
        className={computedInputClassName}
        type="text"
        id="search-bar"
        placeholder={placeHolderText}
        onChange={e => {
          // eslint-reimplement
          //updatePartialSearch(e.target.value.toLowerCase());
        }}
      />
    </div>
  );
};

export default EntitiesSearchBox;
