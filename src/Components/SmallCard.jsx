import React, { useState } from "react";
import FeakApi from "../JsonData/FeakApi.json";
const SmallCard = () => {
  const data = FeakApi;

  return (
    <>
      <div className="container mx-auto mt-8 xl-card lg:px-8 2xl:px-0"   style={{ maxWidth: "1225px", }}>
        <div
          className="grid lg:grid-cols-9 md:grid-cols-6 sm:grid-cols-6 grid-cols-3   sm:px-0 md:px-0 lg:px-12 2xl:px-0 xl:px-0 "

        >
          {data.map((item, index) => {
            return (
              <>
                <div key={index} className="card-container">
                  <div className="small-card mb-3">
                    <img
                      src={item.image}
                      alt=""
                      style={{ width: "84px", height: "84px" }}
                    />
                  </div>
                  <h3>{item.Loaction}</h3>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SmallCard;
