import React, { useState, useMemo, useEffect } from 'react';
import { Search, ArrowRight, Filter, X, Anchor, User, Calendar, MapPin, ChevronLeft } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router';
import { sailors, type Sailor } from '../data/sailors';

export function AdvancedSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Local state for form inputs
  const [form, setForm] = useState({
    name: searchParams.get('name') || '',
    yob: searchParams.get('yob') || '',
    complexion: searchParams.get('complexion') || '',
    vessel: searchParams.get('vessel') || '',
    rig: searchParams.get('rig') || '',
    portBegan: searchParams.get('portBegan') || '',
    portEnded: searchParams.get('portEnded') || '',
  });

  // Sync local state when searchParams changes
  useEffect(() => {
    setForm({
      name: searchParams.get('name') || '',
      yob: searchParams.get('yob') || '',
      complexion: searchParams.get('complexion') || '',
      vessel: searchParams.get('vessel') || '',
      rig: searchParams.get('rig') || '',
      portBegan: searchParams.get('portBegan') || '',
      portEnded: searchParams.get('portEnded') || '',
    });
  }, [searchParams]);

  // Derived results
  const results = useMemo(() => {
    const nameParam = searchParams.get('name');
    const yobParam = searchParams.get('yob');
    const complexionParam = searchParams.get('complexion');
    const vesselParam = searchParams.get('vessel');
    const rigParam = searchParams.get('rig');
    const portBeganParam = searchParams.get('portBegan');
    const portEndedParam = searchParams.get('portEnded');

    const hasParams = nameParam || yobParam || complexionParam || vesselParam || rigParam || portBeganParam || portEndedParam;
    
    if (!hasParams) {
      return null;
    }

    return sailors.filter(s => {
      if (nameParam && !s.name.toLowerCase().includes(nameParam.toLowerCase())) return false;
      if (yobParam && s.yearOfBirth !== yobParam) return false;
      if (complexionParam && complexionParam !== 'Any' && s.description.complexion.toLowerCase() !== complexionParam.toLowerCase()) return false;

      if (vesselParam || rigParam || portBeganParam || portEndedParam) {
        const hasMatchingVoyage = s.voyages.some(v => {
          if (vesselParam && !v.vessel.toLowerCase().includes(vesselParam.toLowerCase())) return false;
          if (rigParam && rigParam !== 'Any Rig' && v.rig.toLowerCase() !== rigParam.toLowerCase()) return false;
          if (portBeganParam && !v.portBegan.toLowerCase().includes(portBeganParam.toLowerCase())) return false;
          if (portEndedParam && !v.portEnded.toLowerCase().includes(portEndedParam.toLowerCase())) return false;
          return true;
        });
        if (!hasMatchingVoyage) return false;
      }

      return true;
    });
  }, [searchParams]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(form).forEach(([key, value]) => {
      if (value && value !== 'Any' && value !== 'Any Rig') params.set(key, value);
    });
    setSearchParams(params);
    setIsSidebarOpen(false);
  };

  const clearFilters = () => {
    const emptyForm = {
      name: '',
      yob: '',
      complexion: '',
      vessel: '',
      rig: '',
      portBegan: '',
      portEnded: '',
    };
    setForm(emptyForm);
    setSearchParams({});
  };

  const updateField = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Filters */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-80 bg-card border-r-2 border-primary/20 transition-transform duration-300 lg:relative lg:translate-x-0 shadow-2xl lg:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col h-full
      `}>
        <div className="p-6 border-b border-border flex items-center justify-between bg-secondary/10">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Registry</span>
            <h2 className="font-[family:var(--font-display)] text-xl text-primary flex items-center gap-2 font-bold">
              <Filter className="w-5 h-5 text-secondary" /> Filter Records
            </h2>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-muted-foreground hover:text-primary transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form className="flex-1 overflow-y-auto p-6 flex flex-col gap-8 custom-scrollbar" onSubmit={handleSearch}>
          {/* Section: Mariner */}
          <section className="flex flex-col gap-5">
            <div className="flex items-center gap-2 pb-2 border-b border-secondary/30">
              <User className="w-4 h-4 text-primary" />
              <h3 className="font-[family:var(--font-body)] text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Mariner Personal Details</h3>
            </div>
            
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold font-[family:var(--font-serif)]">Full Name / Surname</label>
                <input 
                  type="text" 
                  value={form.name} 
                  onChange={e => updateField('name', e.target.value)} 
                  className="w-full p-2.5 bg-input-background border border-border rounded-sm font-[family:var(--font-body)] text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground/40" 
                  placeholder="e.g. Peter Johnson" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold font-[family:var(--font-serif)]">Birth Year</label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground/50" />
                    <input 
                      type="number" 
                      value={form.yob} 
                      onChange={e => updateField('yob', e.target.value)} 
                      className="w-full pl-9 p-2.5 bg-input-background border border-border rounded-sm font-[family:var(--font-body)] text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground" 
                      placeholder="1788" 
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold font-[family:var(--font-serif)]">Complexion</label>
                  <select 
                    value={form.complexion} 
                    onChange={e => updateField('complexion', e.target.value)} 
                    className="w-full p-2.5 bg-input-background border border-border rounded-sm font-[family:var(--font-body)] text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%20fill%3D%22none%22%20stroke%3D%22%23465566%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_10px_center] bg-no-repeat"
                  >
                    <option>Any</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="mulatto">Mulatto</option>
                    <option value="ruddy">Ruddy</option>
                    <option value="native">Native</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Voyage */}
          <section className="flex flex-col gap-5">
            <div className="flex items-center gap-2 pb-2 border-b border-secondary/30">
              <Anchor className="w-4 h-4 text-primary" />
              <h3 className="font-[family:var(--font-body)] text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Vessel & Voyage Specs</h3>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold font-[family:var(--font-serif)]">Vessel Name</label>
                <input 
                  type="text" 
                  value={form.vessel} 
                  onChange={e => updateField('vessel', e.target.value)} 
                  className="w-full p-2.5 bg-input-background border border-border rounded-sm font-[family:var(--font-body)] text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground/40" 
                  placeholder="e.g. Ship Jane" 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold font-[family:var(--font-serif)]">Rig Type</label>
                <select 
                  value={form.rig} 
                  onChange={e => updateField('rig', e.target.value)} 
                  className="w-full p-2.5 bg-input-background border border-border rounded-sm font-[family:var(--font-body)] text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%20fill%3D%22none%22%20stroke%3D%22%23465566%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_10px_center] bg-no-repeat"
                >
                  <option>Any Rig</option>
                  <option value="ship">Ship</option>
                  <option value="brig">Brig</option>
                  <option value="schooner">Schooner</option>
                  <option value="sloop">Sloop</option>
                  <option value="privateer">Privateer</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold font-[family:var(--font-serif)]">Arrival Port</label>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground/50" />
                  <input 
                    type="text" 
                    value={form.portEnded} 
                    onChange={e => updateField('portEnded', e.target.value)} 
                    className="w-full pl-9 p-2.5 bg-input-background border border-border rounded-sm font-[family:var(--font-body)] text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground/40" 
                    placeholder="e.g. Liverpool" 
                  />
                </div>
              </div>
            </div>
          </section>
        </form>

        <div className="p-6 border-t-2 border-primary/10 bg-muted/10 flex flex-col gap-3">
          <button 
            onClick={() => handleSearch()} 
            className="w-full py-3.5 bg-primary text-background font-[family:var(--font-serif)] text-base rounded-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md font-bold active:scale-[0.98]"
          >
            <Search className="w-4 h-4" /> Apply Filters
          </button>
          <button 
            onClick={clearFilters} 
            className="w-full py-2 text-primary font-[family:var(--font-body)] text-[10px] uppercase tracking-[0.2em] hover:text-secondary transition-all font-bold"
          >
            Reset All Parameters
          </button>
        </div>
      </aside>

      {/* Main Results Area */}
      <main className="flex-1 h-full overflow-y-auto custom-scrollbar flex flex-col relative">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[#f9f6e7] opacity-50 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b border-border bg-card flex items-center justify-between sticky top-0 z-50 shadow-sm">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 text-primary font-[family:var(--font-body)] text-[10px] uppercase tracking-[0.2em] font-bold py-2 px-3 bg-secondary/10 rounded-sm border border-secondary/20"
          >
            <Filter className="w-3.5 h-3.5" /> Adjust Search
          </button>
          <span className="font-[family:var(--font-serif)] text-muted-foreground italic text-xs">
            {results ? `${results.length} results found` : 'Awaiting search...'}
          </span>
        </div>

        <div className="p-8 md:p-16 max-w-5xl mx-auto w-full relative z-10">
          {/* Breadcrumb-ish */}
          <div className="mb-8 flex items-center gap-2">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest font-[family:var(--font-body)]">
               <ChevronLeft className="w-3.5 h-3.5" /> Return to Map
            </Link>
          </div>

          {/* Page Header */}
          <div className="mb-12 relative">
            <h1 className="font-[family:var(--font-display)] text-primary text-5xl md:text-7xl mb-4 tracking-tight font-bold" style={{ lineHeight: 1 }}>
              Mariner Registry
            </h1>
            <div className="h-1 w-32 bg-secondary mb-6" />
            <p className="font-[family:var(--font-serif)] text-muted-foreground text-xl italic max-w-2xl leading-relaxed">
              Sifting through the archival records of sailors, privateers, and merchant mariners who traversed the Atlantic from Delaware ports.
            </p>
          </div>

          {/* Results List */}
          <div className="flex flex-col gap-8">
            {results === null ? (
              <div className="bg-card border-2 border-border border-dashed p-24 text-center flex flex-col items-center gap-6 shadow-inner">
                <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center">
                  <Search className="w-10 h-10 text-primary/20" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-[family:var(--font-serif)] text-primary text-2xl italic">No Search Parameters Provided</p>
                  <p className="font-[family:var(--font-body)] text-sm text-muted-foreground max-w-xs mx-auto">
                    Please use the control panel on the left to begin searching the maritime database.
                  </p>
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="bg-card border-2 border-destructive/20 p-24 text-center shadow-xl flex flex-col items-center gap-4">
                <p className="font-[family:var(--font-serif)] text-destructive text-2xl italic mb-2">The records yield no matches.</p>
                <p className="font-[family:var(--font-body)] text-muted-foreground text-sm max-w-md mb-4">
                  Consider broadening your search parameters. Historical records often feature variations in spelling or incomplete data.
                </p>
                <button 
                  onClick={clearFilters}
                  className="px-6 py-2 bg-secondary/10 text-primary hover:bg-secondary/20 border border-secondary/30 font-[family:var(--font-body)] text-[10px] uppercase tracking-[0.2em] font-bold transition-all"
                >
                  Clear all search filters
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center border-b border-border pb-4">
                  <span className="font-[family:var(--font-body)] text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">
                    Authenticated Records: {results.length}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {results.map(sailor => (
                    <Link
                      key={sailor.id}
                      to={`/sailor/${sailor.id}`}
                      className="group bg-card border border-border hover:border-primary transition-all p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-sm hover:shadow-xl relative overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 w-1 h-full bg-secondary scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                      
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                          <span className="font-[family:var(--font-body)] text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-1">Registered Mariner</span>
                          <div className="flex items-baseline gap-4">
                            <span className="font-[family:var(--font-display)] text-primary text-3xl group-hover:text-secondary transition-colors font-bold">
                              {sailor.name}
                            </span>
                            <span className="font-[family:var(--font-serif)] text-muted-foreground italic text-base">
                              b. {sailor.yearOfBirth}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-[family:var(--font-body)] text-xs text-muted-foreground uppercase tracking-widest font-bold">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-secondary" />
                            {sailor.description.complexion} Complexion
                          </span>
                          <span className="flex items-center gap-2 italic normal-case tracking-normal font-normal text-sm font-[family:var(--font-serif)]">
                            {sailor.description.height} Tall
                          </span>
                          <span className="flex items-center gap-2">
                             {sailor.hometown}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 border-t md:border-t-0 pt-6 md:pt-0 border-border/50">
                        <div className="flex flex-col items-center">
                          <span className="font-[family:var(--font-serif)] text-3xl text-primary font-bold">
                            {sailor.voyages.length}
                          </span>
                          <span className="font-[family:var(--font-body)] text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
                            Voyages
                          </span>
                        </div>
                        <div className="h-16 w-px bg-border hidden md:block" />
                        <div className="flex items-center gap-3 font-[family:var(--font-body)] text-[10px] text-primary uppercase tracking-[0.2em] font-bold group-hover:gap-5 transition-all">
                          View Profile <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Footer info */}
          <div className="mt-24 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="flex flex-col gap-2">
               <p className="font-[family:var(--font-serif)] text-muted-foreground text-sm italic">Documentation provided by maritime customs house records.</p>
               <p className="font-[family:var(--font-body)] text-[10px] text-muted-foreground uppercase tracking-widest font-bold">© 2026 Delaware Maritime Archives</p>
            </div>
            <Link to="/" className="p-4 border-2 border-primary/10 hover:border-primary/40 transition-all rounded-sm group">
               <span className="font-[family:var(--font-serif)] text-primary font-bold group-hover:text-secondary transition-colors">Return to Visual Map Chart</span>
            </Link>
          </div>
        </div>
      </main>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--brand-gold-light, #ead596);
          border-radius: 4px;
          border: 2px solid #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--brand-gold, #cba62a);
        }
      `}} />
    </div>
  );
}

