import React from "react";
import moment from "moment";

const Answer = (props) => {
  return (
    <div className=" card mt-2 p-2">
      <div className="text-secondary">
      <p className="fw-bold">{`Answer by ${props.username} ${moment(
          props.created_at
        ).fromNow()}`}</p>
        {/* <p className="fw-bold">{`Answer by ${props.username} on ${moment(
          props.created_at
        ).format("LLL")}`}</p> */}
        <div
          dangerouslySetInnerHTML={{
            __html: String(props.answerContent) || "",
          }}
        />
      </div>
      {/* Add any additional information from the answer object */}
    </div>
  );
};

export default Answer;
