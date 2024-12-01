import React, { useState, useContext } from "react";
import Review from "../assets/images/Review.svg";
import Merchant from "../assets/images/Merchant.svg";
import NewverLogin from "../assets/images/NeverLogin.svg";
import Kakao from "../assets/images/Kakao.svg";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App"; // Import the context
import { AppProvider } from "../ContextApi/Api";
import LoginIcon from "../assets/Icons/LoginIconPencil.svg";

const LoginAsMerchant = () => {
  // const [activeTab, setActiveTab] = useState('review');
  const { setToken, setEmail, setname, setUserID } = useContext(AuthContext); // Access context values
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Navgation = useNavigate();

  const { setIsLoggedIn } = useContext(AppProvider);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://webjacob-c0f6c8e947aa.herokuapp.com/merchant/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status == 200) {
        const result = await response.json();
        alert("Login successfully");
        setEmail(result.email);
        setname(result.name);
        setToken(result.jwtToken);
        setIsLoggedIn(true);
        console.log("response", response._id);
        localStorage.setItem("name", result.name);
        localStorage.setItem("email", result.email);
        localStorage.setItem("token", result.jwtToken);
        localStorage.setItem("userID", result._id);
        localStorage.setItem("type", result.userType);
        localStorage.setItem("businessName", result.businessName);

        const r = await fetch(
          "https://webjacob-c0f6c8e947aa.herokuapp.com/auth/find-email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: result.email }),
          }
        );

        if (r.status === 200) {
          const user = await r.json();
          console.log("User Data", user);
          localStorage.setItem("type", JSON.stringify(user.type));
        } else {
          console.error("Error fetching user data:", r.status);
        }

        Navgation("/");
      }
      if (response.status == 403) {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Sign In Failed" + error);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="login-form mx-auto">
          <div className="login-log">
            <h3>Logo</h3>
          </div>
          <div className="form-outline">
            <div className="review-section flex justify-between">
              {/* <h2 
          style={{cursor:'pointer'}}
        className={`flex items-center gap-2 review ${activeTab === 'review' ? 'active' : ''}`} 
        onClick={() => handleTabClick('review')}
      >
         <span>
          <img src={activeTab === 'review' ? Review : Merchant} alt="" />
        </span>
        {activeTab === 'merchant' ? 'Merchant' : 'Reviewers'}
      </h2> */}

              {/* <div className="Merchant">
        <h2 
         style={{cursor:'pointer'}}
          className={`flex items-center gap-2 ${activeTab === 'merchant' ? 'active' : ''}`} 
          onClick={() => handleTabClick('merchant')}
        >
          <span >
          <img src={activeTab === 'merchant' ? Review  : Merchant } alt="" />
          </span>



          {activeTab === 'merchant' ? 'Reviewers' : 'Merchant'}
        </h2>
      </div> */}
              <img
                src={LoginIcon}
                alt="Login Icon"
                className="w-5 h-5"
                style={{ marginRight: 10 }}
              />
              <h2>Login </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="UserName"
                />
                {errors.name && <p className="error-text">Name is required</p>}
              </div>

              <div className="form-group mt-2">
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="error-text">Password is required</p>
                )}
              </div>
              <button className="login-btn" type="submit">
                Login As Merchant
              </button>
            </form>

            <div className="find-passowrd flex items-center justify-between px-3 mt-4">
              <div className="checkbox-password flex items-center gap-5">
                <input type="checkbox" />
                <p>Auto Login</p>
              </div>
              <div className="find-passowrd">
                <p>Find Id | Password find</p>
              </div>
            </div>

            {/* Login with  */}

            <div className="login-with flex items-center cursor-pointer	 ">
              <img src={NewverLogin} alt="" className="px-5" />
              <p>Naver Login</p>
            </div>

            <div className="login-with flex items-center cursor-pointer	">
              <p className="fb">Facebook Login</p>
            </div>

            <div className="login-with flex items-center cursor-pointer	">
              <img src={Kakao} alt="" className="px-5" />
              <p>Kakao Login</p>
            </div>

            {/* Reviewers Register */}

            <div className="review-bottom flex justify-center gap-3">
              {/* <div className="review-section-one gap-4 flex items-center justify-center">
      <img src={Review} alt="" />
      <p>Reviewers <br /> Register</p>
    </div>

    <div className="review-section-one gap-4 flex items-center justify-center">
      <img src={Merchant} alt="" />
      <p>Merchant <br />
      Register</p>
    </div> */}
              <div className="login-with flex  cursor-pointer justify-center">
                <Link to={"/option"} className="flex items-center ">
                  <img src={LoginIcon} alt="Login Icon" className="w-5 h-5" />
                  <p className="text-center">Register</p>
                </Link>
              </div>
            </div>

            <div className="how-to-use mx-auto">
              <ul className="flex gap-6 mt-4">
                <li>About us</li>
                <li>Become Merchant</li>
                <li>How to use</li>
                <li>Privacy policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginAsMerchant;
