'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Trophy, Shield, Info, Activity } from 'lucide-react';

interface DriverCardProps {
    name: string;
    team: string;
    number: string;
    role: string;
    faceImg: string;
    helmetImg: string;
    carImg: string;
    color: string;
    stats: {
        wins: string;
        podiums: string;
        rank: string;
        starts: string;
        fastestLaps: string;
    };
}

export default function DriverCard({
    name,
    team,
    number,
    role,
    faceImg,
    helmetImg,
    carImg,
    color,
    stats
}: DriverCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isOpened, setIsOpened] = useState(false);

    return (
        <>
            <motion.div
                layoutId={`card-${name}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsOpened(true)}
                className="relative group cursor-pointer aspect-[4/5]"
            >
                <div className="absolute inset-0 bg-[#141414] rounded-[2rem] border border-white/5 overflow-hidden">
                    {/* Team Indicator */}
                    <div
                        className="absolute top-0 left-0 w-full h-1"
                        style={{ backgroundColor: color }}
                    />

                    {/* Background Team Name */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 text-8xl font-black text-white/[0.02] italic select-none">
                        {team.split(' ')[0].toUpperCase()}
                    </div>

                    {/* Driver Image Container */}
                    <div className="relative h-full w-full flex items-end justify-center pt-20">
                        {/* Hover Helmet Transition */}
                        <div className="relative w-full aspect-[4/5] flex items-end justify-center overflow-hidden">
                            <AnimatePresence mode="wait">
                                {isHovered ? (
                                    <motion.img
                                        key="face"
                                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                        src={faceImg}
                                        alt={name}
                                        className="h-full object-contain z-10 p-4"
                                    />
                                ) : (
                                    <motion.img
                                        key="helmet"
                                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                        src={helmetImg}
                                        alt={`${name} Helmet`}
                                        className="h-full object-contain z-10"
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Overlay Info */}
                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">{team}</p>
                                <h3 className="text-2xl font-black italic tracking-tighter text-white leading-none">
                                    {name.split(' ')[0]}<br />
                                    <span style={{ color }}>{name.split(' ').slice(1).join(' ').toUpperCase()}</span>
                                </h3>
                            </div>
                            <div className="text-4xl font-black italic opacity-20 outline-text" style={{ color }}>
                                {number}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hover Highlight */}
                <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 rounded-[2rem] border-2 border-white/20 pointer-events-none"
                />
            </motion.div>

            {/* Detail Modal */}
            <AnimatePresence>
                {isOpened && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpened(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        />

                        <motion.div
                            layoutId={`card-${name}`}
                            className="relative w-full max-w-6xl aspect-[21/9] bg-[#0d0d0d] rounded-[3rem] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                        >
                            <button
                                onClick={() => setIsOpened(false)}
                                className="absolute top-8 right-8 text-white/40 hover:text-white z-50 p-2 bg-white/5 rounded-full"
                            >
                                <Zap className="rotate-45" size={24} />
                            </button>

                            {/* Left Side: Images */}
                            <div className="relative flex-1 bg-gradient-to-br from-white/[0.02] to-transparent flex items-center justify-center overflow-hidden">
                                <motion.img
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    src={carImg}
                                    alt={`${team} 2026 Car`}
                                    className="absolute w-[120%] object-contain -translate-x-1/4 scale-150 rotate-[-15deg] opacity-40 blur-sm pointer-events-none"
                                />
                                <motion.img
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    src={faceImg}
                                    alt={name}
                                    className="relative h-full object-contain pt-20 z-10"
                                />
                            </div>

                            {/* Right Side: Info */}
                            <div className="flex-1 p-12 md:p-20 flex flex-col justify-center">
                                <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-4">{team} // 2026 SEASON</p>
                                <h2 className="text-7xl font-black italic tracking-tighter mb-8 leading-none">
                                    {name.split(' ')[0]}<br />
                                    <span style={{ color }}>{name.split(' ').slice(1).join(' ').toUpperCase()}</span>
                                </h2>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
                                    <StatBox label="Rank" value={stats.rank} icon={Trophy} color={color} />
                                    <StatBox label="Starts" value={stats.starts} icon={Info} color={color} />
                                    <StatBox label="Wins" value={stats.wins} icon={Zap} color={color} />
                                    <StatBox label="Podiums" value={stats.podiums} icon={Shield} color={color} />
                                    <StatBox label="F. Laps" value={stats.fastestLaps} icon={Activity} color={color} />
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-white/60">
                                        <Info size={16} />
                                        <p className="text-sm italic">"The 2026 regulation changes favor {team}'s new power unit philosophy, putting {name.split(' ').slice(-1)} in a prime position for the title."</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

function StatBox({ label, value, icon: Icon, color }: any) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <Icon size={16} className="mb-4" style={{ color }} />
            <div className="text-2xl font-black italic">{value}</div>
            <div className="text-[10px] text-white/40 uppercase font-medium tracking-widest mt-1">{label}</div>
        </div>
    );
}
