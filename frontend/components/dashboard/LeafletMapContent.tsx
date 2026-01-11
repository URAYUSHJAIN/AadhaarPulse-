"use client"

import { useMemo } from "react"
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"

interface StateData {
    state: string;
    totalAuth: number;
    districts: number;
    anomalies: number;
    avgQDI: number;
}

interface LeafletMapContentProps {
    stateData: StateData[];
    stateCoordinates: Record<string, { lat: number; lng: number }>;
}

export default function LeafletMapContent({ stateData, stateCoordinates }: LeafletMapContentProps) {
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
        <MapContainer
            center={[22.5937, 78.9629]}
            zoom={5}
            style={{ height: "100%", width: "100%", background: "#1e293b" }}
            scrollWheelZoom={true}
            zoomControl={true}
            preferCanvas={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                maxZoom={18}
                keepBuffer={2}
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
    )
}
