import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Home.css';

function Main() {
    const [data, setData] = useState({
        celcius: 0,
        name: "City",
        humidity: '',
        speed: 0,
    });
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const Api = async () => {
        try {
            const apikey = 'c60e086664c72364d4fd0a4c2fd29ca7';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apikey}&units=metric`;

            const res = await axios.get(url);
            if (res.status === 200) {
                setData({
                    celcius: res.data.main.temp,
                    name: res.data.name,
                    humidity: res.data.main.humidity,
                    speed: res.data.wind.speed,
                });
                setError('');
            } else {
                setError('No data found');
            }
        } catch (error) {
            console.log(error);
            setError('Error fetching data');
        }
    };

    useEffect(() => {
        Api();
    }, []);

    return (
        <div className='container'>
            <div className='weather'>
                <div className='search'>
                    <input type='text' placeholder='Enter city Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <button onClick={Api}>
                        <img src="https://cdn-icons-png.flaticon.com/512/4652/4652346.png" alt="Search" />
                    </button>
                </div>
                {error && <div className='error'>{error}</div>}
                <div className='winfo'>
                    <br />
                    <img src="https://img.freepik.com/premium-vector/cloud-with-rain-snow-weather-icon-vector-image-weather-label-web-blue-background_615232-511.jpg" height={100} width={100} alt="Weather Icon" />
                    <h1>{data.celcius}°C</h1>
                    

                    <h2>{data.name}</h2>
                    <div className='details'>
                        <div className='col'>
                            <img src='https://cdn-icons-png.freepik.com/512/2903/2903592.png' alt='Humidity Icon' />
                            <div className='humidity'>
                                <p>Humidity</p>
                                <p>{data.humidity}</p>
                            </div>
                        </div>
                        <div className='col' style={{ padding: "30px" }}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWyMrbSuu-q1c9ic61rV-HQHTCplmpKre0WxfO_kD3lA&s" alt="Wind Icon" height={20} width={20} />
                            <div className='wind'>
                                <p>Wind Speed</p>
                                <p>{data.speed}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
