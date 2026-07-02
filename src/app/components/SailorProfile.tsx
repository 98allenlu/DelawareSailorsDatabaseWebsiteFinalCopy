import React from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, Anchor, MapPin } from 'lucide-react';
import { sailors } from '../data/sailors';

export function SailorProfile() {
  const { id } = useParams();

  const sailor = sailors.find(s => s.id === id) ?? sailors[0];

  return (
    <div className="flex-1 w-full h-full overflow-y-auto bg-background p-8 md:p-12 relative">
      <div className="max-w-4xl mx-auto">
        <Link to="/search" className="inline-flex items-center gap-2 text-primary hover:text-secondary font-[family:var(--font-body)] text-xs uppercase tracking-widest mb-8 transition-colors font-bold">
          <ArrowLeft className="w-4 h-4" /> Back to Search
        </Link>
        
        <div className="bg-card border border-border p-8 md:p-12 shadow-sm relative before:content-[''] before:absolute before:inset-1.5 before:border before:border-border/50 before:pointer-events-none">
          
          <div className="text-center mb-10 pb-8 border-b border-border/60">
            <h1 className="font-[family:var(--font-display)] font-bold text-primary text-5xl md:text-6xl mb-4 tracking-wide">
              {sailor.name}
            </h1>
            <p className="font-[family:var(--font-serif)] text-muted-foreground text-xl italic flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              Hometown: {sailor.hometown}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-[family:var(--font-body)]">
            
            {/* General Info & Description */}
            <div className="flex flex-col gap-6">
              <div className="bg-secondary/5 p-6 border border-border">
                <div className="grid grid-cols-[120px_1fr] gap-4 mb-4">
                  <span className="text-muted-foreground uppercase tracking-wider text-xs font-bold mt-1">Year of Birth:</span>
                  <span className="text-foreground font-medium text-lg font-[family:var(--font-serif)]">{sailor.yearOfBirth}</span>
                </div>
                
                <div className="pt-4 border-t border-border/50">
                  <h3 className="text-primary font-bold font-[family:var(--font-serif)] text-xl mb-4">Description</h3>
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="grid grid-cols-[120px_1fr] gap-2 items-baseline">
                      <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-bold">Complexion:</span>
                      <span className="text-foreground font-medium">{sailor.description.complexion}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2 items-baseline">
                      <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-bold">Height:</span>
                      <span className="text-foreground font-medium">{sailor.description.height}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2 items-baseline">
                      <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-bold">Hair Color:</span>
                      <span className="text-foreground font-medium">{sailor.description.hairColor}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2 items-baseline">
                      <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-bold">Markings:</span>
                      <span className="text-foreground italic">{sailor.description.markings}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Voyages */}
            <div>
              <h3 className="font-[family:var(--font-serif)] text-2xl text-foreground mb-6 font-bold flex items-center gap-3 pb-2 border-b border-border">
                <Anchor className="w-5 h-5 text-primary" />
                Voyages served on
              </h3>
              
              <ul className="flex flex-col gap-4">
                {sailor.voyages.map(voyage => (
                  <li key={voyage.id} className="group relative bg-background border border-border p-4 hover:border-primary hover:bg-secondary/5 transition-colors">
                    <Link to={`/?voyage=${voyage.id}`} className="block">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-[family:var(--font-serif)] font-bold text-lg text-primary group-hover:text-secondary transition-colors">
                          {voyage.vessel}
                        </span>
                        <span className="font-[family:var(--font-body)] font-medium text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-sm text-xs border border-border">
                          {voyage.date}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center text-[10px] text-primary font-bold tracking-widest uppercase group-hover:underline underline-offset-4">
                        View Route on Map <ArrowLeft className="w-3 h-3 ml-1 rotate-180" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}