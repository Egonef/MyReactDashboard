//Library imports

// File imports
import './animations.css';
import './progressbar.css';
// Components imports
import SideBar from './Components/LateralBar';
import WeatherBox from './Components/WeatherBox';
import SteamInfo from './Components/SteamInfo';
import SystemInfo from './Components/SystemInfo';
import ToDoListWidget from './Components/TaskList';
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
            <div className=' flex flex-col'>
                <div className=' flex flex-row'>
                    <WeatherBox />
                    <SteamInfo />
                </div>
                <div className=' flex flex-row'>
                    <SystemInfo />
                    <ToDoListWidget />
                </div>
            </div>

        </div>
    );
}

export default App;
