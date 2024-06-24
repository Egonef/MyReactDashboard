import axios from "axios";
import { useEffect, useState , useRef } from "react";
import { createChart } from 'lightweight-charts';




export default function SystemInfo( ) {

    //Charts data
    const chartContainerRef = useRef();
    const chart = useRef(null);
    const [data, setData] = useState([]);

    //System data
    const [cpuUsage, setCpuUsage] = useState(null);
    const [freeMemory, setFreeMemory] = useState(null);
    const [totalMemory, setTotalMemory] = useState(null);
    const [systemUptime, setSystemUptime] = useState(null);
    const [cpuTemperature, setCpuTemperature] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://localhost:3001/system-info')
                .then(response => {
                    setCpuUsage(response.data.cpuUsage);
                    setCpuTemperature(response.data.cpuTemperature);
                    setFreeMemory(response.data.freeMemory);
                    setTotalMemory(response.data.totalMemory);
                    setSystemUptime(response.data.systemUptime);
    
                    // Actualiza el gráfico aquí directamente con los nuevos datos
                    const newTime = Date.now() / 1000; // Tiempo en segundos
                    // Asegura que el tiempo es siempre único incrementándolo ligeramente
                    const lastDataTime = data.length > 0 ? data[data.length - 1].time : 0;
                    const adjustedTime = newTime > lastDataTime ? newTime : lastDataTime + 0.001; // Incrementa el último tiempo conocido si es necesario
    
                    setData(currentData => [...currentData, { time: adjustedTime, value: response.data.cpuTemperature.main }]);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        };
    
        fetchData();
        const interval = setInterval(fetchData, 10000);
    
        return () => clearInterval(interval);
    }, [cpuTemperature]); // Ajustado para no depender de cpuTemperature
    // Inicializa el gráfico
    useEffect(() => {
        if (chartContainerRef.current && !chart.current) {
            console.log("Creating chart")
            chart.current = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 150,
                layout: {
                    background: { color:'#DACEE4'}, // Asegúrate de que este es el color que quieres
                    textColor: 'rgb(74, 172, 111, 0.9)',
                },
                grid: {
                    vertLines: {
                        color: 'rgba(197, 203, 206, 0.7)',
                    },
                    horzLines: {
                        color: 'rgba(197, 203, 206, 0.7)',
                    },
                },
            });
    
            const lineSeries = chart.current.addLineSeries({
                color: '#4AAC6F', // Color de línea personalizado
            });
            lineSeries.setData(data);
    
            // Almacenar la referencia a la serie de líneas para su uso posterior
            chart.lineSeries = lineSeries;
        }
    }, [data]);

    // Actualiza el gráfico con nuevos datos
    useEffect(() => {
        if (chart.current && chart.lineSeries) {
            // Actualiza la serie existente en lugar de crear una nueva
            chart.lineSeries.setData(data);
        }
    }, [data]);

    return (
        <div>
            <div className="bg-[#DACEE4] w-[30rem] h-64 my-4 mx-4 py-5 px-8 rounded-3xl shadow-md shadow-[#CCDF9F] overflow-hidden">
                {cpuTemperature && <h1 className="text-3xl font-bold text-[#b6d177] drop-shadow-[0_5.2px_3.2px_#B699C5]" style={{ fontFamily: 'Audiowide' }}>
                    Temperatura de la CPU: {cpuTemperature.main}ºC
                </h1>}
                { chartContainerRef && <div ref={chartContainerRef} />}
            </div>
            <div className=" flex flex-row">
                <div className="bg-[#DACEE4] w-[14rem] h-48 my-4 mx-4 py-5 px-8 rounded-3xl shadow-md shadow-[#CCDF9F] overflow-hidden">
                    asdas
                </div>
                <div className="bg-[#DACEE4] w-[14rem] h-48 my-4 mx-4 py-5 px-8 rounded-3xl shadow-md shadow-[#CCDF9F] overflow-hidden">
                    asdas
                </div>
            </div>
        </div>
        

    );
}