"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Eye, EyeOff, Lock, User, Fingerprint, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        rememberMe: false
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        // Simulate authentication delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Demo credentials check (in production, this would be an API call)
        if (formData.username === "admin" && formData.password === "admin123") {
            router.push("/dashboard")
        } else if (formData.username && formData.password) {
            // For demo, allow any credentials
            router.push("/dashboard")
        } else {
            setError("Please enter valid credentials")
            setIsLoading(false)
        }
    }

    const securityFeatures = [
        "256-bit SSL Encryption",
        "Multi-factor Authentication",
        "Real-time Threat Detection",
        "Audit Trail Logging"
    ]

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
                    
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    {/* Logo Section */}
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 via-white to-green-500 p-[2px]">
                                <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                                    <ShieldCheck className="w-7 h-7 text-white" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">AadhaarPulse</h1>
                                <p className="text-sm text-slate-400">Intelligence Analytics Platform</p>
                            </div>
                        </div>

                        <div className="mt-16">
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl xl:text-5xl font-bold text-white leading-tight"
                            >
                                Unlocking Societal
                                <span className="block bg-gradient-to-r from-orange-400 via-amber-300 to-green-400 bg-clip-text text-transparent">
                                    Trends in Aadhaar
                                </span>
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-6 text-lg text-slate-400 max-w-md"
                            >
                                Advanced AI-powered analytics for monitoring authentication patterns, detecting anomalies, and forecasting demand across India's digital identity infrastructure.
                            </motion.p>
                        </div>
                    </div>

                    {/* Stats */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="grid grid-cols-3 gap-6 py-8 border-t border-white/10"
                    >
                        <div>
                            <p className="text-3xl font-bold text-white">3.9M+</p>
                            <p className="text-sm text-slate-500">Records Analyzed</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">1,097</p>
                            <p className="text-sm text-slate-500">Districts Covered</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">97.9%</p>
                            <p className="text-sm text-slate-500">Model Accuracy</p>
                        </div>
                    </motion.div>

                    {/* Security Features */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-wrap gap-3"
                    >
                        {securityFeatures.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-xs text-slate-400">{feature}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-8 border-t border-white/10">
                        <p className="text-xs text-slate-500">
                            © 2026 UIDAI. Official Government Portal
                        </p>
                        <div className="flex items-center gap-4">
                            <Fingerprint className="w-5 h-5 text-slate-600" />
                            <div className="w-8 h-5 rounded bg-gradient-to-r from-orange-500 via-white to-green-500 opacity-60" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-slate-50">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8 text-center">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 via-white to-green-500 p-[2px]">
                                <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="text-left">
                                <h1 className="text-xl font-bold text-slate-900">AadhaarPulse</h1>
                                <p className="text-xs text-slate-500">Intelligence Platform</p>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-200"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
                            <p className="text-slate-500 mt-2">Sign in to access the analytics dashboard</p>
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3"
                            >
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <p className="text-sm text-red-600">{error}</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Username Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Username / Employee ID
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                                        placeholder="Enter your username"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.rememberMe}
                                        onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-slate-600">Remember me</span>
                                </label>
                                <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    Forgot password?
                                </button>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Authenticating...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign In to Dashboard</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center gap-4">
                            <div className="flex-1 h-px bg-slate-200" />
                            <span className="text-xs text-slate-400 uppercase tracking-wider">Or continue with</span>
                            <div className="flex-1 h-px bg-slate-200" />
                        </div>

                        {/* Alternative Login Options */}
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors">
                                <Fingerprint className="w-5 h-5 text-slate-600" />
                                <span className="text-sm font-medium text-slate-700">Biometric</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors">
                                <ShieldCheck className="w-5 h-5 text-slate-600" />
                                <span className="text-sm font-medium text-slate-700">SSO Login</span>
                            </button>
                        </div>

                        {/* Demo Credentials */}
                        <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
                            <p className="text-xs font-medium text-amber-800 mb-1">Demo Credentials</p>
                            <p className="text-xs text-amber-700">Username: <code className="px-1.5 py-0.5 bg-amber-100 rounded">admin</code> | Password: <code className="px-1.5 py-0.5 bg-amber-100 rounded">admin123</code></p>
                        </div>
                    </motion.div>

                    {/* Footer Links */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-500">
                            Protected by UIDAI Security Protocols
                        </p>
                        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-400">
                            <button className="hover:text-slate-600">Privacy Policy</button>
                            <span>•</span>
                            <button className="hover:text-slate-600">Terms of Service</button>
                            <span>•</span>
                            <button className="hover:text-slate-600">Help Center</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
