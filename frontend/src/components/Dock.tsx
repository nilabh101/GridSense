'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Home,
    Search,
    Zap,
    ShieldAlert,
    Activity,
    Radio,
    Globe,
    Calendar,
    History,
    Users
} from 'lucide-react';

const icons = [
    { id: 'home', icon: Home, label: 'Dashboard', href: '/' },
    { id: 'explorer', icon: Search, label: 'Race Explorer', href: '/race-explorer' },
    { id: 'simulator', icon: Zap, label: 'What-If', href: '/what-if' },
    { id: 'stewards', icon: ShieldAlert, label: 'Steward AI', href: '/stewards' },
    { id: 'telemetry', icon: Activity, label: 'Telemetry', href: '/telemetry-explorer' },
    { id: 'radio', icon: Radio, label: 'Psychology', href: '/radio-psychology' },
    { id: 'teams', icon: Globe, label: 'Teams', href: '/teams' },
    { id: 'calendar', icon: Calendar, label: 'Calendar', href: '/calendar' },
    { id: 'roster', icon: Users, label: 'Roster', href: '/roster' },
    { id: 'legends', icon: History, label: 'Legends', href: '/legends' },
];

export default function Dock() {
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-3 px-4 py-3 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl z-[100]"
        >
            {icons.map((item) => (
                <DockIcon key={item.id} mouseX={mouseX} {...item} />
            ))}
        </motion.div>
    );
}

function DockIcon({ mouseX, icon: Icon, label, href }: any) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [48, 100, 48]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });

    return (
        <Link href={href}>
            <motion.div
                ref={ref}
                style={{ width }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors group"
            >
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: -45, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            className="absolute pointer-events-none px-3 py-1 rounded-lg bg-white text-black text-[10px] font-bold uppercase tracking-widest whitespace-nowrap"
                        >
                            {label}
                            <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                        </motion.div>
                    )}
                </AnimatePresence>
                <Icon className="text-white/70 group-hover:text-white" size={24} />
            </motion.div>
        </Link>
    );
}
