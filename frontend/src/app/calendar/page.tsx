'use client';

import Layout from '@/components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Trophy, Zap, PlayCircle, Map, Layout as LayoutIcon, Activity, Flag } from 'lucide-react';
import React, { useState } from 'react';

const races = [
    {
        id: 1, name: 'Bahrain Grand Prix', location: 'Sakhir', date: 'March 02', winner: 'Max Verstappen', time: '1:28:34.123', status: 'Completed',
        trackPath: "M20,40 L40,20 L70,20 L90,40 L80,70 L40,80 L20,70 Z",
        desc: "The season opener under the floodlights. Rough asphalt and heavy braking zones."
    },
    {
        id: 2, name: 'Saudi Arabian GP', location: 'Jeddah', date: 'March 09', winner: 'Sergio Perez', time: '1:25:21.456', status: 'Completed',
        trackPath: "M30,10 L40,30 L35,60 L50,90 L65,60 L60,30 L70,10 Z",
        desc: "The fastest street circuit on the calendar. Narrow, high-speed, and unforgiving."
    },
    {
        id: 3, name: 'Australian Grand Prix', location: 'Melbourne', date: 'March 24', winner: 'Carlos Sainz', time: '1:20:11.789', status: 'Completed',
        trackPath: "M15,40 L40,20 L80,30 L85,70 L60,85 L20,75 Z",
        desc: "Albert Park's semi-street layout. Fast, flowing, and a favorite for the fans."
    },
    {
        id: 4, name: 'Japanese Grand Prix', location: 'Suzuka', date: 'April 07', winner: 'Max Verstappen', time: '1:26:00.001', status: 'Completed',
        trackPath: "M10,50 C20,20 50,20 60,50 S90,80 100,50",
        desc: "The only figure-of-eight track. A true test of driver skill and aero efficiency."
    },
    {
        id: 5, name: 'Miami Grand Prix', location: 'Miami', date: 'May 05', status: 'Live', currentLeader: 'Lando Norris', lap: '42/57',
        trackPath: "M10,30 L90,30 L90,70 L50,85 L10,70 Z",
        desc: "Street racing around the Hard Rock Stadium. High humidity and high energy."
    },
    {
        id: 6, name: 'Emilia Romagna GP', location: 'Imola', date: 'May 19', status: 'Upcoming',
        trackPath: "M20,20 L80,20 L80,50 L50,50 L50,80 L20,80 Z",
        desc: "The historic home of the Tifosi. Narrow technical sections and legendary history."
    },
    {
        id: 7, name: 'Monaco Grand Prix', location: 'Monte Carlo', date: 'May 26', status: 'Upcoming',
        trackPath: "M20,50 C20,10 80,10 80,50 S20,90 20,50",
        desc: "The jewel in the crown. Zero margin for error on the tightest streets of F1."
    },
    {
        id: 8, name: 'Canadian Grand Prix', location: 'Montreal', date: 'June 09', status: 'Upcoming',
        trackPath: "M15,40 L85,20 L75,80 L25,70 Z",
        desc: "The Circuit Gilles Villeneuve. Fast chicanes and the infamous Wall of Champions."
    },
    {
        id: 9, name: 'Spanish Grand Prix', location: 'Barcelona', date: 'June 23', status: 'Upcoming',
        trackPath: "M10,20 L90,20 L85,60 L90,85 L10,85 Z",
        desc: "The ultimate test of aerodynamic balance. Well known to every driver on the grid."
    },
    {
        id: 10, name: 'Austrian Grand Prix', location: 'Spielberg', date: 'June 30', status: 'Upcoming',
        trackPath: "M20,30 L80,50 L60,85 L25,75 Z",
        desc: "Short, sharp, and spectacular. Three long straights followed by heavy braking."
    },
    {
        id: 11, name: 'British Grand Prix', location: 'Silverstone', date: 'July 07', status: 'Upcoming',
        trackPath: "M10,40 L30,20 L80,20 L90,60 L60,90 L20,70 Z",
        desc: "High-speed corners and unpredictable weather. A classic drivers' favorite."
    },
    {
        id: 12, name: 'Hungarian Grand Prix', location: 'Budapest', date: 'July 21', status: 'Upcoming',
        trackPath: "M20,20 L80,20 L80,80 L20,80 Z",
        desc: "Monaco without the walls. Tight, twisty, and physically demanding in the heat."
    },
    {
        id: 13, name: 'Belgian Grand Prix', location: 'Spa', date: 'July 28', status: 'Upcoming',
        trackPath: "M10,40 L40,10 L90,30 L80,80 L30,90 Z",
        desc: "The longest track. Legendary corners like Eau Rouge and Raidillon."
    },
    {
        id: 14, name: 'Dutch Grand Prix', location: 'Zandvoort', date: 'Aug 25', status: 'Upcoming',
        trackPath: "M15,30 L40,15 L85,30 L80,75 L20,80 Z",
        desc: "Steep banking and narrow asphalt. A roller-coaster ride by the North Sea."
    },
    {
        id: 15, name: 'Italian Grand Prix', location: 'Monza', date: 'Sep 01', status: 'Upcoming',
        trackPath: "M10,30 L90,30 L90,70 L10,70 Z",
        desc: "The Temple of Speed. Top speeds and low downforce under the Italian sun."
    },
    {
        id: 16, name: 'Azerbaijan Grand Prix', location: 'Baku', date: 'Sep 15', status: 'Upcoming',
        trackPath: "M5,10 L95,10 L95,90 L5,90 Z",
        desc: "The City of Winds. A 2km straight meets an incredibly tight old castle section."
    },
    {
        id: 17, name: 'Singapore Grand Prix', location: 'Marina Bay', date: 'Sep 22', status: 'Upcoming',
        trackPath: "M10,20 L80,20 L80,40 L40,40 L40,70 L20,70 Z",
        desc: "Night racing at its most intense. High humidity and 23 corners."
    },
    {
        id: 18, name: 'United States GP', location: 'Austin', date: 'Oct 20', status: 'Upcoming',
        trackPath: "M20,80 L30,20 L80,40 L70,85 Z",
        desc: "The Circuit of the Americas. Huge elevation change into Turn 1."
    },
    {
        id: 19, name: 'Mexico City GP', location: 'Mexico City', date: 'Oct 27', status: 'Upcoming',
        trackPath: "M20,10 L80,10 L80,90 L20,90 Z",
        desc: "Racing at altitude. Thin air means less downforce and cooling challenges."
    },
    {
        id: 20, name: 'Sao Paulo Grand Prix', location: 'Interlagos', date: 'Nov 03', status: 'Upcoming',
        trackPath: "M15,50 C15,10 85,10 85,50 S15,90 15,50",
        desc: "Short but punchy. Counter-clockwise layout with an electric Brazilian atmosphere."
    },
    {
        id: 21, name: 'Las Vegas Grand Prix', location: 'Las Vegas', date: 'Nov 23', status: 'Upcoming',
        trackPath: "M10,40 L90,40 L90,60 L10,60 Z",
        desc: "Flying down the Strip. Cold night temperatures and massive top speeds."
    },
    {
        id: 22, name: 'Qatar Grand Prix', location: 'Lusail', date: 'Dec 01', status: 'Upcoming',
        trackPath: "M20,20 L80,20 L70,80 L30,80 Z",
        desc: "High-speed desert flowing track. Physically punishing for the drivers."
    },
    {
        id: 23, name: 'Abu Dhabi Grand Prix', location: 'Yas Marina', date: 'Dec 08', status: 'Upcoming',
        trackPath: "M15,15 L85,15 L85,85 L15,85 Z",
        desc: "The season finale. Twilight racing with a hotel passing over the circuit."
    }
];

