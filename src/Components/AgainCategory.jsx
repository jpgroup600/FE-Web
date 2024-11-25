import React, { useContext } from "react";
import Blog from "../assets/images/Blog.svg"
import { AppProvider } from "../ContextApi/Api";
import { Link } from "react-router-dom";

const Category = () => {

  const {item} = useContext(AppProvider)
  const data = item;

  let SliceData = data.slice(8,16)

  if(SliceData.length === 0){
    return <h1>No items Found</h1>
  }

  return (
    <>
      <div className="container mx-auto mt-12 lg:px-12">
        <div className="category-section 2xl:px-2 xl:px-2 lg:px-0 flex justify-between mb-5 2xl:mb-8 " style={{ maxWidth: '1225px', margin: '0 auto' }} >
          <div className="category-heading" >
            <h3>Catagory</h3>
          </div>
          <div className="category-btn " >
            <a href="" className="px-[15px] py-[5px] rounded-[5px]">더보기</a>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 sm:grid-cols-2 mt-8 " style={{ maxWidth: '1225px', margin: '0 auto' }}>
          {Array.isArray(SliceData) &&
            SliceData.length > 0 &&
            SliceData.map((items) => (
              <>

                <div className="category-card-section mx-auto pt-6 ">
                <Link to={`/view/${items._id}`}>
                  <div className="lg:px-2">
                    <img src={items.image} alt="" className="mb-3" style={{ borderRadius: '10px', width: '291px', height: '163px' }} />
                  </div>
                  </Link>
                  <div className="mx-3">
                    <h3 className="text-start   mb-3 mt-4 flex items-center gap-2">
                      <span><img src={Blog} alt="" /></span>
                      {items.availableTime}
                    </h3>
                    <h4 className="text-start ">
                      {items.location}
                    </h4>
                    <h5 className="text-start mb-3">{items.coupon}</h5>
                  </div>
                </div>

              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default Category;
