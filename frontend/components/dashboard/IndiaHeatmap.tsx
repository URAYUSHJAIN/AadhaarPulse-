"use client"

import { useMemo } from "react"
import dynamic from "next/dynamic"

interface StateData {
    state: string;
    totalAuth: number;
    districts: number;
    anomalies: number;
    avgQDI: number;
}

interface IndiaHeatmapProps {
    stateData: StateData[];
}

// State coordinates (lat, lng) for India
const stateCoordinates: Record<string, { lat: number; lng: number }> = {
    "Maharashtra": { lat: 19.7515, lng: 75.7139 },
    "Uttar Pradesh": { lat: 26.8467, lng: 80.9462 },
    "West Bengal": { lat: 22.9868, lng: 87.8550 },
    "Rajasthan": { lat: 27.0238, lng: 74.2179 },
    "Gujarat": { lat: 22.2587, lng: 71.1924 },
    "Madhya Pradesh": { lat: 22.9734, lng: 78.6569 },
    "Tamil Nadu": { lat: 11.1271, lng: 78.6569 },
    "Karnataka": { lat: 15.3173, lng: 75.7139 },
    "Andhra Pradesh": { lat: 15.9129, lng: 79.7400 },
    "Bihar": { lat: 25.0961, lng: 85.3131 },
    "Telangana": { lat: 18.1124, lng: 79.0193 },
    "Kerala": { lat: 10.8505, lng: 76.2711 },
    "Odisha": { lat: 20.9517, lng: 85.0985 },
    "Punjab": { lat: 31.1471, lng: 75.3412 },
    "Haryana": { lat: 29.0588, lng: 76.0856 },
    "Jharkhand": { lat: 23.6102, lng: 85.2799 },
    "Chhattisgarh": { lat: 21.2787, lng: 81.8661 },
    "Assam": { lat: 26.2006, lng: 92.9376 },
    "Delhi": { lat: 28.7041, lng: 77.1025 },
    "Uttarakhand": { lat: 30.0668, lng: 79.0193 },
    "Jammu and Kashmir": { lat: 33.7782, lng: 76.5762 },
    "Himachal Pradesh": { lat: 31.1048, lng: 77.1734 },
    "Goa": { lat: 15.2993, lng: 74.1240 },
    "Manipur": { lat: 24.6637, lng: 93.9063 },
    "Meghalaya": { lat: 25.4670, lng: 91.3662 },
    "Mizoram": { lat: 23.1645, lng: 92.9376 },
    "Nagaland": { lat: 26.1584, lng: 94.5624 },
    "Sikkim": { lat: 27.5330, lng: 88.5122 },
    "Tripura": { lat: 23.9408, lng: 91.9882 },
    "Arunachal Pradesh": { lat: 28.2180, lng: 94.7278 },
}

// Dynamic import for Leaflet (SSR fix)
const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
)
const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
)
const CircleMarker = dynamic(
    () => import("react-leaflet").then((mod) => mod.CircleMarker),
    { ssr: false }
)
const Popup = dynamic(
    () => import("react-leaflet").then((mod) => mod.Popup),
    { ssr: false }
)
const Tooltip = dynamic(
    () => import("react-leaflet").then((mod) => mod.Tooltip),
    { ssr: false }
)

export function IndiaHeatmap({ stateData }: IndiaHeatmapProps) {
    const maxAuth = useMemo(() => {
        if (stateData.length === 0) return 1
        return Math.max(...stateData.map(s => s.totalAuth))
    }, [stateData])

    const getMarkerColor = (auth: number): string => {
        const intensity = auth / maxAuth
        if (intensity > 0.7) return "#ef4444" // red
        if (intensity > 0.4) return "#f97316" // orange
        if (intensity > 0.2) return "#eab308" // yellow
        return "#22c55e" // green
    }

    const getMarkerRadius = (auth: number): number => {
        const intensity = auth / maxAuth
        return Math.max(8, Math.min(35, intensity * 40 + 8))
    }

    const formatNumber = (num: number) => {
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
        if (num >= 1_000) return (num / 1_000).toFixed(0) + 'K'
        return num.toString()
    }

    const getStateCoords = (stateName: string) => {
        // Try exact match first
        if (stateCoordinates[stateName]) return stateCoordinates[stateName]
        
        // Try partial match
        const keys = Object.keys(stateCoordinates)
        const match = keys.find(k => 
            k.toLowerCase().includes(stateName.toLowerCase()) ||
            stateName.toLowerCase().includes(k.toLowerCase().split(' ')[0])
        )
        return match ? stateCoordinates[match] : null
    }

    return (
        <div className="relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="absolute top-4 left-4 z-[1000]">
                <h3 className="text-white font-bold text-lg">India Authentication Heatmap</h3>
                <p className="text-slate-400 text-sm">Real-time district load visualization</p>
            </div>

            {/* Legend */}
            <div className="absolute top-4 right-4 z-[1000] bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 border border-slate-700">
                <p className="text-xs text-slate-400 mb-2">Auth Volume</p>
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-green-500" />
                    <div className="w-4 h-4 rounded-full bg-yellow-500" />
                    <div className="w-4 h-4 rounded-full bg-orange-500" />
                    <div className="w-4 h-4 rounded-full bg-red-500" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>Low</span>
                    <span>High</span>
                </div>
            </div>

            {/* Stats Badge */}
            <div className="absolute bottom-4 left-4 z-[1000] bg-slate-800/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-slate-700">
                <p className="text-xs text-slate-400">Total States: <span className="text-white font-bold">{stateData.length}</span></p>
            </div>

            {/* Leaflet Map */}
            <MapContainer
                center={[22.5937, 78.9629]}
                zoom={5}
                style={{ height: "100%", width: "100%", background: "#1e293b" }}
                scrollWheelZoom={true}
                zoomControl={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                
                {stateData.map((state, index) => {
                    const coords = getStateCoords(state.state)
                    if (!coords) return null
                    
                    return (
                        <CircleMarker
                            key={state.state + index}
                            center={[coords.lat, coords.lng]}
                            radius={getMarkerRadius(state.totalAuth)}
                            pathOptions={{
                                color: getMarkerColor(state.totalAuth),
                                fillColor: getMarkerColor(state.totalAuth),
                                fillOpacity: 0.7,
                                weight: 2,
                            }}
                        >
                            <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                                <div className="text-sm">
                                    <p className="font-bold text-slate-900">{state.state}</p>
                                    <p className="text-slate-600">Auth: <span className="font-semibold">{formatNumber(state.totalAuth)}</span></p>
                                    <p className="text-slate-600">Districts: <span className="font-semibold">{state.districts}</span></p>
                                    <p className="text-slate-600">Anomalies: <span className="font-semibold text-red-600">{state.anomalies}</span></p>
                                </div>
                            </Tooltip>
                            <Popup>
                                <div className="min-w-[180px]">
                                    <h4 className="font-bold text-lg text-slate-900 border-b pb-2 mb-2">{state.state}</h4>
                                    <div className="space-y-1.5 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Total Auth:</span>
                                            <span className="font-semibold">{formatNumber(state.totalAuth)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Districts:</span>
                                            <span className="font-semibold">{state.districts}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Anomalies:</span>
                                            <span className="font-semibold text-red-600">{state.anomalies}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Avg QDI:</span>
                                            <span className="font-semibold">{state.avgQDI.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </Popup>
                        </CircleMarker>
                    )
                })}
            </MapContainer>
        </div>
    )
}
