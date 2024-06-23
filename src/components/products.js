import React, { useState, useEffect } from "react";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import API_BASE_URL from "./appConfig";
import Categories from "./categories";

const Products = (props) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/categories/all`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 4) {
      toast.error("You can only upload up to 4 images.", {
        style: { backgroundColor: "#cce6e8", color: "#333" },
      });
      return;
    }
    setImages([...images, ...files]);
    setImagePreviews([...imagePreviews, ...files.map(file => URL.createObjectURL(file))]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newImagePreviews);
  };

  const validateForm = () => {
    if (!productName || !productDescription || !price || !quantity || selectedCategories.length === 0 || images.length === 0) {
      toast.error("All fields are required.", {
        style: { backgroundColor: "#cce6e8", color: "#333" },
      });
      return false;
    }
    return true;
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("productDescription", productDescription);
      formData.append("price", price);
      formData.append("quantity", quantity);
      images.forEach((image, index) => {
        formData.append("image", image);
      });
      formData.append("categories", JSON.stringify(selectedCategories.map((category) => category.value)));

      const response = await fetch(`${API_BASE_URL}/api/v1/products/add`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to submit product.");
      }

      // Reset form fields after successful submission
      setProductName("");
      setProductDescription("");
      setPrice("");
      setSelectedCategories([]);
      setQuantity("");
      setImages([]);
      setImagePreviews([]);

      toast.success("Product added successfully!", {
        style: { backgroundColor: "#cce6e8", color: "#333" },
      });
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("Failed to add product, Try again...", {
        style: { backgroundColor: "#cce6e8", color: "#333" },
      });
    }
  };

  const handleCategorySelect = async (categoryId) => {
    //Intentionaly left empty to suppress the callback error
  }

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
  };

  return (
    <div style={style}>
      <TopBar username={props.username} />
      <div className="row g-0">
        <div className="col-lg-2">
          <LeftSideBar username={props.username} />
        </div>
        <div className="col-lg-10 p-4 card mt-3">
          <h4 className="my-2">Manage Your Products</h4>
          <small>
            Products created here are the ones added to drug recommendations and
            inputs to questions asked on the platform. People will be able to
            place orders on these items depending on their availability in the
            stores.
          </small>
          <hr />
          <div className="row">
            <div className="col-md-6">
              <Categories showCreateCategory={true} showDeleteCategory={true} onCategorySelect={handleCategorySelect}/>
            </div>
            <div className="col-md-6">
              <h5 className="text-success">Create Product</h5>
              <form
                onSubmit={handleProductSubmit}
                encType="multipart/form-data"
              >
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productDescription" className="form-label">
                    Product Description
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={productDescription}
                    style={{ height: 200, marginBottom: 10 }}
                    onChange={setProductDescription}
                    required
                  />
                </div><br/><br/>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Selling Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="categories" className="form-label">
                    Product Categories
                  </label>
                  <Select
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Select Categories..."
                    isMulti
                    isSearchable
                    name="categories"
                    options={categories.map((cat) => ({
                      value: cat.id,
                      label: cat.name,
                    }))}
                    value={selectedCategories}
                    onChange={setSelectedCategories}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="images" className="form-label">
                    Product Images
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="images"
                    accept="image/*"
                    onChange={handleImageChange}
                    multiple
                  />
                  <div className="image-previews">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="image-preview" style={{ position: "relative", display: "inline-block" }}>
                        <img
                          src={preview}
                          alt="Product Preview"
                          style={{ marginTop: "10px", width: "150px", height: "150px" }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <button type="submit" className="btn btn-success btn-sm">
                  Submit
                </button>
              </form>
            </div>
          </div>
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
  );
};

export default Products;
