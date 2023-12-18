import React, { useState, useEffect, memo } from "react";
import "bootstrap/dist/css/bootstrap.css";
import PopularTag from "./popularTag";

const Tags = (props) => {
  const [tagsData, setTagsData] = useState([]);
  const [error, setError] = useState(null);

  const panelStyle = {
    minHeight: "90vh",
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/tags/popular-tags/");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTagsData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTags();
  }, []);

  return (
    <div>
      <div id="content-section">
        <div id="middle-panel" className="card p-2 m-2" style={panelStyle}>
          <div className="pt-2 w-75 h4 m-2">All Tags</div>
          <div className="row g-0">
            {tagsData.map((tag, index) => (
              <div className="col-lg-3" key={tag.id}>
                <div className="card p-4 m-2">
                  <PopularTag
                    key={tag.id}
                    id={tag.id}
                    title={tag.name}
                    description={tag.description}
                    username={`${props.username}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Tags);
