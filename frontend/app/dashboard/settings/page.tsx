"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Settings, Bell, Database, Shield, Palette, Save, RefreshCw, ToggleLeft, ToggleRight, Check } from "lucide-react"

// Toggle component defined outside of render
const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} className="relative">
        {enabled ? (
            <ToggleRight className="w-10 h-6 text-indigo-600" />
        ) : (
            <ToggleLeft className="w-10 h-6 text-slate-400" />
        )}
    </button>
)

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        // Notification Settings
        emailAlerts: true,
        criticalAlerts: true,
        dailyDigest: false,
        weeklyReports: true,
        
        // Data Settings
        autoRefresh: true,
        refreshInterval: 30,
        dataRetention: 90,
        
        // Display Settings
        darkMode: false,
        compactView: false,
        showAnimations: true,
        
        // ML Settings
        anomalyThreshold: 0.05,
        surgeThreshold: 2.0,
        forecastDays: 30,
        
        // Security Settings
        twoFactorAuth: true,
        sessionTimeout: 60,
        auditLogs: true,
    })

    const [saved, setSaved] = useState(false)

    const handleToggle = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }))
        setSaved(false)
    }

    const handleChange = (key: keyof typeof settings, value: number) => {
        setSettings(prev => ({ ...prev, [key]: value }))
        setSaved(false)
    }

    const handleSave = () => {
        // Simulate save
        setTimeout(() => {
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        }, 500)
    }

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 shadow-lg">
                            <Settings className="w-6 h-6 text-white" />
                        </div>
                        Configuration
                    </h2>
                    <p className="text-slate-500 mt-1">Manage dashboard settings and preferences</p>
                </div>
                <button 
                    onClick={handleSave}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        saved 
                            ? 'bg-green-600 text-white' 
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                >
                    {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>

            {/* Notification Settings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border shadow-sm overflow-hidden"
            >
                <div className="p-4 border-b bg-gradient-to-r from-slate-50 to-slate-100">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-indigo-600" />
                        Notification Settings
                    </h3>
                </div>
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-800">Email Alerts</p>
                            <p className="text-sm text-slate-500">Receive alerts via email</p>
                        </div>
                        <Toggle enabled={settings.emailAlerts} onToggle={() => handleToggle('emailAlerts')} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-800">Critical Alerts</p>
                            <p className="text-sm text-slate-500">Immediate notification for critical anomalies</p>
                        </div>
                        <Toggle enabled={settings.criticalAlerts} onToggle={() => handleToggle('criticalAlerts')} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-800">Daily Digest</p>
                            <p className="text-sm text-slate-500">Daily summary of dashboard activity</p>
                        </div>
                        <Toggle enabled={settings.dailyDigest} onToggle={() => handleToggle('dailyDigest')} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-800">Weekly Reports</p>
                            <p className="text-sm text-slate-500">Automated weekly analytics report</p>
                        </div>
                        <Toggle enabled={settings.weeklyReports} onToggle={() => handleToggle('weeklyReports')} />
                    </div>
                </div>
            </motion.div>

            {/* Data Settings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl border shadow-sm overflow-hidden"
            >
                <div className="p-4 border-b bg-gradient-to-r from-slate-50 to-slate-100">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        <Database className="w-5 h-5 text-emerald-600" />
                        Data Settings
                    </h3>
                </div>
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-800">Auto Refresh</p>
                            <p className="text-sm text-slate-500">Automatically refresh dashboard data</p>
                        </div>
                        <Toggle enabled={settings.autoRefresh} onToggle={() => handleToggle('autoRefresh')} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-800">Refresh Interval</p>
                            <p className="text-sm text-slate-500">Data refresh frequency (seconds)</p>
                        </div>
                        <select
                            value={settings.refreshInterval}
                            onChange={(e) => handleChange('refreshInterval', parseInt(e.target.value))}
                            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value={15}>15 seconds</option>
                            <option value={30}>30 seconds</option>
                            <option value={60}>1 minute</option>
                            <option value={300}>5 minutes</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-800">Data Retention</p>
                            <p className="text-sm text-slate-500">Days to retain historical data</p>
                        </div>
                        <select
                            value={settings.dataRetention}
                            onChange={(e) => handleChange('dataRetention', parseInt(e.target.value))}
                            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value={30}>30 days</option>
                            <option value={60}>60 days</option>
                            <option value={90}>90 days</option>
                            <option value={180}>180 days</option>
                            <option value={365}>1 year</option>
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* ML Model Settings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl border shadow-sm overflow-hidden"
            >
                <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-indigo-50">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 text-purple-600" />
                        ML Model Configuration
                    </h3>
                </div>
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-800">Anomaly Detection Threshold</p>
                            <p className="text-sm text-slate-500">Isolation Forest contamination parameter</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="range"
                                min="0.01"
                                max="0.1"
                                step="0.01"
                                value={settings.anomalyThreshold}
                                onChange={(e) => handleChange('anomalyThreshold', parseFloat(e.target.value))}
                                className="w-32"
                            />
                            <span className="text-sm font-mono text-slate-600 w-12">{settings.anomalyThreshold}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-800">Surge Detection Threshold</p>
                            <p className="text-sm text-slate-500">Standard deviations for surge classification</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="range"
                                min="1.0"
                                max="4.0"
                                step="0.1"
                                value={settings.surgeThreshold}
                                onChange={(e) => handleChange('surgeThreshold', parseFloat(e.target.value))}
                                className="w-32"
                            />
                            <span className="text-sm font-mono text-slate-600 w-12">{settings.surgeThreshold}σ</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-800">Forecast Horizon</p>
                            <p className="text-sm text-slate-500">Days ahead for demand prediction</p>
                        </div>
                        <select
                            value={settings.forecastDays}
                            onChange={(e) => handleChange('forecastDays', parseInt(e.target.value))}
                            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value={7}>7 days</option>
                            <option value={14}>14 days</option>
                            <option value={30}>30 days</option>
                            <option value={60}>60 days</option>
                            <option value={90}>90 days</option>
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* Display Settings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl border shadow-sm overflow-hidden"
            >
                <div className="p-4 border-b bg-gradient-to-r from-slate-50 to-slate-100">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        <Palette className="w-5 h-5 text-pink-600" />
                        Display Settings
                    </h3>
                </div>
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-800">Dark Mode</p>
                            <p className="text-sm text-slate-500">Use dark theme for the dashboard</p>
                        </div>
                        <Toggle enabled={settings.darkMode} onToggle={() => handleToggle('darkMode')} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-800">Compact View</p>
                            <p className="text-sm text-slate-500">Reduce spacing and show more data</p>
                        </div>
                        <Toggle enabled={settings.compactView} onToggle={() => handleToggle('compactView')} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-800">Show Animations</p>
                            <p className="text-sm text-slate-500">Enable chart and UI animations</p>
                        </div>
                        <Toggle enabled={settings.showAnimations} onToggle={() => handleToggle('showAnimations')} />
                    </div>
                </div>
            </motion.div>

            {/* Security Settings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl border shadow-sm overflow-hidden"
            >
                <div className="p-4 border-b bg-gradient-to-r from-red-50 to-orange-50">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-red-600" />
                        Security Settings
                    </h3>
                </div>
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-800">Two-Factor Authentication</p>
                            <p className="text-sm text-slate-500">Require 2FA for login</p>
                        </div>
                        <Toggle enabled={settings.twoFactorAuth} onToggle={() => handleToggle('twoFactorAuth')} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-800">Session Timeout</p>
                            <p className="text-sm text-slate-500">Auto logout after inactivity (minutes)</p>
                        </div>
                        <select
                            value={settings.sessionTimeout}
                            onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
                            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value={15}>15 minutes</option>
                            <option value={30}>30 minutes</option>
                            <option value={60}>1 hour</option>
                            <option value={120}>2 hours</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-800">Audit Logs</p>
                            <p className="text-sm text-slate-500">Track all user actions</p>
                        </div>
                        <Toggle enabled={settings.auditLogs} onToggle={() => handleToggle('auditLogs')} />
                    </div>
                </div>
            </motion.div>

            {/* System Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-slate-50 rounded-xl border p-6"
            >
                <h3 className="font-semibold text-slate-800 mb-4">System Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                        <p className="text-slate-500">Version</p>
                        <p className="font-medium text-slate-800">v2.1.0</p>
                    </div>
                    <div>
                        <p className="text-slate-500">ML Models</p>
                        <p className="font-medium text-slate-800">3 Active</p>
                    </div>
                    <div>
                        <p className="text-slate-500">Last Training</p>
                        <p className="font-medium text-slate-800">Jan 5, 2026</p>
                    </div>
                    <div>
                        <p className="text-slate-500">Data Points</p>
                        <p className="font-medium text-slate-800">3.9M Records</p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
