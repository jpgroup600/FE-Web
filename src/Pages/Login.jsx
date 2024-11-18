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
import MerchantLogo from "../assets/images/MerchantLogo.svg";
import { Navigation } from "swiper/modules";
const Login = () => {
  // const [activeTab, setActiveTab] = useState('review');
  const { setToken, setEmail, setname, setUserID } = useContext(AuthContext); // Access context values
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Navgation = useNavigate();

  const { setIsLoggedIn } = useContext(AppProvider);
  const [tabs, settabs] = useState(false);

  const onSubmit = async (data) => {
    try {
      let response;
      if (activeTab === "reviewer") {
        response = await fetch(
          "https://webjacob-c0f6c8e947aa.herokuapp.com/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
      } else {
        response = await fetch(
          "https://webjacob-c0f6c8e947aa.herokuapp.com/merchant/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
      }

      if (response.status === 200) {
        const result = await response.json();
        alert("Login successfully");

        setEmail(result.email);
        setname(result.name);
        setToken(result.jwtToken);
        setUserID(result._id);
        setIsLoggedIn(true);

        console.log("Data", result);
        localStorage.setItem("name", result.name);
        localStorage.setItem("email", result.email);
        localStorage.setItem("token", result.jwtToken);
        localStorage.setItem("userID", result._id);

        // Fetch the user type based on email
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
      } else if (response.status === 403) {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Sign In Failed: " + error.message);
    }
  };

  const [activeTab, setActiveTab] = useState("reviewer");
  return (
    <>
      <div className="container mx-auto">
        <div className="login-form mx-auto">
          <div className="login-log">
            <h3>Logo</h3>
          </div>
          <div className="form-outline">
            {/* Tab Section */}
            <div className="flex justify-between">
              {/* Reviewer Tab */}
              <div
                className={`review-section flex items-center justify-center w-1/2 p-4 cursor-pointer ${
                  activeTab === "reviewer" ? "bg-gray-100" : ""
                }`}
                onClick={() => setActiveTab("reviewer")}
                style={{ borderTopLeftRadius: 20 }}
              >
                <img
                  src={LoginIcon}
                  alt="Login Icon"
                  className="w-5 h-5"
                  style={{ marginRight: 10 }}
                />
                <h3>Reviewer</h3>
              </div>

              {/* Merchant Tab */}
              <div
                className={`review-section flex items-center justify-center w-1/2 p-4 cursor-pointer ${
                  activeTab === "merchant" ? "bg-gray-100" : ""
                }`}
                onClick={() => setActiveTab("merchant")}
                style={{ borderTopRightRadius: 20 }}
              >
                <img
                  src={MerchantLogo}
                  alt="Login Icon"
                  className="w-5 h-5"
                  style={{ marginRight: 10 }}
                />
                <h3>Merchant</h3>
              </div>
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
                Login
              </button>
              {/* <Link to={"/login_Merchant"} className="flex items-center ">
                <button className="login-btn " type="danger">
                  Login As Merchant
                </button>
              </Link> */}
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

export default Login;
