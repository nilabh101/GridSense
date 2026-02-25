'use client';

import Layout from '@/components/Layout';
import React, { useState } from 'react';
import { Shield, AlertCircle, CheckCircle, Clock, Gavel } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StewardsPage() {
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const analyzeIncident = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/analyze-incident', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description }),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error analyzing incident:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto py-12">
                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-2xl bg-red-600/10 border border-red-600/20 text-red-500">
                            <Shield size={32} strokeWidth={2.5} />
                        </div>
                        <h1 className="text-4xl font-black italic tracking-tighter uppercase">Steward AI</h1>
                    </div>
                    <p className="text-white/60 text-lg">
                        Rules-aware incident analysis based on FIA Sporting Regulations and historical precedents.
                    </p>
                </header>

                <section className="space-y-8">
                    {/* Input Area */}
                    <div className="p-8 rounded-3xl bg-[#141414] border border-white/5 space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                                Incident Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Ex: Driver A squeezed Driver B off track at Turn 4 during Lap 54..."
                                className="w-full h-40 bg-black/40 border border-white/10 rounded-2xl p-6 text-white placeholder:text-white/20 focus:outline-none focus:border-red-600/50 transition-colors resize-none"
                            />
                        </div>
                        <button
                            onClick={analyzeIncident}
                            disabled={loading || !description}
                            className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:bg-white/5 disabled:text-white/20 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Gavel size={20} />
                                    Analyze Incident
                                </>
                            )}
                        </button>
                    </div>

                    {/* Analysis Result */}
                    <AnimatePresence>
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Penalty Box */}
                                    <div className="p-8 rounded-3xl bg-red-600/10 border border-red-600/20">
                                        <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">Likely Penalty</p>
                                        <h2 className="text-3xl font-black italic tracking-tighter text-white">{result.likely_penalty}</h2>
                                        <div className="mt-4 flex items-center gap-2 text-white/60 text-sm">
                                            <Clock size={16} />
                                            Confidence: {Math.round(result.confidence_score * 100)}%
                                        </div>
                                    </div>

                                    {/* Rules Box */}
                                    <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Relevant Rules</p>
                                        <ul className="space-y-2">
                                            {result.relevant_rules.map((rule: string, i: number) => (
                                                <li key={i} className="flex items-center gap-2 text-white/80 font-medium">
                                                    <AlertCircle size={16} className="text-red-500" />
                                                    {rule}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Explanation */}
                                <div className="p-8 rounded-3xl bg-[#141414] border border-white/5">
                                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Reasoning & Explanation</p>
                                    <p className="text-white/80 leading-relaxed italic border-l-2 border-red-600 pl-6">
                                        "{result.explanation}"
                                    </p>
                                </div>

                                {/* Precedents */}
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
                                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Historical Precedents</p>
                                    <div className="space-y-3">
                                        {result.precedents.map((precedent: string, i: number) => (
                                            <div key={i} className="flex items-center gap-3 p-4 bg-black/40 rounded-xl border border-white/5">
                                                <CheckCircle size={18} className="text-blue-500" />
                                                <span className="text-white/70 text-sm font-medium">{precedent}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </div>
        </Layout>
    );
}
