'use client';

import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import React from 'react';

const teams = [
    {
        name: 'Ferrari',
        color: '#ff0000',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari.png.transform/2col/image.png',
        drivers: [
            { name: 'Lewis Hamilton', number: '44', stats: { rank: 'P1', wins: '103', podiums: '197', starts: '332', fastestLaps: '65' } },
            { name: 'Charles Leclerc', number: '16', stats: { rank: 'P2', wins: '5', podiums: '30', starts: '125', fastestLaps: '9' } }
        ]
    },
    {
        name: 'Mercedes',
        color: '#27f4d2',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes.png.transform/2col/image.png',
        drivers: [
            { name: 'George Russell', number: '63', stats: { rank: 'P4', wins: '2', podiums: '11', starts: '104', fastestLaps: '6' } },
            { name: 'Kimi Antonelli', number: '12', stats: { rank: 'P10', wins: '0', podiums: '0', starts: '0', fastestLaps: '0' } }
        ]
    },
    {
        name: 'Red Bull Racing',
        color: '#3671C6',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing.png.transform/2col/image.png',
        drivers: [
            { name: 'Max Verstappen', number: '3', stats: { rank: 'P2', wins: '61', podiums: '107', starts: '185', fastestLaps: '32' } },
            { name: 'Isack Hadjar', number: '40', stats: { rank: 'P15', wins: '0', podiums: '0', starts: '0', fastestLaps: '0' } }
        ]
    },
    {
        name: 'McLaren',
        color: '#FF8700',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren.png.transform/2col/image.png',
        drivers: [
            { name: 'Lando Norris', number: '1', stats: { rank: 'P1', wins: '1', podiums: '15', starts: '104', fastestLaps: '6' } },
            { name: 'Oscar Piastri', number: '81', stats: { rank: 'P6', wins: '0', podiums: '2', starts: '22', fastestLaps: '2' } }
        ]
    },
    {
        name: 'Aston Martin',
        color: '#229971',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/aston-martin.png.transform/2col/image.png',
        drivers: [
            { name: 'Fernando Alonso', number: '14', stats: { rank: 'P4', wins: '32', podiums: '106', starts: '380', fastestLaps: '24' } },
            { name: 'Lance Stroll', number: '18', stats: { rank: 'P10', wins: '0', podiums: '3', starts: '143', fastestLaps: '0' } }
        ]
    },
    {
        name: 'Audi F1 Team',
        color: '#ffffff',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/kick-sauber.png.transform/2col/image.png',
        drivers: [
            { name: 'Nico Hülkenberg', number: '27', stats: { rank: 'P9', wins: '0', podiums: '0', starts: '203', fastestLaps: '2' } },
            { name: 'Gabriel Bortoleto', number: '5', stats: { rank: 'P20', wins: '0', podiums: '0', starts: '0', fastestLaps: '0' } }
        ]
    },
    {
        name: 'Williams Racing',
        color: '#64C4FF',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/williams.png.transform/2col/image.png',
        drivers: [
            { name: 'Alexander Albon', number: '23', stats: { rank: 'P13', wins: '0', podiums: '2', starts: '81', fastestLaps: '0' } },
            { name: 'Carlos Sainz', number: '55', stats: { rank: 'P3', wins: '3', podiums: '21', starts: '183', fastestLaps: '3' } }
        ]
    },
    {
        name: 'Alpine',
        color: '#0093cc',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/alpine.png.transform/2col/image.png',
        drivers: [
            { name: 'Pierre Gasly', number: '10', stats: { rank: 'P11', wins: '1', podiums: '4', starts: '130', fastestLaps: '3' } },
            { name: 'Franco Colapinto', number: '43', stats: { rank: 'P19', wins: '0', podiums: '0', starts: '9', fastestLaps: '0' } }
        ]
    },
    {
        name: 'Haas F1 Team',
        color: '#B6BABD',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team.png.transform/2col/image.png',
        drivers: [
            { name: 'Oliver Bearman', number: '87', stats: { rank: 'P18', wins: '0', podiums: '0', starts: '1', fastestLaps: '0' } },
            { name: 'Esteban Ocon', number: '31', stats: { rank: 'P12', wins: '1', podiums: '3', starts: '133', fastestLaps: '0' } }
        ]
    },
    {
        name: 'RB (VCARB)',
        color: '#6692FF',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/rb.png.transform/2col/image.png',
        drivers: [
            { name: 'Liam Lawson', number: '30', stats: { rank: 'P17', wins: '0', podiums: '0', starts: '5', fastestLaps: '0' } },
            { name: 'Arvid Lindblad', number: '17', stats: { rank: 'P21', wins: '0', podiums: '0', starts: '0', fastestLaps: '0' } }
        ]
    },
    {
        name: 'Cadillac F1 Team',
        color: '#C0C0C0',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team.png.transform/2col/image.png', // Placeholder
        drivers: [
            { name: 'Valtteri Bottas', number: '77', stats: { rank: 'P15', wins: '10', podiums: '67', starts: '222', fastestLaps: '19' } },
            { name: 'Sergio Perez', number: '11', stats: { rank: 'P16', wins: '6', podiums: '35', starts: '257', fastestLaps: '11' } }
        ]
    }
];

export default function TeamsPage() {
    return (
        <Layout>
            <header className="mb-20">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
                            <div className="w-8 h-8 rounded-full border-4 border-t-red-600 border-white/10" />
                        </motion.div>
                    </div>
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase">Teams & Drivers</h1>
                </div>
                <p className="text-white/60 text-lg">The 2026 Grid: Construction and Contention.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                {teams.map((team, i) => (
                    <motion.div
                        key={team.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-[2.5rem] bg-[#141414] border border-white/5 group hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer relative overflow-hidden"
                    >
                        {/* Ambient team glow */}
                        <div
                            className="absolute -top-24 -right-24 w-48 h-48 blur-[80px] rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                            style={{ backgroundColor: team.color }}
                        />

                        <div className="flex justify-between items-start mb-12 relative z-10">
                            <div
                                className="w-16 h-1 bg-white/10 rounded-full overflow-hidden"
                            >
                                <div className="h-full w-1/2" style={{ backgroundColor: team.color }} />
                            </div>
                            <img src={team.logo} alt={team.name} className="h-8 object-contain opacity-20 group-hover:opacity-100 transition-opacity filter grayscale group-hover:grayscale-0" />
                        </div>

                        <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-8 relative z-10">{team.name}</h3>

                        <div className="space-y-6 relative z-10">
                            {team.drivers.map((driver) => (
                                <div
                                    key={driver.name}
                                    className="flex items-center justify-between group/driver p-4 rounded-2xl hover:bg-white/5 transition-all"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        alert(`Opening detailed profile for ${driver.name}\nWins: ${driver.stats.wins}\nPodiums: ${driver.stats.podiums}\nStarts: ${driver.stats.starts}\nFastest Laps: ${driver.stats.fastestLaps}`);
                                    }}
                                >
                                    <div>
                                        <div className="text-lg font-bold text-white/80 group-hover/driver:text-white">{driver.name}</div>
                                        <div className="flex gap-4 mt-1">
                                            <span className="text-[10px] text-white/20 uppercase font-bold">WINS: <span className="text-white/40">{driver.stats.wins}</span></span>
                                            <span className="text-[10px] text-white/20 uppercase font-bold">POD: <span className="text-white/40">{driver.stats.podiums}</span></span>
                                        </div>
                                    </div>
                                    <div className="text-3xl font-black italic shadow-text" style={{ color: team.color }}>
                                        {driver.number}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </Layout>
    );
}
