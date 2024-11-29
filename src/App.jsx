import React, { createContext, useState } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Homepage from './Pages/Homepage';
import { Route, Routes } from 'react-router-dom';
import Campaign from './Pages/Campaign';
import AddCampaign from './Pages/AddCampaign';
import Merchant from './Pages/Merchant';
import Desktop17 from './Pages/Desktop_17';
import Signup from './Pages/Signup';
import "../src/assets/Main.scss";
import Signup2 from './Pages/Signup2';
import SignUp3 from './Pages/SignUp3';
import OptionSingup from './Pages/OptionSingup';
import FilterProducts from './Pages/Desktop_20/desktop_20';
import User from './Pages/User';
import LoginAsMerchant from './Pages/LoginAsMerchant';
import EventNotificationsPage from './Pages/Event_NotificationsPage';
import UnderDev from './Pages/UnderDev';
import HomeScreen from './Pages/HomeScreen';
import ViewProduct from './Pages/ViewProduct';

// Create the context here in the same file
export const AuthContext = createContext();

const App = () => {
  // Create state for token and email
  const [token, setToken] = useState( localStorage.getItem('token') || '');
  const [email, setEmail] = useState( localStorage.getItem('email') || '');
  const [name, setname] = useState(localStorage.getItem('name')|| '');
  const [userID, setUserID] = useState(localStorage.getItem('userID') || '');
  return (
    <AuthContext.Provider value={{ token, setToken, email, setEmail, name, setname, userID, setUserID }}>
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden'}}>
      <Navbar />
      <div className='px-[5%]'>
        <Routes >
          <Route path="/home" element={<Homepage />} />
          <Route path="/" element={<HomeScreen/>}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/add/campian" element={<AddCampaign />} />
          <Route path="/merchant" element={<Merchant />} />
          <Route path="/user" element={<User />} />
          <Route path="/view/:id" element={<Desktop17 />} />
          <Route path="/view-product/:id" element={<ViewProduct/>} />
          <Route path="/signup2" element={<Signup2/>} />
          <Route path="/signup3" element={<SignUp3 />} />
          <Route path="/option" element={<OptionSingup />} />
          <Route path="/desktop_20" element={<FilterProducts />} />
          <Route path="/login_Merchant" element={<LoginAsMerchant />} />
          <Route path="/event-notifications" element={<EventNotificationsPage />} />
          <Route path="/UnderDev" element={<UnderDev />} />
        </Routes>
      </div>
      {/* <Footer/> */}
    </div>
  </AuthContext.Provider>
  );
};

export default App;
