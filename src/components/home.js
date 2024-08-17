import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav } from "react-bootstrap";
import QuestionCard from "./questionCard";
import ShortProfile from "./shortProfile";
import PopularTag from "./popularTag";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentQuestions } from "../redux/reducers/recentQuestionsSlice";
import Pagination from "./pagination";

const Home = (props) => {
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const dispatch = useDispatch();
  const { avator } = useSelector((state) => state.user);
  const { loading, error, questionData, lastUsedTagsData } = useSelector(
    (state) => state.recentQuestions
  );
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 50;
  const totalPages = Math.ceil(questionData.length / questionsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentQuestions = questionData.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  useEffect(() => {
    dispatch(fetchRecentQuestions());
  }, [dispatch]); // Add dependencies as needed

  const panelStyle = {
    minHeight: "90vh",
  };


  return (
    <div>
      <div id="content-section" className="row g-0">
        <div className="col-lg-9">
          <div id="middle-panel" className="card p-0 mt-2" style={panelStyle}>
            <div className="p-3">
              <div className="d-flex align-items-center mb-3">
                <div className="pt-2 w-75 h4">Top {questionData.length} Recent Questions</div>

                <Nav.Item className="mt-3 text-end w-25">
                  <h6
                    onClick={() =>
                      navigate(
                        `/knowledge-share/${cookieData.USERNAME_KEY}/questions/ask-question/`
                      )
                    }
                    className="text-info px-2 fw-bold"
                  >
                    <button className="btn btn-sm btn-primary bg-success">
                      Ask Question ?
                    </button>
                  </h6>
                </Nav.Item>
              </div>

              {currentQuestions.map((question, index) => (
                <QuestionCard
                  key={index}
                  data={question}
                  currentUser={`${cookieData.USERNAME_KEY}`}
                />
              ))}

              <div className="d-flex justify-content-center mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  onPreviousPage={handlePreviousPage}
                  onNextPage={handleNextPage}
                  onFetchMoreData={(page) => {}} 
                  // onFetchMoreData={(page) => dispatch(fetchMoreQuestions(page))} 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div id="right-panel" style={panelStyle}>
            <ShortProfile username={`${props.username}`} avatarUrl={avator} />

            <div className="p-2 mt-0 mx-2">
              <hr />
              <h6 className="fw-bold text-center text-secondary p-1">
                Last Used Tags
              </h6>

              {lastUsedTagsData.map((tag, index) => (
                <PopularTag
                  key={index}
                  id={tag.id}
                  title={tag.name}
                  description={tag.description}
                  username={`${props.username}`}
                  showIcons={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
