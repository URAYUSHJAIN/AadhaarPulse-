
"use client"

import { motion } from "framer-motion"
import { BarChart3, TrendingUp, AlertTriangle, Activity } from "lucide-react"

interface StateData {
    state: string;
    totalAuth: number;
    districts: number;
    anomalies: number;
    avgQDI: number;
    criticalSurge: number;
}

interface TopSurge {
    state: string;
    district: string;
    surgeScore: number;
    avgDemand: number;
    peakDemand: number;
    growthRate: number;
}

interface CentralMapProps {
    stateData: StateData[];
    topSurge: TopSurge[];
}

export function CentralMap({ stateData, topSurge }: CentralMapProps) {
    const formatNumber = (num: number) => {
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
        if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
        return num.toString();
    };

    const topStates = stateData.slice(0, 8);
    const maxAuth = Math.max(...topStates.map(s => s.totalAuth));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative w-full h-[400px] bg-slate-50 rounded-xl border border-border overflow-hidden p-4"
        >
            <div className="flex h-full gap-4">
                {/* State Rankings */}
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                        <BarChart3 className="w-4 h-4 text-indigo-600" />
                        <h3 className="text-sm font-semibold text-slate-700">Top States by Authentication Volume</h3>
                    </div>
                    <div className="flex-1 space-y-2 overflow-y-auto pr-2">
                        {topStates.map((state, idx) => (
                            <div key={idx} className="group">
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="font-medium text-slate-700 truncate max-w-[150px]" title={state.state}>
                                        {idx + 1}. {state.state}
                                    </span>
                                    <span className="text-slate-500">{formatNumber(state.totalAuth)}</span>
                                </div>
                                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(state.totalAuth / maxAuth) * 100}%` }}
                                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                                        className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full"
                                    />
                                </div>
                                <div className="flex gap-3 mt-1 text-[10px] text-slate-400">
                                    <span>{state.districts} districts</span>
                                    {state.anomalies > 0 && (
                                        <span className="text-red-500">{state.anomalies} anomalies</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="w-px bg-slate-200" />

                {/* Critical Surge Districts */}
                <div className="w-64 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <h3 className="text-sm font-semibold text-slate-700">Critical Surge Districts</h3>
                    </div>
                    <div className="flex-1 space-y-2 overflow-y-auto">
                        {topSurge.slice(0, 6).map((district, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-2 bg-white rounded-lg border border-slate-200 hover:border-red-200 hover:bg-red-50/30 transition-colors"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-xs font-semibold text-slate-800">{district.district}</p>
                                        <p className="text-[10px] text-slate-500">{district.state}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-red-600">{district.surgeScore.toFixed(0)}</p>
                                        <p className="text-[10px] text-slate-400">surge</p>
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center gap-2 text-[10px]">
                                    <span className="text-slate-500">Avg: {formatNumber(district.avgDemand)}</span>
                                    <span className="text-slate-500">Peak: {formatNumber(district.peakDemand)}</span>
                                    <span className={`flex items-center gap-0.5 ${district.growthRate > 0.5 ? 'text-red-500' : 'text-green-500'}`}>
                                        <TrendingUp className="w-2.5 h-2.5" />
                                        {(district.growthRate * 100).toFixed(0)}%
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Live indicator */}
            <div className="absolute top-4 right-4 inline-flex items-center space-x-2 px-3 py-1 bg-white rounded-full border shadow-sm text-xs font-medium text-slate-600">
                <Activity className="w-3 h-3 text-emerald-500" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live Data</span>
            </div>

            {/* Abstract background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900" fill="currentColor">
                    <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="0.5" className="text-slate-300" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
            </div>
        </motion.div>
    )
}
