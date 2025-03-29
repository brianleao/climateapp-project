"use client";
import React, {useState} from "react";
import { IoPartlySunny } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { IoWater } from "react-icons/io5";
import { FaWind } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";

export default function ClimaTempo() {
  
  const [cidade, setCidade] = useState("");
  const [dadosClima, setDadosClima] = useState<{
    name: string;
    main: { temp: number; humidity: number };
    wind: { deg: number; speed: number };
  } | null>(null);
  
  const [buscou, setBuscou] = useState(false);
  const API_KEY = "2ed462cc476dfc45c940273eb41af760";


  
  async function buscarClima() {

      try {
        // https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${API_KEY}`);

        console.log("Resposta da API:", response.data);
        setDadosClima(response.data);
        setBuscou(true);
      } catch {
        alert("Cidade não encontrada");
        setDadosClima(null);
      }
  }

  return (
    <div className="flex w-120 min-h-auto bg-sky-600 rounded-3xl flex-col items-center p-2 shadow-2xl shadow-yellow-400">
      <div className="flex items-center justify-center bg-white w-full mt-4 rounded-3xl pl-2 pr-2 pt-1 pb-1 gap-2">
        <h1 className="text-3xl text-black font-bold">Aplicativo de Tempo</h1>
        <IoPartlySunny className="text-3xl text-amber-300"/>
      </div>
      <h2 className="text-white mt-4 font-extralight text-2xl mb-4">Digite a cidade:</h2>
      <div className="flex items-center gap-2">
        <input 
        type="text" 
        className="border-white bg-white p-3 rounded-4xl font-bold"
        onChange={(e) => setCidade(e.target.value)}
        />
        <IoSearch 
        className="text-black text-3xl bg-white rounded-3xl p-2 w-full h-full hover:bg-black hover:text-white cursor-pointer transition duration-200" 
        onClick={buscarClima}
        />
      </div>

      {buscou && dadosClima && (
      <div className="text-white text-2xl">
        <div className="flex flex-col gap-3 items-center mt-4 mb-4">

          <div className="flex items-center gap-1">
            <FaLocationDot className="text-red-600"/>
            <span>{dadosClima?.name}</span>
          </div>

              {/* <span>{(dadosClima?.main?.temp-273.15).toFixed(1)} °C</span> */}
              <span>{dadosClima?.main?.temp.toFixed(0)} °C</span>

        </div>
        
        <div className="flex items-center gap-4">
          
          <div className="flex items-center gap-1">
            <IoWater/>
            <span>{dadosClima?.main?.humidity}%</span>
          </div>

          <div className="flex items-center gap-1">
            <FaWind/>
            <span>{dadosClima?.wind?.speed}m/s</span>
          </div>

        </div>

      </div>
    )}
    </div>
  );
}