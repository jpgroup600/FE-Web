import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import UserInfo from "../assets/images/User.svg";
import Dots from "../assets/images/dots.svg";
import ProjectUser from "../assets/images/projectuser.svg";
import { AuthContext } from "../App";
import axios from "axios";
import apiUrl from "../hooks/apiUrl";
import { channelmap, parseChannel } from "../hooks/channelmap";
import { Link } from "react-router-dom";
import Table from "../Components/Table";
import filterUserStatus from "../hooks/filterUserStatus";

const UserButton = ({ text = "프로필" }) => {
  return (
    <div className="user-button-wrapper flex flex-row gap-2 justify-center items-center">
      <div className="user-button rounded-full bg-[#D7D7D7] h-4 w-4"></div>

      <div className="user-button-text text-lg font-[400]">{text}</div>
    </div>
  )
}

const ProductBox = ({ product, setSelectedProductId, setShowBuyers }) => {

  const { email } = useContext(AuthContext);



  const date = new Date(product?.createdAt).toLocaleDateString();
  const parseChannels = (channelArray) => {
    if (!channelArray || !channelArray.length) return [];

    // Take the first element and split it by comma
    return channelArray[0]
      .split(',')           // Split by comma
      .map(ch => ch.trim()) // Remove whitespace
      .filter(ch => ch);    // Remove empty strings
  };
  // Parse the channels
  const channels = parseChannels(product?.channel);

  return (
    <>

      <div className="product-state-box bg-white border border-[#D7D7D7] rounded-[10px] h-[200px] p-10">

        <div className="product-state-box-detail-container w-full h-full flex flex-row justify-between items-center">
          <div className="product-state-box-info-wrapper flex flex-col gap-1 mt-[-30px]">
            <Link to={`/view-product/${product._id}`}>
              <div className="product-state-box-info-title text-lg font-bold">{product?.campaignName}[{product?.category ? product?.category : "카테고리"}]</div>
              <div className="product-date text-[#3C3C3C] font-[500]">{date}</div>
              <div className="product-location text-[#868686]">{channels.map((channel) => {
                console.log(channel)
                return (channelmap[channel] + ",")
              })}</div>
            </Link>



          </div>

          <div className="product-state-box-button-container flex flex-row gap-2">
            <button className="product-state-box-button">
              <img src={UserInfo} alt="dots" width={70} height={70} />
            </button>
          </div>
        </div>

        <div className={`font-bold text-lg cursor-pointer transition-all duration-500 hover:underline
   ${filterUserStatus(product, email) === 'pending' ? 'text-yellow-500' :
            filterUserStatus(product, email) === 'approved' ? 'text-green-500' :
              filterUserStatus(product, email) === 'rejected' ? 'text-red-500' :
                'text-blue-500'}`}
        >

          {filterUserStatus(product, email) === 'pending' ? '대기중' :
            filterUserStatus(product, email) === 'approved' ? '승인됨' :
              filterUserStatus(product, email) === 'rejected' ? '거절됨' : '상태없음'}
        </div>

      </div>

    </>
  )

}


const UserPage = () => {
  const { name, token, email } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [showDropdownId, setShowDropdownId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [buyers, setBuyers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterStatusArray, setFilterStatusArray] = useState(["pending"]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showBuyers, setShowBuyers] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.post(`${apiUrl}/new/getOwn`, {
        email: email,
      });

      if (response.status === 200) {
        setProducts(response.data);
        console.log(response.data);
        return response.data;
      } else {
        alert("등록된 상품이 없습니다")
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [filterStatusArray, showBuyers]);

  return (
    <>

      <div className="user-page-container flex flex-row h-screen w-full">
        <div className="user-state-wrapper w-1/4 h-full bg-[#F5F3F3] mt-1">
          <div className="user-info-wrapper flex flex-col items-center justify-center mt-28">
            <div className="" style={{ backgroundImage: "url(" + UserInfo + ")", backgroundSize: "cover", backgroundPosition: "center", width: "150px", height: "150px", borderRadius: "100px" }}></div>

            <div className="user-name-wrapper text-2xl font-bold mt-8">{name}</div>
            <div className="user-email-wrapper text-lg mt-1">{email}</div>

            <div className="user-button-container flex flex-col gap-3 mt-8 items-start">

              <UserButton />
              <UserButton />
              <UserButton />
              <UserButton />
            </div>
          </div>
        </div>

        <div className="product-state-wrapper w-3/4 h-full">
          <div className="product-state-header-wrapper mt-16 mx-16">
            <div className="product-state-header-title text-2xl font-bold">
              <h1>누적 캠페인</h1> <span className="text-lg font-normal">총 {products.length}개</span>
            </div>

            {showBuyers ? (<Table data={products
              .filter(product => product._id === selectedProductId)[0]  // Get the first (and only) matching product
              ?.registeredUsers || []  // Access registeredUsers array
            }
              setShowBuyers={setShowBuyers} />) : (<>

                <div className="filter-checkox-wrapper flex flex-row gap-4 mt-4">
                  <div className={`h-8 w-32 shadow-lg rounded-[5px] text-center flex items-center justify-center ${filterStatusArray.includes("pending") ? "bg-black text-white" : "bg-white"}`}
                    onClick={() => { filterStatusArray.includes("pending") ? setFilterStatusArray(filterStatusArray.filter(status => status !== "pending")) : setFilterStatusArray([...filterStatusArray, "pending"]) }}
                  >검수중</div>
                  <div className={`h-8 w-32 shadow-lg rounded-[5px] text-center flex items-center justify-center ${filterStatusArray.includes("approved") ? "bg-black text-white" : "bg-white"}`}
                    onClick={() => { filterStatusArray.includes("approved") ? setFilterStatusArray(filterStatusArray.filter(status => status !== "approved")) : setFilterStatusArray([...filterStatusArray, "approved"]) }}
                  >승인</div>
                  <div className={`h-8 w-32  shadow-lg rounded-[5px] text-center flex items-center justify-center ${filterStatusArray.includes("rejected") ? "bg-black text-white" : "bg-white"}`}
                    onClick={() => { filterStatusArray.includes("rejected") ? setFilterStatusArray(filterStatusArray.filter(status => status !== "rejected")) : setFilterStatusArray([...filterStatusArray, "rejected"]) }}
                  >거절</div>
                </div>

                <div className="product-state-box-container w-full grid grid-cols-2 gap-8 mt-4 rounded-lg">
                  {products?.filter(product => filterStatusArray.includes(filterUserStatus(product, email))).map((product) => (
                    <ProductBox email={email} product={product} setSelectedProductId={setSelectedProductId} setShowBuyers={setShowBuyers} />
                  ))}
                </div>
              </>
            )}




          </div>
        </div>



      </div>

    </>
  )

}

export default UserPage;
