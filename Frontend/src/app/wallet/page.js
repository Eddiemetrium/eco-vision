'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Minus,
  ArrowUpRight,
  ArrowDownRight,
  Leaf,
  Download,
  Filter,
  Search,
  Calendar,
  DollarSign,
  Activity
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function CarbonWallet() {
  const { user } = useAuth()
  const [walletData, setWalletData] = useState({
    balance: 1250.50,
    credits: 1247,
    change: 45.20,
    changePercent: 3.75,
    marketValue: 2847.00
  })
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'credit',
      amount: 150.00,
      credits: 150,
      description: 'Carbon credit sale',
      date: '2024-01-15',
      time: '14:30',
      status: 'completed',
      counterparty: 'Green Energy Corp'
    },
    {
      id: 2,
      type: 'debit',
      amount: 75.50,
      credits: 75,
      description: 'Carbon credit purchase',
      date: '2024-01-14',
      time: '09:15',
      status: 'completed',
      counterparty: 'EcoFarm Ltd'
    },
    {
      id: 3,
      type: 'credit',
      amount: 200.00,
      credits: 200,
      description: 'Farm verification bonus',
      date: '2024-01-12',
      time: '16:45',
      status: 'completed',
      counterparty: 'EcoVision System'
    },
    {
      id: 4,
      type: 'credit',
      amount: 85.25,
      credits: 85,
      description: 'Forest conservation credits',
      date: '2024-01-10',
      time: '11:20',
      status: 'pending',
      counterparty: 'Forest Trust'
    },
    {
      id: 5,
      type: 'debit',
      amount: 120.00,
      credits: 120,
      description: 'Carbon offset purchase',
      date: '2024-01-08',
      time: '13:10',
      status: 'completed',
      counterparty: 'Carbon Solutions'
    }
  ])
  const [chartData, setChartData] = useState([
    { date: 'Jan 1', balance: 1000 },
    { date: 'Jan 5', balance: 1100 },
    { date: 'Jan 10', balance: 1050 },
    { date: 'Jan 15', balance: 1250 },
    { date: 'Jan 20', balance: 1300 },
    { date: 'Jan 25', balance: 1280 },
    { date: 'Jan 30', balance: 1250 }
  ])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showTradeModal, setShowTradeModal] = useState(false)
  const [tradeType, setTradeType] = useState('buy')

  const isFarmer = user?.userType === 'farmer'

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = filter === 'all' || transaction.type === filter
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.counterparty.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const totalCredits = transactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.credits, 0)

  const totalDebits = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.credits, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Carbon Wallet</h1>
          <p className="text-gray-600">
            Manage your carbon credits and track your environmental impact
          </p>
        </div>

        {/* Wallet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Balance */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Wallet Balance</p>
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

          {/* Carbon Credits */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Carbon Credits</p>
                <p className="text-2xl font-bold text-gray-900">{walletData.credits.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-2">CO₂ tons</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Market Value */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Market Value</p>
                <p className="text-2xl font-bold text-gray-900">${walletData.marketValue.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-2">Current worth</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Net Credits */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Credits</p>
                <p className="text-2xl font-bold text-gray-900">{(totalCredits - totalDebits).toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-2">Total earned</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Balance Chart */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Balance History</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md">
                    7D
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md">
                    30D
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md">
                    90D
                  </button>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="balance" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Transactions */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
                <div className="flex items-center space-x-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  {/* Filter */}
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all">All Transactions</option>
                    <option value="credit">Credits</option>
                    <option value="debit">Debits</option>
                  </select>

                  {/* Export */}
                  <button className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
                        <p className="text-sm text-gray-500">{transaction.counterparty}</p>
                        <div className="flex items-center mt-1">
                          <Calendar className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">{transaction.date} at {transaction.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">{transaction.credits} credits</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
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
            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    setTradeType(isFarmer ? 'sell' : 'buy')
                    setShowTradeModal(true)
                  }}
                  className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    {isFarmer ? (
                      <Minus className="w-5 h-5 text-green-600 mr-3" />
                    ) : (
                      <Plus className="w-5 h-5 text-green-600 mr-3" />
                    )}
                    <span className="text-sm font-medium text-gray-900">
                      {isFarmer ? 'Sell Credits' : 'Buy Credits'}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <Leaf className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Generate Credits</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-blue-600" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Market Analysis</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-purple-600" />
                </button>
              </div>
            </div>

            {/* Credit Summary */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Earned</span>
                  <span className="text-sm font-medium text-green-600">+{totalCredits} credits</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Spent</span>
                  <span className="text-sm font-medium text-red-600">-{totalDebits} credits</span>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Net Balance</span>
                  <span className="text-sm font-bold text-gray-900">{totalCredits - totalDebits} credits</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {transactions.slice(0, 3).map((transaction) => (
                  <div key={transaction.id} className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      transaction.type === 'credit' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                    <span className={`text-sm font-medium ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trade Modal */}
      {showTradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {tradeType === 'buy' ? 'Buy Carbon Credits' : 'Sell Carbon Credits'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (credits)
                </label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per credit
                </label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="Enter price"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowTradeModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button className="flex-1 btn-primary">
                  {tradeType === 'buy' ? 'Buy' : 'Sell'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
