import React, { useState, useEffect } from "react";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import { Table, Button } from "react-bootstrap";
import API_BASE_URL from "./appConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import $ from 'jquery';
import 'datatables.net-bs4';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const ProductsTable = (props) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (products) {
      const table = $("#productsTable").DataTable({
        destroy: true, // Allow reinitialization
        data: products,
        columns: [
          { data: 'sno' },
          { data: 'productName' },
          { data: 'productDescription' },
          { data: 'price' },
          { data: 'category' },
          { data: 'quantity' },
          { data: 'actions' },
        ],
      });
      return () => {
        table.destroy(); // Cleanup on unmount
      };
    }
  }, [products]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/products`);
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map((product, index) => ({
          sno: index + 1,
          ...product,
          actions: (
            <>
              <Button
                variant="info"
                onClick={() => handleEdit(product)}
              >
                Edit
              </Button>{" "}
              <Button
                variant="danger"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </Button>
            </>
          )
        }));
        setProducts(formattedData);
      } else {
        toast.error("Failed to fetch products", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
      toast.error("Failed to fetch products. Please try again later.", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const style = {
    backgroundColor: "#f6f9ff",
    position: "relative",
  };

  const handleEdit = (product) => {
    // Implement edit functionality here
    console.log("Editing product:", product);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("Product deleted successfully", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // Optionally, update state or refetch products
        fetchData(); // Refresh the product list after deletion
      } else {
        toast.error("Failed to delete product", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
      toast.error("Failed to delete product. Please try again later.", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div style={style}>
      <TopBar username={props.username} />
      <div className="row g-0">
        <div className="col-sm-2">
          <LeftSideBar username={props.username} />
        </div>
        <div className="col-sm-10 py-2 card mt-3">
          <div className="card-body">
            <h4 className="my-2">Available Products To Use For Recommendations</h4>
            <small>
              Products Shown here are the ones added to drug recommendations
              and inputs to questions asked on the platform. People will be able
              to place orders on these items depending on their availability in
              the stores.
            </small>
            <hr />
            <Table striped bordered hover id="productsTable">
              <thead>
                <tr>
                  <th>SNo</th>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Quantity Available</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products && products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.productName}</td>
                    <td>{product.productDescription}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
