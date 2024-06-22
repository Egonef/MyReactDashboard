//Library imports
import axios from 'axios';
import { useEffect , useState } from 'react';
// File imports
import './animations.css';
// Components imports
import SideBar from './Components/LateralBar';
import WeatherBox from './Components/WeatherBox';
import SteamInfo from './Components/SteamInfo';

// Color palette
// Morado oscuro: #B699C5
// Morado claro: #DACEE4
// Verde oscuro: #4AAC6F
// Verde claro: #CCDF9F

//Embed web
// <iframe src="https://aucorsa.es/" className=' w-[50rem] h-[50rem]'></iframe>

function App() {

    return (
        <div className=" h-svh bg-[#B699C5] flex flex-row ">
            <SideBar />
            <WeatherBox />
            <SteamInfo />
        </div>
    );
}

export default App;
