
import axios from 'axios';
import './App.css';
import { useEffect , useState } from 'react';
// Components imports
import SideBar from './Components/LateralBar';
import WeatherBox from './Components/WeatherBox';

// Color palette
// Morado oscuro: #B699C5
// Morado claro: #DACEE4
// Verde oscuro: #4AAC6F
// Verde claro: #CCDF9F

function App() {

    return (
        <div className=" h-svh bg-[#B699C5] flex flex-row ">
            <SideBar />
            <WeatherBox />
        </div>
    );
}

export default App;
