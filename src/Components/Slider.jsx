import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

const SliderContainer = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
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
  const [slideData, setSlides] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          "https://webjacob-c0f6c8e947aa.herokuapp.com/final/getBanner"
        );
        if (!response.status == 200) {
          throw new Error("Failed to fetch banners");
        }

        const bannerPaths = response.data.banners.map((banner) => {
          // Replace "https://webjacob-c0f6c8e947aa.herokuapp.com" with an empty string to get only the path
          return banner.url.replace(
            "https://webjacob-c0f6c8e947aa.herokuapp.com",
            ""
          );
        });
        setSlides(bannerPaths);
        console.log("배너 경로",bannerPaths);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);
  return (
    <>
      <div
        className="slider mt-14"
      >
        <Slider {...settings} className="border-2 rounded-[20px]">
          {slideData.map((slide) => (
            <div key={slide}>
              <div
                className="lg:grid-cols-10 "
                style={{
                  maxWidth: "1225px",
                  margin: "0 auto",
                  height: "450px",
                }}
              >
                <img
                  src={slide.replace(
                    "http://localhost:8080",
                    "https://admin-backend-jacob-627c227daad2.herokuapp.com"
                  )}
                  className="img-fluid"
                  alt={`Slide ${slide.id}`}
                  style={{
                    maxWidth: "100%",
                    width: "100%",
                    height: "450px",
                    borderRadius: "20px",
                  }}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default SliderContainer;
