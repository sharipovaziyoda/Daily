import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="App flex flex-col h-screen">
        {/* Navbar Component */}
        <Navbar username="John Doe" email="johndoe@example.com" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Sidebar and Content Area */}
          <div>
            <Routes>
              <Route path="/daily" element={<div/>} />
              <Route path="/weekly" element={<div/>} />
              <Route path="/monthly" element={<div/>} />
              <Route path="/add-special-day" element={<div/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

