import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import QuestionDetails from "./questionDetails";
import API_BASE_URL from "./appConfig";

const QuestionDetailsContainer = ({ username }) => {
  const [questionDetails, setQuestionDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use the `useParams` hook to get the parameters from the URL
  const { questionId } = useParams();

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/questions/question`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              questionId: questionId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setQuestionDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionDetails();
  }, [questionId]);


  return (
    <QuestionDetails
      username={username}
      questionDetails={questionDetails}
    />
  );
};

export default QuestionDetailsContainer;
