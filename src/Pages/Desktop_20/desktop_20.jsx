import React, { useState, useEffect, useContext } from "react";
import CampianData from "../CampianData"; // Assuming CampianData is a component that accepts filtered data
import axios from "axios";
import CampianDataNew from "../CampaignDataNew";
import { AuthContext } from "../../App";

const FilterProducts = () => {
  // Sample campaign data (Replace this with actual data or fetch it)

  // State to manage the search input and filtered campaigns
  const [searchInput, setSearchInput] = useState("");
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const { name, token, email, userID } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("전체");
  const [tabs, settabs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://webjacob-c0f6c8e947aa.herokuapp.com/products/public`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log("Data length:", response.data.length);
          setFilteredCampaigns(response.data);
        }
      } catch (error) {
        console.log("Error:", error);
      }

      try {
        const response = await axios.get(
          "https://webjacob-c0f6c8e947aa.herokuapp.com/final/getTabs"
        );
        if (!response.status == 200) {
          throw new Error("Failed to fetch Tabs");
        }

        // console.log(response.data.tabs[0].stringsArray);
        settabs(response.data.tabs[0].stringsArray);
        // setFill(response.data.headings[0]);
      } catch {
        console.error("Error fetching tabs:", error);
      }
    };

    fetchData();
  }, []);
  // Function to handle search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  const handleClick = (category) => {
    setSearchInput(category);
  };
  const handleClicknew = (category) => {
    console.log(category);
    setActiveTab(category);
    setSearchInput(category);
  };

  return (
    <>
      <div className="container mx-auto px-3">
        <div className="filter-products-section">
          <div className="heading">
            <h1>제품 캠페인</h1>
          </div>

          {/* Search Input */}
          <div className="filter-products-seacth flex items-center gap-5">
            <p>지역</p>
            <input
              type="search"
              placeholder="지역을 선택해 주세요"
              value={searchInput}
              onChange={handleSearch}
            />
          </div>
          <div className="filter-boxes">
            <div className="grid lg:grid-cols-10 gap-4">
              {filteredCampaigns?.reduce((unique, item) => {
                const sido = item?.location?.sido;
                if (sido && !unique.includes(sido)) {
                  unique.push(sido);
                }
                return unique;
              }, [])
                .map((sido, index) => (
                  <div key={index} className="box">
                    <button onClick={() => handleClick(sido)}>
                      {sido}
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <div className="filter-items-heading">
            {tabs.map((category) => (
              <button
                key={category}
                onClick={() => handleClicknew(category)}
                style={{
                  padding: "0.3rem 0.8rem",
                  fontWeight: "700",

                  cursor: "pointer",

                  color: activeTab === category ? "darkgreen" : "#2C9512",
                  fontSize: "18px",
                  transition: "background-color 0.3s",
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mb-12">
            {/* Pass the filtered data to CampianData */}
            <CampianDataNew
              filteredData={filteredCampaigns}
              search={searchInput.toLowerCase()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterProducts;
