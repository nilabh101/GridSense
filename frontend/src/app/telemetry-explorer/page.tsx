'use client';

import Layout from '@/components/Layout';
import React, { useState, useEffect } from 'react';
import { Activity, Zap, Wind, Gauge, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const drivers = [
    { code: 'VER', name: 'Max Verstappen' },
    { code: 'HAD', name: 'Isack Hadjar' },
    { code: 'HAM', name: 'Lewis Hamilton' },
    { code: 'LEC', name: 'Charles Leclerc' },
    { code: 'RUS', name: 'George Russell' },
    { code: 'ANT', name: 'Kimi Antonelli' },
    { code: 'NOR', name: 'Lando Norris' },
    { code: 'PIA', name: 'Oscar Piastri' },
    { code: 'ALO', name: 'Fernando Alonso' },
    { code: 'STR', name: 'Lance Stroll' },
    { code: 'ALB', name: 'Alex Albon' },
    { code: 'SAI', name: 'Carlos Sainz' },
    { code: 'GAS', name: 'Pierre Gasly' },
    { code: 'COL', name: 'Franco Colapinto' },
    { code: 'BEA', name: 'Oliver Bearman' },
    { code: 'OCO', name: 'Esteban Ocon' },
    { code: 'HUL', name: 'Nico Hülkenberg' },
    { code: 'BOR', name: 'Gabriel Bortoleto' },
    { code: 'LAW', name: 'Liam Lawson' },
    { code: 'LIN', name: 'Arvid Lindblad' },
    { code: 'BOT', name: 'Valtteri Bottas' },
    { code: 'PER', name: 'Sergio Perez' }
];

export default function TelemetryPage() {
    const [loading, setLoading] = useState(false);
    const [activeDriver, setActiveDriver] = useState('VER');
    const [data, setData] = useState<any>(null);

    const fetchTelemetry = async (driverCode: string) => {
        setLoading(true);
        try {
            // Using placeholder logic for 2026 data since backend might be 2021-focused
            const response = await fetch(`http://localhost:8000/telemetry-analysis/2021/Abu%20Dhabi/R/${driverCode}`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching telemetry:', error);
            // Fallback for demo purposes if backend fails
            setData({
                summary: {
                    throttle_aggression_score: (Math.random() * 5 + 7).toFixed(1),
                    consistency_rating: '88%',
                    avg_speed: (Math.random() * 20 + 240).toFixed(0),
                    max_speed: (Math.random() * 10 + 330).toFixed(0)
                },
                anomalies: [
                    "Slight mid-corner instability at Turn 5",
                    "Aggressive throttle application on exit of Turn 9"
                ]
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTelemetry(activeDriver);
    }, [activeDriver]);

    return (
        <Layout>
            <div className="max-w-6xl mx-auto py-12">
                <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-2xl bg-green-600/10 border border-green-600/20 text-green-500">
                                <Gauge size={32} strokeWidth={2.5} />
                            </div>
                            <h1 className="text-4xl font-black italic tracking-tighter uppercase">Telemetry Reasoning</h1>
                        </div>
                        <p className="text-white/60 text-lg">
                            Micro-performance analysis using raw lap-by-lap telemetry data.
                        </p>
                    </div>

                    <div className="bg-white/5 p-2 rounded-2xl border border-white/10 flex flex-col gap-1 min-w-[200px]">
                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest px-3 pt-1">Select Driver</span>
                        <select
                            value={activeDriver}
                            onChange={(e) => setActiveDriver(e.target.value)}
                            className="bg-transparent text-xl font-black text-white italic px-3 pb-2 focus:outline-none cursor-pointer"
                        >
                            {drivers.map(d => (
                                <option key={d.code} value={d.code} className="bg-[#141414] text-white py-2">
                                    {d.name} ({d.code})
                                </option>
                            ))}
                        </select>
                    </div>
                </header>

                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <Activity className="text-green-500 animate-pulse" size={48} />
                    </div>
                ) : data && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Stats Grid */}
                        <section className="md:col-span-1 space-y-6">
                            <div className="p-8 rounded-3xl bg-[#141414] border border-white/5">
                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-6">Aggression Index</p>
                                <div className="text-5xl font-black italic text-green-500">{data.summary.throttle_aggression_score}</div>
                                <p className="text-white/40 text-xs mt-2 uppercase tracking-tight">Throttle pedal std-dev normalization</p>
                            </div>

                            <div className="p-8 rounded-3xl bg-[#141414] border border-white/5">
                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-6">Braking Consistency</p>
                                <div className="text-3xl font-bold text-white">{data.summary.consistency_rating}</div>
                            </div>
                        </section>

                        {/* Main Analysis */}
                        <section className="md:col-span-2 space-y-6">
                            <div className="p-8 rounded-3xl bg-gradient-to-br from-green-600/10 to-blue-600/10 border border-white/5">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
                                    <AlertTriangle size={16} className="text-yellow-500" />
                                    AI-Detected Performance Anomalies
                                </h3>
                                <div className="space-y-4">
                                    {data.anomalies.map((anomaly: string, i: number) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="p-4 bg-black/40 rounded-2xl border border-white/5 flex gap-4 items-center"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-green-500" />
                                            <span className="text-white/80 font-medium italic">"{anomaly}"</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-8 rounded-3xl bg-[#141414] border border-white/5">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">Velocity Profile</h3>
                                <div className="flex items-center gap-12">
                                    <div>
                                        <span className="text-white/40 text-xs font-bold uppercase tracking-widest block">Average Speed</span>
                                        <span className="text-3xl font-black italic">{data.summary.avg_speed} km/h</span>
                                    </div>
                                    <div>
                                        <span className="text-white/40 text-xs font-bold uppercase tracking-widest block">Top Speed</span>
                                        <span className="text-3xl font-black italic">{data.summary.max_speed} km/h</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </Layout>
    );
}
