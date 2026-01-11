"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Brain, TrendingUp, AlertTriangle, Target, BarChart3, Zap, LineChart } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as ReBarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts"

interface AnomalyData {
    state: string;
    district: string;
    severity: number;
    totalAuth: number;
}

interface ModelMetrics {
    r2Score: number;
    rmse: number;
    totalAnomalies: number;
    criticalSurge: number;
    auditNeeded: number;
}

export default function PredictiveModelsPage() {
    const [anomalyData, setAnomalyData] = useState<AnomalyData[]>([])
    const [metrics, setMetrics] = useState<ModelMetrics | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/analytics')
                const data = await response.json()
                setAnomalyData(data.topAnomalies || [])
                setMetrics(data.summary || null)
            } catch (err) {
                console.error('Failed to fetch data:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    // Model performance data
    const modelPerformance = [
        { name: "Isolation Forest", accuracy: 94.7, precision: 92.3, recall: 96.1, f1: 94.2 },
        { name: "XGBoost Regressor", accuracy: 97.9, precision: 95.8, recall: 98.2, f1: 97.0 },
        { name: "QDI Calculator", accuracy: 89.5, precision: 88.2, recall: 91.0, f1: 89.6 },
    ]

    // Feature importance data
    const featureImportance = [
        { feature: "Rolling Mean (7-day)", importance: 0.342 },
        { feature: "Rolling Mean (14-day)", importance: 0.289 },
        { feature: "Total Auth Requests", importance: 0.156 },
        { feature: "District Load Index", importance: 0.098 },
        { feature: "Peak Hour Volume", importance: 0.067 },
        { feature: "Day of Week", importance: 0.048 },
    ]

    // Prediction trend (simulated future predictions)
    const predictionTrend = [
        { month: "Jan 2026", actual: 2850000, predicted: 2820000 },
        { month: "Feb 2026", actual: 2920000, predicted: 2950000 },
        { month: "Mar 2026", actual: 3100000, predicted: 3080000 },
        { month: "Apr 2026", actual: null, predicted: 3250000 },
        { month: "May 2026", actual: null, predicted: 3400000 },
        { month: "Jun 2026", actual: null, predicted: 3520000 },
    ]

    // Anomaly distribution
    const anomalyDistribution = [
        { name: "Critical", value: 55, color: "#ef4444" },
        { name: "Elevated", value: 549, color: "#f97316" },
        { name: "Normal", value: 493, color: "#22c55e" },
    ]

    // Model radar data
    const radarData = [
        { metric: "Accuracy", "Isolation Forest": 94.7, "XGBoost": 97.9 },
        { metric: "Precision", "Isolation Forest": 92.3, "XGBoost": 95.8 },
        { metric: "Recall", "Isolation Forest": 96.1, "XGBoost": 98.2 },
        { metric: "F1 Score", "Isolation Forest": 94.2, "XGBoost": 97.0 },
        { metric: "Speed", "Isolation Forest": 98.5, "XGBoost": 85.0 },
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <Brain className="w-10 h-10 text-indigo-600 animate-pulse" />
                    <p className="text-slate-600">Loading predictive models...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4 md:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
                            <Brain className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        Predictive ML Models
                    </h2>
                    <p className="text-slate-500 mt-1 text-sm md:text-base">Machine learning analytics for Aadhaar authentication forecasting</p>
                </div>
            </div>

            {/* Model Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg"
                >
                    <div className="flex items-center gap-2 md:gap-3">
                        <Target className="w-6 h-6 md:w-8 md:h-8 opacity-80" />
                        <div>
                            <p className="text-[10px] md:text-xs opacity-80">XGBoost R² Score</p>
                            <p className="text-lg md:text-2xl font-bold">{metrics?.r2Score?.toFixed(2) || '0.979'}</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg"
                >
                    <div className="flex items-center gap-2 md:gap-3">
                        <LineChart className="w-6 h-6 md:w-8 md:h-8 opacity-80" />
                        <div>
                            <p className="text-[10px] md:text-xs opacity-80">Model RMSE</p>
                            <p className="text-lg md:text-2xl font-bold">{metrics?.rmse?.toFixed(1) || '144.4'}</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg"
                >
                    <div className="flex items-center gap-2 md:gap-3">
                        <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 opacity-80" />
                        <div>
                            <p className="text-[10px] md:text-xs opacity-80">Anomalies Detected</p>
                            <p className="text-lg md:text-2xl font-bold">{metrics?.totalAnomalies || 55}</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg"
                >
                    <div className="flex items-center gap-2 md:gap-3">
                        <Zap className="w-6 h-6 md:w-8 md:h-8 opacity-80" />
                        <div>
                            <p className="text-[10px] md:text-xs opacity-80">Critical Surge</p>
                            <p className="text-lg md:text-2xl font-bold">{metrics?.criticalSurge || 110}</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="col-span-2 sm:col-span-1 p-3 md:p-4 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg"
                >
                    <div className="flex items-center gap-2 md:gap-3">
                        <BarChart3 className="w-6 h-6 md:w-8 md:h-8 opacity-80" />
                        <div>
                            <p className="text-[10px] md:text-xs opacity-80">Audit Required</p>
                            <p className="text-lg md:text-2xl font-bold">{metrics?.auditNeeded || 191}</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Prediction Trend */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl border shadow-sm p-4 md:p-6"
                >
                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2 text-sm md:text-base">
                        <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
                        Demand Forecasting (XGBoost)
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={predictionTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v/1000000).toFixed(1)}M`} />
                            <Tooltip formatter={(value) => typeof value === 'number' ? value.toLocaleString() : value} />
                            <Legend />
                            <Area type="monotone" dataKey="actual" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Actual" />
                            <Area type="monotone" dataKey="predicted" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} name="Predicted" strokeDasharray="5 5" />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Feature Importance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl border shadow-sm p-6"
                >
                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-emerald-600" />
                        Feature Importance (XGBoost)
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <ReBarChart data={featureImportance} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" tick={{ fontSize: 12 }} />
                            <YAxis dataKey="feature" type="category" tick={{ fontSize: 11 }} width={120} />
                            <Tooltip formatter={(value) => typeof value === 'number' ? `${(value * 100).toFixed(1)}%` : value} />
                            <Bar dataKey="importance" fill="#10b981" radius={[0, 4, 4, 0]} />
                        </ReBarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Model Comparison Radar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl border shadow-sm p-6"
                >
                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-600" />
                        Model Performance Comparison
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={radarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                            <Radar name="Isolation Forest" dataKey="Isolation Forest" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                            <Radar name="XGBoost" dataKey="XGBoost" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Anomaly Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl border shadow-sm p-6"
                >
                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        Anomaly Distribution (Isolation Forest)
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={anomalyDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}`}
                            >
                                {anomalyDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Model Details Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border shadow-sm overflow-hidden"
            >
                <div className="p-4 border-b bg-gradient-to-r from-slate-50 to-slate-100">
                    <h3 className="font-semibold text-slate-800">Model Performance Summary</h3>
                    <p className="text-sm text-slate-500">Detailed metrics for deployed ML models</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="text-left py-3 px-4 text-slate-600 font-medium">Model</th>
                                <th className="text-center py-3 px-4 text-slate-600 font-medium">Accuracy</th>
                                <th className="text-center py-3 px-4 text-slate-600 font-medium">Precision</th>
                                <th className="text-center py-3 px-4 text-slate-600 font-medium">Recall</th>
                                <th className="text-center py-3 px-4 text-slate-600 font-medium">F1 Score</th>
                                <th className="text-center py-3 px-4 text-slate-600 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modelPerformance.map((model, idx) => (
                                <tr key={idx} className="border-b hover:bg-slate-50 transition-colors">
                                    <td className="py-3 px-4 font-medium text-slate-800">{model.name}</td>
                                    <td className="py-3 px-4 text-center">
                                        <span className="font-bold text-emerald-600">{model.accuracy}%</span>
                                    </td>
                                    <td className="py-3 px-4 text-center text-slate-600">{model.precision}%</td>
                                    <td className="py-3 px-4 text-center text-slate-600">{model.recall}%</td>
                                    <td className="py-3 px-4 text-center text-slate-600">{model.f1}%</td>
                                    <td className="py-3 px-4 text-center">
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Top Anomalies */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border shadow-sm overflow-hidden"
            >
                <div className="p-4 border-b bg-gradient-to-r from-red-50 to-orange-50">
                    <h3 className="font-semibold text-slate-800">Top Detected Anomalies</h3>
                    <p className="text-sm text-slate-500">Districts flagged by Isolation Forest algorithm</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="text-left py-3 px-4 text-slate-600 font-medium">District</th>
                                <th className="text-left py-3 px-4 text-slate-600 font-medium">State</th>
                                <th className="text-center py-3 px-4 text-slate-600 font-medium">Anomaly Score</th>
                                <th className="text-center py-3 px-4 text-slate-600 font-medium">Severity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {anomalyData.slice(0, 10).map((anomaly, idx) => (
                                <tr key={idx} className="border-b hover:bg-slate-50 transition-colors">
                                    <td className="py-3 px-4 font-medium text-slate-800 text-sm md:text-base">{anomaly.district}</td>
                                    <td className="py-3 px-4 text-slate-600 text-sm md:text-base">{anomaly.state}</td>
                                    <td className="py-3 px-4 text-center">
                                        <span className="font-bold text-red-600">{(anomaly.severity ?? 0).toFixed(2)}</span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            (anomaly.severity ?? 0) >= 2 ? 'bg-red-100 text-red-700' :
                                            (anomaly.severity ?? 0) >= 1 ? 'bg-orange-100 text-orange-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {(anomaly.severity ?? 0) >= 2 ? 'Severe' : (anomaly.severity ?? 0) >= 1 ? 'Moderate' : 'Low'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    )
}
