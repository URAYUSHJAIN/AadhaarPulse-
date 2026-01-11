"use client"

import { LayoutDashboard, Map as MapIcon, BarChart3, Settings, ShieldCheck, Menu, X, Sparkles, Bell, ChevronRight, Zap, Globe } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
    { name: "Live Overview", icon: LayoutDashboard, href: "/dashboard", badge: "Live" },
    { name: "Geo-Intelligence", icon: MapIcon, href: "/dashboard/map", badge: null },
    { name: "Predictive Models", icon: BarChart3, href: "/dashboard/analytics", badge: "AI" },
    { name: "System Health", icon: ShieldCheck, href: "/dashboard/health", badge: null },
    { name: "Configuration", icon: Settings, href: "/dashboard/settings", badge: null },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [currentTime, setCurrentTime] = useState<Date | null>(null)

    useEffect(() => {
        setCurrentTime(new Date())
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            {/* Mobile Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Premium Sidebar */}
            <aside className={cn(
                "fixed md:relative z-50 w-72 md:w-64 lg:w-72 text-white flex flex-col h-full transition-transform duration-300",
                "bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950",
                mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 -left-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-20 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
                </div>

                {/* Header / Logo */}
                <div className="relative p-5 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                                    <ShieldCheck className="text-white w-5 h-5" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse" />
                            </div>
                            <div>
                                <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                                    AadhaarPulse
                                </h1>
                                <div className="flex items-center gap-1.5">
                                    <Sparkles className="w-3 h-3 text-amber-400" />
                                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">AI-Powered Intel</p>
                                </div>
                            </div>
                        </div>
                        <button 
                            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Quick Stats Bar */}
                <div className="relative px-4 py-3 border-b border-white/10 bg-white/5">
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                            <Globe className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-slate-300">1,097 Districts</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-slate-300">99.9% Uptime</span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="relative flex-1 p-4 space-y-1.5 overflow-y-auto">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-3 px-3">Main Menu</p>
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                    "group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                                        : "text-slate-400 hover:text-white hover:bg-white/10"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "p-1.5 rounded-lg transition-colors",
                                        isActive ? "bg-white/20" : "bg-slate-800 group-hover:bg-slate-700"
                                    )}>
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <span>{item.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {item.badge && (
                                        <span className={cn(
                                            "px-1.5 py-0.5 text-[10px] font-bold rounded",
                                            item.badge === "Live" 
                                                ? "bg-emerald-500/20 text-emerald-400" 
                                                : "bg-purple-500/20 text-purple-400"
                                        )}>
                                            {item.badge}
                                        </span>
                                    )}
                                    <ChevronRight className={cn(
                                        "w-4 h-4 transition-transform",
                                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                                    )} />
                                </div>
                                {isActive && (
                                    <motion.div 
                                        layoutId="activeIndicator"
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"
                                    />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* System Status Card */}
                <div className="relative mx-4 mb-4 p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-white">All Systems Operational</p>
                            <p className="text-[10px] text-emerald-400">ML Pipeline Active</p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex-1 h-1 rounded-full bg-emerald-500/40">
                                <div className="h-full rounded-full bg-emerald-400" style={{ width: '100%' }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Profile Section */}
                <div className="relative p-4 border-t border-white/10 bg-black/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                                    AU
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">Admin User</p>
                                <p className="text-[10px] text-slate-400">UIDAI Operations</p>
                            </div>
                        </div>
                        <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors" aria-label="Notifications">
                            <Bell className="w-4 h-4 text-slate-400" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                    </div>
                    {/* Time Display */}
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-500">
                        <span>{currentTime?.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) ?? '...'}</span>
                        <span className="font-mono">{currentTime?.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) ?? '...'}</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden h-14 border-b bg-white flex items-center px-4 justify-between sticky top-0 z-30 shadow-sm">
                    <button 
                        className="p-2 -ml-2 hover:bg-slate-100 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu className="w-5 h-5 text-slate-600" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <ShieldCheck className="text-white w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-slate-900">AadhaarPulse</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                        AU
                    </div>
                </header>

                <div className="flex-1 overflow-auto bg-slate-50">
                    <div className="p-3 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}
