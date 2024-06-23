import React, { useState, useEffect } from "react";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import API_BASE_URL from "./appConfig";
import { useParams } from "react-router-dom";
import ImageZoom from "./ImageZoom";

const DrugRecommendations = (props) => {
  const { questionId } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/recommendations/question/${questionId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Log the data to inspect its structure
        setRecommendations(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [questionId]);

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
    height: "100%",
  };

  return (
    <div style={style}>
      <TopBar username={props.username} />
      <div className="row g-0">
        <div className="col-sm-2">
          <LeftSideBar username={props.username} />
        </div>
        <div className="col-sm-10">
          <div className="card p-2 my-2">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                {recommendations.length > 0 ? (
                  recommendations.map((recommendation, index) => (
                    <div key={index}>
                      <small>Question Title</small>
                      <h3>{recommendation.title}</h3>
                      <p dangerouslySetInnerHTML={{__html: recommendation.description}}></p>
                      <br></br>
                      <ul>
                        {Array.isArray(recommendation.products) ? (
                          recommendation.products.map((product, idx) => (
                            <li key={idx}>
                              <h4>{product.product_name}</h4>
                              <small className="text-success">Product Description</small>
                              <p dangerouslySetInnerHTML={{ __html: product.product_description }}></p>
                              <p>Price: Ugx {product.price}</p>
                              <p>Quantity: {product.quantity}</p>
                              <div>
                                <div className="d-flex flex-row">
                                  {Array.isArray(product.image_urls) ? (
                                    product.image_urls.map((url, imgIdx) => (
                                      <ImageZoom
                                        key={imgIdx}
                                        imageUrl={url}
                                        height={250}
                                        width={250}
                                        objectFit="contain"
                                        altText={product.product_name}
                                      />
                                    ))
                                  ) : (
                                    <p>No images available</p>
                                  )}
                                </div>
                              </div>
                              <p>Status: {product.status == 'available' ? (<span className="badge bg-success">Available For Purchase</span>) : (<span className="badge bg-danger">Not Available For Purchase</span>)}</p>
                              
                              <button className="btn btn-sm btn-primary" data-id={product.id}>Place Order</button>
                              <hr></hr>
                            </li>
                          ))
                        ) : (
                          <p>No products found.</p>
                        )}
                      </ul>

                      <h3>Usage Directions.</h3>
                      <p dangerouslySetInnerHTML={{__html:recommendation.directions}}></p>
                    </div>
                  ))
                ) : (
                  <p>No recommendations found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugRecommendations;
