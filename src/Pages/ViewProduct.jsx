import axios from "axios";
import apiUrl from "../hooks/apiUrl";
import React, { useEffect, useContext, useState, useRef } from "react";
import testImage from "../assets/images/012.png"
import ContentItem from "../Components/ContentItem";
import { Link, useParams } from "react-router-dom";
import { AppProvider } from "../ContextApi/Api";
import { AuthContext } from "../App";
import useTimeLeft from "../hooks/useTimeLeft";

const HeaderText = ({ product }) => {

    return (
        <div className="blog-title-container mt-32">
            <div className="blog-title-text text-[1.8rem] font-[800]">[브랜드] {product?.campaignName}</div>
            <div className="blog-sub-title-text text-[1rem] font-[500] mt-3 text-[#6D6D6D]">{product?.service}</div>
            <div className="mt-8 font-[700] text-[1rem]">{useTimeLeft(product?.createdAt)}일남음</div>

            <div className="mt-8 font-[700] text-[1.2rem]">캠페인 정보</div>
            <hr className="mt-4 border-t-2 border-grey"></hr>
        </div>
    )
}


const ContentSideBar = ({ product, scrollToSection, info1Ref, info2Ref, info3Ref, info4Ref, info5Ref }) => {
    return (
        <div
            style={{ top: '32px', position: 'sticky' }}
            className="event-container rounded-[20px] bg-white border-[3px] shadow-lg border-[#F5F3F3] mt-32 px-[5%] py-8">
            <div className="event-details-container flex flex-col gap-4">
                <div className="event-row-container flex flex-row  gap-4 flex-nowrap">
                    <div className="font-[700] text-[1rem]">신청가능 시간</div>
                    <div className="font-[500] text-[1rem]">{product?.availableTime}</div>
                </div>

                <div className="event-row-container flex flex-row  gap-4 flex-nowrap">
                    <div className="font-[700] text-[1rem]">인풀루언서 발표</div>
                    <div className="font-[500] text-[1rem]">07.11(수) ~ 07.21(토)</div>
                </div>

                <div className="event-row-container flex flex-row  gap-4 flex-nowrap">
                    <div className="font-[700] text-[1rem]">체험기간</div>
                    <div className="font-[500] text-[1rem]">07.11(수) ~ 07.21(토)</div>
                </div>

                <div className="event-row-container flex flex-row  gap-4 flex-nowrap">
                    <div className="font-[700] text-[1rem]">캠페인 결과발표</div>
                    <div className="font-[500] text-[1rem]">08.02(목)</div>
                </div>

                <div className="event-row-container flex flex-row  gap-4 flex-nowrap">
                    <div className="font-[700] text-[1rem]">실시간 지원현황</div>
                    <div className="font-[500] text-[1rem]">{product?.registeredUsers.length} / {product?.numberOfPeople}명</div>
                </div>
            </div>

            <hr className="mt-4 mb-4 border-t-2 border-grey"></hr>
            <div className=" font-[700] text-[1rem] flex flex-col gap-2 justify-center  border-b-2 border-grey">

                <div className="text-[0.9rem] font-[600] mb-4" onClick={() => { scrollToSection(info1Ref) }} style={{ cursor: "pointer" }}>제공 내역</div>
            </div>

            <div className=" font-[700] text-[1rem] flex flex-col gap-2 justify-center  border-grey border-b-2">

                <div className="text-[0.9rem] font-[600] mt-4 mb-4"
                    onClick={() => { scrollToSection(info2Ref) }} style={{ cursor: "pointer" }}
                >방문 및 예약안내</div>
            </div>

            <div className=" font-[700] text-[1rem] flex flex-col gap-2 justify-center  border-grey border-b-2">

                <div className="text-[0.9rem] font-[600] mt-4 mb-4"
                    onClick={() => { scrollToSection(info3Ref) }} style={{ cursor: "pointer" }}>캠페인 미션</div>
            </div>

            <div className=" font-[700] text-[1rem] flex flex-col gap-2 justify-center  border-grey border-b-2">

                <div className="text-[0.9rem] font-[600] mt-4 mb-4"
                    onClick={() => { scrollToSection(info4Ref) }} style={{ cursor: "pointer" }}
                >키워드</div>
            </div>

            <div className=" font-[700] text-[1rem] flex flex-col gap-2 justify-center  border-grey border-b-2">

                <div className="text-[0.9rem] font-[600] mt-4 mb-4"
                    onClick={() => { scrollToSection(info5Ref) }} style={{ cursor: "pointer" }}
                >추가 안내사항</div>
            </div>

            <div className="bg-[#2C9512] rounded-[5px] mt-8 px-[5%] py-3">
                <div className="text-[1rem] font-[600] text-white text-center"
                    style={{ cursor: "pointer" }}
                >캠페인 신청하기</div>
            </div>

            <div className="rounded-[5px] mt-4  py-10 h-full">
                <img src={testImage} alt="test" className="w-[100%] border-2 border-[#F5F3F3] rounded-[5px] h-[100%] object-cover relative" />
            </div>

        </div>
    )
}

