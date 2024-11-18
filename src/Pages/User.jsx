import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import UserInfo from "../assets/images/User.svg";
import Dots from "../assets/images/dots.svg";
import ProjectUser from "../assets/images/projectuser.svg";
import { AuthContext } from "../App";
import axios from "axios";

const User = () => {
  const { name, token, email } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [showDropdownId, setShowDropdownId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [buyers, setBuyers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("All");

  const rowsPerPage = 10;
  const totalPages = Math.ceil(buyers.length / rowsPerPage);
  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        `https://webjacob-c0f6c8e947aa.herokuapp.com/new/delete`,
        {
          id: id,
        }
      );

      if (response.status === 200) {
        setProducts(response.data);
        console.log(response.data);
      } else {
        alert("No Campaigns Data found or Error Occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Cant delete this product it has registered users " + error.message
      );
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `https://webjacob-c0f6c8e947aa.herokuapp.com/new/getProducts`,
          {
            email,
          }
        );

        if (response.status === 200) {
          setProducts(response.data);
          console.log(response.data);
        } else {
          alert("No Campaigns Data found or Error Occurred");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to perform operation: " + error.message);
      }
    };
    fetchData();
  }, [email, token]);

  const [producspecific, setproductspeicifc] = useState("");
  //array for registeredUsers :
  const handleWhoBought = async (productId) => {
    try {
      // Find the product by productId in the products array
      const product = products.find((item) => item._id === productId);
      setproductspeicifc(productId);
      if (product) {
        console.log("Registered Users:", product.registeredUsers);

        // Set the buyers state with registered users from the selected product
        setBuyers(product.registeredUsers);
        setShowModal(true); // Show the modal with the buyers list
      } else {
        console.log("Product not found!");
      }
    } catch (error) {
      console.error("Error fetching buyers:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPage(1);
  };

  const currentData = buyers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const filteredProducts =
    filterStatus === "All"
      ? products
      : products.filter(
          (product) => product.status === filterStatus.toLowerCase()
        );

  const handleProductRegistration = async (email, action) => {
    try {
      const response = await axios.post(
        `https://webjacob-c0f6c8e947aa.herokuapp.com/final/registerAction`,
        {
          productId: producspecific,
          email: email,
          action: action,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
      } else {
        alert("No Campaigns Data found or Error Occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to perform operation: " + error.message);
    }
  };

  return (
    <div className="container">
      <div className="user-section 2xl:px-12">
        <div className="grid lg:grid-cols-12 2xl:mx-12 2xl:px-12 2xl:gap-5 px-5 ">
          <div className="col-span-3 user-profile-info">
            <div className="user_info px-5 2xl:mx-12">
              <img
                src={UserInfo}
                alt="User"
                style={{ width: "116px", height: "116px" }}
              />
              <h4>NAME</h4>
              <h6>{name}</h6>
              <ul>
                <li className="flex gap-2">
                  <img src={Dots} alt="" className="mt-1" />
                  Log out
                </li>
              </ul>
            </div>
          </div>
          <div className="right-user-profile">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "5%",
              }}
            >
              <h2
                style={{
                  fontSize: "28px",
                  color: "#000000",
                  fontWeight: "700",
                }}
                className="text-left py-5 text-3xl font-sans"
              >
                이번달누적캠페인
              </h2>
              <h3 style={{ marginLeft: "6%", fontSize: "28px", color: "#555" }}>
                10개
              </h3>
            </div>

            {/* Filter Dropdown */}
            <div className="mb-4 w-full flex justify-end">
              <select
                className="w-36 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 transition duration-200"
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ marginRight: "3%" }}
                value={filterStatus}
              >
                <option value="All" className="text-gray-600">
                  Filter
                </option>
                <option value="Approved" className="text-black-600">
                  Approved
                </option>
                <option value="Not Approved" className="text-black-600">
                  Not Approved
                </option>
                <option value="Pending" className="text-black-600">
                  Pending
                </option>
              </select>
            </div>
            {/* Cards */}
            <div
              style={{ width: "100%", height: "10%" }}
              className="grid lg:grid-cols-2 px-5 gap-4"
            >
              {filteredProducts.map((product) => (
                <div
                  style={{ width: "100%", height: "100%" }}
                  key={product.id}
                  className="registered-card flex items-center justify-between relative mt-8 ml-4"
                >
                  <div className="project-heading">
                    <h3>{product.campaignName}</h3>

                    {/* Status Display */}
                    <span
                      className={`status-tag ${
                        product.status ? product.status.toLowerCase() : ""
                      }`}
                      style={{
                        position: "absolute",
                        top: "10px", // Positions the tag above the profile image
                        right: "10px", // Aligns it with the right side of the container
                        backgroundColor:
                          product.status === "Approved"
                            ? "#4CAF50" // Green for Approved
                            : product.status === "Pending"
                            ? "#FFA500" // Orange for Pending
                            : "#FF5733", // Red for Not Approved
                        color: "white",
                        padding: "6px 10px", // Adds padding around the text
                        borderRadius: "8px", // Rounded corners for a modern look
                        fontSize: "10px",
                        fontWeight: "600",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      {product.status || "Unknown Status"}
                    </span>

                    <button
                      onClick={() => {
                        console.log(
                          "Toggling dropdown for product:",
                          product._id
                        );
                        setShowDropdownId(
                          product._id === showDropdownId ? null : product._id
                        );
                      }}
                      style={{
                        padding: "8px 16px", // Reduced padding for smaller button size
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px", // Slightly smaller border radius
                        cursor: "pointer",
                        fontSize: "13px", // Smaller font size for a more compact button
                        marginTop: "10px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#45a049")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#4CAF50")
                      }
                    >
                      {showDropdownId === product._id ? "Hide" : "Show"} Details
                    </button>

                    {/* Dropdown */}
                    {showDropdownId === product._id && (
                      <div
                        className="box-container absolute bg-white shadow-lg rounded-md"
                        style={{
                          top: "65%", // Position directly below the button
                          left: "50%",
                          transform: "translateX(-80%)", // Center horizontally
                          zIndex: 1000,
                          padding: "10px",
                          width: "200px",
                        }}
                      >
                        <p
                          className="cursor-pointer"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </p>
                        {/* <p
                          className="cursor-pointer"
                          onClick={() => handleEdit(product._id)}
                        >
                          Edit
                        </p> */}
                        <p
                          className="cursor-pointer"
                          onClick={() => handlePreview(product._id)}
                        >
                          Preview Uploaded
                        </p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            handleWhoBought(product._id);
                            setShowModal(true);
                            setShowDropdownId(null);
                          }}
                        >
                          Who Bought
                        </p>
                      </div>
                    )}

                    <p style={{ marginTop: "3%" }}>{product.createdAt}</p>
                    <p className="location">{product.location}</p>
                  </div>

                  <img
                    src={ProjectUser}
                    alt="Project User"
                    className="px-5 w-21 h-21 rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel="Buyers List"
        shouldCloseOnOverlayClick={true}
        style={{
          content: {
            maxWidth: "600px",
            margin: "auto",
            padding: "20px",
            borderRadius: "8px",
          },
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Who Bought This Product
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={headerStyle}>Email</th>
              <th style={headerStyle}>Approve</th>
              <th style={headerStyle}>Reject</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((buyer, index) => (
              <tr key={index}>
                <td style={cellStyle}>{buyer.email}</td>
                <td
                  style={{
                    ...cellStyle,
                    display: "flex",
                    gap: "8px",
                    justifyContent: "center",
                  }}
                >
                  {buyer.status === "Pending" && (
                    <button
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        handleProductRegistration(buyer.email, "approved");
                      }}
                    >
                      Approve
                    </button>
                  )}
                  {buyer.status === "Pending" && (
                    <button
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#f44336",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        handleProductRegistration(buyer.email, "rejected");
                      }}
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <button
          onClick={handleCloseModal}
          style={{ marginTop: "20px", display: "block", margin: "0 auto" }}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

const headerStyle = {
  padding: "10px",
  backgroundColor: "#f5f5f5",
  fontWeight: "bold",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const cellStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

export default User;
