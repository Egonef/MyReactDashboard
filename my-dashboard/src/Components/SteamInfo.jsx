//  Library imports
import axios from 'axios';
import { useEffect , useState } from 'react';
// File imports


export default function SteamInfo( ) {

    const [games, setGames] = useState([]);
    const [mostPlayedGame, setMostPlayedGame] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [achievementNumber, setAchievementNumber] = useState(0);

    //Encontrar cual es el juego con mas horas jugadas
    useEffect(() => {
        if (games.length > 0) {
            let mostPlayedGame = games[0];
            for (let i = 1; i < games.length; i++) {
                if (games[i].playtime_forever > mostPlayedGame.playtime_forever) {
                    mostPlayedGame = games[i];
                }
            }
            setMostPlayedGame(mostPlayedGame);
        }

        if (mostPlayedGame != null){
            axios.get('http://localhost:3001/achievements/' + mostPlayedGame.appid)
            .then(response => {
                setAchievements(response.data);
                console.log(response.data);

            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }

        // DONDE COJONE PONGO ESTE CACHO QUIE NO COGE BIEN LOS LOGROS POR EL ORDEN DE DSACAART LAS VARIABLES ERE UN AINFLA BOLA 
        var achievementCounter = 0;
        for (let i = 0; i < achievements.length; i++) {
            if (achievements[i].achieved === 1) {
                achievementCounter++;
            }
            setAchievementNumber(achievementCounter);
        }
    } , [games, mostPlayedGame, achievements]);

    //Obtener los juegos de la API de Steam y los logros de cada uno
    useEffect(() => {
        axios.get('http://localhost:3001/games')
            .then(response => {
                setGames(response.data.response.games);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    } , []);


    return (
        <div className="w-[48rem] h-96">
            <div className='bg-[#DACEE4] h-4/6 my-4 mx-4 pl-5 py-1 rounded-3xl shadow-md shadow-[#CCDF9F] overflow-hidden'>
                <div className='bg-transparent backdrop-blur-lg border-[#CCDF9F] border-2 rounded-lg p-2 absolute z-10 mt-11 ml-5'>
                    <h1 className='  text-[#b6d177] z-10  drop-shadow-[0_5.2px_3.2px_#B699C5] text-5xl  font-bold ' style={{ fontFamily: 'Audiowide' }}>{games.length > 0 && mostPlayedGame != null ? mostPlayedGame.name : "Buscando juegos"}</h1>
                </div>
                <div className='bg-transparent backdrop-blur-lg border-[#CCDF9F] border-2 rounded-lg p-2 absolute z-10 mt-32 ml-5'>
                    <h1 className='  text-[#b6d177] z-20  drop-shadow-[0_5.2px_3.2px_#B699C5] text-2xl  font-bold ' style={{ fontFamily: 'Audiowide' }}>{games.length > 0 && mostPlayedGame != null ? ("Horas jugadas: " + (mostPlayedGame.playtime_forever / 60).toString().slice(0, 6) + " horas") : "Buscando juegos"}</h1>
                </div>
                {mostPlayedGame && <img className='  h-full rounded-3xl opacity-80 drop-shadow-[-10px_5.2px_3.2px_#B699C5]' src={`https://steamcdn-a.akamaihd.net/steam/apps/${mostPlayedGame.appid}/library_hero.jpg`} alt={mostPlayedGame.name} />}
            </div>
            <div className='bg-[#DACEE4] h-[28%] my-4 mx-4 pl-5 py-4 rounded-3xl shadow-md shadow-[#CCDF9F] overflow-hidden'>
                <h1 className='  text-[#b6d177] drop-shadow-[0_5.2px_3.2px_#B699C5] text-4xl ml-5 font-bold ' style={{ fontFamily: 'Audiowide' }}>Logros:</h1>
                <div className=' flex felx-row justify-center items-center'>
                    <p className='  text-[#b6d177] drop-shadow-[0_5.2px_3.2px_#B699C5] text-2xl ml-5 font-bold ' style={{ fontFamily: 'Audiowide' }}>{achievementNumber} de {achievements.length}</p>
                    <progress className='w-[30rem] h-5 ml-5 rounded-3xl drop-shadow-[0_5.2px_3.2px_#B699C5]' value={achievementNumber} max={achievements.length}></progress>
                </div>
            </div>
        </div>
    );
}