const DetailedInfo = React.forwardRef(({ title = null, content = null }, ref) => {


    return (
        <div className="detailed-info-container w-[100%] mt-8" ref={ref}>
            <div className="detailed-info-wraper flex flex-row gap-10 mb-10" >
                <div className="detailed-title-container flex items-center w-1/4">
                    <div className="detailed-title-text font-[700] text-[1.3rem]">{title}</div>
                </div>
                <div className="detailed-info-content-container flex justify-start items-center pr-8 w-3/4">
                    <div className="detailed-info-content-title font-[400] text-[1rem] max-w-full overflow-hidden">
                        {content}
                    </div>
                </div>
            </div>
            <hr className="mt-32 border-t-2 border-grey" ></hr>
        </div>
    )
})

const SignUpForm = () => {
    return (
        <>
            <div className="fixed inset-0 bg-black opacity-80 z-[9999]" style={{ position: 'fixed', top: 0, left: 0 }}></div>
        </>
    )
}


const ViewProduct = () => {



    const [product, setProduct] = useState(null);
    const [moreButton, setMoreButton] = useState(false);
    const { id } = useParams();

    const info1Ref = useRef(null);
    const info2Ref = useRef(null);
    const info3Ref = useRef(null);
    const info4Ref = useRef(null);
    const info5Ref = useRef(null);


    const scrollToSection = (refElement) => {
        if (refElement.current) {
            refElement.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.post(`${apiUrl}/new/getProd`, {
                _id: id
            })
            if (response.status === 200) {
                setProduct(response.data[0]);
                console.log(response.data[0]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])



    // const { userID, name, token, email } = useContext(AuthContext); // Access context values
    // const { item, isLoggedIn, setIsLoggedIn } = useContext(AppProvider);

    return (
        <>
            <SignUpForm></SignUpForm>
            <div className="grid-container w-full flex flex-row">
                <div className="grid-section1 h-full w-3/4 pr-6">

                    <HeaderText product={product} />

                    <div className="relative">
                        <div className={`mt-8 transition-all ease ${!moreButton ? 'h-[70vh] overflow-hidden after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-20 after:bg-gradient-to-t after:from-white after:to-transparent' : 'h-full'}`}>
                            <div className="transition-transform duration-500 ease-in-out">

                                {product?.image1.map((image, index) => (
                                    <img src={image} key={index} alt="test" className="w-[100%] h-[100%] object-cover relative" />
                                ))}

                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setMoreButton(!moreButton)}
                        className="w-full shadow-inner rounded-md text-[1rem] font-[600] text-center mt-4 py-2 hover:bg-gray-300 transition-colors"
                    >
                        {moreButton ? '접기' : '더보기'}
                    </button>



                    <hr className="mt-32 border-t-2 border-grey"></hr>
                    <div className="detailed-info-container w-[100%] mt-8">
                        <DetailedInfo title="제공 내역" content={product?.textArea1} ref={info1Ref}></DetailedInfo>

                        <DetailedInfo title="방문 및 예약안내" content={product?.textArea2} ref={info2Ref}></DetailedInfo>

                        <DetailedInfo title="캠페인 미션" content={product?.textArea3} ref={info3Ref}></DetailedInfo>

                        <DetailedInfo title="키워드" content={product?.textArea4} ref={info4Ref}></DetailedInfo>

                        <DetailedInfo title="추가 안내사항" content={product?.textArea5} ref={info5Ref}></DetailedInfo>
                    </div>


                </div>

                {/* 오른쪽 영역 */}
                <div className="grid-section2  h-full w-1/4 static">
                    <ContentSideBar scrollToSection={scrollToSection} product={product} info1Ref={info1Ref} info2Ref={info2Ref} info3Ref={info3Ref} info4Ref={info4Ref} info5Ref={info5Ref}></ContentSideBar>
                </div>




            </div>
            <div className="h-[30vh] bg-[#F5F3F3] w-full">
                {/* <ContentItem /> */}

            </div>
        </>
    )
}

export default ViewProduct;