import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Weather from "./Weather";

function App() {
  return (
    <div className="App">
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/Login" exact Component={Login} />
            <Route path="/Register" exact Component={Register} />
            <Route path="/Weather" exact Component={Weather} />
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default App;
