import React, { useContext, useEffect, useState } from "react";
import UserInfo from "../assets/images/User.svg";
import Dots from "../assets/images/dots.svg";
import UserProfileLogo from "../assets/images/userProfile.svg";
import PLUS from "../assets/images/PLuse.svg";
import ProjectUser from "../assets/images/projectuser.svg";
import BookMarked from "../assets/images/bookmarked.svg";
import { AuthContext } from "../App";
import axios from "axios";

const ReviewUser = () => {
  const { name, token, email } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [showIcon, setShowIcon] = useState(false);

  // Dummy functions for actions
  const handleDelete = (productId) => {
    console.log("Delete clicked for product:", productId);
    // Dummy function implementation
  };

  const handleEdit = (productId) => {
    console.log("Edit clicked for product:", productId);
    // Dummy function implementation
  };

  const handlePreview = (productId) => {
    console.log("Preview clicked for product:", productId);
    // Dummy function implementation
  };

  const handleWhoBought = (productId) => {
    console.log("Who bought clicked for product:", productId);
    // Dummy function implementation
  };

  // Fetch products from API
  useEffect(() => {
    const fetchData = async () => {
      console.log(email);

      try {
        const response = await axios.post(
          `https://webjacob-c0f6c8e947aa.herokuapp.com/new/getOwn`,
          {
            email: email,
          }
        );

        if (response.status === 200) {
          const result = response.data;
          setProducts(result); // Store products in state
          console.log(result);
        } else if (response.status === 205) {
          alert("No Campaigns Data found! Empty!");
        } else {
          alert("ERROR OCCURRED");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, [email, token]);

  const handleClick = () => {
    setShowIcon(!showIcon);
  };

  return (
    <div className="container">
      <div className="user-section 2xl:px-12">
        <div className="grid lg:grid-cols-12 2xl:mx-12 2xl:px-12 2xl:gap-5">
          <div className="col-span-3 user-profile-info">
            <div className="user_info px-5 2xl:mx-12">
              <img
                src={UserInfo}
                alt="User"
                style={{
                  width: "116px",
                  height: "116px",
                }}
              />
              <h4>NAME</h4>
              <h6>{name}</h6>
              {/* User info list */}
              <ul>
                <li className="flex gap-2">
                  <img src={Dots} alt="" className="mt-1" />
                  Login
                </li>
              </ul>
            </div>
          </div>
          <div className="right-user-profile">
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#333333",
                marginBottom: "20px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                textAlign: "left",
                paddingLeft: "10px",
              }}
            >
              이번달 누적 캠페인
            </h2>

            <div className="grid lg:grid-cols-2 px-5">
              {/* Render products dynamically */}
              {products.map((product) => (
                <div
                  key={product.id}
                  className="registered-card flex items-center justify-between"
                >
                  <div className="project-heading">
                    <h3>{product.campaignName}</h3>
                    {/* <div className="three-dots">
                      <button onClick={handleClick}>Show</button>
                      {showIcon && (
                        <div className="box-container">
                          <p onClick={() => handleDelete(product.id)}>Delete</p>
                          <p onClick={() => handleEdit(product.id)}>Edit</p>
                          <p onClick={() => handlePreview(product.id)}>Preview Uploaded</p>
                          <p onClick={() => handleWhoBought(product.id)}>Who Bought</p>
                        </div>
                      )}
                    </div> */}
                    <p>{product.checkDay}</p>
                    <p className="location">{product.location}</p>
                  </div>
                  <div className="px-5">
                    <img
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 50,
                      }}
                      src={product.image}
                      alt="Project User"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewUser;
