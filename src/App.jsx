import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/404";
import Home from "./pages/home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
