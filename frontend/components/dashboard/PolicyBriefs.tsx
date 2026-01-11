"use client"

import { motion } from "framer-motion"
import { FileText, Lightbulb, AlertTriangle, Shield, Activity, Layers, Target } from "lucide-react"

interface PolicyBrief {
    id: number;
    title: string;
    description: string;
    severity: 'critical' | 'warning' | 'info';
    icon: string;
}

interface PolicyBriefsProps {
    briefs: PolicyBrief[];
}

const iconMap: Record<string, React.ElementType> = {
    alert: AlertTriangle,
    quality: Shield,
    anomaly: Activity,
    load: Layers,
    priority: Target,
};

export function PolicyBriefs({ briefs }: PolicyBriefsProps) {
    const getSeverityStyles = (severity: string) => {
        switch (severity) {
            case 'critical':
                return {
                    badge: 'bg-red-100 text-red-700',
                    icon: 'text-red-500',
                    border: 'border-red-100 hover:border-red-200',
                };
            case 'warning':
                return {
                    badge: 'bg-amber-100 text-amber-700',
                    icon: 'text-amber-500',
                    border: 'border-amber-100 hover:border-amber-200',
                };
            default:
                return {
                    badge: 'bg-blue-100 text-blue-700',
                    icon: 'text-blue-500',
                    border: 'border-blue-100 hover:border-blue-200',
                };
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 rounded-xl border bg-white shadow-sm"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    <h2 className="font-semibold text-slate-800">Policy Intelligence Briefs</h2>
                </div>
                <span className="text-xs text-slate-500">AI-Generated Insights</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {briefs && briefs.map((brief) => {
                    const styles = getSeverityStyles(brief.severity);
                    const IconComponent = iconMap[brief.icon] || AlertTriangle;
                    
                    return (
                        <motion.div
                            key={brief.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: brief.id * 0.1 }}
                            className={`p-4 rounded-lg border bg-slate-50/50 hover:bg-slate-50 transition-all group cursor-pointer ${styles.border}`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <IconComponent className={`w-5 h-5 ${styles.icon}`} />
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${styles.badge}`}>
                                    {brief.severity}
                                </span>
                            </div>
                            <h4 className="font-medium text-sm text-slate-900 mb-2">{brief.title}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{brief.description}</p>
                        </motion.div>
                    );
                })}
            </div>

            <div className="mt-6 flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700">
                <div className="text-white">
                    <h4 className="font-medium text-sm mb-1">Full Policy Intelligence Report</h4>
                    <p className="text-xs text-indigo-200">Complete analysis with ML predictions and recommendations</p>
                </div>
                <button className="px-4 py-2 bg-white text-indigo-700 rounded-lg text-xs font-semibold hover:bg-indigo-50 transition-colors flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Export Report
                </button>
            </div>
        </motion.div>
    )
}
