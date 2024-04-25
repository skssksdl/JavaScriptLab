import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import App from "./pages/App.js";
import PixelsFighting from "./pages/PixelsFighting.js";
import Maninthedark from "./pages/Maninthedark.js";
import Mondrian from "./pages/Mondrian.js";




function Routing() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/app' element={<App />} />
                    <Route path='/pixelsfighting' element={<PixelsFighting />} />
                    <Route path='/maninthedark' element={<Maninthedark />} />
                    <Route path='/mondrian' element={<Mondrian />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Routing;
