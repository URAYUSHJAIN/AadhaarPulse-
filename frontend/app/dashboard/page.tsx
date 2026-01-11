"use client"

import { useEffect, useState } from "react"
import { Users, MapPin, Activity, Loader2, Brain, TrendingUp, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { DemandStressIndicator } from "@/components/dashboard/DemandStressIndicator"
import { CentralMap } from "@/components/dashboard/CentralMap"
import { PredictiveCharts } from "@/components/dashboard/PredictiveCharts"
import { PolicyBriefs } from "@/components/dashboard/PolicyBriefs"
import { IndiaHeatmap } from "@/components/dashboard/IndiaHeatmap"
import { AIInsightsPanel } from "@/components/dashboard/AIInsightsPanel"
import { AnalyticsData, formatNumber } from "@/lib/analytics"
import { staticAnalyticsData } from "@/lib/staticData"

export default function DashboardPage() {
    const [data, setData] = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<'overview' | 'heatmap'>('overview')

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/analytics')
                if (!response.ok) throw new Error('Failed to fetch analytics data')
                const analyticsData = await response.json()
                setData(analyticsData)
            } catch (err) {
                // Fallback to static data if API fails
                console.log('Using static data fallback')
                setData(staticAnalyticsData as AnalyticsData)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Brain className="w-8 h-8 text-indigo-600" />
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-slate-800 font-semibold">Initializing AI Engine</p>
                        <p className="text-slate-500 text-sm">Processing 3.9M+ records...</p>
                    </div>
                </motion.div>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center">
                    <p className="text-red-600 font-medium">Failed to load analytics</p>
                    <p className="text-slate-500 text-sm mt-1">Please refresh the page</p>
                </div>
            </div>
        )
    }

    const { summary, qdiStats, topSurge, anomalyByState, monthlyTrend, policyBriefs, attentionDistricts, stateData } = data

    return (
        <div className="space-y-4 md:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <motion.h2 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2 md:gap-3"
                    >
                        <div className="p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
                            <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        AadhaarPulse Intelligence
                    </motion.h2>
                    <p className="text-slate-500 mt-1 text-xs md:text-sm">Real-time governance • Predictive analytics • ML-powered</p>
                </div>
                <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                    {/* View Toggle */}
                    <div className="flex bg-slate-100 rounded-lg p-1">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-md transition-all ${
                                activeTab === 'overview' 
                                    ? 'bg-white text-indigo-600 shadow-sm' 
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('heatmap')}
                            className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-md transition-all ${
                                activeTab === 'heatmap' 
                                    ? 'bg-white text-indigo-600 shadow-sm' 
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            India Map
                        </button>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-50 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-green-200">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs md:text-sm font-medium text-green-700">Live</span>
                    </div>
                </div>
            </div>

            {/* AI Insights Panel */}
            <AIInsightsPanel summary={summary} />

            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                >
                    <p className="text-blue-100 text-xs md:text-sm">Total Authentications</p>
                    <p className="text-lg md:text-2xl font-bold mt-1">{formatNumber(summary.totalAuthentications)}</p>
                    <p className="text-blue-200 text-[10px] md:text-xs mt-1">Across {summary.totalDistricts} districts</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 text-white"
                >
                    <p className="text-red-100 text-xs md:text-sm">Anomalies Detected</p>
                    <p className="text-lg md:text-2xl font-bold mt-1">{summary.anomalyCount}</p>
                    <p className="text-red-200 text-[10px] md:text-xs mt-1">ML-flagged districts</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 text-white"
                >
                    <p className="text-amber-100 text-xs md:text-sm">Critical Surge Zones</p>
                    <p className="text-lg md:text-2xl font-bold mt-1">{summary.criticalSurge}</p>
                    <p className="text-amber-200 text-[10px] md:text-xs mt-1">Require immediate action</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white"
                >
                    <p className="text-purple-100 text-xs md:text-sm">Audit Required</p>
                    <p className="text-lg md:text-2xl font-bold mt-1">{summary.needsAudit}</p>
                    <p className="text-purple-200 text-[10px] md:text-xs mt-1">QDI flagged districts</p>
                </motion.div>
            </div>

            {activeTab === 'heatmap' ? (
                /* India Heatmap View */
                <IndiaHeatmap stateData={stateData} />
            ) : (
                /* Default Overview */
                <>
                    {/* Top Row: Metrics & Stress Indicator */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
                        {/* Metric Column (Takes 3 slots on large) */}
                        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
                            <MetricCard
                                title="Total Authentications"
                                value={formatNumber(summary.totalAuthentications)}
                                change={`${summary.anomalyCount} anomalies`}
                                trend="up"
                                icon={<Users className="w-4 h-4" />}
                            />
                            <MetricCard
                                title="Active Districts"
                                value={summary.totalDistricts.toString()}
                                description={`${summary.criticalSurge} Critical Surge`}
                                icon={<MapPin className="w-4 h-4" />}
                            />
                            <MetricCard
                                title="Quality Drift Index (QDI)"
                                value={summary.avgQDI.toFixed(2)}
                                change={`${summary.needsAudit} need audit`}
                                trend={summary.avgQDI < 5 ? "up" : "down"}
                                isQDI
                                description={`Good: ${qdiStats.good} | Critical: ${qdiStats.critical}`}
                                icon={<Activity className="w-4 h-4" />}
                            />

                            {/* Central Map with State Data */}
                            <div className="sm:col-span-3">
                                <CentralMap stateData={stateData} topSurge={topSurge} />
                            </div>
                        </div>

                        {/* Demand Stress Indicator (Sidebar intent) */}
                        <div className="lg:col-span-1 h-full">
                            <DemandStressIndicator
                                criticalCount={summary.criticalSurge}
                                elevatedCount={summary.elevatedSurge}
                                normalCount={summary.normalSurge}
                                highLoad={summary.highLoad}
                                moderateLoad={summary.moderateLoad}
                                topSurgeDistricts={topSurge.slice(0, 5)}
                            />
                        </div>
                    </div>
                </>
            )}

            {/* Analytics Panel */}
            <PredictiveCharts 
                monthlyTrend={monthlyTrend}
                anomalyByState={anomalyByState}
                attentionDistricts={attentionDistricts}
            />

            {/* Policy Briefs */}
            <PolicyBriefs briefs={policyBriefs} />

            {/* Footer */}
            <div className="text-center py-4 border-t border-slate-200">
                <p className="text-slate-500 text-xs md:text-sm">
                    AadhaarPulse v2.0 • Powered by XGBoost & Isolation Forest ML Models • 
                    <span className="text-indigo-600 font-medium"> Data: Mar-Dec 2025</span>
                </p>
            </div>
        </div>
    )
}
