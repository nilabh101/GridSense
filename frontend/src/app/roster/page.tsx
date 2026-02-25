'use client';

import Layout from '@/components/Layout';
import DriverCard from '@/components/DriverCard';
import { motion } from 'framer-motion';
import React from 'react';

const allDrivers2026 = [
    // Ferrari
    {
        name: 'Lewis Hamilton',
        team: 'Ferrari',
        number: '44',
        color: '#ff0000',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/hamilton.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari.png',
        stats: { rank: 'P1', wins: '103', podiums: '197', starts: '332', fastestLaps: '65' }
    },
    {
        name: 'Charles Leclerc',
        team: 'Ferrari',
        number: '16',
        color: '#ff0000',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/leclerc.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari.png',
        stats: { rank: 'P2', wins: '5', podiums: '30', starts: '125', fastestLaps: '9' }
    },
    // Red Bull
    {
        name: 'Max Verstappen',
        team: 'Red Bull Racing',
        number: '3',
        color: '#3671C6',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/verstappen.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing.png',
        stats: { rank: 'P2', wins: '61', podiums: '107', starts: '185', fastestLaps: '32' }
    },
    {
        name: 'Isack Hadjar',
        team: 'Red Bull Racing',
        number: '40',
        color: '#3671C6',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/Placeholder.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/placeholder.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing.png',
        stats: { rank: 'P15', wins: '0', podiums: '0', starts: '0', fastestLaps: '0' }
    },
    // Mercedes
    {
        name: 'George Russell',
        team: 'Mercedes',
        number: '63',
        color: '#27f4d2',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/russell.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes.png',
        stats: { rank: 'P4', wins: '2', podiums: '11', starts: '104', fastestLaps: '6' }
    },
    {
        name: 'Kimi Antonelli',
        team: 'Mercedes',
        number: '12',
        color: '#27f4d2',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/K/KIMANT01_Kimi_Antonelli/kimant01.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/antonelli.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes.png',
        stats: { rank: 'P10', wins: '0', podiums: '0', starts: '0', fastestLaps: '0' }
    },
    // McLaren
    {
        name: 'Lando Norris',
        team: 'McLaren',
        number: '1',
        color: '#FF8700',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/norris.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren.png',
        stats: { rank: 'P1', wins: '1', podiums: '15', starts: '104', fastestLaps: '6' }
    },
    {
        name: 'Oscar Piastri',
        team: 'McLaren',
        number: '81',
        color: '#FF8700',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/piastri.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren.png',
        stats: { rank: 'P6', wins: '0', podiums: '2', starts: '22', fastestLaps: '2' }
    },
    // Aston Martin
    {
        name: 'Fernando Alonso',
        team: 'Aston Martin',
        number: '14',
        color: '#229971',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/alonso.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/aston-martin.png',
        stats: { rank: 'P4', wins: '32', podiums: '106', starts: '380', fastestLaps: '24' }
    },
    {
        name: 'Lance Stroll',
        team: 'Aston Martin',
        number: '18',
        color: '#229971',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/stroll.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/aston-martin.png',
        stats: { rank: 'P10', wins: '0', podiums: '3', starts: '143', fastestLaps: '0' }
    },
    // Williams
    {
        name: 'Alexander Albon',
        team: 'Williams Racing',
        number: '23',
        color: '#64C4FF',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/albon.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/williams.png',
        stats: { rank: 'P13', wins: '0', podiums: '2', starts: '81', fastestLaps: '0' }
    },
    {
        name: 'Carlos Sainz',
        team: 'Williams Racing',
        number: '55',
        color: '#64C4FF',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/sainz.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/williams.png',
        stats: { rank: 'P3', wins: '3', podiums: '21', starts: '183', fastestLaps: '3' }
    },
    // Alpine
    {
        name: 'Pierre Gasly',
        team: 'Alpine',
        number: '10',
        color: '#0093cc',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/gasly.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/alpine.png',
        stats: { rank: 'P11', wins: '1', podiums: '4', starts: '130', fastestLaps: '3' }
    },
    {
        name: 'Franco Colapinto',
        team: 'Alpine',
        number: '43',
        color: '#0093cc',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/Placeholder.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/placeholder.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/alpine.png',
        stats: { rank: 'P19', wins: '0', podiums: '0', starts: '9', fastestLaps: '0' }
    },
    // Haas
    {
        name: 'Oliver Bearman',
        team: 'Haas F1 Team',
        number: '87',
        color: '#B6BABD',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/bearman.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team.png',
        stats: { rank: 'P18', wins: '0', podiums: '0', starts: '1', fastestLaps: '0' }
    },
    {
        name: 'Esteban Ocon',
        team: 'Haas F1 Team',
        number: '31',
        color: '#B6BABD',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/ocon.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team.png',
        stats: { rank: 'P12', wins: '1', podiums: '3', starts: '133', fastestLaps: '0' }
    },
    // Audi
    {
        name: 'Nico Hülkenberg',
        team: 'Audi F1 Team',
        number: '27',
        color: '#ffffff',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/hulkenberg.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/kick-sauber.png',
        stats: { rank: 'P9', wins: '0', podiums: '0', starts: '203', fastestLaps: '2' }
    },
    {
        name: 'Gabriel Bortoleto',
        team: 'Audi F1 Team',
        number: '5',
        color: '#ffffff',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/Placeholder.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/placeholder.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/kick-sauber.png',
        stats: { rank: 'P20', wins: '0', podiums: '0', starts: '0', fastestLaps: '0' }
    },
    // RB
    {
        name: 'Liam Lawson',
        team: 'RB (VCARB)',
        number: '30',
        color: '#6692FF',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/lawson.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/rb.png',
        stats: { rank: 'P17', wins: '0', podiums: '0', starts: '5', fastestLaps: '0' }
    },
    {
        name: 'Arvid Lindblad',
        team: 'RB (VCARB)',
        number: '17',
        color: '#6692FF',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/Placeholder.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/placeholder.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/rb.png',
        stats: { rank: 'P21', wins: '0', podiums: '0', starts: '0', fastestLaps: '0' }
    },
    // Cadillac F1
    {
        name: 'Valtteri Bottas',
        team: 'Cadillac F1 Team',
        number: '77',
        color: '#C0C0C0',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/V/VALBOT01_Valtteri_Bottas/valbot01.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/bottas.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team.png', // Placeholder car
        stats: { rank: 'P15', wins: '10', podiums: '67', starts: '222', fastestLaps: '19' }
    },
    {
        name: 'Sergio Perez',
        team: 'Cadillac F1 Team',
        number: '11',
        color: '#C0C0C0',
        faceImg: 'https://media.formula1.com/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png',
        helmetImg: 'https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/perez.png',
        carImg: 'https://media.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team.png', // Placeholder car
        stats: { rank: 'P16', wins: '6', podiums: '35', starts: '257', fastestLaps: '11' }
    }
];

export default function RosterPage() {
    return (
        <Layout>
            <header className="mb-20">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
                            <div className="w-8 h-8 rounded-full border-4 border-t-red-600 border-white/10" />
                        </motion.div>
                    </div>
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase">2026 Season Grid</h1>
                </div>
                <p className="text-white/60 text-lg">Every driver, every stat. The evolution of F1 starts here.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-32">
                {allDrivers2026.map((driver, i) => (
                    <motion.div
                        key={driver.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <DriverCard {...driver as any} role="Primary" />
                    </motion.div>
                ))}
            </div>
        </Layout>
    );
}
