import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup } from "react-leaflet";
import { useNavigate } from "react-router";
import { Play, Pause } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Import your newly generated data from Colab
import voyagesData from "../data/voyages_data.json";

export function Home() {
  const navigate = useNavigate();

  // 1. Establish the Timeline Boundaries safely
  const validVoyages = useMemo(() => {
    return voyagesData.filter(v => v.coordinates && v.coordinates.length > 0 && v.startTimestamp && v.endTimestamp);
  }, []);

  const minTime = useMemo(() => Math.min(...validVoyages.map((v) => v.startTimestamp)), [validVoyages]);
  const maxTime = useMemo(() => Math.max(...validVoyages.map((v) => v.endTimestamp)), [validVoyages]);

  const [currentTime, setCurrentTime] = useState(minTime);
  const [isPlaying, setIsPlaying] = useState(false);

  // 2. The Animation Engine
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + (86400000 * 7); // Advance 1 Week per frame
          return next > maxTime ? minTime : next; // Loop back to start
        });
      }, 100); // 10 frames per second
    }
    return () => clearInterval(interval);
  }, [isPlaying, maxTime, minTime]);

  // 3. Filter ships that are actively on the water right now
  const activeVoyages = useMemo(() => {
     return validVoyages.filter((v) => currentTime >= v.startTimestamp && currentTime <= v.endTimestamp);
  }, [currentTime, validVoyages]);

  return (
    <div className="w-full h-full relative flex flex-col">
      
      {/* NATIVE LEAFLET MAP */}
      <MapContainer 
        center={[30, -50]} 
        zoom={3} 
        style={{ width: '100%', height: '100%', zIndex: 0, backgroundColor: '#0f172a' }}
        zoomControl={false}
      >
        {/* Dark Mode Maritime Basemap */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
        />

        {activeVoyages.map((voyage) => {
          // MATH: Calculate EXACT position on the line based on the current timeline date
          const progress = (currentTime - voyage.startTimestamp) / (voyage.endTimestamp - voyage.startTimestamp);
          const coordIndex = Math.max(0, Math.min(voyage.coordinates.length - 1, Math.floor(progress * voyage.coordinates.length)));
          
          const currentCoord = voyage.coordinates[coordIndex];
          if (!currentCoord) return null;
          
          const position: [number, number] = [currentCoord[1], currentCoord[0]]; // Leaflet uses [Lat, Lng]

          return (
            <React.Fragment key={voyage.voyageId}>
              {/* Faint Historical Route Trail */}
              <Polyline 
                positions={voyage.coordinates.map((c: any) => [c[1], c[0]])} 
                color={voyage.color} 
                weight={1.5} 
                opacity={0.3} 
              />
              
              {/* Moving Ship Dot */}
              <CircleMarker
                center={position}
                pathOptions={{ color: voyage.color, fillColor: voyage.color, fillOpacity: 1 }}
                radius={6}
              >
                {/* Clickable Popup */}
                <Popup className="custom-popup">
                  <div className="font-sans min-w-[200px]">
                    <h4 className="text-lg font-bold" style={{ color: voyage.color, margin: "0 0 5px 0" }}>
                      {voyage.shipName}
                    </h4>
                    <p className="text-xs text-slate-600 m-0"><b>Rig:</b> {voyage.rig}</p>
                    <p className="text-xs text-slate-600 m-0"><b>Captain:</b> {voyage.captain}</p>
                    <p className="text-xs text-slate-600 m-0"><b>Route:</b> {voyage.route}</p>
                    <p className="text-xs text-slate-600 mb-2">
                      <b>Year:</b> {new Date(voyage.startTimestamp).getFullYear()}
                    </p>
                    
                    <hr className="my-2 border-slate-200" />
                    
                    <p className="text-xs font-bold text-slate-800 mb-1">Delaware Crew:</p>
                    <ul className="pl-4 m-0 text-xs">
                      {voyage.crew.map((crewMember: string, i: number) => (
                        <li key={i} className="mb-1">
                          <button 
                            onClick={() => navigate(`/sailor/${encodeURIComponent(crewMember)}`)}
                            style={{ color: '#cba62a', fontWeight: 'bold', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline' }}
                          >
                            {crewMember}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Popup>
              </CircleMarker>
            </React.Fragment>
          );
        })}
      </MapContainer>

      {/* FIGMA-STYLED TIMELINE CONTROLLER */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl bg-card p-6 rounded-2xl shadow-xl border border-border z-[1000] flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-[#162046] transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            {isPlaying ? "Pause Timeline" : "Play Timeline"}
          </button>
          
          <div className="text-right">
            <span className="block text-3xl font-serif text-primary">
              {new Date(currentTime).getFullYear()}
            </span>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">
              {new Date(currentTime).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        <input
          type="range"
          min={minTime}
          max={maxTime}
          value={currentTime}
          onChange={(e) => {
            setIsPlaying(false);
            setCurrentTime(Number(e.target.value));
          }}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-secondary"
        />
      </div>
    </div>
  );
}