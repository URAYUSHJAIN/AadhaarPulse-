"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Loader2, Filter, Search, Download, TrendingUp, AlertTriangle, Activity } from "lucide-react"
import { IndiaHeatmap } from "@/components/dashboard/IndiaHeatmap"

interface StateData {
    state: string;
    totalAuth: number;
    districts: number;
    anomalies: number;
    avgQDI: number;
}

interface DistrictData {
    state: string;
    district: string;
    surgeScore: number;
    surgeLevel: string;
    avgDemand: number;
    peakDemand: number;
    growthRate: number;
}

export default function GeoIntelligencePage() {
    const [stateData, setStateData] = useState<StateData[]>([])
    const [districtData, setDistrictData] = useState<DistrictData[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterLevel, setFilterLevel] = useState<string>("all")
    const [selectedState, setSelectedState] = useState<string>("all")

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/analytics')
                const data = await response.json()
                setStateData(data.stateData || [])
                setDistrictData(data.topSurge || [])
            } catch (err) {
                console.error('Failed to fetch data:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const filteredDistricts = districtData.filter(d => {
        const matchesSearch = d.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             d.state.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesLevel = filterLevel === "all" || d.surgeLevel === filterLevel
        const matchesState = selectedState === "all" || d.state === selectedState
        return matchesSearch && matchesLevel && matchesState
    })

    const uniqueStates = [...new Set(districtData.map(d => d.state))]

    const getSurgeLevelColor = (level: string) => {
        switch (level) {
            case 'Critical': return 'bg-red-100 text-red-700 border-red-200'
            case 'Elevated': return 'bg-orange-100 text-orange-700 border-orange-200'
            case 'Normal': return 'bg-green-100 text-green-700 border-green-200'
            default: return 'bg-gray-100 text-gray-700 border-gray-200'
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                    <p className="text-slate-600">Loading geo-intelligence data...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4 md:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2 md:gap-3">
                        <div className="p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                            <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        Geo-Intelligence Center
                    </h2>
                    <p className="text-slate-500 mt-1 text-sm md:text-base">Geographic distribution of Aadhaar authentication patterns</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm md:text-base w-full sm:w-auto">
                    <Download className="w-4 h-4" />
                    Export Map Data
                </button>
            </div>

            {/* India Heatmap */}
            <IndiaHeatmap stateData={stateData} />

            {/* Stats Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 md:p-4 rounded-xl bg-white border shadow-sm"
                >
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="p-1.5 md:p-2 rounded-lg bg-blue-100">
                            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs md:text-sm text-slate-500">Total States</p>
                            <p className="text-lg md:text-2xl font-bold text-slate-900">{stateData.length}</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-3 md:p-4 rounded-xl bg-white border shadow-sm"
                >
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="p-1.5 md:p-2 rounded-lg bg-red-100">
                            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
                        </div>
                        <div>
                            <p className="text-xs md:text-sm text-slate-500">Critical Zones</p>
                            <p className="text-lg md:text-2xl font-bold text-slate-900">
                                {districtData.filter(d => d.surgeLevel === 'Critical').length}
                            </p>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-3 md:p-4 rounded-xl bg-white border shadow-sm"
                >
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="p-1.5 md:p-2 rounded-lg bg-orange-100">
                            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-xs md:text-sm text-slate-500">Elevated Zones</p>
                            <p className="text-lg md:text-2xl font-bold text-slate-900">
                                {districtData.filter(d => d.surgeLevel === 'Elevated').length}
                            </p>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-3 md:p-4 rounded-xl bg-white border shadow-sm"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-100">
                            <Activity className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Avg Surge Score</p>
                            <p className="text-2xl font-bold text-slate-900">
                                {(districtData.reduce((a, b) => a + b.surgeScore, 0) / districtData.length).toFixed(1)}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl border">
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search districts or states..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <select
                        value={filterLevel}
                        onChange={(e) => setFilterLevel(e.target.value)}
                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="all">All Levels</option>
                        <option value="Critical">Critical</option>
                        <option value="Elevated">Elevated</option>
                        <option value="Normal">Normal</option>
                    </select>
                </div>
                <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="all">All States</option>
                    {uniqueStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
            </div>

            {/* District Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border shadow-sm overflow-hidden"
            >
                <div className="p-4 border-b">
                    <h3 className="font-semibold text-slate-800">District Surge Analysis</h3>
                    <p className="text-sm text-slate-500">Showing {filteredDistricts.length} districts</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="text-left py-3 px-4 text-slate-600 font-medium">District</th>
                                <th className="text-left py-3 px-4 text-slate-600 font-medium">State</th>
                                <th className="text-center py-3 px-4 text-slate-600 font-medium">Surge Score</th>
                                <th className="text-center py-3 px-4 text-slate-600 font-medium">Level</th>
                                <th className="text-center py-3 px-4 text-slate-600 font-medium">Avg Demand</th>
                                <th className="text-center py-3 px-4 text-slate-600 font-medium">Peak Demand</th>
                                <th className="text-center py-3 px-4 text-slate-600 font-medium">Growth Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDistricts.slice(0, 20).map((district, idx) => (
                                <tr key={idx} className="border-b hover:bg-slate-50 transition-colors">
                                    <td className="py-3 px-4 font-medium text-slate-800">{district.district}</td>
                                    <td className="py-3 px-4 text-slate-600">{district.state}</td>
                                    <td className="py-3 px-4 text-center">
                                        <span className="font-bold text-indigo-600">{district.surgeScore.toFixed(1)}</span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSurgeLevelColor(district.surgeLevel)}`}>
                                            {district.surgeLevel}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center text-slate-600">
                                        {district.avgDemand.toLocaleString()}
                                    </td>
                                    <td className="py-3 px-4 text-center text-slate-600">
                                        {district.peakDemand.toLocaleString()}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <span className={`font-medium ${district.growthRate > 0.5 ? 'text-red-600' : 'text-green-600'}`}>
                                            {(district.growthRate * 100).toFixed(1)}%
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
