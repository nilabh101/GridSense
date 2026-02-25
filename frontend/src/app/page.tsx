'use client';

import Layout from '@/components/Layout';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Globe, Shield, ChevronsDown } from 'lucide-react';
import React from 'react';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[2px] w-20 bg-red-600" />
            <span className="text-red-600 font-black tracking-[0.5em] uppercase text-sm italic">Genesis of a New Era</span>
            <div className="h-[2px] w-20 bg-red-600" />
          </div>

          <h1 className="text-8xl md:text-[12rem] font-black italic tracking-tighter leading-[0.8] mb-12">
            GRIDSENSE<br />
            <span className="text-transparent outline-text">2026 EDITION</span>
          </h1>

          <p className="max-w-xl mx-auto text-white/40 text-lg font-medium leading-relaxed uppercase tracking-widest">
            The multi-agent causal intelligence engine for the next generation of Formula 1.
          </p>
        </motion.div>

        {/* Animated Background Elements */}
        <motion.div
          style={{ y }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 opacity-20 pointer-events-none"
        >
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.1)_0%,transparent_70%)] blur-3xl" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
        >
          <ChevronsDown size={32} />
        </motion.div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24">
        <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-red-600" />
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-red-600">The 2026 Evolution</h2>
            </div>
            <h3 className="text-6xl font-black italic tracking-tighter uppercase">Intelligence Pillars</h3>
          </div>
          <p className="max-w-md text-white/40 text-sm leading-relaxed italic">
            "GridSense models every variable of the 2026 regulations, from aero-mapping to power-unit thermal efficiency."
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureItem
            icon={Zap}
            title="Causal Intelligence"
            desc="Predict the butterfly effect of every on-track decision using our distributed agent network."
          />
          <FeatureItem
            icon={Globe}
            title="Real-time Telemetry"
            desc="Sub-millisecond latency ingestion from the FastF1 data layer directly into the 2026 simulation buffer."
          />
          <FeatureItem
            icon={Shield}
            title="Rule Governance"
            desc="Dynamic rule enforcement mirroring the FIA 2026 Sporting Regulations."
          />
        </div>
      </section>
    </Layout>
  );
}

function FeatureItem({ icon: Icon, title, desc }: any) {
  return (
    <div className="space-y-6 group">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-600/10 group-hover:border-red-600/20 transition-all">
        <Icon className="text-white/40 group-hover:text-red-600 transition-colors" size={32} />
      </div>
      <h4 className="text-2xl font-black italic uppercase tracking-tighter">{title}</h4>
      <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
