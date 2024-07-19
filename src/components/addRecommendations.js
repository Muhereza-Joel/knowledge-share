import React, { useState, useEffect } from "react";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import Categories from "./categories";
import API_BASE_URL from "./appConfig";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRecommendations = (props) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [directions, setDirections] = useState("");
  const { questionId } = useParams();
  const [questionDetails, setQuestionDetails] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
  };

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
        console.error("Error fetching question details:", error);
      }
    };

    fetchQuestionDetails();
  }, [questionId]);

  useEffect(() => {
    setIsSubmitDisabled(
      selectedProducts.length === 0 || directions.trim() === ""
    );
  }, [selectedProducts, directions]);

  const handleCategorySelect = async (categoryId) => {
    console.log("Selected Category ID:", categoryId);
    setSelectedCategory(categoryId);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/products/category/${categoryId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleProductSelect = (productId) => {
    if (!selectedProducts.includes(productId)) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const resetForm = () => {
    setSelectedCategory(null);
    setSelectedProducts([]);
    setDirections("");
    setProducts([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const recommendationData = {
      questionId,
      selectedProducts,
      directions,
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/recommendations/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recommendationData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit recommendations");
      }
      toast.success("Recommendation added successfully!", {
        style: { backgroundColor: "#cce6e8", color: "#333" },
      });
      resetForm();
    } catch (error) {
      console.error("Error submitting recommendations:", error);
    }
  };

  return (
    <div style={style}>
      <TopBar username={props.username} />
      <div className="row px-2">
        <div className="col-sm-2">
          <LeftSideBar username={props.username} />
        </div>
        <div className="col-sm-10">
          <div className="card p-2 mt-2">
            <div className="alert alert-light p-3 m-0">
              To add recommendations click on the category to get list of
              products, then select the desired product after add usage
              instructions..
            </div>
            <div className="row g-3">
              <div className="col-lg-3">
                <Categories onCategorySelect={handleCategorySelect} />
              </div>
              <div className="col-lg-4">
                {questionDetails && (
                  <div className="mt-4 alert alert-light">
                    <h5>Question Title</h5>
                    <p>{questionDetails.questionTitle}</p>

                    <h5>Question description</h5>
                    <div
                      className="text-secondary"
                      dangerouslySetInnerHTML={{
                        __html: questionDetails.description,
                      }}
                    />
                  </div>
                )}
                <hr></hr>
                {selectedCategory && (
                  <div className="mt-4 alert alert-light">
                    <h5>
                      Products in Category{" "}
                      <span className="badge bg-success">
                        {products.length}
                      </span>
                    </h5>
                    <ul className="list-group">
                      {products.map((product) => (
                        <li
                          key={product.id}
                          className="list-group-item"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => handleProductSelect(product.id)}
                        >
                          <span>{product.product_name}</span>
                          {selectedProducts.includes(product.id) && (
                            <i
                              className="bi bi-check-circle"
                              style={{ fontSize: 30, marginLeft: 5 }}
                            ></i>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="col-lg-5">
                <br></br>
                <h5>Usage Instructions</h5>
                <div className="alert alert-warning">
                  Please ensure that the instructions are clear and
                  straightforward..
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <ReactQuill
                      value={directions}
                      onChange={setDirections}
                      style={{ height: 300 }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success btn-sm mt-5"
                    disabled={isSubmitDisabled}
                  >
                    Submit Recommendations
                  </button>
                </form>
                <ToastContainer
                  position="bottom-left"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecommendations;
