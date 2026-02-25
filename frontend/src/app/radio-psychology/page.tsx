'use client';

import Layout from '@/components/Layout';
import React, { useState } from 'react';
import { Radio, Plus, Trash2, Gauge, Activity, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const drivers = [
    { code: 'VER', name: 'Max Verstappen', team: 'Red Bull' },
    { code: 'HAD', name: 'Isack Hadjar', team: 'Red Bull' },
    { code: 'HAM', name: 'Lewis Hamilton', team: 'Ferrari' },
    { code: 'LEC', name: 'Charles Leclerc', team: 'Ferrari' },
    { code: 'RUS', name: 'George Russell', team: 'Mercedes' },
    { code: 'ANT', name: 'Kimi Antonelli', team: 'Mercedes' },
    { code: 'NOR', name: 'Lando Norris', team: 'McLaren' },
    { code: 'PIA', name: 'Oscar Piastri', team: 'McLaren' },
    { code: 'ALO', name: 'Fernando Alonso', team: 'Aston Martin' },
    { code: 'STR', name: 'Lance Stroll', team: 'Aston Martin' },
    { code: 'ALB', name: 'Alex Albon', team: 'Williams' },
    { code: 'SAI', name: 'Carlos Sainz', team: 'Williams' },
    { code: 'GAS', name: 'Pierre Gasly', team: 'Alpine' },
    { code: 'COL', name: 'Franco Colapinto', team: 'Alpine' },
    { code: 'BEA', name: 'Oliver Bearman', team: 'Haas' },
    { code: 'OCO', name: 'Esteban Ocon', team: 'Haas' },
    { code: 'HUL', name: 'Nico Hülkenberg', team: 'Audi' },
    { code: 'BOR', name: 'Gabriel Bortoleto', team: 'Audi' },
    { code: 'LAW', name: 'Liam Lawson', team: 'RB' },
    { code: 'LIN', name: 'Arvid Lindblad', team: 'RB' },
    { code: 'BOT', name: 'Valtteri Bottas', team: 'Cadillac' },
    { code: 'PER', name: 'Sergio Perez', team: 'Cadillac' }
];

export default function RadioPage() {
    const [driver, setDriver] = useState('VER');
    const [context, setContext] = useState('Abu Dhabi 2021, Lap 53. Safety car about to come in. Championship decider.');
    const [transcripts, setTranscripts] = useState([
        { speaker: 'Engineer', message: 'Max, safety car coming in next lap. Stay calm, stay calm.', lap: 53 },
        { speaker: 'Driver', message: 'What are they doing?! This is ridiculous!', lap: 53 },
        { speaker: 'Engineer', message: 'Understood. Focus on the restart. You have fresh softs.', lap: 53 },
        { speaker: 'Driver', message: 'Ok ok ok. Let\'s go.', lap: 54 },
    ]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const [ppiMode, setPpiMode] = useState(false);
    const [ppiParams, setPpiParams] = useState({ championship_gap: 8, laps_remaining: 5, rival_gap_seconds: 0.5 });
    const [ppiResult, setPpiResult] = useState<any>(null);

    const addRow = () => setTranscripts(t => [...t, { speaker: 'Driver', message: '', lap: 0 }]);
    const removeRow = (i: number) => setTranscripts(t => t.filter((_, idx) => idx !== i));
    const updateRow = (i: number, key: string, val: any) =>
        setTranscripts(t => t.map((r, idx) => idx === i ? { ...r, [key]: val } : r));

    const analyzeRadio = async () => {
        setLoading(true); setResult(null);
        try {
            const r = await fetch('http://localhost:8000/analyze-radio', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ driver, context, transcripts }),
            });
            setResult(await r.json());
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const computePPI = async () => {
        setLoading(true); setPpiResult(null);
        try {
            const r = await fetch('http://localhost:8000/psychological-pressure-index', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ driver, ...ppiParams }),
            });
            setPpiResult(await r.json());
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const ppiScore = result?.ppi_score ?? ppiResult?.ppi_score;

    return (
        <Layout>
            <div className="max-w-5xl mx-auto py-12">
                <header className="mb-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-2xl bg-orange-600/10 border border-orange-600/20 text-orange-400">
                            <Radio size={32} strokeWidth={2.5} />
                        </div>
                        <h1 className="text-4xl font-black italic tracking-tighter uppercase">Radio & Psychology</h1>
                    </div>
                    <p className="text-white/60 text-lg">Psychological telemetry from team radio. Sentiment → Pressure → Performance.</p>
                </header>

                {/* Mode Toggle */}
                <div className="flex gap-3 mb-8">
                    {['Radio Analysis', 'PPI Calculator'].map((label, i) => (
                        <button key={label} onClick={() => setPpiMode(i === 1)}
                            className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all ${ppiMode === (i === 1) ? 'bg-orange-600 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>
                            {label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Controls */}
                    <section className="space-y-6">
                        <div className="p-8 rounded-3xl bg-[#141414] border border-white/5 space-y-6">
                            {!ppiMode ? (
                                <>
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-3">Driver</label>
                                        <select value={driver} onChange={e => setDriver(e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none">
                                            {drivers.map(d => (
                                                <option key={d.code} value={d.code} className="bg-[#141414]">
                                                    {d.name} ({d.code}) - {d.team}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-3">Context</label>
                                        <textarea value={context} onChange={e => setContext(e.target.value)} rows={2}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none resize-none" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-3">
                                            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Transcripts</label>
                                            <button onClick={addRow} className="text-xs text-orange-400 flex items-center gap-1 hover:text-orange-300">
                                                <Plus size={14} /> Add
                                            </button>
                                        </div>
                                        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                                            {transcripts.map((t, i) => (
                                                <div key={i} className="flex gap-2">
                                                    <select value={t.speaker} onChange={e => updateRow(i, 'speaker', e.target.value)}
                                                        className="bg-black/40 border border-white/10 rounded-lg px-2 py-2 text-white text-xs focus:outline-none w-24 shrink-0">
                                                        <option>Driver</option><option>Engineer</option>
                                                    </select>
                                                    <input value={t.message} onChange={e => updateRow(i, 'message', e.target.value)}
                                                        className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none" />
                                                    <input type="number" value={t.lap} onChange={e => updateRow(i, 'lap', +e.target.value)}
                                                        className="bg-black/40 border border-white/10 rounded-lg px-2 py-2 text-white text-xs focus:outline-none w-14 text-center" />
                                                    <button onClick={() => removeRow(i)} className="text-white/20 hover:text-red-400"><Trash2 size={14} /></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button onClick={analyzeRadio} disabled={loading}
                                        className="w-full py-4 bg-orange-600 hover:bg-orange-700 disabled:bg-white/5 text-white font-bold rounded-2xl flex items-center justify-center gap-2">
                                        {loading ? <Loader2 className="animate-spin" size={20} /> : <><Activity size={20} /> Analyze Radio</>}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-3">Driver</label>
                                        <select value={driver} onChange={e => setDriver(e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none">
                                            {drivers.map(d => (
                                                <option key={d.code} value={d.code} className="bg-[#141414]">
                                                    {d.name} ({d.code}) - {d.team}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {[
                                        { key: 'championship_gap', label: 'Championship Gap (pts)', min: 0, max: 100 },
                                        { key: 'laps_remaining', label: 'Laps Remaining', min: 1, max: 70 },
                                        { key: 'rival_gap_seconds', label: 'Gap to Rival Ahead (s)', min: 0, max: 30, step: 0.1 },
                                    ].map(({ key, label, ...rest }) => (
                                        <div key={key}>
                                            <div className="flex justify-between mb-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-white/40">{label}</label>
                                                <span className="text-orange-400 font-bold text-sm">{(ppiParams as any)[key]}</span>
                                            </div>
                                            <input type="range" value={(ppiParams as any)[key]}
                                                onChange={e => setPpiParams(p => ({ ...p, [key]: parseFloat(e.target.value) }))}
                                                className="w-full accent-orange-600" {...rest} />
                                        </div>
                                    ))}
                                    <button onClick={computePPI} disabled={loading}
                                        className="w-full py-4 bg-orange-600 hover:bg-orange-700 disabled:bg-white/5 text-white font-bold rounded-2xl flex items-center justify-center gap-2">
                                        {loading ? <Loader2 className="animate-spin" size={20} /> : <><Gauge size={20} /> Compute PPI</>}
                                    </button>
                                </>
                            )}
                        </div>
                    </section>

                    {/* Result */}
                    <section>
                        <AnimatePresence mode="wait">
                            {(result || ppiResult) && (
                                <motion.div key="result" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                                    {/* PPI Gauge */}
                                    {ppiScore !== undefined && (
                                        <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-white/10 text-center">
                                            <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-2">Psychological Pressure Index</p>
                                            <div className={`text-8xl font-black italic ${ppiScore > 70 ? 'text-red-500' : ppiScore > 40 ? 'text-orange-400' : 'text-green-400'}`}>
                                                {ppiScore}
                                            </div>
                                            <p className="text-white/40 text-sm mt-2">/ 100</p>
                                        </div>
                                    )}

                                    {result && (
                                        <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-5 rounded-2xl bg-[#141414] border border-white/5">
                                                    <p className="text-white/40 text-xs uppercase font-bold tracking-widest mb-1">Stress Level</p>
                                                    <p className="text-2xl font-black italic text-white">{result.stress_level}<span className="text-sm text-white/40">/10</span></p>
                                                </div>
                                                <div className="p-5 rounded-2xl bg-[#141414] border border-white/5">
                                                    <p className="text-white/40 text-xs uppercase font-bold tracking-widest mb-1">Override Detected</p>
                                                    <p className={`text-lg font-bold ${result.strategy_override_detected ? 'text-red-400' : 'text-green-400'}`}>
                                                        {result.strategy_override_detected ? 'YES' : 'NO'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-[#141414] border border-white/5">
                                                <p className="text-white/40 text-xs uppercase font-bold tracking-widest mb-2">Sentiment Arc</p>
                                                <p className="text-white font-medium italic">{result.sentiment_arc}</p>
                                            </div>
                                            {result.key_moments?.length > 0 && (
                                                <div className="p-6 rounded-2xl bg-[#141414] border border-white/5 space-y-3">
                                                    <p className="text-white/40 text-xs uppercase font-bold tracking-widest">Key Moments</p>
                                                    {result.key_moments.map((m: string, i: number) => (
                                                        <div key={i} className="flex gap-3 items-start text-sm text-white/70">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                                                            {m}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="p-6 rounded-2xl bg-orange-600/10 border border-orange-600/20">
                                                <p className="text-orange-400 text-xs uppercase font-bold tracking-widest mb-2">Psychological Profile</p>
                                                <p className="text-white/80 italic text-sm leading-relaxed">"{result.summary}"</p>
                                            </div>
                                        </>
                                    )}

                                    {ppiResult?.summary && (
                                        <div className="p-6 rounded-2xl bg-orange-600/10 border border-orange-600/20">
                                            <p className="text-orange-400 text-xs uppercase font-bold tracking-widest mb-2">AI Analysis</p>
                                            <p className="text-white/80 italic text-sm leading-relaxed">"{ppiResult.summary}"</p>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                            {!result && !ppiResult && (
                                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="h-full min-h-[400px] border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-center p-12">
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                        <Radio size={32} className="text-white/20" />
                                    </div>
                                    <p className="text-white/40">Analysis will appear here</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>
                </div>
            </div>
        </Layout>
    );
}
