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
    borderRight: "4px solid #217537",
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
            alt="User Avatar"
          />
        </div>
        <span>{props.username}</span>
        <span className="text-dark">{moment(props.created_at).fromNow()}</span>
      </div>

      {/* Bootstrap Modal */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
        aria-hidden={!showModal}
        aria-labelledby="exampleModalLabel"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content text-center">
            <div className="modal-header justify-content-center">
              <h5 className="modal-title" id="exampleModalLabel">
                Profile Photo.
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeModal}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill="currentColor"
                    d="M6.225 4.811L4.81 6.225 10.587 12 4.81 17.775l1.415 1.415L12 13.413l5.775 5.776 1.415-1.415L13.413 12l5.776-5.775-1.415-1.415L12 10.587 6.225 4.811z"
                  />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <img
                src={props.avatarUrl || Avator}
                alt="Zoomed Avatar"
                className="rounded-circle mx-auto"
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="modal-footer justify-content-end">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={closeModal}
              >
                Close 
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal backdrop */}
      {showModal && <div className="modal-backdrop fade show w-100 h-100" onClick={closeModal}></div>}
    </div>
  );
};

export default QuestionMoment;
