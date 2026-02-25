'use client';

import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Trophy, History, Star, Flag, Clock, Zap, Shield, Crown } from 'lucide-react';
import React from 'react';

const legends = [
    { name: 'Michael Schumacher', titles: '7', years: '1994-95, 2000-04', team: 'Ferrari', img: 'https://media.formula1.com/content/dam/fom-website/manual/Misc/Schumacher.png' },
    { name: 'Lewis Hamilton', titles: '7', years: '2008, 2014-15, 2017-20', team: 'Mercedes', img: 'https://media.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png' },
    { name: 'Juan Manuel Fangio', titles: '5', years: '1951, 1954-57', team: 'Alfa Romeo / Maserati', img: 'https://media.formula1.com/content/dam/fom-website/manual/Misc/Fangio.png' },
    { name: 'Alain Prost', titles: '4', years: '1985-86, 1989, 1993', team: 'McLaren / Williams', img: 'https://media.formula1.com/content/dam/fom-website/manual/Misc/Prost.png' },
    { name: 'Sebastian Vettel', titles: '4', years: '2010-13', team: 'Red Bull Racing', img: 'https://media.formula1.com/content/dam/fom-website/manual/Misc/Vettel.png' },
    { name: 'Ayrton Senna', titles: '3', years: '1988, 1990-91', team: 'McLaren', img: 'https://media.formula1.com/content/dam/fom-website/manual/Misc/Senna.png' },
    { name: 'Niki Lauda', titles: '3', years: '1975, 1977, 1984', team: 'Ferrari / McLaren', img: 'https://media.formula1.com/content/dam/fom-website/manual/Misc/Lauda.png' },
    { name: 'Jim Clark', titles: '2', years: '1963, 1965', team: 'Lotus', img: 'https://media.formula1.com/content/dam/fom-website/manual/Misc/Clark.png' },
];

