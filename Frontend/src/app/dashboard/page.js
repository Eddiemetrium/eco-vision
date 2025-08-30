'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../components/providers/AuthProvider'
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  BarChart3, 
  Plus, 
  Minus,
  ArrowUpRight,
  ArrowDownRight,
  Leaf,
  Users,
  Globe,
  Activity
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function Dashboard() {
  const { user } = useAuth()
  const [walletData, setWalletData] = useState({
    balance: 1250.50,
    change: 45.20,
    changePercent: 3.75
  })
  const [recentTransactions, setRecentTransactions] = useState([
    {
      id: 1,
      type: 'credit',
      amount: 150.00,
      description: 'Carbon credit sale',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'debit',
      amount: 75.50,
      description: 'Carbon credit purchase',
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: 3,
      type: 'credit',
      amount: 200.00,
      description: 'Farm verification bonus',
      date: '2024-01-12',
      status: 'completed'
    }
  ])
  const [analyticsData, setAnalyticsData] = useState([
    { name: 'Jan', credits: 400, purchases: 240 },
    { name: 'Feb', credits: 300, purchases: 139 },
    { name: 'Mar', credits: 200, purchases: 980 },
    { name: 'Apr', credits: 278, purchases: 390 },
    { name: 'May', credits: 189, purchases: 480 },
    { name: 'Jun', credits: 239, purchases: 380 }
  ])
  const [portfolioData, setPortfolioData] = useState([
    { name: 'Forest Credits', value: 45, color: '#22c55e' },
    { name: 'Soil Credits', value: 30, color: '#16a34a' },
    { name: 'Renewable Energy', value: 15, color: '#15803d' },
    { name: 'Other', value: 10, color: '#166534' }
  ])

  const isFarmer = user?.userType === 'farmer'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600">
            Here&apos;s what&apos;s happening with your carbon trading account
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Carbon Wallet Balance */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Carbon Wallet</p>
                <p className="text-2xl font-bold text-gray-900">${walletData.balance.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  {walletData.change >= 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${walletData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {walletData.change >= 0 ? '+' : ''}${walletData.change.toFixed(2)} ({walletData.changePercent}%)
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Total Credits */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Credits</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
                <p className="text-sm text-gray-500 mt-2">CO₂ tons</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Monthly Activity */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Activity</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
                <p className="text-sm text-gray-500 mt-2">Transactions</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Market Value */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Market Value</p>
                <p className="text-2xl font-bold text-gray-900">$2,847</p>
                <p className="text-sm text-gray-500 mt-2">Current worth</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Analytics Chart */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Carbon Credit Activity</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md">
                    Credits
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md">
                    Purchases
                  </button>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="credits" stroke="#22c55e" strokeWidth={2} />
                    <Line type="monotone" dataKey="purchases" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                  View all
                </button>
              </div>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <Plus className="w-5 h-5 text-green-600" />
                        ) : (
                          <Minus className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Portfolio Distribution */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {portfolioData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.value}%</span>
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
                    <Plus className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">
                      {isFarmer ? 'Sell Credits' : 'Buy Credits'}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Track Location</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-blue-600" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <BarChart3 className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">View Analytics</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-purple-600" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-orange-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Community</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-orange-600" />
                </button>
              </div>
            </div>

            {/* AI Insights */}
            <div className="card bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Market Prediction:</strong> Carbon credit prices expected to rise 15% in Q2 2024.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Recommendation:</strong> Consider selling 20% of your credits this month for optimal returns.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Opportunity:</strong> New forest conservation project available in your region.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
