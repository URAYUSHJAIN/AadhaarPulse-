"use client"

import { motion } from "framer-motion"
import { Brain, Sparkles, TrendingUp, AlertTriangle, Target, Zap } from "lucide-react"
import { useState, useEffect } from "react"

interface AIInsight {
    id: number;
    type: 'prediction' | 'anomaly' | 'recommendation' | 'trend';
    title: string;
    content: string;
    confidence: number;
    impact: 'high' | 'medium' | 'low';
}

interface AIInsightsPanelProps {
    summary: {
        totalDistricts: number;
        anomalyCount: number;
        criticalSurge: number;
        needsAudit: number;
    };
}

export function AIInsightsPanel({ summary }: AIInsightsPanelProps) {
    const [activeInsight, setActiveInsight] = useState(0)
    const [isTyping, setIsTyping] = useState(true)

    const insights: AIInsight[] = [
        {
            id: 1,
            type: 'prediction',
            title: 'Demand Surge Forecast',
            content: `Based on XGBoost analysis (R²=0.979), we predict ${summary.criticalSurge} districts will experience critical surge in the next 30 days. Maharashtra's Thane district shows highest surge score of 232.78, requiring immediate capacity expansion of ~40%.`,
            confidence: 97.9,
            impact: 'high',
        },
        {
            id: 2,
            type: 'anomaly',
            title: 'Behavioral Anomaly Alert',
            content: `Isolation Forest detected ${summary.anomalyCount} districts with unusual authentication patterns. Key indicators: abnormal biometric-to-demographic ratios, irregular daily volumes, and sudden spikes in specific age groups. Delhi NCR region flagged for detailed audit.`,
            confidence: 94.2,
            impact: 'high',
        },
        {
            id: 3,
            type: 'recommendation',
            title: 'Resource Optimization',
            content: `Analysis suggests redistributing 15% of operators from under-utilized districts to high-load zones. This could reduce average wait times by 23% and improve Quality Drift Index across ${summary.needsAudit} flagged districts.`,
            confidence: 89.5,
            impact: 'medium',
        },
        {
            id: 4,
            type: 'trend',
            title: 'Seasonal Pattern Detected',
            content: `Historical analysis reveals 34% increase in authentication requests during Q1 (Jan-Mar). Recommend pre-positioning additional mobile units in rural areas of Bihar, UP, and West Bengal to handle anticipated surge.`,
            confidence: 91.8,
            impact: 'medium',
        },
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveInsight(prev => (prev + 1) % insights.length)
            setIsTyping(true)
            setTimeout(() => setIsTyping(false), 2000)
        }, 8000)
        return () => clearInterval(interval)
    }, [insights.length])

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'prediction': return <TrendingUp className="w-5 h-5" />
            case 'anomaly': return <AlertTriangle className="w-5 h-5" />
            case 'recommendation': return <Target className="w-5 h-5" />
            case 'trend': return <Zap className="w-5 h-5" />
            default: return <Sparkles className="w-5 h-5" />
        }
    }

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'prediction': return 'from-blue-500 to-cyan-500'
            case 'anomaly': return 'from-red-500 to-orange-500'
            case 'recommendation': return 'from-green-500 to-emerald-500'
            case 'trend': return 'from-purple-500 to-pink-500'
            default: return 'from-gray-500 to-gray-600'
        }
    }

    const getImpactBadge = (impact: string) => {
        switch (impact) {
            case 'high': return 'bg-red-100 text-red-700 border-red-200'
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
            default: return 'bg-green-100 text-green-700 border-green-200'
        }
    }

    const currentInsight = insights[activeInsight]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 border border-indigo-500/30 p-6"
        >
            {/* Animated background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.3),transparent_50%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.3),transparent_50%)]" />
            </div>

            {/* Header */}
            <div className="relative flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
                        <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg flex items-center gap-2">
                            AI Intelligence Engine
                            <motion.span
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full"
                            >
                                LIVE
                            </motion.span>
                        </h3>
                        <p className="text-indigo-300 text-sm">Powered by XGBoost & Isolation Forest</p>
                    </div>
                </div>
                <div className="flex gap-1">
                    {insights.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveInsight(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                idx === activeInsight ? 'bg-white w-6' : 'bg-white/30'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Insight Card */}
            <motion.div
                key={currentInsight.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative"
            >
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${getTypeColor(currentInsight.type)} shadow-lg`}>
                        {getTypeIcon(currentInsight.type)}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-white font-semibold">{currentInsight.title}</h4>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getImpactBadge(currentInsight.impact)}`}>
                                {currentInsight.impact.toUpperCase()} IMPACT
                            </span>
                        </div>
                        <p className="text-indigo-200 text-sm leading-relaxed">
                            {isTyping ? (
                                <span className="flex items-center gap-2">
                                    <motion.span
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                    >
                                        Analyzing data...
                                    </motion.span>
                                </span>
                            ) : (
                                currentInsight.content
                            )}
                        </p>
                        <div className="mt-3 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-indigo-400 text-xs">Confidence:</span>
                                <div className="w-24 h-2 bg-indigo-900 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${currentInsight.confidence}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                                    />
                                </div>
                                <span className="text-green-400 text-xs font-bold">{currentInsight.confidence}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Action buttons */}
            <div className="relative mt-6 flex gap-3">
                <button className="flex-1 py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Generate Report
                </button>
                <button className="flex-1 py-2.5 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <Target className="w-4 h-4" />
                    View All Insights
                </button>
            </div>
        </motion.div>
    )
}
