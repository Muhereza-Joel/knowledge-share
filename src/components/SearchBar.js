import React, { memo, useEffect } from "react";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setSearchQuery,
  searchData,
} from "../redux/reducers/searchSlice";
import { setSelectedSearchFilter } from "../redux/reducers/uiSlice";

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { query,searchResults, loading} = useSelector((state) => state.search);
  const { selectedSearchFilter, searchFilterOptions } = useSelector((state) => state.ui);

  const handleSearch = () => {
    dispatch(searchData(query, selectedSearchFilter.value));
    navigate("/knowledge-share/search-results/");
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
    // backgroundColor: "#217537",
    backgroundColor: "#28a745",
    borderColor: "#28a745",
  };

  return (
    <div style={containerStyle}>
      <Select
        className="basic-single"
        classNamePrefix="select"
        placeholder="Filter by"
        name="filter"
        options={searchFilterOptions}
        value={selectedSearchFilter}
        onChange={(filter) => dispatch(setSelectedSearchFilter(filter))}
        styles={{
          container: (provided) => ({
            ...provided,
            width: "200px",
            marginRight: "10px",
          }),
          control: (provided) => ({ ...provided, borderRadius: "20px" }),
        }}
      />
      <input
        type="text"
        className="form-control"
        placeholder="What are you looking for?"
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
