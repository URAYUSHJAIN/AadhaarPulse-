"use client"

import { motion } from "framer-motion"
import { Shield, Activity, Zap, Database, Server, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface LiveStatsProps {
    totalAuth: number;
    districts: number;
    anomalies: number;
    criticalSurge: number;
}

export function LiveStatsBar({ totalAuth, districts, anomalies, criticalSurge }: LiveStatsProps) {
    const [currentTime, setCurrentTime] = useState(new Date())
    const uptime = 99.97

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const stats = [
        {
            icon: <Database className="w-4 h-4" />,
            label: "Total Auth Processed",
            value: totalAuth.toLocaleString(),
            color: "text-blue-400",
        },
        {
            icon: <Activity className="w-4 h-4" />,
            label: "Active Districts",
            value: districts.toString(),
            color: "text-green-400",
        },
        {
            icon: <AlertCircle className="w-4 h-4" />,
            label: "Anomalies Detected",
            value: anomalies.toString(),
            color: "text-red-400",
        },
        {
            icon: <Zap className="w-4 h-4" />,
            label: "Critical Surge",
            value: criticalSurge.toString(),
            color: "text-orange-400",
        },
        {
            icon: <Server className="w-4 h-4" />,
            label: "System Uptime",
            value: `${uptime}%`,
            color: "text-emerald-400",
        },
    ]

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-slate-900 border-b border-slate-800 px-6 py-3"
        >
            <div className="flex items-center justify-between">
                {/* Logo & Status */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-white font-bold text-sm">AadhaarPulse</h1>
                            <p className="text-[10px] text-slate-500">v2.0 Intelligence</p>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-slate-700" />
                    <div className="flex items-center gap-2">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-green-500"
                        />
                        <span className="text-xs text-green-400">All Systems Operational</span>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-2"
                        >
                            <span className={stat.color}>{stat.icon}</span>
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase">{stat.label}</p>
                                <p className={`text-sm font-bold ${stat.color}`}>{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Time */}
                <div className="text-right">
                    <p className="text-white font-mono text-sm">
                        {currentTime.toLocaleTimeString('en-IN', { hour12: false })}
                    </p>
                    <p className="text-[10px] text-slate-500">
                        {currentTime.toLocaleDateString('en-IN', { 
                            day: '2-digit', 
                            month: 'short', 
                            year: 'numeric' 
                        })}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
