'use client';

import Layout from '@/components/Layout';
import React, { useState } from 'react';
import { Play, RotateCcw, TrendingUp, TrendingDown, Info, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatIfPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [params, setParams] = useState({
        driver: 'VER',
        pit_lap: 53,
        new_compound: 'SOFT'
    });

    const runSimulation = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/simulate-what-if', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id: 'abu_dhabi_2021', change_params: params }),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error running simulation:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-6xl mx-auto py-12">
                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-2xl bg-blue-600/10 border border-blue-600/20 text-blue-500">
                            <Zap size={32} strokeWidth={2.5} />
                        </div>
                        <h1 className="text-4xl font-black italic tracking-tighter uppercase">What-If Simulator</h1>
                    </div>
                    <p className="text-white/60 text-lg">
                        Rewrite race history. Simulate alternate strategies and observe the ripple effects on the final result.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <section className="lg:col-span-1 space-y-6">
                        <div className="p-8 rounded-3xl bg-[#141414] border border-white/5 space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Scenario Parameters</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-white/60 mb-2 uppercase">Driver Portfolio</label>
                                    <select
                                        value={params.driver}
                                        onChange={(e) => setParams({ ...params, driver: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-600/50"
                                    >
                                        {[
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
                                        ].map((d) => (
                                            <option key={d.code} value={d.code}>{d.name} ({d.code})</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-white/60 mb-2 uppercase">Pit Interaction (Lap)</label>
                                    <input
                                        type="number"
                                        value={params.pit_lap}
                                        onChange={(e) => setParams({ ...params, pit_lap: parseInt(e.target.value) })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-600/50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-white/60 mb-2 uppercase">New Compound</label>
                                    <div className="flex gap-2">
                                        {['SOFT', 'MEDIUM', 'HARD'].map((compound) => (
                                            <button
                                                key={compound}
                                                onClick={() => setParams({ ...params, new_compound: compound })}
                                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${params.new_compound === compound
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white/5 text-white/40 hover:bg-white/10'
                                                    }`}
                                            >
                                                {compound}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={runSimulation}
                                disabled={loading}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-white/5 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? <RotateCcw className="animate-spin" size={20} /> : <><Play size={20} /> Run Simulation</>}
                            </button>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex gap-4">
                            <Info className="text-blue-500 shrink-0" size={20} />
                            <p className="text-xs text-white/40 leading-relaxed">
                                Our multi-agent system uses a causal engine to predict how field positioning and tire degradation would evolve under these new conditions.
                            </p>
                        </div>
                    </section>

                    {/* Visualization Area */}
                    <section className="lg:col-span-2 space-y-8">
                        <AnimatePresence mode="wait">
                            {result ? (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-8"
                                >
                                    {/* Outcome Highlight */}
                                    <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 relative overflow-hidden">
                                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                                            <div className="text-center md:text-left">
                                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Projected Result</p>
                                                <div className="flex items-center gap-6">
                                                    <div className="text-6xl font-black italic tracking-tighter">{result.simulated_outcome}</div>
                                                    <div className="h-12 w-px bg-white/10 hidden md:block" />
                                                    <div className="flex flex-col">
                                                        <span className={`flex items-center gap-1 font-bold ${result.time_delta < 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                            {result.time_delta < 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                                                            {Math.abs(result.time_delta).toFixed(1)}s
                                                        </span>
                                                        <span className="text-white/40 text-xs uppercase font-bold tracking-tighter">Vs Original Outcome ({result.original_outcome})</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-6 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 max-w-xs">
                                                <p className="text-white/80 text-sm italic leading-relaxed">
                                                    "{result.explanation}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Causal Ripple Effects Placeholder */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-8 rounded-3xl bg-[#141414] border border-white/5">
                                            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">Tire Deg Projection</h4>
                                            <div className="h-32 flex items-end gap-2">
                                                {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                                                    <div key={i} className="flex-1 bg-blue-600/20 rounded-t-lg relative group">
                                                        <div
                                                            className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg transition-all duration-1000"
                                                            style={{ height: `${h}%` }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="p-8 rounded-3xl bg-[#141414] border border-white/5">
                                            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">Track Position Delta</h4>
                                            <div className="space-y-4">
                                                <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-green-500 w-3/4" />
                                                </div>
                                                <div className="h-4 bg-white/5 rounded-full overflow-hidden text-right">
                                                    <div className="h-full bg-red-500 w-1/4 inline-block" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full min-h-[400px] border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-12"
                                >
                                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                        <RotateCcw size={40} className="text-white/20" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white/60 mb-2">Awaiting Simulation Data</h3>
                                    <p className="text-white/20 max-w-xs">Adjust the parameters on the left and run the simulation to see causal race projections.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>
                </div>
            </div>
        </Layout>
    );
}