const champions = [
    { year: '2024', driver: 'Max Verstappen', team: 'Red Bull Racing' },
    { year: '2023', driver: 'Max Verstappen', team: 'Red Bull Racing' },
    { year: '2022', driver: 'Max Verstappen', team: 'Red Bull Racing' },
    { year: '2021', driver: 'Max Verstappen', team: 'Red Bull Racing' },
    { year: '2020', driver: 'Lewis Hamilton', team: 'Mercedes' },
    { year: '2019', driver: 'Lewis Hamilton', team: 'Mercedes' },
    { year: '2018', driver: 'Lewis Hamilton', team: 'Mercedes' },
    { year: '2017', driver: 'Lewis Hamilton', team: 'Mercedes' },
    { year: '2016', driver: 'Nico Rosberg', team: 'Mercedes' },
    { year: '2015', driver: 'Lewis Hamilton', team: 'Mercedes' },
    { year: '2014', driver: 'Lewis Hamilton', team: 'Mercedes' },
    { year: '2013', driver: 'Sebastian Vettel', team: 'Red Bull Racing' },
    { year: '2012', driver: 'Sebastian Vettel', team: 'Red Bull Racing' },
    { year: '2011', driver: 'Sebastian Vettel', team: 'Red Bull Racing' },
    { year: '2010', driver: 'Sebastian Vettel', team: 'Red Bull Racing' },
    { year: '2009', driver: 'Jenson Button', team: 'Brawn GP' },
    { year: '2008', driver: 'Lewis Hamilton', team: 'McLaren' },
    { year: '2007', driver: 'Kimi Räikkönen', team: 'Ferrari' },
    { year: '2006', driver: 'Fernando Alonso', team: 'Renault' },
    { year: '2005', driver: 'Fernando Alonso', team: 'Renault' },
    { year: '2004', driver: 'Michael Schumacher', team: 'Ferrari' },
    { year: '2003', driver: 'Michael Schumacher', team: 'Ferrari' },
    { year: '2002', driver: 'Michael Schumacher', team: 'Ferrari' },
    { year: '2001', driver: 'Michael Schumacher', team: 'Ferrari' },
    { year: '2000', driver: 'Michael Schumacher', team: 'Ferrari' },
    { year: '1999', driver: 'Mika Häkkinen', team: 'McLaren' },
    { year: '1998', driver: 'Mika Häkkinen', team: 'McLaren' },
    { year: '1997', driver: 'Jacques Villeneuve', team: 'Williams' },
    { year: '1996', driver: 'Damon Hill', team: 'Williams' },
    { year: '1995', driver: 'Michael Schumacher', team: 'Benetton' },
    { year: '1994', driver: 'Michael Schumacher', team: 'Benetton' },
    { year: '1993', driver: 'Alain Prost', team: 'Williams' },
    { year: '1992', driver: 'Nigel Mansell', team: 'Williams' },
    { year: '1991', driver: 'Ayrton Senna', team: 'McLaren' },
    { year: '1990', driver: 'Ayrton Senna', team: 'McLaren' },
    { year: '1989', driver: 'Alain Prost', team: 'McLaren' },
    { year: '1988', driver: 'Ayrton Senna', team: 'McLaren' },
    { year: '1987', driver: 'Nelson Piquet', team: 'Williams' },
    { year: '1986', driver: 'Alain Prost', team: 'McLaren' },
    { year: '1985', driver: 'Alain Prost', team: 'McLaren' },
    { year: '1984', driver: 'Niki Lauda', team: 'McLaren' },
    { year: '1983', driver: 'Nelson Piquet', team: 'Brabham' },
    { year: '1982', driver: 'Keke Rosberg', team: 'Williams' },
    { year: '1981', driver: 'Nelson Piquet', team: 'Brabham' },
    { year: '1980', driver: 'Alan Jones', team: 'Williams' },
    { year: '1979', driver: 'Jody Scheckter', team: 'Ferrari' },
    { year: '1978', driver: 'Mario Andretti', team: 'Lotus' },
    { year: '1977', driver: 'Niki Lauda', team: 'Ferrari' },
    { year: '1976', driver: 'James Hunt', team: 'McLaren' },
    { year: '1975', driver: 'Niki Lauda', team: 'Ferrari' },
    { year: '1974', driver: 'Emerson Fittipaldi', team: 'McLaren' },
    { year: '1973', driver: 'Jackie Stewart', team: 'Tyrrell' },
    { year: '1972', driver: 'Emerson Fittipaldi', team: 'Lotus' },
    { year: '1971', driver: 'Jackie Stewart', team: 'Tyrrell' },
    { year: '1970', driver: 'Jochen Rindt', team: 'Lotus' },
    { year: '1969', driver: 'Jackie Stewart', team: 'Matra' },
    { year: '1968', driver: 'Graham Hill', team: 'Lotus' },
    { year: '1967', driver: 'Denny Hulme', team: 'Brabham' },
    { year: '1966', driver: 'Jack Brabham', team: 'Brabham' },
    { year: '1965', driver: 'Jim Clark', team: 'Lotus' },
    { year: '1964', driver: 'John Surtees', team: 'Ferrari' },
    { year: '1963', driver: 'Jim Clark', team: 'Lotus' },
    { year: '1962', driver: 'Graham Hill', team: 'BRM' },
    { year: '1961', driver: 'Phil Hill', team: 'Ferrari' },
    { year: '1960', driver: 'Jack Brabham', team: 'Cooper' },
    { year: '1959', driver: 'Jack Brabham', team: 'Cooper' },
    { year: '1958', driver: 'Mike Hawthorn', team: 'Ferrari' },
    { year: '1957', driver: 'Juan Manuel Fangio', team: 'Maserati' },
    { year: '1956', driver: 'Juan Manuel Fangio', team: 'Ferrari' },
    { year: '1955', driver: 'Juan Manuel Fangio', team: 'Mercedes' },
    { year: '1954', driver: 'Juan Manuel Fangio', team: 'Maserati / Mercedes' },
    { year: '1953', driver: 'Alberto Ascari', team: 'Ferrari' },
    { year: '1952', driver: 'Alberto Ascari', team: 'Ferrari' },
    { year: '1951', driver: 'Juan Manuel Fangio', team: 'Alfa Romeo' },
    { year: '1950', driver: 'Giuseppe Farina', team: 'Alfa Romeo' },
];

