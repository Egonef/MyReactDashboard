import axios from 'axios';
import { useEffect , useState } from 'react';



export default function WeatherBox( ) {

    const [temperature, setTemperature] = useState(null);

    useEffect(() => {
        
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=37.53&lon=-4.45&units=metric&lang=es&appid=da2eddf13f520f53e860512334af9c9d`)
            .then(response => {
                console.log("Response: ");
                setTemperature(response.data.main.temp + 5)
            })
            .catch(error => {
                console.log(error);
            });
        
        //setTemperature("25°C");
    } , []);


    return (
        <div className="bg-[#DACEE4] w-[40rem] h-96 my-4 mx-4 py-5 px-8 rounded-3xl shadow-md shadow-[#CCDF9F] overflow-hidden">
            <div className=' flex flex-row justify-center items-center align-middle p-5 w-60 h-24 my-10'>
                <svg xmlns="http://www.w3.org/2000/svg" fill='#B699C5' className=' scale-110 drop-shadow-lg ' viewBox="0 0 640 512"><path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill=' #4AAC6F' className=' scale-50 -translate-x-12 translate-y-5 drop-shadow-lg'viewBox="0 0 320 512"><path d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V208c0-8.8 7.2-16 16-16s16 7.2 16 16V322.7c18.6 6.6 32 24.4 32 45.3z"/></svg>
            </div>
            <h1 className=' text-8xl ml-5 font-bold' style={{ fontFamily: 'Quicksand Variable' }}>{temperature}</h1>
            <div className=' h-96 w-96 bg-slate-600 relative translate-x-96 -translate-y-28 rounded-[20rem] '></div>
        </div>
    );
}