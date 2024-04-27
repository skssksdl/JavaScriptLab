import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './routing.css'; // 추가: CSS 파일 임포트

import App from "./pages/App.js";
import PixelsFighting from "./pages/PixelsFighting.js";
import Maninthedark from "./maninthedark/script.js";
import Mondrian from "./pages/Mondrian.js";

function Routing() {
    const [running, setRunning] = useState(false); // 추가: 상태 설정

    // 추가: 애니메이션을 토글하는 함수
    const toggleRunning = () => {
        setRunning(!running);
    };

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='/pixelsfighting' element={<PixelsFighting />} />
                    <Route path='/maninthedark' element={<Maninthedark />} />
                    <Route path='/mondrian' element={<Mondrian />} />
                </Routes>
                <nav>
                    <ul>
                        <li><Link className={running ? 'running' : ''} onClick={toggleRunning} to="/">App</Link></li>
                        <li><Link className={running ? 'running' : ''} onClick={toggleRunning} to="/pixelsfighting">Pixels Fighting</Link></li>
                        <li><Link className={running ? 'running' : ''} onClick={toggleRunning} to="/maninthedark">Man in the Dark</Link></li>
                        <li><Link className={running ? 'running' : ''} onClick={toggleRunning} to="/mondrian">Mondrian</Link></li>
                    </ul>
                </nav>
            </BrowserRouter>
        </div>
    );
}

export default Routing;
