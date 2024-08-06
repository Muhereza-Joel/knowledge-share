import React from "react";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import { useSelector } from "react-redux";
import QuestionCard from "./questionCard";

const SearchPage = (props) => {
  const { query, searchResults, loading } = useSelector(
    (state) => state.search
  );

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
    height: "calc(100vh - 0px)",
    overflow: "auto", // Add overflow: auto to enable scrolling when content is too long
  };

  return (
    <div style={style}>
      <div className="row g-0">
        <TopBar username={props.username} />
        <div className="col-sm-2">
          <div style={{ position: "fixed", top: "50px", width: "18%" }}>
            <LeftSideBar username={props.username} />
          </div>
        </div>
        <div className="col-sm-10">
          <div>
            <div id="content-section">
              <div
                className="container-fluid"
                style={{ backgroundColor: "#f6f9ff" }}
              >
                <div className="row">
                  <div className="col">
                    <div className="card mt-3">
                      <div
                        style={{ borderRadius: "0px !important" }}
                        className="card-header alert alert-success p-2 d-flex justify-content-between align-items-center"
                      >
                        <div>
                          
                          <h5 className="mb-0"> {loading ? 'Loading' : 'Showing'} Search Results for "{query}"</h5>
                        </div>
                        <span className="badge bg-light text-dark">
                          {searchResults ? `${searchResults.length} results found` : "No results found"}
                        </span>
                      </div>
                      <div className="card-body">
                        {searchResults ? (
                          searchResults.map((question, index) => (
                            <QuestionCard
                              key={index}
                              data={question}
                              currentUser={`${props.username}`}
                              loading={loading}
                            />
                          ))
                        ) : (
                          <p>No results found</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
