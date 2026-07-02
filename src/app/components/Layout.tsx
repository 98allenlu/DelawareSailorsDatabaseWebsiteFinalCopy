import { Outlet, Link } from 'react-router';
import { Search } from 'lucide-react';
import { useEffect } from 'react';

export function Layout() {
  useEffect(() => {
    if (!document.querySelector('link[href*="lxb1pko"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://use.typekit.net/lxb1pko.css';
      document.head.appendChild(link);
    }
  }, []);
  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="border-b border-border bg-card z-50 p-4 px-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-secondary/30">
        <div className="flex items-center gap-8">
           <div className="flex flex-col gap-0.5">
             <Link to="/" className="text-primary text-2xl md:text-3xl hover:text-secondary transition-colors tracking-wide" style={{ fontFamily: '"chapman", sans-serif', fontWeight: 700, fontStyle: 'normal' }}>
               Delaware Sailors
             </Link>
             <span className="font-[family:var(--font-serif)] text-muted-foreground text-xs tracking-widest italic">1790–1830</span>
           </div>
           <nav className="hidden md:flex items-center gap-6 border-l border-border pl-6">
             <Link to="/" className="font-[family:var(--font-serif)] text-foreground hover:text-primary transition-colors text-base uppercase tracking-widest border-b border-transparent hover:border-primary pb-0.5">
               Home Page
             </Link>
           </nav>
        </div>
        
        <div className="flex flex-col items-end w-full md:w-auto mt-2 md:mt-0">
          <div className="relative w-full md:w-80 mb-2">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search database..." 
              className="w-full pl-10 pr-4 py-2 bg-input-background border border-border font-[family:var(--font-body)] text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all rounded-sm placeholder:text-muted-foreground/70 text-foreground"
            />
          </div>
          <Link to="/search" className="font-[family:var(--font-body)] text-xs text-primary hover:text-secondary tracking-widest uppercase font-medium bg-secondary/10 px-3 py-1 rounded-sm border border-secondary/20 hover:bg-secondary/20 transition-colors">Advanced Search</Link>
        </div>
      </header>
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex relative">
        <Outlet />
      </div>
    </div>
  );
}