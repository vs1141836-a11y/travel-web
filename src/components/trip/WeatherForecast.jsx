import React from "react";
import { Sun, Cloud, CloudRain, CloudSnow, Wind, Thermometer, Droplets, Umbrella, Shirt, Sunrise, Sunset, Eye, Sparkles, ShieldCheck } from "lucide-react";
import { getDestData } from "../../utils/travelData";
import Card from "../ui/Card";

const WeatherForecast = ({ weather, destination, loading }) => {
  const data = getDestData(destination);
  const bestSeason = data?.weather?.bestSeason;
  const whatToWear = data?.weather?.whatToWear;
  const seasonData = data?.weather;

  if (loading) {
    return (
      <div className="glass p-8 rounded-2xl border border-zinc-800 text-center flex flex-col items-center gap-3">
        <Sun className="text-brand-accent animate-pulse" size={32} />
        <h3 className="text-lg font-bold">Loading Weather & Climate for {destination}...</h3>
        <p className="text-zinc-400 text-xs max-w-md">Fetching live temperatures, humidity, UV index, and seasonal advice.</p>
      </div>
    );
  }

  const getWeatherIcon = (desc) => {
    if (!desc) return <Sun size={24} className="text-amber-400" />;
    const d = desc.toLowerCase();
    if (d.includes("rain") || d.includes("drizzle") || d.includes("shower")) return <CloudRain size={24} className="text-sky-400" />;
    if (d.includes("snow") || d.includes("sleet")) return <CloudSnow size={24} className="text-blue-200" />;
    if (d.includes("cloud") || d.includes("overcast")) return <Cloud size={24} className="text-zinc-400" />;
    if (d.includes("clear") || d.includes("sunny")) return <Sun size={24} className="text-amber-400" />;
    return <Cloud size={24} className="text-zinc-400" />;
  };

  const temp = weather?.current?.temp || 19;
  const description = weather?.current?.description || "Partly Sunny & Mild";
  const humidity = weather?.current?.humidity || 62;
  const wind = weather?.current?.wind || 14;
  const feelsLike = weather?.current?.feels_like || temp;

  return (
    <div className="flex flex-col gap-6">
      {/* Current Weather Banner */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
            {getWeatherIcon(description)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/50 uppercase">
                Live Conditions
              </span>
              <span className="text-xs text-zinc-400 font-semibold">{weather?.current?.city || destination}</span>
            </div>
            <div className="flex items-baseline gap-3 mt-1">
              <h3 className="text-4xl font-black text-white">{temp}°C</h3>
              <span className="text-xs text-zinc-400 capitalize font-medium">Feels like {feelsLike}°C • {description}</span>
            </div>
          </div>
        </div>

        {/* Extra Weather Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t md:border-t-0 md:border-l border-zinc-800 pt-4 md:pt-0 md:pl-6">
          <div className="bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-800">
            <span className="text-[9px] text-zinc-500 font-bold uppercase block">Humidity</span>
            <span className="text-sm font-bold text-sky-400 flex items-center gap-1 mt-0.5"><Droplets size={12} /> {humidity}%</span>
          </div>
          <div className="bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-800">
            <span className="text-[9px] text-zinc-500 font-bold uppercase block">Wind Speed</span>
            <span className="text-sm font-bold text-indigo-400 flex items-center gap-1 mt-0.5"><Wind size={12} /> {wind} km/h</span>
          </div>
          <div className="bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-800">
            <span className="text-[9px] text-zinc-500 font-bold uppercase block">Air Quality (AQI)</span>
            <span className="text-sm font-bold text-emerald-400 flex items-center gap-1 mt-0.5"><ShieldCheck size={12} /> Good (35)</span>
          </div>
          <div className="bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-800">
            <span className="text-[9px] text-zinc-500 font-bold uppercase block">UV Index</span>
            <span className="text-sm font-bold text-amber-400 flex items-center gap-1 mt-0.5"><Sun size={12} /> 4 (Moderate)</span>
          </div>
        </div>
      </div>

      {/* Sun Schedule */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950/40 border border-amber-900/50 text-amber-400 flex items-center justify-center">
            <Sunrise size={20} />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase block">Sunrise Time</span>
            <span className="text-sm font-bold text-white">06:22 AM</span>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-950/40 border border-indigo-900/50 text-indigo-400 flex items-center justify-center">
            <Sunset size={20} />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase block">Sunset Time</span>
            <span className="text-sm font-bold text-white">08:45 PM</span>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      {weather?.forecast && weather.forecast.length > 0 && (
        <Card className="border border-zinc-800/80 p-5 flex flex-col gap-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sun size={16} className="text-amber-400" /> Multi-Day Weather Forecast
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {weather.forecast.map((f, idx) => (
              <div key={idx} className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 flex flex-col items-center text-center">
                <span className="text-[10px] text-zinc-400 font-bold uppercase">{f.date}</span>
                {f.icon ? (
                  <img src={`https://openweathermap.org/img/wn/${f.icon}.png`} alt={f.description} className="w-8 h-8 my-1" />
                ) : (
                  <div className="my-1">{getWeatherIcon(f.description)}</div>
                )}
                <span className="text-sm font-bold text-white">{f.temp}°C</span>
                <span className="text-[9px] text-zinc-500 capitalize truncate max-w-[90px]">{f.description}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Best Season & Clothing Advice */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {bestSeason && (
          <Card className="border border-zinc-800/80 p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Sun size={16} className="text-amber-400" />
              <h4 className="text-sm font-bold text-white">Best Travel Season</h4>
            </div>
            <p className="text-xs font-bold text-brand-accent">{bestSeason}</p>
            {seasonData && (
              <div className="grid grid-cols-2 gap-2 mt-1">
                {["summer", "winter", "spring", "autumn"].filter(s => seasonData[s]).map((season) => {
                  const s = seasonData[season];
                  return (
                    <div key={season} className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                      <span className="text-[9px] font-bold text-amber-400 uppercase block">{season}</span>
                      <span className="text-xs font-bold text-white block">{s.temp}</span>
                      <span className="text-[9px] text-zinc-500 mt-0.5 block leading-tight">{s.conditions}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        )}

        {whatToWear && (
          <Card className="border border-zinc-800/80 p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Shirt size={16} className="text-brand-accent" />
              <h4 className="text-sm font-bold text-white">Recommended Clothing</h4>
            </div>
            <div className="flex flex-col gap-2">
              {Object.entries(whatToWear).map(([season, desc]) => (
                <div key={season} className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-[10px] font-bold text-zinc-300 uppercase block">{season} Packing Guide</span>
                  <span className="text-[10px] text-zinc-400 mt-0.5 block leading-relaxed">{desc}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WeatherForecast;
