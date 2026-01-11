"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
    title: string
    value: string | number
    change?: string
    trend?: "up" | "down" | "neutral"
    icon?: React.ReactNode
    description?: string
    isQDI?: boolean
}

export function MetricCard({ title, value, change, trend, icon, description, isQDI }: MetricCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "p-6 rounded-xl border bg-card text-card-foreground shadow-sm",
                isQDI && "border-l-4 border-l-secondary bg-secondary/5"
            )}
        >
            <div className="flex items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{title}</h3>
                {icon ? (
                    <div className="text-muted-foreground">{icon}</div>
                ) : (
                    <Activity className="h-4 w-4 text-muted-foreground" />
                )}
            </div>
            <div className="flex items-baseline space-x-2">
                <div className="text-2xl font-bold">{value}</div>
                {change && (
                    <div
                        className={cn(
                            "flex items-center text-xs font-medium",
                            trend === "up" ? "text-emerald-600" : trend === "down" ? "text-destructive" : "text-muted-foreground"
                        )}
                    >
                        {trend === "up" ? (
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                        ) : trend === "down" ? (
                            <ArrowDownRight className="mr-1 h-3 w-3" />
                        ) : null}
                        {change}
                    </div>
                )}
            </div>
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </motion.div>
    )
}
