import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "./appConfig";

const Categories = ({ showCreateCategory, showDeleteCategory, onDeleteCategory, onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

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

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/categories/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit category");
      }
      const newCategory = await response.json();
      setCategories([...categories, newCategory]);
      setCategoryName("");
      toast.success("Category added successfully!", {
        style: { backgroundColor: "#cce6e8", color: "#333" },
      });
    } catch (error) {
      toast.error("Category exists already.", {
        style: { backgroundColor: "#cce6e8", color: "#333" },
      });
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/categories/delete/${categoryId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
      setCategories(categories.filter((cat) => cat.id !== categoryId));
      toast.success("Category deleted successfully!", {
        style: { backgroundColor: "#cce6e8", color: "#333" },
      });
      onDeleteCategory(categoryId); // Call parent function to handle deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    onCategorySelect(categoryId);
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {showCreateCategory && ( // Display create category section based on props
        <div>
          <h5 className="text-success">Create New Product Category</h5>
          <small>
            Product categories are used to organize your products and improve product searches.
          </small>
          <form onSubmit={handleCategorySubmit}>
            <div className="mb-3">
              <label htmlFor="categoryName" className="form-label">
                Category Name
              </label>
              <input
                type="text"
                className="form-control"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success btn-sm">
              Save
            </button>
          </form>
        </div>
      )}
      <h4 className="mt-4">
        Existing Categories <span className="badge bg-success">{categories.length}</span>
      </h4>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="category-list-container">
        <ul className="list-group">
          {filteredCategories.map((cat) => (
            <li
              key={cat.id}
              className={`list-group-item d-flex justify-content-between align-items-center p-1 ${selectedCategoryId === cat.id ? 'bg-success text-white' : ''}`}
              onClick={() => handleCategoryClick(cat.id)} // Send category ID to parent
              style={{ cursor: "pointer" }}
            >
              {cat.name}
              {showDeleteCategory && (
                <button
                  className={`btn btn-link ${selectedCategoryId === cat.id ? 'text-light' : 'text-danger'}  btn-sm`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent category click handler from firing
                    handleDeleteCategory(cat.id);
                  }}
                >
                  Remove Category
                </button>
              )}
            </li>
          ))}
        </ul>
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
  );
};

export default Categories;
