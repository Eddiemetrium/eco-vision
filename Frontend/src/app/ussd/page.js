'use client'

import { useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { 
  Phone, 
  Smartphone, 
  Hash, 
  ArrowRight,
  Copy,
  CheckCircle,
  AlertCircle,
  Info,
  DollarSign,
  Wallet,
  MapPin,
  BarChart3,
  Users,
  Settings
} from 'lucide-react'

export default function USSD() {
  const { user } = useAuth()
  const [copiedCode, setCopiedCode] = useState(null)

  const ussdCodes = [
    {
      id: 1,
      code: '*123*1#',
      title: 'Check Wallet Balance',
      description: 'View your current carbon wallet balance and credits',
      category: 'wallet',
      icon: Wallet,
      color: 'green'
    },
    {
      id: 2,
      code: '*123*2#',
      title: 'Buy Carbon Credits',
      description: 'Purchase carbon credits using mobile money',
      category: 'trading',
      icon: DollarSign,
      color: 'blue'
    },
    {
      id: 3,
      code: '*123*3#',
      title: 'Sell Carbon Credits',
      description: 'Sell your carbon credits for cash',
      category: 'trading',
      icon: DollarSign,
      color: 'purple'
    },
    {
      id: 4,
      code: '*123*4#',
      title: 'Transaction History',
      description: 'View your recent carbon credit transactions',
      category: 'wallet',
      icon: BarChart3,
      color: 'orange'
    },
    {
      id: 5,
      code: '*123*5#',
      title: 'Farm Location',
      description: 'Register or update your farm location',
      category: 'location',
      icon: MapPin,
      color: 'green'
    },
    {
      id: 6,
      code: '*123*6#',
      title: 'Community Connect',
      description: 'Connect with other farmers in your area',
      category: 'community',
      icon: Users,
      color: 'blue'
    },
    {
      id: 7,
      code: '*123*7#',
      title: 'Market Prices',
      description: 'Check current carbon credit market prices',
      category: 'market',
      icon: BarChart3,
      color: 'yellow'
    },
    {
      id: 8,
      code: '*123*8#',
      title: 'Account Settings',
      description: 'Update your account information and preferences',
      category: 'settings',
      icon: Settings,
      color: 'gray'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Services', count: ussdCodes.length },
    { id: 'wallet', name: 'Wallet', count: ussdCodes.filter(c => c.category === 'wallet').length },
    { id: 'trading', name: 'Trading', count: ussdCodes.filter(c => c.category === 'trading').length },
    { id: 'location', name: 'Location', count: ussdCodes.filter(c => c.category === 'location').length },
    { id: 'community', name: 'Community', count: ussdCodes.filter(c => c.category === 'community').length },
    { id: 'market', name: 'Market', count: ussdCodes.filter(c => c.category === 'market').length },
    { id: 'settings', name: 'Settings', count: ussdCodes.filter(c => c.category === 'settings').length }
  ]

  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredCodes = selectedCategory === 'all' 
    ? ussdCodes 
    : ussdCodes.filter(code => code.category === selectedCategory)

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const getColorClasses = (color) => {
    const colorMap = {
      green: 'bg-green-100 text-green-600',
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      gray: 'bg-gray-100 text-gray-600'
    }
    return colorMap[color] || 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">USSD Services</h1>
          <p className="text-gray-600">
            Access carbon trading services via USSD codes - no internet required
          </p>
        </div>

        {/* How to Use */}
        <div className="card mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How to Use USSD Services</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>1. Dial the USSD code on your mobile phone</p>
                <p>2. Follow the voice prompts to navigate the menu</p>
                <p>3. Enter required information when prompted</p>
                <p>4. Confirm your transaction</p>
                <p className="text-green-600 font-medium">No internet connection required!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* USSD Codes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCodes.map((code) => {
            const IconComponent = code.icon
            return (
              <div key={code.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(code.color)}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <button
                    onClick={() => copyToClipboard(code.code)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Copy code"
                  >
                    {copiedCode === code.code ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{code.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{code.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="bg-gray-100 px-3 py-2 rounded-lg">
                    <code className="text-sm font-mono text-gray-800">{code.code}</code>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Popular Services */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Services</h3>
            <div className="space-y-3">
              {ussdCodes.slice(0, 3).map((code) => (
                <div key={code.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClasses(code.color)} mr-3`}>
                      <code.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{code.title}</p>
                      <p className="text-xs text-gray-500">{code.code}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(code.code)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <Copy className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Support Information */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support & Help</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Service Charges</p>
                  <p className="text-xs text-gray-600">Standard USSD charges apply per session</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Customer Support</p>
                  <p className="text-xs text-gray-600">Call 0800-ECOVISION for assistance</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Smartphone className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Available Networks</p>
                  <p className="text-xs text-gray-600">MTN, Airtel, Glo, 9mobile</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Use USSD Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Internet Required</h3>
              <p className="text-gray-600 text-sm">
                Access carbon trading services even in areas with poor internet connectivity
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hash className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Simple & Fast</h3>
              <p className="text-gray-600 text-sm">
                Quick access to essential services with just a few button presses
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
              <p className="text-gray-600 text-sm">
                Bank-grade security with instant transaction confirmations
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Trading?</h2>
            <p className="text-green-100 mb-6">
              Dial *123*1# to check your wallet balance and begin your carbon trading journey
            </p>
            <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
