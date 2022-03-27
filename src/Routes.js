import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./containers/Frontpages/LandingPage";
import LogIn from "./containers/Frontpages/LogIn";
import RegisterUser from "./containers/Frontpages/Register";
import HeaderBar from "./containers/Footer_Header/HeaderBar";
import FooterBar from "./containers/Footer_Header/FooterBar";
import FinalDashboard from "./containers/Dashboard/Dashboard";
import Uploadfile from "./containers/Frontpages/UploadFile";
/*import FinalDashboardTABS from "./containers/Dashboard/DashboardTABS";*/

import useToken from "./utils/tokenManager";
import NotFound from "./containers/NotFound";


function Router() {
  const { token, removeToken, setToken } = useToken();
  
  return (
    <div class="min-w-full min-h-full">
      <HeaderBar token={token} removeToken={removeToken}/>
      {!token ? 
        <Routes>
            <Route path="/signup" element={<RegisterUser />}/>
            <Route path="/login" element={<LogIn setToken={setToken}/>}/>
            <Route path="/dashboard" element={<LandingPage />}/>
            <Route exact path="/" element={<LandingPage />}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>:
      (
      <Routes>
        <Route path="/login" element={<LogIn setToken={setToken}/>}/>
        <Route path="/signup" element={<RegisterUser />}/>
        <Route path="/dashboard" element={<FinalDashboard token={token} setToken={setToken} removeToken={removeToken}/>}/>
        <Route path="/file-upload" element={<Uploadfile />}/>
        <Route exact path="/" element={<LandingPage />}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      )}
      <FooterBar/>
    </div>
  );
}

export default Router;