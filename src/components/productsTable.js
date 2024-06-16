import React, { useState, useEffect, useRef } from "react";
import TopBar from "./topBar";
import LeftSideBar from "./leftSideBar";
import { Table } from "react-bootstrap";
import API_BASE_URL from "./appConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import $ from "jquery";
import "datatables.net-bs4";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ProductDetails from "./productDetails";
import OrderCart from "./orderCart";

const ProductsTable = (props) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderProduct, setOrderProduct] = useState(null);
  const [showOrderCart, setShowOrderCart] = useState(false);
  const dataTableRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const table = $("#productsTable").DataTable({
        destroy: true,
        data: products,
        columns: [
          { data: "sno" },
          { data: "product_name" },
          { data: "product_description" },
          { data: "price" },
          { data: "categories" },
          { data: "quantity" },
          {
            data: null,
            render: function (data, type, row) {
              return `
                <div class="dropdown">
                  <button class="btn btn-light btn-sm dropdown-toggle" type="button" id="actionDropdown${row.id}" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Select Action
                  </button>
                  <div class="dropdown-menu" aria-labelledby="actionDropdown${row.id}">
                    <a href="#view-product-details" class="dropdown-item view-details" data-id="${row.id}">View Product Details</a>
                    <a href="#edit-product-details" class="dropdown-item edit-product" data-id="${row.id}">Edit Product Details</a>
                    <a href="#delete-product" class="dropdown-item text-danger delete-product" data-id="${row.id}">Delete Product</a>
                  </div>
                </div>
              `;
            },
          },
        ],
        columnDefs: [
          {
            targets: [1], // Index of 'Actions' column
            orderable: false, // Disable sorting for actions column
          },
        ],
      });

      // Handle action clicks using jQuery
      $("#productsTable tbody").on("click", ".view-details", function () {
        const productId = $(this).attr("data-id");
        handleViewDetails(productId);
      });

      $("#productsTable tbody").on("click", ".edit-product", function () {
        const productId = $(this).attr("data-id");
        handleEdit(productId);
      });

      $("#productsTable tbody").on("click", ".delete-product", function () {
        const productId = $(this).attr("data-id");
        handleDelete(productId);
      });

      return () => {
        table.destroy();
      };
    }
  }, [products]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/products/all`);
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map((product, index) => ({
          sno: index + 1,
          ...product,
          categories: product.categories.split(", ").join(", "),
          image_urls: JSON.parse(product.image_urls),
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

  const handleViewDetails = (productId) => {
    const product = products.find((p) => p.id === productId);
    setSelectedProduct(product);
    setShowOrderCart(false); // Close order cart if open
  };

  const handleEdit = (productId) => {
    // Implement edit functionality here
    console.log("Editing product:", productId);
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

  const handlePlaceOrder = (product) => {
    setSelectedProduct(null); // Close ProductDetails modal
    setShowOrderCart(true); // Open OrderCart
    setOrderProduct(product);
  };

  const handleCloseOrderCart = () => {
    setShowOrderCart(false);
    setSelectedProduct(null);
  };

  return (
    <div style={{ backgroundColor: "#f6f9ff", position: "relative" }}>
      <TopBar username={props.username} />
      <div className="row g-0">
        <div className="col-sm-2">
          <LeftSideBar username={props.username} />
        </div>
        <div className="col-sm-10 py-2 card mt-3">
          <div className="card-body">
            <h4 className="my-2">
              Available Products To Use For Recommendations
            </h4>
            <small>
              Products shown here are the ones added to drug recommendations and
              inputs to questions asked on the platform. People will be able to
              place orders on these items depending on their availability in the
              stores.
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
                {products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.product_name}</td>
                    <td
                      dangerouslySetInnerHTML={{
                        __html: product.product_description,
                      }}
                    />
                    <td>{product.price}</td>
                    <td>{product.categories}</td>
                    <td>{product.quantity}</td>
                    <td></td> {/* Actions column handled by DataTables */}
                  </tr>
                ))}
              </tbody>
            </Table>
            {selectedProduct && (
              <ProductDetails
                product={selectedProduct}
                viewProduct={true} // Pass true to open the modal initially
                onPlaceOrder={handlePlaceOrder}
                onClose={() => setSelectedProduct(null)} // Update state in parent
              />
            )}

            {showOrderCart && orderProduct && (
              <OrderCart
                product={orderProduct} // Pass product data to OrderCart
                show={true}
                handleClose={handleCloseOrderCart} // Close OrderCart
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
