import React, { useState, useEffect, memo } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Card, Placeholder,Nav } from "react-bootstrap";
import Tag from "./tag";
import { useNavigate } from "react-router-dom";
import QuestionMoment from "./questionMoment";
import Cookies from 'js-cookie';

const LoadingPlaceholder = () => (
  
    <Card className="p-4" style={{border:"none"}}>

      <Placeholder as={Card.Text} animation="wave" >
        <Placeholder xs={6} bg="secondary" />
      </Placeholder>
      <Placeholder as={Card.Text} animation="glow">
        <Placeholder xs={7} bg="secondary" /> <Placeholder xs={4} /> <Placeholder xs={4} bg="secondary" />
        <Placeholder xs={6} bg="secondary" /> <Placeholder xs={12} bg="secondary"/>
      </Placeholder>
      
    </Card>
    
);


const QuestionCard = (props) => {
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const {
    username,
    questionId,
    questionTitle,
    tags,
    votes,
    answers,
    views,
    created_at,
    onQuestionClick,
    avatarUrl
  } = props.data;

  const questionUrl = `/knowledge-share/${cookieData.USERNAME_KEY}/questions/${questionId}`;

  useEffect(() => {
    // Clean up the hover state when unmounting
    return () => setIsHovered(false);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    // Call the callback function passed from Dashboard
    onQuestionClick && onQuestionClick(questionId);
    navigate(`/knowledge-share/${props.currentUser}/questions/${questionId}`);
  };

  if(props.loading) {
    return(
        <LoadingPlaceholder/>       
    )
    
  }

  return (
    <div
      className="card px-3 py-2 my-1"
      style={{
        backgroundColor: isHovered ? "#f6f9ff" : "transparent",
        transition: "border 0.3s ease",
        border: "none",
        borderRadius: "0px"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
      <div className="row g-0">
        <div className="col-sm-2">
          <div className="d-flex flex-column">
            <div><span className="fw-bold">{votes}</span> Votes</div>
            <div><span className="fw-bold">{answers}</span> Answers</div>
            <div><span className="fw-bold">{views}</span> Views</div>
          </div>
        </div>
        <div className="col-sm-8">
          <div className="text-primary">
            <Nav.Item className="mt-3">
              <Nav.Link href={questionUrl} onClick={handleClick}>
                <p
                  className="fw-normal text-dark h5"
                  style={{
                    textDecoration: isHovered ? "underline" : "none",
                    fontStyle: 'bold',
                    transition: "border 0.3s ease",
                  }}
                >
                  {questionTitle}
                </p>
              </Nav.Link>
            </Nav.Item>
          </div>

          <div className="d-flex mt-2">
            {tags && tags.length > 0 ? (
              tags.map((tag, index) => (
                <Tag
                  key={index}
                  text={tag.name}
                  tagId={tag.id}
                  username={username}
                />
              ))
            ) : (
              <span>No tags available</span>
            )}
          </div>
        </div>
        <div className="col-sm-2">
          <div className="d-flex flex-column">
           <QuestionMoment avatarUrl={avatarUrl}  username={username} created_at={created_at}/>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(QuestionCard);
