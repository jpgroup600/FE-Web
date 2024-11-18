import React, { useContext, useEffect, useState } from "react";
import { AppProvider } from "../ContextApi/Api";
import axios from "axios";
import { Link } from "react-router-dom";
import Blog from "../assets/images/Blog.svg";

const CampianData = () => {
  const [item, setItem] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://webjacob-c0f6c8e947aa.herokuapp.com/products/public`,
          {
            // params: {
            //   userId: email,
            // },
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          setItem(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch data");
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="container mx-auto mt-12 lg:px-12">
        <div
          className="category-section flex justify-between mb-5"
          style={{ maxWidth: "1225px", margin: "0 auto" }}
        >
          <h3>Category</h3>
        </div>
        <div
          className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 mt-8"
          style={{ maxWidth: "1225px", margin: "0 auto" }}
        >
          {item.map((items) => (
            // console.log(items._id)
            <div key={items._id} className="category-card-section mx-auto pt-6">
              <Link to={`/view/${items._id}`}>
                <div className="lg:px-2 2xl:px-0">
                  <img
                    src={items.image}
                    alt={items.heading}
                    className="mb-3"
                    style={{
                      borderRadius: "10px",
                      width: "291px",
                      height: "163px",
                    }}
                  />
                </div>
                <div className="mx-3">
                  <h3 className="text-start mb-3 mt-4 flex items-center gap-2">
                    {(() => {
                      const createdAtDate = new Date(items.createdAt);
                      const daysPassed = Math.floor(
                        (new Date() - createdAtDate) / (1000 * 60 * 60 * 24)
                      );
                      const daysLeft = 14 - daysPassed;
                      return daysLeft > 0 ? `${daysLeft} days left` : "Expired";
                    })()}
                    {"    "}
                    Enroll
                    <span style={{ color: "green" }}>
                      {" "}
                      {items.registeredUsers.length}
                      <span style={{ color: "black" }}>
                        /{items.numberOfPeople}
                      </span>
                    </span>
                  </h3>
                  <h4 className="text-start">{items.campaignName}</h4>
                  <h5 className="text-start mt-1 mb-3">{items.coupon}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CampianData;
