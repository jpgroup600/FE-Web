import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-neutral-400 text-white py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          {/* Logo Section */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold">LOGO</h2>
          </div>

          {/* Information Sections */}
          <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Section 1 */}
            <div className="space-y-2">
              <h3 className="font-semibold border-b border-white/20 pb-2 mb-2">개인정보처리방침</h3>
              <p className="text-sm">대표 000</p>
              <p className="text-sm">사업자번호 000-00-00000</p>
              <p className="text-sm">서울 00구 000길 00, 123호 (00동,건물이름 1차)</p>
            </div>

            {/* Section 2 */}
            <div className="space-y-2">
              <h3 className="font-semibold border-b border-white/20 pb-2 mb-2">이용약관</h3>
            </div>

            {/* Section 3 */}
            <div className="space-y-2">
              <h3 className="font-semibold border-b border-white/20 pb-2 mb-2">통합오류신고</h3>
              <p className="text-sm">Tel 00-000-0000</p>
              <p className="text-sm">Fax 00-000-0000</p>
            </div>

            {/* Section 4 */}
            <div className="space-y-2">
              <h3 className="font-semibold border-b border-white/20 pb-2 mb-2">통합오류신고안내</h3>
              <p className="text-sm">E-mail 00-000-0000</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-sm text-center md:text-left">
          <p>Copyright(c) 2023~A2P.com All right Reserved.</p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
