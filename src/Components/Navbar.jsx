import React, { useState, useContext, useEffect } from "react";
import "../assets/Main.css";
import SearchIcon from "../assets/images/Search.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../App"; // Import the context
import axios from "axios";
import UnderDev from "../Pages/UnderDev";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { name, setname, setToken, setEmail } = useContext(AuthContext); // Access context values
  const da = useContext(AuthContext); // Access context values
  const { email, token, userID } = useContext(AuthContext);
  const navigate = useNavigate(); // Navigation
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // State to manage the signup type
  const [signupType, setSignupType] = useState(null);

  // Retrieve the signupType from localStorage when the component mounts
  useEffect(() => {
    const storedSignupType = localStorage.getItem("signupType");
    setSignupType(storedSignupType);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear the stored user data
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("signupType"); // Remove signupType on logout
    localStorage.removeItem("userID");
    localStorage.removeItem("type");

    // Reset the context values
    setToken(null);
    setname(null);
    setEmail(null);

    // Redirect to login page
    navigate("/login");
  };
  const [notificationreal, setNotifications] = useState([]);
  useEffect(() => {
    // Check if token and userID are available
    if (token && userID) {
      axios
        .post(
          "https://webjacob-c0f6c8e947aa.herokuapp.com/final/myNotifications",
          {
            userId: userID,
          }
        )
        .then((response) => {
          setNotifications(response.data);
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    }
  }, [token, userID]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav className="w-full">
        <div className="">
          <div className="mx-auto">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
                <button
                  onClick={toggleMobileMenu}
                  type="button"
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Open main menu</span>

                  <svg
                    className={`${
                      isMobileMenuOpen ? "hidden" : "block"
                    } h-6 w-6`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>

                  <svg
                    className={`${
                      isMobileMenuOpen ? "block" : "hidden"
                    } h-6 w-6`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center logo">
                  <Link to="/" className="flex items-center space-x-2">
                    <span className="text-sm font-medium">LOGO</span>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block"></div>
                <Link to="/desktop_20" className="flex items-center space-x-2">
                  <div className="search relative lg:block hidden">
                    <input
                      type="search"
                      placeholder="Which product are you looking for?"
                      className="border"
                    />
                    <span>
                      <img
                        src={SearchIcon}
                        alt=""
                        style={{
                          position: "absolute",
                          top: "6px",
                          right: "12px",
                        }}
                      />
                    </span>
                  </div>
                </Link>
              </div>
              <div className="absolute inset-y-0 lg:block hidden 0-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 nav-links">
                <div className="flex space-x-4">
                  {localStorage.getItem("type") &&
                    localStorage.getItem("type") != '"individual"' && (
                      <NavLink
                        to="/add/campian"
                        className="rounded-md px-3 py-2"
                      >
                        상품 추가
                      </NavLink>
                    )}
                  <div className="relative inline-block rounded-md px-3 py-2">
                    <NavLink
                      onClick={toggleDropdown}
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      알림
                    </NavLink>
                    {isOpen && (
                      <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-4">
                        <div className="max-h-80 overflow-y-auto space-y-3">
                          {notificationreal.slice(0, 5).map((notification) => (
                            <div
                              key={notification.id}
                              className="notification-item bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200 hover:bg-gray-100 transition-all duration-200 ease-in-out"
                            >
                              <p className="text-gray-800 font-medium text-sm">
                                {notification.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <NavLink
                    to="/UnderDev"
                    className="rounded-md px-3 py-2 text-sm font-medium"
                  >
                    사용법 
                  </NavLink>

                  {name ? (
                    <>
                      <button
                        className="font-medium Login w-100"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        Profile
                      </button>

                      {isDropdownOpen && (
                        <div
                          className="dropdown-menu"
                          style={{
                            position: "absolute",
                            top: "110%",
                            right: 0,
                            backgroundColor: "#fff",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                            borderRadius: "8px",
                            zIndex: 1000,
                            padding: "10px 0",
                            minWidth: "160px",
                            textAlign: "left",
                          }}
                        >
                          <Link
                            to={
                              JSON.parse(localStorage.getItem("type")) ===
                              "individual"
                                ? "/user"
                                : "/merchant"
                            }
                            style={{
                              display: "block",
                              padding: "10px 20px",
                              textDecoration: "none",
                              color: "#333",
                              fontWeight: "500",
                            }}
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Profile
                          </Link>

                          <button
                            style={{
                              width: "80%",
                              textAlign: "center",
                              padding: "10px 20px",
                              backgroundColor: "green",
                              border: "1px solid #007bff",
                              color: "#fff",
                              cursor: "pointer",
                              fontWeight: "500",
                              borderRadius: "8px",
                              transition:
                                "background-color 0.3s, transform 0.3s",
                              display: "block",
                              margin: "10px auto",
                            }}
                            onClick={handleLogout}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = "green";
                              e.target.style.transform = "scale(1.05)";
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = "green";
                              e.target.style.transform = "scale(1)";
                            }}
                          >
                            로그아웃
                          </button>

                          {signupType === "SignUp2" && (
                            <Link
                              to="/add/campian"
                              style={{
                                display: "block",
                                padding: "10px 20px",
                                textDecoration: "none",
                                color: "#333",
                                fontWeight: "500",
                              }}
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              상품등록
                            </Link>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={"/login"}
                      className="font-medium w-100 border border-gray-300 bg-[#2C9512] rounded-[10px] py-2 px-6"
                      style={{ color: "white" }}
                    >
                      로그인
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menus */}
          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } lg:hidden nav-links`}
            id="mobile-menu"
          >
            <div className="space-y-1 px-2 pb-3">
              <a
                href=""
                className="block rounded-md px-3 py-2"
                aria-current="page"
              >
                Search Product
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium"
              >
                Event/Notification
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium"
              >
                How to use
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
