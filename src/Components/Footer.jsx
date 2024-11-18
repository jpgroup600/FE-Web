import React from "react";

const Footer = () => {
  return (
    <>
      <footer >
        <div className="container">
          <div className="grid lg:grid-cols-6 gap-12 footer-container px-12">
            <div className="footer-logo row-span-3  mx-4">
              <h1>LOGO</h1>
            </div>
            <div className="footer-sec">
              <h3 style={{ position: "relative", left: "50px" }}>
                {" "}
                <span style={{ position: "absolute", top: "4px" }}>
                  {" "}
                  <svg
                    width="3"
                    height="17"
                    viewBox="0 0 3 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="3.00235" height="16.0125" fill="white" />
                  </svg>
                </span>{" "}
                <span className="mx-4">개인정보처리방침 이용약관</span>{" "}
              </h3>
            </div>
            <div className="footer-sec">
              <h3 style={{ position: "relative", left: "120px" }}>
                {" "}
                <span style={{ position: "absolute", top: "4px" }}>
                  {" "}
                  <svg
                    width="3"
                    height="17"
                    viewBox="0 0 3 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="3.00235" height="16.0125" fill="white" />
                  </svg>
                </span>{" "}
                <span className="mx-3">이용약관</span>{" "}
              </h3>
            </div>
            <div className="footer-sec">
              <h3 style={{ position: "relative", left: "80px" }}>
                {" "}
                <span style={{ position: "absolute", top: "4px" }}>
                  {" "}
                  <svg
                    width="3"
                    height="17"
                    viewBox="0 0 3 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="3.00235" height="16.0125" fill="white" />
                  </svg>
                </span>{" "}
                <span className="mx-3">품질오류신고</span>{" "}
              </h3>
            </div>
            <div className="footer-sec">
              <h3 style={{ position: "relative", left: "60px" }}>
                {" "}
                <span style={{ position: "absolute", top: "4px" }}>
                  {" "}
                  <svg
                    width="3"
                    height="17"
                    viewBox="0 0 3 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="3.00235" height="16.0125" fill="white" />
                  </svg>
                </span>{" "}
                <span className="mx-3">품질오류신고</span>{" "}
              </h3>
            </div>

            <br className="lg:block hiddden" />
            <div className="footer-para-2">
              <p>대표 000</p>
            </div>
            <div className="footer-para-2">
              <p>사업자번호 000-00-00000</p>
            </div>
            <div className="footer-para-2">
              <p style={{ textAlign: "right" }}>Tel 00-000-0000</p>
            </div>
            <div className="footer-para-2">
              <p style={{ textAlign: "right" }}>Fax 00-000-0000</p>
            </div>

            <div className="footer-para-2">
              <p style={{ textAlign: "right" }}>E-mail 00-000-0000</p>
            </div>
            <br className="lg:block hidden" />
            <div className="footer-para-2">
              <p className="third">
                서울 00구 000길 00. 123호 (00동,건물이름 1차)
              </p>
            </div>
            <br />
          </div>
          <div className="copyright">
            <p className="third text-center ">
              Copyright(c) 2023~A2P.com All right Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
