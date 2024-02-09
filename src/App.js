import React from "react";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Weather from "./Weather";
import passwordRecovery from "./passwordRecovery";
import forgotPWsite from "./forgotpwsite";
import profile from "./profile";
import Logout from "./logout";
import UpdateProfile from "./updateProfile";
import Statistics from "./statistics";
import WeatherNews from "./WeatherNews";
import NewsOne from "./newsone";
import NewsTwo from "./newstwo";
import NewsThree from "./newsthree";
import AdminLoginForm from "./adminlogin";
import admin from "./admin";
import Clock from "./clock";
import TimeApp from "./time";
function App() {
  return (
    <MDBContainer fluid>
      <div className="App">
        <>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/Login" exact Component={Login} />
              <Route path="/Register" exact Component={Register} />
              <Route path="/Weather" exact Component={Weather} />
              <Route path="/profile" exact Component={profile} />
              <Route path="/logout" exact Component={Logout} />
              <Route path="/updateProfile" exact Component={UpdateProfile} />
              <Route path="/statistics" exact Component={Statistics} />
              <Route path="/WeatherNews" exact Component={WeatherNews} />
              <Route path="/newsone" exact Component={NewsOne} />
              <Route path="/newstwo" exact Component={NewsTwo} />
              <Route path="/newsthree" exact Component={NewsThree} />
              <Route path="/adminlogin" exact Component={AdminLoginForm} />
              <Route path="/admin" exact Component={admin} />
              <Route path="/clock" exact Component={Clock} />
              <Route path="/time" exact Component={TimeApp} />
              <Route
                path="/passwordRecovery"
                exact
                Component={passwordRecovery}
              />
              <Route path="/forgotpwsite" exact Component={forgotPWsite} />
            </Routes>
          </Router>
        </>
      </div>
    </MDBContainer>
  );
}

export default App;
