'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../components/providers/AuthProvider'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Shield, 
  Camera,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Upload,
  Download,
  Eye,
  EyeOff,
  Lock,
  Settings,
  CreditCard,
  FileText
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [kycStatus, setKycStatus] = useState('pending') // pending, verified, rejected
  const [activeTab, setActiveTab] = useState('profile')
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showKycModal, setShowKycModal] = useState(false)
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    address: user?.address || '',
    country: user?.country || '',
    userType: user?.userType || ''
  })

  const [kycData, setKycData] = useState({
    idType: '',
    idNumber: '',
    idFront: null,
    idBack: null,
    selfie: null,
    proofOfAddress: null,
    bankStatement: null
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleProfileUpdate = async () => {
    try {
      const result = await updateProfile(profileData)
      if (result.success) {
        toast.success('Profile updated successfully!')
        setIsEditing(false)
      } else {
        toast.error(result.error || 'Failed to update profile')
      }
    } catch (error) {
      toast.error('An error occurred while updating profile')
    }
  }

  const handleKycSubmit = async () => {
    // In a real app, this would upload files and submit KYC data
    toast.success('KYC documents submitted successfully!')
    setShowKycModal(false)
    setKycStatus('pending')
  }

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }
    
    // In a real app, this would call the API to change password
    toast.success('Password changed successfully!')
    setShowPasswordModal(false)
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }

  const handleFileUpload = (field, file) => {
    setKycData({
      ...kycData,
      [field]: file
    })
  }

  const getKycStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const getKycStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4" />
      case 'rejected':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
          <p className="text-gray-600">
            Manage your account information and complete KYC verification
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{user?.name}</h3>
                <p className="text-sm text-gray-600">{user?.email}</p>
                
                {/* KYC Status */}
                <div className="mt-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getKycStatusColor(kycStatus)}`}>
                    {getKycStatusIcon(kycStatus)}
                    <span className="ml-1">
                      {kycStatus === 'verified' ? 'KYC Verified' : 
                       kycStatus === 'rejected' ? 'KYC Rejected' : 'KYC Pending'}
                    </span>
                  </span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('kyc')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'kyc'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Shield className="w-4 h-4 mr-3" />
                  KYC Verification
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'security'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Lock className="w-4 h-4 mr-3" />
                  Security
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'preferences'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Preferences
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                  >
                    {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        disabled={!isEditing}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        disabled={!isEditing}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        disabled={!isEditing}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company/Organization
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.company}
                        onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                        disabled={!isEditing}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        disabled={!isEditing}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <select
                      value={profileData.country}
                      onChange={(e) => setProfileData({...profileData, country: e.target.value})}
                      disabled={!isEditing}
                      className="input-field"
                    >
                      <option value="">Select country</option>
                      <option value="nigeria">Nigeria</option>
                      <option value="ghana">Ghana</option>
                      <option value="kenya">Kenya</option>
                      <option value="south-africa">South Africa</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      User Type
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="userType"
                          value="farmer"
                          checked={profileData.userType === 'farmer'}
                          onChange={(e) => setProfileData({...profileData, userType: e.target.value})}
                          disabled={!isEditing}
                          className="mr-2"
                        />
                        <span className="text-sm">Farmer</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="userType"
                          value="investor"
                          checked={profileData.userType === 'investor'}
                          onChange={(e) => setProfileData({...profileData, userType: e.target.value})}
                          disabled={!isEditing}
                          className="mr-2"
                        />
                        <span className="text-sm">Investor</span>
                      </label>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleProfileUpdate}
                      className="btn-primary"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* KYC Tab */}
            {activeTab === 'kyc' && (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">KYC Verification</h2>
                  {kycStatus !== 'verified' && (
                    <button
                      onClick={() => setShowKycModal(true)}
                      className="btn-primary"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Documents
                    </button>
                  )}
                </div>

                <div className="mb-6">
                  <div className={`inline-flex items-center px-4 py-2 rounded-lg ${getKycStatusColor(kycStatus)}`}>
                    {getKycStatusIcon(kycStatus)}
                    <span className="ml-2 font-medium">
                      {kycStatus === 'verified' ? 'Your account is verified' : 
                       kycStatus === 'rejected' ? 'Verification was rejected' : 'Verification pending'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Required Documents</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Government-issued ID (Passport, Driver&apos;s License)</li>
                      <li>• Proof of Address (Utility Bill, Bank Statement)</li>
                      <li>• Selfie with ID</li>
                      <li>• Bank Statement (last 3 months)</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Verification Process</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>1. Upload required documents</li>
                      <li>2. Submit for review</li>
                      <li>3. Verification within 24-48 hours</li>
                      <li>4. Receive confirmation email</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Change Password</h3>
                      <p className="text-sm text-gray-600">Update your account password</p>
                    </div>
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="btn-primary"
                    >
                      Change
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                    <button className="btn-secondary">
                      Enable
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Login History</h3>
                      <p className="text-sm text-gray-600">View recent login activity</p>
                    </div>
                    <button className="btn-secondary">
                      View
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Preferences</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3" />
                        <span className="text-sm">Email notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3" />
                        <span className="text-sm">SMS notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3" />
                        <span className="text-sm">Push notifications</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Privacy</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3" />
                        <span className="text-sm">Allow profile visibility</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span className="text-sm">Share trading activity</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    className="input-field pl-10 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="input-field pl-10 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="input-field pl-10 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordChange}
                  className="flex-1 btn-primary"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KYC Modal */}
      {showKycModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit KYC Documents</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Type
                </label>
                <select
                  value={kycData.idType}
                  onChange={(e) => setKycData({...kycData, idType: e.target.value})}
                  className="input-field"
                >
                  <option value="">Select ID type</option>
                  <option value="passport">Passport</option>
                  <option value="drivers-license">Driver&apos;s License</option>
                  <option value="national-id">National ID</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Number
                </label>
                <input
                  type="text"
                  value={kycData.idNumber}
                  onChange={(e) => setKycData({...kycData, idNumber: e.target.value})}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID Front
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('idFront', e.target.files[0])}
                      className="hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID Back
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('idBack', e.target.files[0])}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selfie with ID
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Take a selfie holding your ID</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('selfie', e.target.files[0])}
                    className="hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proof of Address
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload utility bill or bank statement</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('proofOfAddress', e.target.files[0])}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowKycModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleKycSubmit}
                  className="flex-1 btn-primary"
                >
                  Submit Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
