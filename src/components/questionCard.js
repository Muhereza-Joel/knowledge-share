import React, { Component, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav } from "react-bootstrap";
import Tag from "./tag";

class QuestionCard extends Component {

  
  render() {
    const { username, questionId, questionTitle, tags, votes, answers, views } =
      this.props;
    const questionUrl = `/knowledge-share/${username}/questions/${questionId}`;

    return (
      <div className="card px-4 py-3 my-3">
        <div className="row">
          <div className="col-sm-2">
            <div className="d-flex flex-column">
              <div>{votes} Votes</div>
              <div>{answers} Answers</div>
              <div>{views} Views</div>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="text-primary">
              <Nav.Item className="mt-3">
                <Nav.Link href={questionUrl}>
                  <p className="fw-normal text-secondary h5">{questionTitle}</p>
                </Nav.Link>
              </Nav.Item>
            </div>

            <div className="d-flex mt-2">
             
              {tags && tags.length > 0 ? (
                tags.map((tag, index) => (
                  <Tag key={index} text={tag.name} tagId={tag.id} />
                ))
              ) : (
                <span>No tags available</span>
              )}
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
    );
  }
}

export default QuestionCard;
