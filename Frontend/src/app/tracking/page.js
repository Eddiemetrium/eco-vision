'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../components/providers/AuthProvider'
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Activity, 
  Layers, 
  Filter,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  Plus,
  Minus,
  ZoomIn,
  ZoomOut
} from 'lucide-react'

export default function LocationTracking() {
  const { user } = useAuth()
  const [currentLocation, setCurrentLocation] = useState(null)
  const [trackingHistory, setTrackingHistory] = useState([
    {
      id: 1,
      location: { lat: 6.5244, lng: 3.3792 },
      timestamp: '2024-01-15 14:30:00',
      activity: 'Farm inspection',
      status: 'completed',
      carbonImpact: 25.5
    },
    {
      id: 2,
      location: { lat: 6.5244, lng: 3.3792 },
      timestamp: '2024-01-14 09:15:00',
      activity: 'Soil sampling',
      status: 'completed',
      carbonImpact: 18.2
    },
    {
      id: 3,
      location: { lat: 6.5244, lng: 3.3792 },
      timestamp: '2024-01-13 16:45:00',
      activity: 'Tree planting',
      status: 'completed',
      carbonImpact: 42.8
    }
  ])
  const [farms, setFarms] = useState([
    {
      id: 1,
      name: 'Green Valley Farm',
      location: { lat: 6.5244, lng: 3.3792 },
      size: 50,
      cropType: 'Corn',
      carbonCredits: 1250,
      status: 'active'
    },
    {
      id: 2,
      name: 'Sunset Meadows',
      location: { lat: 6.5244, lng: 3.3792 },
      size: 75,
      cropType: 'Wheat',
      carbonCredits: 1875,
      status: 'active'
    }
  ])
  const [selectedFarm, setSelectedFarm] = useState(null)
  const [mapLayers, setMapLayers] = useState({
    farms: true,
    tracking: true,
    carbonZones: true
  })
  const [isTracking, setIsTracking] = useState(false)

  useEffect(() => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
          // Default to Lagos, Nigeria
          setCurrentLocation({ lat: 6.5244, lng: 3.3792 })
        }
      )
    }
  }, [])

  const startTracking = () => {
    setIsTracking(true)
    // In a real app, this would start GPS tracking
    toast.success('Location tracking started')
  }

  const stopTracking = () => {
    setIsTracking(false)
    // In a real app, this would stop GPS tracking
    toast.success('Location tracking stopped')
  }

  const addTrackingPoint = () => {
    if (currentLocation) {
      const newPoint = {
        id: Date.now(),
        location: currentLocation,
        timestamp: new Date().toISOString(),
        activity: 'Manual entry',
        status: 'pending',
        carbonImpact: Math.random() * 50
      }
      setTrackingHistory([newPoint, ...trackingHistory])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Location Tracking</h1>
          <p className="text-gray-600">
            Monitor your farms and track carbon sequestration activities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Map Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Controls */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Farm Locations</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Map Container */}
              <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                {/* Placeholder for actual map component */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Interactive Map</p>
                    <p className="text-sm text-gray-500">
                      {currentLocation ? (
                        `Current: ${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`
                      ) : (
                        'Loading location...'
                      )}
                    </p>
                  </div>
                </div>

                {/* Map Overlays */}
                {farms.map((farm) => (
                  <div
                    key={farm.id}
                    className="absolute w-4 h-4 bg-green-500 rounded-full border-2 border-white cursor-pointer hover:bg-green-600 transition-colors"
                    style={{
                      left: `${50 + (farm.location.lng - 3.3792) * 1000}%`,
                      top: `${50 - (farm.location.lat - 6.5244) * 1000}%`
                    }}
                    onClick={() => setSelectedFarm(farm)}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs shadow-lg whitespace-nowrap">
                      {farm.name}
                    </div>
                  </div>
                ))}

                {/* Tracking Points */}
                {mapLayers.tracking && trackingHistory.slice(0, 5).map((point, index) => (
                  <div
                    key={point.id}
                    className="absolute w-3 h-3 bg-blue-500 rounded-full border border-white"
                    style={{
                      left: `${50 + (point.location.lng - 3.3792) * 1000}%`,
                      top: `${50 - (point.location.lat - 6.5244) * 1000}%`
                    }}
                  >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs shadow-lg whitespace-nowrap">
                      {point.activity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Legend */}
              <div className="mt-4 flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Farms</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Tracking Points</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span>Carbon Zones</span>
                </div>
              </div>
            </div>

            {/* Tracking Controls */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Tracking Controls</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={addTrackingPoint}
                    className="flex items-center px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Point
                  </button>
                  <button
                    onClick={isTracking ? stopTracking : startTracking}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                      isTracking 
                        ? 'bg-red-100 hover:bg-red-200 text-red-700' 
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                    }`}
                  >
                    {isTracking ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Stop Tracking
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Start Tracking
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Navigation className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium">Current Status</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {isTracking ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium">Last Update</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Activity className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-sm font-medium">Points Today</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {trackingHistory.filter(t => 
                      new Date(t.timestamp).toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Layer Controls */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Map Layers</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={mapLayers.farms}
                    onChange={(e) => setMapLayers({...mapLayers, farms: e.target.checked})}
                    className="mr-3"
                  />
                  <span className="text-sm">Show Farms</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={mapLayers.tracking}
                    onChange={(e) => setMapLayers({...mapLayers, tracking: e.target.checked})}
                    className="mr-3"
                  />
                  <span className="text-sm">Show Tracking Points</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={mapLayers.carbonZones}
                    onChange={(e) => setMapLayers({...mapLayers, carbonZones: e.target.checked})}
                    className="mr-3"
                  />
                  <span className="text-sm">Show Carbon Zones</span>
                </label>
              </div>
            </div>

            {/* Farm Details */}
            {selectedFarm && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Farm Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Name</p>
                    <p className="text-gray-900">{selectedFarm.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Size</p>
                    <p className="text-gray-900">{selectedFarm.size} hectares</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Crop Type</p>
                    <p className="text-gray-900">{selectedFarm.cropType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Carbon Credits</p>
                    <p className="text-gray-900">{selectedFarm.carbonCredits.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Status</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {selectedFarm.status}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Tracking History */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <button className="text-green-600 hover:text-green-700 text-sm">
                  View all
                </button>
              </div>
              <div className="space-y-3">
                {trackingHistory.slice(0, 5).map((point) => (
                  <div key={point.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{point.activity}</p>
                      <p className="text-xs text-gray-500">{point.timestamp}</p>
                      <p className="text-xs text-green-600">+{point.carbonImpact} CO₂ tons</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      point.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {point.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Add Farm Location</span>
                  </div>
                  <Plus className="w-4 h-4 text-green-600" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <Download className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Export Data</span>
                  </div>
                  <Download className="w-4 h-4 text-blue-600" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <Activity className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Analytics</span>
                  </div>
                  <Activity className="w-4 h-4 text-purple-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
