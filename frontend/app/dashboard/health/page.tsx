"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Activity, Server, Database, Cpu, HardDrive, Wifi, CheckCircle2, AlertCircle, Clock, Zap, RefreshCw, Shield } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line } from "recharts"

export default function SystemHealthPage() {
    const [metrics, setMetrics] = useState({
        cpuUsage: 45,
        memoryUsage: 62,
        diskUsage: 38,
        networkLatency: 23
    })

    // Simulate real-time metrics
    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics({
                cpuUsage: Math.floor(40 + Math.random() * 30),
                memoryUsage: Math.floor(55 + Math.random() * 20),
                diskUsage: Math.floor(35 + Math.random() * 10),
                networkLatency: Math.floor(15 + Math.random() * 20)
            })
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    // Historical performance data
    const performanceHistory = [
        { time: "00:00", cpu: 42, memory: 58, requests: 1200 },
        { time: "04:00", cpu: 38, memory: 55, requests: 800 },
        { time: "08:00", cpu: 55, memory: 65, requests: 2500 },
        { time: "12:00", cpu: 72, memory: 78, requests: 4200 },
        { time: "16:00", cpu: 68, memory: 72, requests: 3800 },
        { time: "20:00", cpu: 52, memory: 62, requests: 2100 },
        { time: "Now", cpu: metrics.cpuUsage, memory: metrics.memoryUsage, requests: 1800 },
    ]

    // API response times
    const apiResponseTimes = [
        { endpoint: "/api/analytics", avgTime: 145, p99Time: 320, status: "healthy" },
        { endpoint: "/api/anomalies", avgTime: 89, p99Time: 180, status: "healthy" },
        { endpoint: "/api/forecast", avgTime: 234, p99Time: 450, status: "warning" },
        { endpoint: "/api/qdi", avgTime: 67, p99Time: 120, status: "healthy" },
        { endpoint: "/api/surge", avgTime: 112, p99Time: 240, status: "healthy" },
    ]

    // Recent events
    const recentEvents = [
        { time: "2 min ago", event: "ML Pipeline completed batch inference", type: "success" },
        { time: "15 min ago", event: "Data sync completed from UIDAI source", type: "success" },
        { time: "1 hour ago", event: "Anomaly detection model retrained", type: "info" },
        { time: "3 hours ago", event: "High memory usage alert cleared", type: "warning" },
        { time: "6 hours ago", event: "Scheduled maintenance completed", type: "info" },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case "operational":
            case "healthy":
            case "success":
                return "text-green-600 bg-green-100"
            case "warning":
                return "text-orange-600 bg-orange-100"
            case "error":
                return "text-red-600 bg-red-100"
            default:
                return "text-gray-600 bg-gray-100"
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        System Health Monitor
                    </h2>
                    <p className="text-slate-500 mt-1">Real-time infrastructure and service monitoring</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                </button>
            </div>

            {/* Service Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-white border shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-indigo-100">
                                <Server className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">API Server</p>
                                <p className="font-semibold text-slate-800">Operational</p>
                            </div>
                        </div>
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 rounded-xl bg-white border shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-purple-100">
                                <Database className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Database</p>
                                <p className="font-semibold text-slate-800">Operational</p>
                            </div>
                        </div>
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 rounded-xl bg-white border shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-emerald-100">
                                <Zap className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">ML Pipeline</p>
                                <p className="font-semibold text-slate-800">Operational</p>
                            </div>
                        </div>
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 rounded-xl bg-white border shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-cyan-100">
                                <Shield className="w-5 h-5 text-cyan-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Data Ingestion</p>
                                <p className="font-semibold text-slate-800">Operational</p>
                            </div>
                        </div>
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                </motion.div>
            </div>

            {/* Resource Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg"
                >
                    <div className="flex items-center justify-between mb-4">
                        <Cpu className="w-8 h-8 opacity-80" />
                        <span className="text-3xl font-bold">{metrics.cpuUsage}%</span>
                    </div>
                    <p className="text-sm opacity-80">CPU Usage</p>
                    <div className="mt-2 w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-white rounded-full transition-all duration-500"
                            style={{ width: `${metrics.cpuUsage}%` }}
                        />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg"
                >
                    <div className="flex items-center justify-between mb-4">
                        <HardDrive className="w-8 h-8 opacity-80" />
                        <span className="text-3xl font-bold">{metrics.memoryUsage}%</span>
                    </div>
                    <p className="text-sm opacity-80">Memory Usage</p>
                    <div className="mt-2 w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-white rounded-full transition-all duration-500"
                            style={{ width: `${metrics.memoryUsage}%` }}
                        />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg"
                >
                    <div className="flex items-center justify-between mb-4">
                        <Database className="w-8 h-8 opacity-80" />
                        <span className="text-3xl font-bold">{metrics.diskUsage}%</span>
                    </div>
                    <p className="text-sm opacity-80">Disk Usage</p>
                    <div className="mt-2 w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-white rounded-full transition-all duration-500"
                            style={{ width: `${metrics.diskUsage}%` }}
                        />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg"
                >
                    <div className="flex items-center justify-between mb-4">
                        <Wifi className="w-8 h-8 opacity-80" />
                        <span className="text-3xl font-bold">{metrics.networkLatency}ms</span>
                    </div>
                    <p className="text-sm opacity-80">Network Latency</p>
                    <div className="mt-2 w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-white rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(metrics.networkLatency * 2, 100)}%` }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Performance History */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl border shadow-sm p-6"
                >
                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-indigo-600" />
                        System Performance (24h)
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={performanceHistory}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="CPU %" />
                            <Area type="monotone" dataKey="memory" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} name="Memory %" />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Request Volume */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl border shadow-sm p-6"
                >
                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Server className="w-5 h-5 text-emerald-600" />
                        Request Volume (24h)
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={performanceHistory}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="requests" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} name="Requests" />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* API Response Times & Events */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* API Endpoints */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl border shadow-sm overflow-hidden"
                >
                    <div className="p-4 border-b">
                        <h3 className="font-semibold text-slate-800">API Endpoint Health</h3>
                        <p className="text-sm text-slate-500">Response times and status</p>
                    </div>
                    <div className="divide-y">
                        {apiResponseTimes.map((api, idx) => (
                            <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50">
                                <div>
                                    <p className="font-medium text-slate-800 font-mono text-sm">{api.endpoint}</p>
                                    <p className="text-xs text-slate-500">Avg: {api.avgTime}ms | P99: {api.p99Time}ms</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(api.status)}`}>
                                    {api.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Events */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl border shadow-sm overflow-hidden"
                >
                    <div className="p-4 border-b">
                        <h3 className="font-semibold text-slate-800">Recent Events</h3>
                        <p className="text-sm text-slate-500">System activity log</p>
                    </div>
                    <div className="divide-y">
                        {recentEvents.map((event, idx) => (
                            <div key={idx} className="p-4 flex items-start gap-3 hover:bg-slate-50">
                                <div className={`p-1 rounded-full mt-1 ${getStatusColor(event.type)}`}>
                                    {event.type === "success" ? (
                                        <CheckCircle2 className="w-4 h-4" />
                                    ) : event.type === "warning" ? (
                                        <AlertCircle className="w-4 h-4" />
                                    ) : (
                                        <Clock className="w-4 h-4" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-slate-800">{event.event}</p>
                                    <p className="text-xs text-slate-500">{event.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
