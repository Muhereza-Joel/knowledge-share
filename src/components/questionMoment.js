import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import moment from "moment";
import Avator from "../assets/images/avator.jpg";

const QuestionMoment = (props) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const style = {
    borderRight: "4px solid #299ea6",
    paddingRight: "6px",
  };
  return (
    <div className="text-end" style={style}>
      <div className="d-flex flex-column">
        <div className="d-flex flex-row flex-row-reverse">
          <img
            width={40}
            height={40}
            src={props.avatarUrl || Avator}
            className="rounded-circle"
            onClick={openModal}
            style={{ cursor: "pointer" }}
          ></img>

          {showModal && (
            <div className="modal" onClick={closeModal}>
              <div className="modal-content">
                <img
                  src={props.avator}
                  alt="Zoomed Avatar"
                  className="rounded-circle"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <span>{props.username}</span>
        <span className="text-dark">{moment(props.created_at).fromNow()}</span>
      </div>
    </div>
  );
};

export default QuestionMoment;
