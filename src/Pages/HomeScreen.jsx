import React from "react";
import SliderContainer from '../Components/Slider'
import Logo from '../assets/images/Logo.svg'
import { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "../hooks/apiUrl";
import useTimeLeft from "../hooks/useTimeLeft";
import blog from '../assets/images/Blog.svg'
import insta from '../assets/images/insta.svg'
import youtube from '../assets/images/youtube.svg'
import tiktok from '../assets/images/Tiktok.svg'
import web from '../assets/images/react.svg'
import { Link } from "react-router-dom";

const channelImages = {
    'instagram': insta,
    'blog': blog,
    'web': web,
    'youtube': youtube,
    'tiktok': tiktok
};

const CategoryItem = ({ title = "Title", image = Logo }) => {
    return (
        <div className="category-item-container flex flex-col items-center justify-center">
            <div className="category-item mt-20 h-[84px] w-[84px] rounded-[20px] bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} >
            </div>
            <div className="text-center mt-2 font-[600] text-[0.9rem]">{title}</div>
        </div>
    )
}

const ContentItem = ({ product, color = "black" }) => {
    const getChannelImage = (channelName) => {
        const cleanChannelName = channelName.trim().toLowerCase();
        return channelImages[cleanChannelName] || Logo;
    };
    const channels = product.channel[0].split(',').map(ch => ch.trim());

    return (
        <div className="content-image-container">
            <Link to={`/view-product/${product._id}`}>
            <div className="content-image mt-10 border-2 h-[25vh] w-full rounded-[20px]"
                style={{ backgroundImage: `url(${product?.image[0]})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >

            </div>
            <div className="content-text-container mt-2">
                <div className="flex items-center gap-2 font-[600] mb-3">
                    {channels.map((channel, index) => (

                        <div key={index} className="flex items-center gap-1">
                            <img
                                src={getChannelImage(channel)}
                                alt={channel}
                                className="h-5 w-5"
                            />
                        </div>

                    ))}
                    <span className={`${color === "white" ? "text-white" : "text-black"}`}>{useTimeLeft(product.createdAt)}일 남음</span>
                    <span className={`${color === "white" ? "text-white" : "text-black"}`}>참여인원 <span className="text-[#2C9512]">{product.registeredUsers.length}</span>/ {product.numberOfPeople}</span>
                </div>
                <div className={`content-title flex items-center gap-2 font-[500] ${color === "white" ? "text-white" : "text-black"}`}><span>[회사명]</span><span>{product.campaignName}</span></div>
                <div className={`content-description ${color === "white" ? "text-white" : "text-[#6d6d6d]"} text-[0.9rem]`}>5만원 이용권</div>
            </div>
            </Link>
        </div>
    )
}


const EventBanner = ({ }) => {
    return (
        <div className="h-[20vh] w-full bg-gray-200 rounded-[20px] mt-20 flex items-center justify-center">
            <div className="text-[2rem] font-[600] text-[#2C9512]">이벤트 배너</div>
        </div>
    )
}

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    const [limitProducts, setLimitProducts] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/products/public`)
            if (response.status === 200) {
                const limitProducts = response.data.filter(product => product.setToCompaign === true);
                const normalProducts = response.data.filter(product => product.setToCompaign != true);
                const sliceProducts = normalProducts.slice(0, 16);
                setProducts(sliceProducts);
                setLimitProducts(limitProducts);
                console.log("이벤트 상품 데이터", limitProducts);
                console.log("일반 상품 데이터", sliceProducts);
            }
        } catch (error) {
            console.log("에러발생", error);
        }
        return null;
    }

    useEffect(() => {
        fetchData();
    }, []);

    const firstProduct = products.slice(0, 8);
    const secondProduct = products.slice(8, 16);

    return (
        <>
            <SliderContainer />
            <div className="category-container flex justify-evenly">
                <CategoryItem title="Title" image={Logo} />
                <CategoryItem title="Title" image={Logo} />
                <CategoryItem title="Title" image={Logo} />
                <CategoryItem title="Title" image={Logo} />
                <CategoryItem title="Title" image={Logo} />
                <CategoryItem title="Title" image={Logo} />
                <CategoryItem title="Title" image={Logo} />
            </div>

            <div className="mt-20 text-[1.5rem] font-[600] text-[#2C9512]">Category</div>
            <div className="content-container w-full grid grid-cols-4 gap-4">
                {firstProduct.length > 0 ? (
                    firstProduct.map((product) => (
                        <ContentItem key={product._id} product={product} />
                    ))
                ) : (
                    <div className="col-span-4 text-center py-10">상품없음</div>
                )}
            </div>

            <EventBanner></EventBanner>



            <div className="mt-20 w-full h-[70vh] relative">
                <div className="remain-time-container bg-[#343434] h-[70vh] absolute left-1/2 -translate-x-1/2 w-screen
                px-[5%] pt-10 flex flex-col gap-2
                ">

                    <div className="text-[1.5rem] font-[600] text-white">마감까지 남은 시간</div>
                    <div className="text-[2.5rem] font-[600] text-white">11:24:32</div>

                    <div className="time-deal-container grid grid-cols-4 gap-4 ">
                        {limitProducts.length > 0 ? (
                            limitProducts.map((product) => (
                                <ContentItem key={product._id} product={product} color="white"/>
                            ))
                        ) : (
                            <div className="col-span-4 text-center py-10">상품없음</div>
                        )}

                    </div>
                </div>
            </div>

            <div className="mt-20 text-[1.5rem] font-[600] text-[#2C9512]">Category</div>
            <div className="content-container w-full grid grid-cols-4 gap-4">
                {secondProduct.length > 0 ? (
                    secondProduct.map((product) => (
                        <ContentItem key={product._id} product={product} />
                    ))
                ) : (
                    <div className="col-span-4 text-center py-10">상품없음</div>
                )}
            </div>


        </>
    );
};


export default HomeScreen;
