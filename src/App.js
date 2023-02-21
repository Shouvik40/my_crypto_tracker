import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header/Header";

import style from "./App.module.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className={style.App}>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/coins/:id" element={<CoinPage />} />
            <Route path="/coins" element={<CoinPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
