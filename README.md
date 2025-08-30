                      # EcoVision Carbon Flow Platform

An AI-powered platform connecting farmers and investors for sustainable carbon credit trading. Built with Next.js, React, and powered by Inflection AI.

## 🌱 Overview

EcoVision Carbon Flow is a comprehensive platform that enables farmers to generate and sell carbon credits while allowing investors to purchase and trade these environmental assets. The platform features advanced AI analytics, real-time tracking, and USSD integration for accessibility in areas with limited internet connectivity.

## ✨ Key Features

### 🔐 Authentication & Security
- **User Registration & Login**: Secure authentication system with email verification
- **KYC Verification**: Complete identity verification process with document upload
- **Profile Management**: Comprehensive user profile with personal and business information
- **Password Security**: Secure password management with change functionality

### 💰 Carbon Wallet
- **Digital Wallet**: Secure storage and management of carbon credits
- **Transaction History**: Complete audit trail of all carbon credit transactions
- **Balance Tracking**: Real-time wallet balance and credit monitoring
- **Trading Interface**: Buy and sell carbon credits with market integration

### 📍 Location Tracking
- **Farm Monitoring**: Real-time GPS tracking of farm locations
- **Carbon Sequestration Verification**: Location-based verification of carbon sequestration activities
- **Interactive Maps**: Visual representation of farm locations and carbon zones
- **Activity Tracking**: Monitor farming activities and their environmental impact

### 📱 USSD Integration
- **No Internet Required**: Access carbon trading services via USSD codes
- **Mobile Money Integration**: Seamless integration with mobile payment systems
- **Voice Prompts**: User-friendly voice-guided navigation
- **Multi-Network Support**: Works across all major mobile networks

### 🤖 AI-Powered Analytics
- **Market Predictions**: AI-driven carbon credit price forecasting
- **Trading Recommendations**: Personalized trading suggestions
- **Portfolio Analysis**: Advanced analytics for carbon credit portfolios
- **Risk Assessment**: AI-powered risk evaluation for investments

### 📊 Dashboard & Analytics
- **Real-time Analytics**: Live data visualization and reporting
- **Portfolio Management**: Comprehensive portfolio tracking and management
- **Performance Metrics**: Detailed performance analysis and insights
- **Market Data**: Real-time market prices and trends

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with modern features
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Recharts**: Data visualization library
- **React Hook Form**: Form management
- **React Hot Toast**: Toast notifications
- **Framer Motion**: Animation library

### Backend Integration
- **RESTful APIs**: Standard API endpoints for all functionality
- **JWT Authentication**: Secure token-based authentication
- **File Upload**: Document and image upload capabilities
- **Real-time Updates**: WebSocket integration for live updates

### AI Integration
- **Inflection AI**: Advanced AI analytics and predictions
- **Machine Learning**: Carbon credit price prediction models
- **Natural Language Processing**: Smart document processing for KYC

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecovision
   ```

2. **Install dependencies**
   ```bash
   cd Frontend
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your configuration:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_AI_API_KEY=your_inflection_ai_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 USSD Codes

The platform provides the following USSD services:

| Code | Service | Description |
|------|---------|-------------|
| `*123*1#` | Check Wallet Balance | View current carbon wallet balance |
| `*123*2#` | Buy Carbon Credits | Purchase carbon credits |
| `*123*3#` | Sell Carbon Credits | Sell your carbon credits |
| `*123*4#` | Transaction History | View recent transactions |
| `*123*5#` | Farm Location | Register/update farm location |
| `*123*6#` | Community Connect | Connect with other farmers |
| `*123*7#` | Market Prices | Check current market prices |
| `*123*8#` | Account Settings | Update account preferences |

## 🏗️ Project Structure

```
Frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── login/             # Authentication pages
│   │   ├── register/          # User registration
│   │   ├── dashboard/         # Main dashboard
│   │   ├── wallet/            # Carbon wallet
│   │   ├── tracking/          # Location tracking
│   │   ├── profile/           # User profile & KYC
│   │   └── ussd/              # USSD services
│   ├── components/            # Reusable components
│   │   ├── providers/         # Context providers
│   │   └── layout/            # Layout components
│   └── styles/                # Global styles
├── public/                    # Static assets
└── package.json              # Dependencies
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the Frontend directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# AI Services
NEXT_PUBLIC_AI_API_KEY=your_inflection_ai_key

# Authentication
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# Database (if using)
DATABASE_URL=your_database_url

# File Upload
NEXT_PUBLIC_UPLOAD_URL=your_upload_service_url
```

## 🎨 Customization

### Styling
The platform uses Tailwind CSS for styling. Customize the design by modifying:
- `src/app/globals.css` - Global styles and custom CSS
- `tailwind.config.js` - Tailwind configuration
- Component-specific styles in individual components

### Theming
The platform supports a green-focused theme representing environmental sustainability. To customize:
1. Update color variables in `globals.css`
2. Modify Tailwind config for custom colors
3. Update component color schemes

## 📊 Features in Detail

### Carbon Wallet
- **Balance Management**: Track carbon credits and monetary balance
- **Transaction History**: Complete audit trail with filtering and search
- **Trading Interface**: Buy/sell carbon credits with market integration
- **Portfolio Analytics**: Visual representation of carbon credit distribution

### Location Tracking
- **GPS Integration**: Real-time location tracking using device GPS
- **Farm Mapping**: Visual representation of farm boundaries
- **Activity Logging**: Track farming activities and their carbon impact
- **Verification System**: Location-based verification of carbon sequestration

### KYC Verification
- **Document Upload**: Secure upload of identification documents
- **Verification Process**: Automated and manual verification workflows
- **Status Tracking**: Real-time status updates on verification progress
- **Compliance**: Regulatory compliance for carbon trading

### AI Analytics
- **Market Predictions**: AI-powered carbon credit price forecasting
- **Trading Recommendations**: Personalized suggestions based on market data
- **Risk Assessment**: AI evaluation of investment risks
- **Portfolio Optimization**: Suggestions for optimal portfolio allocation

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt password encryption
- **Input Validation**: Comprehensive form validation
- **XSS Protection**: Cross-site scripting protection
- **CSRF Protection**: Cross-site request forgery protection
- **File Upload Security**: Secure document upload with validation

## 📱 Mobile Responsiveness

The platform is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Feature phones (via USSD)

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
The platform can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: support@ecovision.com
- Documentation: [docs.ecovision.com](https://docs.ecovision.com)
- Community: [community.ecovision.com](https://community.ecovision.com)

## 🙏 Acknowledgments

- **Inflection AI** for AI-powered analytics
- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icons
- **Recharts** for data visualization

---

**EcoVision Carbon Flow** - Building a sustainable future through carbon trading technology.