const ruleEvolution = [
    { era: '1950s', title: 'The Genesis', desc: 'Front-engine monsters. Leather caps. Pure speed.', icon: Clock },
    { era: '1960s', title: 'Rear-Engine Revolution', desc: 'Cooper and Lotus change the physics of racing forever.', icon: Zap },
    { era: '1970s', title: 'The Aero Age', desc: 'Wings, ground effect, and the hunt for downforce.', icon: Shield },
    { era: '1980s', title: 'The Turbo Era', desc: '1000+ HP qualifying engines. The era of the giants.', icon: Zap },
    { era: '1990s', title: 'Electronic Supremacy', desc: 'Active suspension, traction control, and computerized precision.', icon: Shield },
    { era: '2014', title: 'The Hybrid Era', desc: 'Turbo-hybrid power units. Efficiency meets performance.', icon: Zap },
    { era: '2022', title: 'Ground Effect Reset', desc: 'Modern aero philosophy aimed at closer racing.', icon: Shield },
    { era: '2026', title: 'AIA (Active Intelligence Age)', desc: '100% sustainable fuels and enhanced electrical power.', icon: Crown },
];

const legacyTracks = [
    { name: 'Monaco', location: 'Monte Carlo', firstHeld: '1929', description: 'The jewel where qualifying is 90% of the race.' },
    { name: 'Silverstone', location: 'UK', firstHeld: '1950', description: 'Where the first-ever World Championship race was held.' },
    { name: 'Monza', location: 'Italy', firstHeld: '1922', description: 'La Pista Magica. The home of the Tifosi.' },
    { name: 'Spa-Francorchamps', location: 'Belgium', firstHeld: '1925', description: 'The legendary Eau Rouge and Raidillon complex.' },
    { name: 'Suzuka', location: 'Japan', firstHeld: '1962', description: 'The world-famous figure-of-eight technical masterpiece.' },
    { name: 'Interlagos', location: 'Brazil', firstHeld: '1940', description: 'Passionate fans and legendary wet-weather drama.' },
    { name: 'Kyalami', location: 'South Africa', firstHeld: '1961', description: 'A historic high-speed classic under the African sun.' },
    { name: 'Watkins Glen', location: 'USA', firstHeld: '1956', description: 'The spiritual home of US Grand Prix racing.' },
];

const technicalMilestones = [
    { year: '1950', title: 'The First Start', desc: 'Silverstone hosts the inaugural F1 World Championship race.' },
    { year: '1967', title: 'The DFV Revolution', desc: 'Ford Cosworth DFV engine debuts, dominating for over a decade.' },
    { year: '1977', title: 'The Turbo Dawn', desc: 'Renault introduces the first turbocharger to F1 in the RS01.' },
    { year: '2026', title: 'Energy Supremacy', desc: 'The switch to 50/50 electrical-thermal power and sustainable fuels.' },
];

