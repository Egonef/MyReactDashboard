//  Library imports
import axios from 'axios';
import { useEffect , useState } from 'react';
// File imports


export default function SteamInfo( ) {

    const [games, setGames] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/games')
        .then(response => {
            console.log("Response: ");
            setGames(response.data.response.games);
            console.log(response.data.response.games);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    } , []);

    console.log(games);
    return (
        <div className="bg-[#DACEE4] w-[40rem] h-96 my-4 mx-4 py-5 px-8 rounded-3xl shadow-md shadow-[#CCDF9F] overflow-hidden">
            <h1>sasa</h1>
        </div>
    );
}