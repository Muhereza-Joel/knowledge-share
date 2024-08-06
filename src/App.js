import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "bootstrap/dist/js/bootstrap.bundle.min";
import Register from "./components/register";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import AskQuestion from "./components/askQuestion";
import Questions from "./components/questions";
import Tags from "./components/tags";
import QuestionDetailsContainer from "./components/questionDetailsContainer";
import { isAuthenticated } from "./auth";
import { AuthProvider, useAuth } from "./AuthContext";
import { SocketProvider } from "./SocketContext";
import Calender from "./components/calender";
import Profile from "./components/profile";
import Cookies from "js-cookie";
import Users from "./components/Users";
import QuestionsTagged from "./components/questionsTagged";
import MyQuestions from "./components/myQuestions";
import ViewUser from "./components/viewUser";
import Products from "./components/products";
import ProductsTable from "./components/productsTable";
import OrdersTable from "./components/ordersTable";
import EditProduct from "./components/editProduct";
import AddRecommendations from "./components/addRecommendations";
import DrugRecommendations from "./components/drugRecommendations";
import MakePayment from "./components/MakePayment";
import MyOrders from "./components/myOrders";

import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { addNewQuestion, deleteQuestion } from "./redux/reducers/questionSlice";
import SearchPage from "./components/searchPage";

const PrivateRoute = ({ element, path }) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/knowledge-share/auth/login/" state={{ from: path }} />
  );
};

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
  const usernameFromCookie = cookieData.USERNAME_KEY;

  useEffect(() => {
    setUsername(usernameFromCookie);
    setLoading(false);
  }, [usernameFromCookie]);

  const handleLogout = () => {
    setUsername(null);
  };

  useEffect(() => {
    const socket = io("http://localhost:3002");

    socket.on("connect", () => {
      console.log("Connected to knowledgeshare websocket backend server");
    });

    socket.on("newQuestion", (newQuestion) => {
      if (newQuestion) {
        dispatch(addNewQuestion({ newQuestion: newQuestion }));
      }
    });

    socket.on("deleteQuestionWithId", (id) => {
      dispatch(deleteQuestion({ id: id }));
    });

    socket.on("disconnect", () => {
      console.log(
        "Disconnected from knowledgeshare websocket backend server. Please refresh the page to reconnect."
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <Router>
      <SocketProvider>
        <AuthProvider>
          <Routes>
            <Route key="login" path="/" element={<Login />} />
            <Route
              key="register"
              path="/knowledge-share/auth/register/"
              element={<Register />}
            />
            <Route
              key="login-auth"
              path="/knowledge-share/auth/login/"
              element={<Login />}
            />
            <Route
              key="logout"
              path="/logout"
              element={<Logout handleLogout={handleLogout} />}
            />
            <Route
              key="dashboard"
              path="/knowledge-share/*"
              element={
                <PrivateRoute element={<Dashboard username={username} />} />
              }
            />
            <Route
              key="dashboard-username"
              path="/knowledge-share/:username"
              element={
                <PrivateRoute element={<Dashboard username={username} />} />
              }
            />
            <Route
              key="profile"
              path="/knowledge-share/:username/profile/"
              element={
                <PrivateRoute element={<Profile username={username} />} />
              }
            />
            <Route
              key="dashboard-username-wildcard"
              path="/knowledge-share/:username/*"
              element={
                <PrivateRoute element={<Dashboard username={username} />} />
              }
            />
            <Route
              key="questions"
              path="/knowledge-share/:username/questions/*"
              element={
                <PrivateRoute element={<Questions username={username} />} />
              }
            />
            <Route
              key="my-questions"
              path="/knowledge-share/:username/my-questions/"
              element={
                <PrivateRoute element={<MyQuestions username={username} />} />
              }
            />
            <Route
              key="question-details"
              path="/knowledge-share/:username/questions/:questionId"
              element={
                <PrivateRoute
                  element={<QuestionDetailsContainer username={username} />}
                />
              }
            />
            <Route
              key="add-recommendations"
              path="/knowledge-share/:username/questions/recommendations/create/:questionId"
              element={
                <PrivateRoute
                  element={<AddRecommendations username={username} />}
                />
              }
            />
            <Route
              key="ask-question"
              path="/knowledge-share/:username/questions/ask-question/"
              element={
                <PrivateRoute element={<AskQuestion username={username} />} />
              }
            />
            <Route
              key="drug-recommendations"
              path="/knowledge-share/:username/questions/:questionId/recommendations/"
              element={
                <PrivateRoute
                  element={<DrugRecommendations username={username} />}
                />
              }
            />
            <Route
              key="tags"
              path="/knowledge-share/:username/tags/"
              element={<PrivateRoute element={<Tags username={username} />} />}
            />
            <Route
              key="questions-tagged"
              path="/knowledge-share/:username/tags/:tagId"
              element={
                <PrivateRoute
                  element={<QuestionsTagged username={username} />}
                />
              }
            />
            <Route
              key="calendar"
              path="/knowledge-share/:username/calendar/"
              element={
                <PrivateRoute element={<Calender username={username} />} />
              }
            />
            <Route
              key="users"
              path="/knowledge-share/users/"
              element={<PrivateRoute element={<Users username={username} />} />}
            />
            <Route
              key="view-user"
              path="/knowledge-share/users/profile/:userId"
              element={
                <PrivateRoute element={<ViewUser username={username} />} />
              }
            />
            <Route
              key="create-product"
              path="/knowledge-share/products/create-new/"
              element={
                <PrivateRoute element={<Products username={username} />} />
              }
            />
            <Route
              key="products"
              path="/knowledge-share/products/"
              element={
                <PrivateRoute element={<ProductsTable username={username} />} />
              }
            />
            <Route
              key="edit-product"
              path="/knowledge-share/products/edit/:productId"
              element={
                <PrivateRoute element={<EditProduct username={username} />} />
              }
            />
            <Route
              key="orders"
              path="/knowledge-share/products/orders/"
              element={
                <PrivateRoute element={<OrdersTable username={username} />} />
              }
            />
            <Route
              key="my-orders"
              path="/knowledge-share/products/my-orders/"
              element={
                <PrivateRoute element={<MyOrders username={username} />} />
              }
            />
            <Route
              key="make-payment"
              path="/knowledge-share/products/orders/makepayment"
              element={
                <PrivateRoute element={<MakePayment username={username} />} />
              }
            />
            <Route
              key="complete-payment"
              path="/knowledge-share/products/orders/payments/complete/"
              element={
                <PrivateRoute element={<MakePayment username={username} />} />
              }
            />
            <Route
              key="search-results-page"
              path="/knowledge-share/search-results/"
              element={
                <PrivateRoute element={<SearchPage username={username} />} />
              }
            />
          </Routes>
        </AuthProvider>
      </SocketProvider>
    </Router>
  );
};

const Logout = ({ handleLogout }) => {
  useEffect(() => {
    // Perform logout actions
    handleLogout();
  }, [handleLogout]);

  return <Navigate to="/" replace />;
};

export default App;
