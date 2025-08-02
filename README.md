# 🚀 AutoRoute - Smart Auto Driver App

A comprehensive Flutter application for auto drivers to manage routes, handle ride requests, and optimize their earnings through intelligent route matching and ride pickup.

## 📱 Features

### 🔐 Authentication System
- **Multi-method Login**: Email/Password, Phone OTP, Email OTP
- **Secure Registration**: Complete driver profile creation with KYC support
- **Password Recovery**: Email-based password reset functionality
- **Session Management**: Secure local storage for user sessions

### 🗺️ Route Management
- **Google Maps Integration**: Real-time location tracking and route visualization
- **Smart Route Setup**: Start location and destination input with autocomplete
- **Fare Management**: Dynamic fare calculation and input
- **Schedule Support**: Option to schedule routes for later times

### 📊 Driver Dashboard
- **Home Screen**: Map view with current location and route setup
- **Insights**: Demand heatmaps and route trend analysis
- **Reviews & Support**: Passenger reviews and customer support integration
- **Profile Management**: Driver information, route history, and earnings tracking

### 🤖 AI-Powered Features (Optional)
- **Smart Assistant**: Voice and text-based driver assistance
- **Auto-fare Suggestion**: AI-driven pricing recommendations
- **Real-time Alerts**: Intelligent ride request matching
- **Bug Detection**: Automatic issue detection and minor fixes

## 🛠️ Tech Stack

- **Frontend**: Flutter (Cross-platform)
- **Backend**: Firebase
  - Authentication: Firebase Auth
  - Database: Cloud Firestore
  - Real-time: Firebase Realtime Database
- **Maps**: Google Maps SDK
- **Location**: Geolocator & Geocoding
- **State Management**: Provider
- **Storage**: Flutter Secure Storage

## 📦 Installation

### Prerequisites
- Flutter SDK (>=3.0.0)
- Dart SDK (>=3.0.0)
- Android Studio / VS Code
- Firebase Project
- Google Maps API Key

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/TejaCHINTHALA67/Newrepo.git
   cd Newrepo
   ```

2. **Install dependencies**
   ```bash
   flutter pub get
   ```

3. **Firebase Setup**
   - Create a new Firebase project
   - Enable Authentication (Email/Password, Phone)
   - Create Firestore database
   - Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
   - Place them in the respective platform folders

4. **Google Maps Setup**
   - Get Google Maps API key from Google Cloud Console
   - Enable Maps SDK for Android/iOS
   - Add API key to platform-specific files

5. **Run the app**
   ```bash
   flutter run
   ```

## 📁 Project Structure

```
lib/
├── main.dart                 # App entry point
├── models/                   # Data models
│   ├── user_model.dart      # User/Driver model
│   └── route_model.dart     # Route model
├── providers/               # State management
│   ├── auth_provider.dart   # Authentication provider
│   └── location_provider.dart # Location services
├── screens/                 # UI screens
│   ├── splash_screen.dart   # App splash screen
│   ├── auth/               # Authentication screens
│   │   ├── login_screen.dart
│   │   ├── signup_screen.dart
│   │   ├── forgot_password_screen.dart
│   │   └── phone_otp_screen.dart
│   └── home/               # Main app screens
│       └── home_screen.dart
├── widgets/                # Reusable widgets
│   ├── custom_button.dart
│   └── custom_text_field.dart
└── utils/                  # Utilities
    ├── theme.dart          # App theme configuration
    └── validators.dart     # Form validation
```

## 🔧 Configuration

### Firebase Configuration
The app uses Firebase for backend services. Configure the following:

1. **Authentication Methods**:
   - Email/Password
   - Phone Number
   - Anonymous (optional)

2. **Firestore Collections**:
   ```json
   "users": {
     "uid123": {
       "fullName": "Driver Name",
       "email": "driver@example.com",
       "phone": "+91XXXXXXXXXX",
       "pan": "ABCDE1234F",
       "bankAccount": "XXXXXXXXXX",
       "kycVerified": false,
       "username": "driver_username",
       "createdAt": "timestamp",
       "isActive": false
     }
   },
   "routes": {
     "routeId123": {
       "driverId": "uid123",
       "pickup": "Start Location",
       "destination": "End Location",
       "fare": 40.0,
       "startTime": "timestamp",
       "currentLocation": {
         "lat": 13.0827,
         "lng": 80.2707
       },
       "isActive": false,
       "status": "pending"
     }
   }
   ```

### Environment Variables
Create a `.env` file in the root directory:
```env
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
FIREBASE_PROJECT_ID=your_firebase_project_id
```

## 🚀 Features in Detail

### Registration Flow
1. Driver enters personal information
2. KYC details (PAN/SSN) for verification
3. Bank account details for payments
4. Username and password setup
5. Account creation in Firebase

### Login Methods
1. **Email/Password**: Traditional login with password recovery
2. **Phone OTP**: SMS-based verification
3. **Email OTP**: Email-based password reset

### Route Management
1. **Location Input**: Google Places autocomplete for pickup/destination
2. **Fare Setting**: Manual fare input with AI suggestions
3. **Scheduling**: Option to schedule routes for specific times
4. **Active Status**: Toggle driver availability

### Navigation Structure
- **Home**: Map view with route setup
- **Insights**: Analytics and demand visualization
- **Support**: Reviews and customer service
- **Profile**: Driver information and settings

## 🔒 Security Features

- Secure password storage
- JWT token management
- Input validation and sanitization
- Location permission handling
- Secure storage for sensitive data

## 📱 Platform Support

- ✅ Android (API 21+)
- ✅ iOS (iOS 11+)
- 🔄 Web (In development)
- 🔄 Desktop (Planned)

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
- Create an issue in the GitHub repository
- Contact: [Your Contact Information]

## 🔮 Roadmap

- [ ] Web platform support
- [ ] Desktop application
- [ ] Advanced AI features
- [ ] Multi-language support
- [ ] Offline mode
- [ ] Advanced analytics dashboard
- [ ] Payment gateway integration
- [ ] Push notifications
- [ ] Real-time chat support

---

**Built with ❤️ using Flutter & Firebase**