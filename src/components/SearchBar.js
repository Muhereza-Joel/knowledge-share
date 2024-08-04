import React, { useState, useEffect, memo } from "react";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchQuery,
  setSelectedFilter,
  searchData,
} from "../redux/reducers/searchSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { query, selectedFilter, filterOptions } = useSelector((state) => state.search);

  const handleSearch = () => {
    dispatch(searchData(query, selectedFilter.value));
  };


  const containerStyle = {
    display: "flex",
    alignItems: "center",
    borderRadius: "20px",
    border: "none",
    padding: "2px",
    width: "100%",
    marginTop: "-10px",
  };

  const searchInputStyle = {
    borderRadius: "20px",
    outline: "none",
    border: "1px solid #ced4da",
    boxShadow: "none",
    padding: "7px 20px",
    flex: 1,
  };

  const searchButtonStyle = {
    marginLeft: "10px",
    borderRadius: "20px",
    backgroundColor: "#217537",
    borderColor: "#28a745",
  };

  return (
    <div style={containerStyle}>
      <Select
        className="basic-single"
        classNamePrefix="select"
        placeholder="Filter by"
        name="filter"
        options={filterOptions}
        value={selectedFilter}
        onChange={(filter) => dispatch(setSelectedFilter(filter))}
        styles={{
          container: (provided) => ({
            ...provided,
            width: "150px",
            marginRight: "10px",
          }),
          control: (provided) => ({ ...provided, borderRadius: "20px" }),
        }}
      />
      <input
        type="text"
        className="form-control"
        placeholder="Search KnowledgeShare"
        style={searchInputStyle}
        value={query}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />
      <Button style={searchButtonStyle} onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default memo(SearchBar);
