import React, { useEffect, useState, useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "../assets/images/Logo.svg";
import axios from "axios";
import { AuthContext } from "../App"; // Assuming AuthContext is properly set
import { AppProvider } from "../ContextApi/Api"; // Assuming AppProvider is properly set

const Slider2 = () => {
  const [time, setTime] = useState(new Date());
  const { name, token, email } = useContext(AuthContext);
  const { item, setItem } = useContext(AppProvider);
  const [DataLastDayLeft, setDataLastDayLeft] = useState([]);
  useEffect(() => {
    const updateTime = () => {
      setTime(new Date());
    };

    // Update the time every second
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours} : ${minutes} : ${seconds}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://webjacob-c0f6c8e947aa.herokuapp.com/products/public",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log("Data fetched successfully:", response.data);
          setItem(response.data);

          // Filter data to show items with less than or equal to 1 day left
            const filteredData = response.data.filter((item) => {
              const createdAtDate = new Date(item.createdAt);
              const daysPassed = Math.floor(
                (new Date() - createdAtDate) / (1000 * 60 * 60 * 24)
              );
              const daysLeft = 14 - daysPassed;
              return daysLeft <= 1 && daysLeft >= 0 &&item.setToCompaign;
            });

            console.log("Filtered data:", filteredData);
          setDataLastDayLeft(filteredData);  
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data");
      }
    };

    fetchData();
  }, [email, token]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          autoplay: true,
        },
      },
    ],
  };

  return (
    <>
      <div className="slider-container mx-auto slider-2 container-fluid 2xl:px-12">
        <div className="slider-2-heading">
          <h2>Remaining time for open</h2>
        </div>
        <div className="time slider-2-time">
          <h3>{formatTime(time)}</h3>
          <h4>미리 찜해두고 혜택 받아가세요!!</h4>
        </div>

        {DataLastDayLeft.length > 0 ? (
          <Slider {...settings}>
            {DataLastDayLeft.map((slide) => (
              <div key={slide.id} className="2xl:ms-3">
                <div className="lg:px-3 2xl:px-0 mb-2">
                  <img
                    src={slide.image}
                    alt={`Slide ${slide.id}`}
                    style={{
                      borderRadius: "10px",
                      width: "291px",
                      height: "163px",
                    }}
                  />
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="lg:px-3 slider-2-heading-bottom">
            <h4>Nothing to show</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default Slider2;
