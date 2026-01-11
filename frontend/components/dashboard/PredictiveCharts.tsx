"use client"

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingUp, MapPin } from 'lucide-react';

interface MonthlyTrend {
    month: string;
    demand: number;
    predicted: number;
}

interface AnomalyByState {
    state: string;
    count: number;
}

interface AttentionDistrict {
    state: string;
    district: string;
    priorityScore: number;
    priorityLevel: string;
    surgeLevel: string;
    qdiStatus: string;
    loadStatus: string;
    recommendation: string;
}

interface PredictiveChartsProps {
    monthlyTrend: MonthlyTrend[];
    anomalyByState: AnomalyByState[];
    attentionDistricts: AttentionDistrict[];
}

const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4'];

export function PredictiveCharts({ monthlyTrend, anomalyByState, attentionDistricts }: PredictiveChartsProps) {
    // Transform data for charts
    const demandData = monthlyTrend.map(item => ({
        name: item.month,
        historical: item.demand,
        predicted: item.predicted,
    }));

    const anomalyData = anomalyByState.map(item => ({
        name: item.state,
        anomalies: item.count,
    }));

    const getPriorityColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'critical': return 'bg-red-100 text-red-700 border-red-200';
            case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default: return 'bg-green-100 text-green-700 border-green-200';
        }
    };

    const getSurgeColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'critical': return 'text-red-600';
            case 'elevated': return 'text-orange-500';
            default: return 'text-green-600';
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Line Chart: Historical vs Predicted */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-xl border bg-white shadow-sm"
                >
                    <div className="mb-6 flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-500" />
                                Demand Forecast (XGBoost)
                            </h3>
                            <p className="text-sm text-slate-500">Monthly trends vs. AI-predicted demand | R² = 0.979</p>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={demandData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                    itemStyle={{ fontSize: '12px' }}
                                    formatter={(value) => [Number(value).toLocaleString(), '']}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="historical" stroke="#64748b" strokeWidth={2} dot={false} name="Actual Demand" />
                                <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: '#3b82f6' }} name="Predicted" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Bar Chart: Anomalies by State */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 rounded-xl border bg-white shadow-sm"
                >
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            Anomaly Detection (Isolation Forest)
                        </h3>
                        <p className="text-sm text-slate-500">States with behavioral anomalies detected by ML model</p>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={anomalyData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} width={100} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                    cursor={{ fill: '#f1f5f9' }}
                                />
                                <Bar dataKey="anomalies" radius={[0, 4, 4, 0]} barSize={20} name="Anomalies">
                                    {anomalyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Priority Districts Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 rounded-xl border bg-white shadow-sm"
            >
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-indigo-500" />
                        Priority Action Districts
                    </h3>
                    <p className="text-sm text-slate-500">Districts requiring immediate governance intervention</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th className="text-left py-3 px-2 text-slate-600 font-medium">District</th>
                                <th className="text-left py-3 px-2 text-slate-600 font-medium">State</th>
                                <th className="text-center py-3 px-2 text-slate-600 font-medium">Priority</th>
                                <th className="text-center py-3 px-2 text-slate-600 font-medium">Surge</th>
                                <th className="text-center py-3 px-2 text-slate-600 font-medium">QDI</th>
                                <th className="text-center py-3 px-2 text-slate-600 font-medium">Load</th>
                                <th className="text-left py-3 px-2 text-slate-600 font-medium">Recommendation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attentionDistricts.slice(0, 10).map((district, idx) => (
                                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                    <td className="py-3 px-2 font-medium text-slate-800">{district.district}</td>
                                    <td className="py-3 px-2 text-slate-600">{district.state}</td>
                                    <td className="py-3 px-2 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(district.priorityLevel)}`}>
                                            {district.priorityLevel}
                                        </span>
                                    </td>
                                    <td className={`py-3 px-2 text-center font-medium ${getSurgeColor(district.surgeLevel)}`}>
                                        {district.surgeLevel}
                                    </td>
                                    <td className="py-3 px-2 text-center text-slate-600">{district.qdiStatus}</td>
                                    <td className="py-3 px-2 text-center text-slate-600">{district.loadStatus}</td>
                                    <td className="py-3 px-2 text-slate-500 text-xs max-w-[200px] truncate" title={district.recommendation}>
                                        {district.recommendation}
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
