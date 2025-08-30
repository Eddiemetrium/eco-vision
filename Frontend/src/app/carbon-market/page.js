"use client"
import Link from 'next/link'
import { 
  Leaf, 
  TrendingUp, 
  MapPin, 
  Wallet, 
  Users, 
  Globe, 
  Shield, 
  Smartphone,
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  Target,
  Heart,
  DollarSign,
  BarChart3,
  Clock,
  Zap,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter
} from 'lucide-react'

export default function CarbonMarket() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-green-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Carbon Market
              <span className="block text-green-600">Trading Platform</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Real-time carbon credit trading with AI-powered insights. Buy, sell, and track your environmental investments with confidence.
            </p>
            <div className="flex  sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn-primary text-lg px-8 py-3 flex items-center justify-center">
                Start Trading
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/wallet" className="btn-secondary text-lg px-8 py-3">
                View My Wallet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Market Overview
            </h2>
            <p className="text-xl text-gray-600">
              Live carbon credit prices and market trends
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Current Price</h3>
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">$45.20</div>
              <div className="flex items-center text-sm">
                <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600">+2.3%</span>
                <span className="text-gray-500 ml-1">today</span>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">24h Volume</h3>
                <BarChart3 className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">$2.4M</div>
              <div className="flex items-center text-sm">
                <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600">+12.5%</span>
                <span className="text-gray-500 ml-1">vs yesterday</span>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Credits</h3>
                <Leaf className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">1.2M</div>
              <div className="flex items-center text-sm">
                <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600">+8.7%</span>
                <span className="text-gray-500 ml-1">this week</span>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Market Cap</h3>
                <DollarSign className="w-6 h-6 text-purple-500" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">$54.2M</div>
              <div className="flex items-center text-sm">
                <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600">+15.2%</span>
                <span className="text-gray-500 ml-1">this month</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Interface */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trade Carbon Credits
            </h2>
            <p className="text-xl text-gray-600">
              Secure, transparent, and AI-powered trading
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Buy/Sell Panel */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Quick Trade</h3>
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium">
                      Buy
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                      Sell
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (Carbon Credits)
                    </label>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price per Credit
                    </label>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-green-600">$45.20</span>
                      <span className="ml-2 text-sm text-gray-500">USD</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Total Value</span>
                      <span className="text-lg font-semibold text-gray-900">$0.00</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Platform Fee</span>
                      <span className="text-sm text-gray-500">$0.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Network Fee</span>
                      <span className="text-sm text-gray-500">$0.00</span>
                    </div>
                  </div>
<span className="flex justify-center">
                  <button className="w-1/3 btn-primary py-3 text-lg mx-auto">
                    Buy Carbon Credits
                  </button>
                  </span>
                </div>
              </div>
            </div>

            {/* Market Stats */}
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">24h High</span>
                    <span className="text-sm font-medium text-gray-900">$47.80</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">24h Low</span>
                    <span className="text-sm font-medium text-gray-900">$43.20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">7d Change</span>
                    <span className="text-sm font-medium text-green-600">+8.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">30d Change</span>
                    <span className="text-sm font-medium text-green-600">+22.3%</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Buy Order</div>
                      <div className="text-xs text-gray-500">2 minutes ago</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">+150 credits</div>
                      <div className="text-xs text-gray-500">$6,780</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Sell Order</div>
                      <div className="text-xs text-gray-500">5 minutes ago</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-red-600">-75 credits</div>
                      <div className="text-xs text-gray-500">$3,390</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Buy Order</div>
                      <div className="text-xs text-gray-500">12 minutes ago</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">+200 credits</div>
                      <div className="text-xs text-gray-500">$9,040</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Trade with EcoVision?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced features designed for both beginners and experienced traders
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Insights</h3>
              <p className="text-gray-600">
                Get real-time market predictions and trading recommendations powered by advanced AI algorithms.
              </p>
            </div>

            <div className="card hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Trading</h3>
              <p className="text-gray-600">
                Bank-level security with blockchain verification and real-time fraud detection.
              </p>
            </div>

            <div className="card hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">
                No hidden fees. See exactly what you're paying with real-time price updates.
              </p>
            </div>

            <div className="card hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Trading</h3>
              <p className="text-gray-600">
                Trade anytime, anywhere. Our platform never sleeps, ensuring you never miss an opportunity.
              </p>
            </div>

            <div className="card hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
              <p className="text-gray-600">
                Comprehensive charts, historical data, and performance metrics to inform your trading decisions.
              </p>
            </div>

            <div className="card hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Support</h3>
              <p className="text-gray-600">
                Connect with fellow traders, share insights, and learn from experienced carbon market participants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Carbon Trading Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to start trading carbon credits
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Account</h3>
              <p className="text-gray-600">
                Sign up and complete KYC verification to access the trading platform.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fund Wallet</h3>
              <p className="text-gray-600">
                Add funds to your carbon wallet using secure payment methods.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Trading</h3>
              <p className="text-gray-600">
                Buy and sell carbon credits with real-time market data and AI insights.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Performance</h3>
              <p className="text-gray-600">
                Monitor your portfolio and environmental impact with detailed analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 eco-gradient">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Trading Carbon Credits?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of traders already profiting from the carbon market while making a positive environmental impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors">
              Create Trading Account
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Link>
            <Link href="/about" className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold py-3 px-8 rounded-lg transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