export default function LegendsPage() {
    return (
        <Layout>
            <header className="mb-20">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-yellow-600/10 border border-yellow-600/20 text-yellow-400">
                        <Trophy size={32} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase">Legends & Legacy</h1>
                </div>
                <p className="text-white/60 text-lg">Honoring the giants of the sport and the hallowed grounds of Formula 1.</p>
            </header>

            {/* Hall of Champions Grid */}
            <section className="mb-24">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-12 h-[1px] bg-yellow-600" />
                    <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-yellow-600">The Pantheon of Winners</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {legends.map((legend, i) => (
                        <motion.div
                            key={legend.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative bg-[#141414] rounded-3xl border border-white/5 p-6 overflow-hidden hover:border-yellow-600/20 transition-all"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-600/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-yellow-600/10 transition-colors" />
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                        <Star className="text-yellow-400" size={20} />
                                    </div>
                                    <div className="text-4xl font-black italic text-white/5 group-hover:text-white/10 transition-colors">
                                        x{legend.titles}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-500 transition-colors">{legend.name}</h3>
                                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">{legend.team}</p>
                                <div className="text-[10px] text-white/30 uppercase tracking-tighter leading-relaxed">
                                    {legend.years}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Hall of Champions Table */}
            <section className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-[1px] bg-white/20" />
                        <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white/40">The Complete History (1950 - 2024)</h2>
                    </div>
                    <div className="bg-[#141414] rounded-3xl border border-white/5 overflow-hidden">
                        <div className="max-h-[600px] overflow-y-auto scrollbar-hide">
                            <table className="w-full text-left border-collapse">
                                <thead className="sticky top-0 bg-[#1a1a1a] z-20">
                                    <tr>
                                        <th className="p-6 text-[10px] font-bold text-white/40 uppercase tracking-widest border-b border-white/5">Year</th>
                                        <th className="p-6 text-[10px] font-bold text-white/40 uppercase tracking-widest border-b border-white/5">World Champion</th>
                                        <th className="p-6 text-[10px] font-bold text-white/40 uppercase tracking-widest border-b border-white/5">Constructor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {champions.map((c) => (
                                        <tr key={`${c.year}-${c.driver}`} className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group">
                                            <td className="p-6 text-sm font-black italic text-white/20 group-hover:text-yellow-500 transition-colors">{c.year}</td>
                                            <td className="p-6 text-sm font-bold text-white/80">{c.driver}</td>
                                            <td className="p-6 text-[10px] font-bold text-white/40 uppercase tracking-widest">{c.team}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-[1px] bg-red-600" />
                        <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-red-600">The Rules of Legend</h2>
                    </div>
                    <div className="space-y-6">
                        {ruleEvolution.map((rule, i) => (
                            <motion.div
                                key={rule.era}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-2xl bg-[#141414] border border-white/5 flex gap-6 group hover:border-red-600/20 transition-all"
                            >
                                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-red-600/10 group-hover:border-red-600/20 transition-all">
                                    <rule.icon className="text-white/20 group-hover:text-red-500" size={24} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">{rule.era}</div>
                                    <h4 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors leading-none mb-2 uppercase italic tracking-tighter">{rule.title}</h4>
                                    <p className="text-xs text-white/40 leading-relaxed">{rule.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Milestones */}
            <section className="mb-24">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-12 h-[1px] bg-red-600" />
                    <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-red-600">Technical Milestones</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {technicalMilestones.map((ms, i) => (
                        <motion.div
                            key={ms.year}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-red-600/20 transition-all flex flex-col gap-4 group"
                        >
                            <div className="text-4xl font-black italic text-white/5 group-hover:text-red-600/10 transition-colors">{ms.year}</div>
                            <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors uppercase tracking-tighter italic">{ms.title}</h3>
                            <p className="text-xs text-white/40 leading-relaxed italic">"{ms.desc}"</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Legacy Tracks */}
            <section className="pb-32">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-12 h-[1px] bg-red-600" />
                    <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-red-600">Legendary Circuits History</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {legacyTracks.map((track, i) => (
                        <motion.div
                            key={track.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-red-600/20 transition-all flex flex-col gap-6 group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-red-600/10 group-hover:border-red-600/20 transition-all">
                                <Flag className="text-white/20 group-hover:text-red-600 transition-colors" size={28} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-xl font-black italic uppercase tracking-tighter">{track.name}</h3>
                                    <span className="text-[8px] bg-red-600/10 text-red-500 px-2 py-0.5 rounded font-bold uppercase"> {track.firstHeld}</span>
                                </div>
                                <p className="text-white/40 text-[11px] leading-relaxed italic">"{track.description}"</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </Layout>
    );
}
