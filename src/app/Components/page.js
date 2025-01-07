'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";



const API_KEY = "35098c00edce2fbfe4cd0fd5f62a88c6"; 

export default function page() {
    const [data, setData] = useState(null);
    const [location, setLocation] = useState("London");
    const [inputValue, setInputValue] = useState("");
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInput = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (inputValue.trim() !== "") {
            setLocation(inputValue.trim());
            setInputValue(""); // Clear the input field
        }

        setAnimate(true);

        setTimeout(() => {
            setAnimate(false);
        }, 200);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError("");
            try {
                const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
                const response = await axios.get(URL);
                setData(response.data);
            } catch (error) {
                setError("Invalid city or country. Please try again.");
            }
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        };

        fetchData();
    }, [location]);

    return (
        <div className="w-full h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center px-4">
            {error && <div className="bg-red-600 text-white p-4 rounded-full mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className={`${animate ? "animate-bounce" : ""} h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}>
                <div className="h-full relative flex items-center justify-center p-2">
                    <input
                        onChange={handleInput}
                        className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full"
                        type="text"
                        value={inputValue}
                        placeholder="Search by City or Country"
                    />
                    <button type="submit" className="bg-pink-400 hover:bg-pink-600 w-20 h-12 rounded-full flex justify-center items-center transition">
                        Search
                    </button>
                </div>
            </form>
            <WeatherCard loading={loading} data={data} />
        </div>
    );
}
