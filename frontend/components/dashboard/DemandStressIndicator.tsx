"use client"

import { motion } from "framer-motion"
import { AlertTriangle, TrendingUp, MapPin } from "lucide-react"

interface TopSurgeDistrict {
    state: string;
    district: string;
    surgeScore: number;
    avgDemand: number;
    peakDemand: number;
    growthRate: number;
}

interface DemandStressIndicatorProps {
    criticalCount: number;
    elevatedCount: number;
    normalCount: number;
    highLoad: number;
    moderateLoad: number;
    topSurgeDistricts: TopSurgeDistrict[];
}

export function DemandStressIndicator({
    criticalCount,
    elevatedCount,
    normalCount,
    highLoad,
    moderateLoad,
    topSurgeDistricts
}: DemandStressIndicatorProps) {
    const totalDistricts = criticalCount + elevatedCount + normalCount;
    const loadPercent = Math.round(((criticalCount * 3 + elevatedCount * 2 + normalCount) / (totalDistricts * 3)) * 100);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-xl border bg-white shadow-sm flex flex-col h-full relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <AlertTriangle className="w-24 h-24 text-red-500" />
            </div>

            <div className="space-y-1">
                <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-destructive" />
                    <h3 className="font-semibold text-lg text-foreground">Demand Stress</h3>
                </div>
                <p className="text-sm text-muted-foreground">Predicted high-load zones (Next 30 Days)</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                    <div className="text-xs text-red-600 uppercase font-semibold">Critical Surge</div>
                    <div className="text-xl font-bold text-red-900 mt-1">{criticalCount} Districts</div>
                    <div className="text-xs text-red-700/80 mt-1">Immediate Action</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="text-xs text-orange-600 uppercase font-semibold">Elevated Surge</div>
                    <div className="text-xl font-bold text-orange-900 mt-1">{elevatedCount} Districts</div>
                    <div className="text-xs text-orange-700/80 mt-1">Watchlist Active</div>
                </div>
            </div>

            {/* Top Critical Districts */}
            {topSurgeDistricts.length > 0 && (
                <div className="mt-4 flex-1">
                    <div className="text-xs text-slate-500 uppercase font-semibold mb-2">Top Critical Districts</div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                        {topSurgeDistricts.map((district, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded">
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-3 h-3 text-red-500" />
                                    <span className="font-medium text-slate-700 truncate max-w-[100px]">
                                        {district.district}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-500">{district.state.slice(0, 10)}</span>
                                    <span className="text-red-600 font-bold">{district.surgeScore.toFixed(0)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Load Distribution</span>
                    <span className="font-medium text-slate-700">{loadPercent}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-orange-400 to-red-600 transition-all duration-500" 
                        style={{ width: `${loadPercent}%` }}
                    />
                </div>
                <div className="flex justify-between text-xs mt-2 text-slate-500">
                    <span>High: {highLoad}</span>
                    <span>Moderate: {moderateLoad}</span>
                </div>
            </div>
        </motion.div>
    )
}
