'use client';

import Layout from '@/components/Layout';
import React, { useState } from 'react';
import { Brain, Search, GitBranch, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sampleQuestions = [
    "How does Colton Herta's Cadillac F1 performance compare to the 2026 technical engine reset?",
    "What FIA rule connects the Abu Dhabi 2021 incident to the 2026 active aero precedents?",
    "Who is Kimi Antonelli's teammate at Mercedes and what is their combined podium count?",
];

export default function RaceExplorerPage() {
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [kgStats, setKgStats] = useState<any>(null);

    React.useEffect(() => {
        fetch('http://localhost:8000/kg-summary')
            .then(r => r.json())
            .then(setKgStats)
            .catch(() => { });
    }, []);

    const runQuery = async (q?: string) => {
        const query = q || question;
        if (!query) return;
        setQuestion(query);
        setLoading(true);
        setResult(null);
        try {
            const response = await fetch('http://localhost:8000/kg-query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: query }),
            });
            const data = await response.json();
            setResult(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto py-12">
                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-2xl bg-purple-600/10 border border-purple-600/20 text-purple-400">
                            <Brain size={32} strokeWidth={2.5} />
                        </div>
                        <h1 className="text-4xl font-black italic tracking-tighter uppercase">Causal Race Explorer</h1>
                    </div>
                    <p className="text-white/60 text-lg">
                        Multi-hop intelligence queries over the F1 Knowledge Graph. Ask anything.
                    </p>
                </header>

                {kgStats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                        {[
                            { label: 'Entities', val: kgStats.nodes },
                            { label: 'Connections', val: kgStats.edges },
                            { label: 'Drivers', val: kgStats.node_types?.Driver ?? '—' },
                            { label: 'Incidents', val: kgStats.node_types?.Incident ?? '—' },
                        ].map(({ label, val }) => (
                            <div key={label} className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
                                <div className="text-3xl font-black italic text-purple-400">{val}</div>
                                <div className="text-xs text-white/40 uppercase tracking-widest mt-1">{label}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Query Input */}
                <div className="p-8 rounded-3xl bg-[#141414] border border-white/5 space-y-6 mb-8">
                    <div className="flex gap-3">
                        <input
                            value={question}
                            onChange={e => setQuestion(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && runQuery()}
                            placeholder="Ask a multi-hop question about drivers, incidents, rules..."
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-600/50 transition-colors"
                        />
                        <button
                            onClick={() => runQuery()}
                            disabled={loading || !question}
                            className="px-6 py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-white/5 disabled:text-white/20 text-white font-bold rounded-xl transition-all flex items-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                        </button>
                    </div>
                    <div className="space-y-2">
                        <p className="text-white/20 text-xs uppercase font-bold tracking-widest">Try these</p>
                        <div className="flex flex-wrap gap-2">
                            {sampleQuestions.map(q => (
                                <button key={q} onClick={() => runQuery(q)}
                                    className="text-xs px-4 py-2 rounded-full bg-purple-600/10 hover:bg-purple-600/20 text-purple-300 border border-purple-600/20 transition-all text-left">
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Result */}
                <AnimatePresence>
                    {result && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                            {/* Answer */}
                            <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-white/10">
                                <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">Answer</p>
                                <p className="text-white text-xl font-medium leading-relaxed">{result.answer}</p>
                                <div className="mt-6 flex items-center gap-4">
                                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white/60">
                                        Confidence: {Math.round((result.confidence || 0) * 100)}%
                                    </div>
                                </div>
                            </div>

                            {/* Reasoning Chain */}
                            {result.reasoning_chain?.length > 0 && (
                                <div className="p-8 rounded-3xl bg-[#141414] border border-white/5">
                                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <GitBranch size={14} /> Causal Reasoning Chain
                                    </p>
                                    <div className="space-y-3">
                                        {result.reasoning_chain.map((step: string, i: number) => (
                                            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex gap-4 items-start">
                                                <div className="w-7 h-7 rounded-full bg-purple-600/20 border border-purple-600/30 text-purple-400 text-xs font-bold flex items-center justify-center shrink-0">
                                                    {i + 1}
                                                </div>
                                                <p className="text-white/80 text-sm leading-relaxed pt-1">{step}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Entities */}
                            {result.entities_used?.length > 0 && (
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-wrap gap-2">
                                    {result.entities_used.map((e: string) => (
                                        <span key={e} className="px-3 py-1 rounded-full bg-purple-600/10 text-purple-300 text-xs font-bold border border-purple-600/20">
                                            {e}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
}
