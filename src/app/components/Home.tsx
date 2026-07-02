import React, { useState, useMemo } from 'react';
import { Search, X, Play, Pause, Anchor, Filter, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { LewesMuseumLogo } from './LewesMuseumLogo';
import { sailors } from '../data/sailors';

export function Home() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(true);
  
  // Filters state
  const [filters, setFilters] = useState({
    port: 'All Ports',
    rig: 'All Rigs',
    yearRange: [1750, 1800]
  });

  const activeVoyage = useMemo(() => {
    // Mocking an active voyage for the display card
    return {
      vessel: "The Fair American",
      captain: "Stephen Decatur Sr.",
      year: 1780,
      crew: sailors.filter(s => s.voyages.some(v => v.vessel === "The Fair American"))
    };
  }, []);

  const handleSearchNavigation = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.port !== 'All Ports') params.set('portEnded', filters.port);
    if (filters.rig !== 'All Rigs') params.set('rig', filters.rig);
    // Note: year filtering might need more complex logic in search, but we can pass it
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="flex h-full w-full bg-background text-foreground overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-[30%] min-w-[320px] max-w-sm border-r border-border bg-card flex flex-col z-10 relative shadow-lg">
        <div className="p-6 border-b border-border bg-secondary/10">
          <p className="font-[family:var(--font-body)] text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-bold">Interactive Archive</p>
          <h2 className="font-[family:var(--font-serif)] text-primary text-2xl mt-1 font-bold">Voyages & Routes</h2>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-8 custom-scrollbar">
          {/* Filters Form */}
          <form className="flex flex-col gap-6" onSubmit={handleSearchNavigation}>
            <div className="flex items-center gap-2 pb-2 border-b border-border/50">
              <Filter className="w-4 h-4 text-secondary" />
              <h3 className="font-[family:var(--font-body)] text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Filter Map View</h3>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-[family:var(--font-serif)] text-xs text-muted-foreground uppercase tracking-wider font-bold">Port of Arrival</label>
                <select 
                  value={filters.port}
                  onChange={(e) => setFilters(prev => ({ ...prev, port: e.target.value }))}
                  className="w-full p-2.5 bg-input-background border border-border rounded-sm font-[family:var(--font-body)] text-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer text-foreground appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%20fill%3D%22none%22%20stroke%3D%22%23465566%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_10px_center] bg-no-repeat"
                >
                  <option>All Ports</option>
                  <option>London</option>
                  <option>Liverpool</option>
                  <option>Barbados</option>
                  <option>Jamaica</option>
                  <option>Bordeaux</option>
                  <option>Kingston</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-[family:var(--font-serif)] text-xs text-muted-foreground uppercase tracking-wider font-bold">Vessel Rig</label>
                <select 
                  value={filters.rig}
                  onChange={(e) => setFilters(prev => ({ ...prev, rig: e.target.value }))}
                  className="w-full p-2.5 bg-input-background border border-border rounded-sm font-[family:var(--font-body)] text-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer text-foreground appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%20fill%3D%22none%22%20stroke%3D%22%23465566%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_10px_center] bg-no-repeat"
                >
                  <option>All Rigs</option>
                  <option>Ship</option>
                  <option>Brig</option>
                  <option>Schooner</option>
                  <option>Sloop</option>
                  <option>Privateer</option>
                </select>
              </div>
            </div>

            {/* Year Range Slider */}
            <div className="flex flex-col gap-4 mt-2 border-t border-border pt-6">
              <div className="flex justify-between items-baseline">
                <label className="font-[family:var(--font-serif)] text-xs text-muted-foreground uppercase tracking-wider font-bold">Era Select</label>
                <span className="text-primary font-[family:var(--font-serif)] text-sm font-bold italic">{filters.yearRange[0]} — {filters.yearRange[1]}</span>
              </div>
              <div className="py-4 px-2">
                <div className="relative h-1 bg-border rounded-full w-full">
                  <div className="absolute left-[20%] right-[30%] h-full bg-secondary rounded-full"></div>
                  <div className="absolute left-[20%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-card border-2 border-secondary rounded-full cursor-pointer hover:scale-110 transition-transform shadow-sm"></div>
                  <div className="absolute right-[30%] top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-card border-2 border-secondary rounded-full cursor-pointer hover:scale-110 transition-transform shadow-sm"></div>
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground font-[family:var(--font-body)] uppercase tracking-widest font-bold">
                <span>1700</span>
                <span>1850</span>
              </div>
            </div>

            <button 
              type="submit"
              className="mt-4 w-full py-3 bg-primary text-background font-[family:var(--font-serif)] text-sm rounded-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md group"
            >
              <Search className="w-4 h-4" /> 
              Search
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
          </form>

          {/* Museum Logo */}
          <div className="mt-auto pt-8 border-t border-border flex flex-col gap-4">
            <LewesMuseumLogo className="w-full max-w-[160px] h-auto transition-all" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative bg-[#f2edd5] flex flex-col border-l border-border overflow-hidden">
        {/* Massive Central Map Container */}
        <div className="flex-1 w-full h-full flex items-center justify-center relative bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center bg-no-repeat">
           <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] flex items-center justify-center p-8">
              <div className="border-4 border-double border-primary/20 p-12 max-w-2xl text-center bg-background/60 backdrop-blur-sm">
                <Anchor className="w-16 h-16 text-primary/20 mx-auto mb-6" />
                <h2 className="font-[family:var(--font-display)] text-primary text-3xl md:text-5xl leading-relaxed tracking-wider select-none">
                  DELAWARE MARITIME RECORDS
                </h2>
                <div className="h-px w-32 bg-secondary mx-auto my-6" />
                <p className="font-[family:var(--font-serif)] text-primary/60 italic text-xl">Interactive Chart & Voyage Tracker</p>
              </div>
           </div>

           {/* Floating Voyage Details Card */}
           {isDetailsVisible && (
             <div className="absolute top-8 right-8 w-96 bg-card border border-border shadow-2xl z-20 animate-in fade-in slide-in-from-right-8 duration-500 rounded-sm overflow-hidden flex flex-col max-h-[80vh]">
               <div className="p-5 border-b-2 border-primary bg-secondary/5 flex justify-between items-start">
                 <div>
                   <div className="flex items-center gap-2 mb-1">
                     <span className="px-1.5 py-0.5 bg-primary text-background text-[10px] font-bold uppercase tracking-widest rounded-sm">Active Voyage</span>
                   </div>
                   <h3 className="font-[family:var(--font-display)] text-2xl text-primary font-bold">{activeVoyage.vessel}</h3>
                   <p className="font-[family:var(--font-serif)] text-sm text-muted-foreground mt-1 italic">Capt. {activeVoyage.captain} • {activeVoyage.year}</p>
                 </div>
                 <button 
                   onClick={() => setIsDetailsVisible(false)}
                   className="p-1.5 hover:bg-muted rounded-full text-muted-foreground transition-colors hover:text-primary"
                   aria-label="Close details"
                 >
                   <X className="w-5 h-5" />
                 </button>
               </div>
               
               <div className="flex-1 overflow-y-auto custom-scrollbar">
                 <div className="p-4 bg-muted/30 border-b border-border">
                    <p className="font-[family:var(--font-body)] text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Crew Manifest</p>
                 </div>
                 <table className="w-full text-left border-collapse font-[family:var(--font-body)] text-sm">
                   <thead className="sticky top-0 bg-card z-10 border-b border-border shadow-sm">
                     <tr>
                       <th className="py-3 px-4 font-bold text-muted-foreground font-[family:var(--font-serif)] text-[10px] uppercase tracking-wider">Sailor</th>
                       <th className="py-3 px-4 font-bold text-muted-foreground font-[family:var(--font-serif)] text-[10px] uppercase tracking-wider text-right">Age/Status</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-border/30">
                     {activeVoyage.crew.map(sailor => (
                       <tr key={sailor.id} className="hover:bg-secondary/5 transition-colors group">
                         <td className="py-4 px-4">
                           <Link to={`/sailor/${sailor.id}`} className="flex flex-col">
                             <span className="font-bold text-primary group-hover:text-secondary transition-colors text-base">{sailor.name}</span>
                             <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{sailor.hometown}</span>
                           </Link>
                         </td>
                         <td className="py-4 px-4 text-right">
                           <div className="flex flex-col items-end gap-1.5">
                              <span className="text-xs text-foreground font-medium">{activeVoyage.year - parseInt(sailor.yearOfBirth)} yrs</span>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border
                                ${sailor.id === 'james-forten' ? 'bg-destructive/10 text-destructive border-destructive/20' : 'bg-primary/10 text-primary border-primary/20'}
                              `}>
                                {sailor.id === 'james-forten' ? 'Captured' : 'At Sea'}
                              </span>
                           </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
               <div className="p-4 bg-muted/20 border-t border-border">
                  <Link to="/search" className="flex items-center justify-center gap-2 py-2 text-primary font-[family:var(--font-serif)] text-sm font-bold hover:text-secondary transition-colors underline underline-offset-4 decoration-secondary/30">
                    View Entire Database <ChevronRight className="w-4 h-4" />
                  </Link>
               </div>
             </div>
           )}
        </div>

        {/* Bottom Timeline Control */}
        <div className="h-32 bg-card border-t-2 border-primary/20 flex items-center px-10 gap-10 z-20 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-px after:bg-secondary/50">
          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-14 w-14 rounded-full border-2 border-primary bg-background text-primary flex items-center justify-center hover:bg-primary hover:text-background active:scale-95 transition-all shadow-md shrink-0 relative overflow-hidden group"
              aria-label={isPlaying ? "Pause timeline" : "Play timeline"}
            >
              <div className="absolute inset-0 bg-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform" />
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current relative z-10" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-1 relative z-10" />
              )}
            </button>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{isPlaying ? 'Running' : 'Paused'}</span>
          </div>
          
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex justify-between items-end font-[family:var(--font-body)] text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
              <div className="flex flex-col items-start gap-1">
                <span className="text-border">Beginning</span>
                <span className="text-muted-foreground">1750</span>
              </div>
              <div className="flex flex-col items-center mb-1">
                <div className="px-3 py-1 bg-primary text-background text-xl font-bold font-[family:var(--font-display)] rounded-sm shadow-sm mb-2 relative">
                  1780
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-t-8 border-t-primary border-x-8 border-x-transparent" />
                </div>
                <div className="h-4 w-0.5 bg-secondary"></div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-border">End</span>
                <span className="text-muted-foreground">1800</span>
              </div>
            </div>
            <div className="relative h-2 w-full bg-border/40 rounded-full cursor-pointer overflow-visible group">
              <div className="absolute left-0 top-0 h-full w-[60%] bg-secondary rounded-full"></div>
              <div className="absolute left-[60%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-card border-4 border-primary rounded-full cursor-grab active:cursor-grabbing hover:scale-125 transition-all shadow-lg group-hover:border-secondary"></div>
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--brand-gold-light, #ead596);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--brand-gold, #cba62a);
        }
      `}} />
    </div>
  );
}
