"use client"

import { useState, useLayoutEffect } from "react"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

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

interface LeafletMapContentProps {
    stateData: StateData[];
    stateCoordinates: Record<string, { lat: number; lng: number }>;
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

// Loading component for the map
const MapLoading = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 z-50">
        <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            <p className="text-slate-400 text-sm">Loading map...</p>
        </div>
    </div>
)

// Single dynamic import for the entire map component (more efficient)
const LeafletMap = dynamic<LeafletMapContentProps>(
    () => import("./LeafletMapContent"),
    { 
        ssr: false,
        loading: () => <MapLoading />
    }
)

// Custom hook for client-side check
function useIsClient() {
    const [isClient, setIsClient] = useState(false)
    useLayoutEffect(() => {
        setIsClient(true)
    }, [])
    return isClient
}

export function IndiaHeatmap({ stateData }: IndiaHeatmapProps) {
    const isClient = useIsClient()

    return (
        <div className="relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="absolute top-4 left-4 z-50">
                <h3 className="text-white font-bold text-lg">India Authentication Heatmap</h3>
                <p className="text-slate-400 text-sm">Real-time district load visualization</p>
            </div>

            {/* Legend */}
            <div className="absolute top-4 right-4 z-50 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 border border-slate-700">
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
            <div className="absolute bottom-4 left-4 z-50 bg-slate-800/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-slate-700">
                <p className="text-xs text-slate-400">Total States: <span className="text-white font-bold">{stateData.length}</span></p>
            </div>

            {/* Leaflet Map - Only render on client */}
            {isClient ? (
                <LeafletMap stateData={stateData} stateCoordinates={stateCoordinates} />
            ) : (
                <MapLoading />
            )}
        </div>
    )
}