export default function CalendarPage() {
    const [liveMode, setLiveMode] = useState(false);

    return (
        <Layout>
            <header className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-2xl bg-red-600/10 border border-red-600/20 text-red-500">
                            <Calendar size={32} strokeWidth={2.5} />
                        </div>
                        <h1 className="text-4xl font-black italic tracking-tighter uppercase">Race Calendar</h1>
                    </div>
                    <p className="text-white/60 text-lg">Tracks, Times, and Territories.</p>
                </div>

                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
                    <button
                        onClick={() => setLiveMode(false)}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${!liveMode ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}
                    >
                        Calendar
                    </button>
                    <button
                        onClick={() => setLiveMode(true)}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${liveMode ? 'bg-red-600 text-white' : 'text-red-500/40 hover:text-red-500/60'}`}
                    >
                        <div className={`w-2 h-2 rounded-full ${liveMode ? 'bg-white animate-pulse' : 'bg-red-500/40'}`} />
                        Live Tracker
                    </button>
                </div>
            </header>

            <AnimatePresence mode="wait">
                {!liveMode ? (
                    <motion.div
                        key="calendar"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6 pb-24"
                    >
                        {races.map((race, i) => (
                            <motion.div
                                key={race.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => race.status === 'Live' && setLiveMode(true)}
                                className={`group p-8 rounded-[2.5rem] border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-8 cursor-pointer ${race.status === 'Live' ? 'bg-red-600/5 border-red-600/20 shadow-[0_0_50px_rgba(220,38,38,0.05)]' : 'bg-[#141414] border-white/5 hover:border-white/10'
                                    }`}
                            >
                                <div className="flex items-center gap-8">
                                    <div className="text-center w-24 shrink-0">
                                        <div className="text-xs font-bold text-white/20 uppercase tracking-[0.3em] mb-1">{race.date.split(' ')[0]}</div>
                                        <div className="text-3xl font-black italic text-white group-hover:text-red-600 transition-colors uppercase">{race.date.split(' ')[1]}</div>
                                    </div>

                                    <div className="h-16 w-[1px] bg-white/5 lg:block hidden" />

                                    {/* Circuit Visualization */}
                                    <div className="relative w-24 h-24 rounded-3xl bg-black/40 border border-white/5 flex items-center justify-center p-4 group-hover:bg-red-600/10 group-hover:border-red-600/20 transition-all shrink-0">
                                        <svg viewBox="0 0 100 100" className="w-full h-full stroke-white/20 fill-none stroke-[3] group-hover:stroke-red-600/60 transition-colors">
                                            <path d={race.trackPath} />
                                        </svg>
                                        <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent) opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-2xl font-black italic tracking-tighter uppercase group-hover:text-red-500 transition-colors">{race.name}</h3>
                                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${race.status === 'Live' ? 'bg-red-600 text-white animate-pulse' : 'bg-white/5 text-white/40'
                                                }`}>
                                                {race.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
                                            <Map size={12} className="text-red-600" />
                                            {race.location}
                                        </div>
                                        <p className="mt-3 text-[11px] text-white/20 font-medium leading-relaxed max-w-sm group-hover:text-white/40 transition-colors italic">
                                            "{race.desc}"
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between lg:justify-end gap-12 border-t lg:border-0 border-white/5 pt-6 lg:pt-0">
                                    {race.status === 'Completed' && (
                                        <div className="text-right">
                                            <div className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Race Winner</div>
                                            <div className="text-lg font-black italic text-white/80">{race.winner}</div>
                                            <div className="text-xs font-bold text-white/20">{race.time}</div>
                                        </div>
                                    )}
                                    {race.status === 'Live' && (
                                        <div className="flex items-center gap-8">
                                            <div className="text-right">
                                                <div className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Live P1</div>
                                                <div className="text-lg font-black italic text-white leading-none">{race.currentLeader}</div>
                                            </div>
                                            <div className="px-6 py-3 rounded-2xl bg-red-600 text-white text-xs font-black uppercase tracking-widest animate-pulse shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                                                LAP {race.lap}
                                            </div>
                                        </div>
                                    )}
                                    {race.status === 'Upcoming' && (
                                        <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/20 text-xs font-black uppercase tracking-widest">
                                            Paddock Closed
                                        </div>
                                    )}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); alert('AI Action Replay initializing for 2026 data stream...'); }}
                                        className="w-14 h-14 rounded-[1.25rem] bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-white group-hover:bg-red-600 group-hover:border-red-600 group-hover:scale-110 transition-all shadow-2xl"
                                    >
                                        <PlayCircle size={28} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-32">
                        {/* Existing Live Tracker Logic - Preserved */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* ... Content here remains same for now ... */}
                            <div className="aspect-[16/9] rounded-[3rem] bg-[#141414] border border-white/5 relative overflow-hidden flex items-center justify-center p-12">
                                <div className="absolute top-8 left-8 flex items-center gap-3">
                                    <Map size={16} className="text-red-600" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-white/40">Miami International Autodrome // SECTOR 2</span>
                                </div>
                                <div className="w-full h-full relative">
                                    <svg viewBox="0 0 800 400" className="w-full h-full stroke-white/5 fill-none stroke-[20] stroke-round">
                                        <path d="M100,200 C150,50 350,50 400,200 S650,350 700,200" />
                                    </svg>
                                    {[
                                        { id: 'VER', t: 0, color: '#3671C6' },
                                        { id: 'NOR', t: 0.1, color: '#FF8700' },
                                    ].map((d) => (
                                        <motion.div
                                            key={d.id}
                                            animate={{ offsetDistance: ['0%', '100%'] }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: d.t * 10 }}
                                            className="absolute top-0 left-0"
                                            style={{ offsetPath: 'path("M100,200 C150,50 350,50 400,200 S650,350 700,200")' }}
                                        >
                                            <div className="w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: d.color }} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </Layout>
    );
}
