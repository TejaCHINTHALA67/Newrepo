import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:autoroute/providers/auth_provider.dart';
import 'package:autoroute/providers/location_provider.dart';
import 'package:autoroute/screens/driver_home_screen.dart';
import 'package:autoroute/utils/theme.dart';

/// Demo app to showcase the Driver Home Screen functionality
/// 
/// This demonstrates:
/// - Google Maps integration with real-time location
/// - Route planning and visualization
/// - Online/Offline status toggle
/// - Route saving to Firebase Firestore
/// - Modern UI with custom widgets
/// 
/// Features:
/// 1. Tap on map to set destination when online
/// 2. View route information (distance, duration)
/// 3. Save routes to Firebase
/// 4. Toggle between online/offline status
/// 5. Real-time location tracking
class DriverHomeDemoApp extends StatelessWidget {
  const DriverHomeDemoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => LocationProvider()),
      ],
      child: MaterialApp(
        title: 'Driver Home Demo',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.lightTheme,
        home: const DriverHomeDemoScreen(),
      ),
    );
  }
}

class DriverHomeDemoScreen extends StatelessWidget {
  const DriverHomeDemoScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Driver Home Demo'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Driver Home Map Features',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 20),
            const Card(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'How to Use:',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    SizedBox(height: 12),
                    _FeatureItem(
                      icon: Icons.radio_button_checked,
                      title: 'Toggle Online Status',
                      description: 'Tap the status button to go online/offline',
                    ),
                    _FeatureItem(
                      icon: Icons.touch_app,
                      title: 'Set Destination',
                      description: 'Tap anywhere on the map to set your destination',
                    ),
                    _FeatureItem(
                      icon: Icons.route,
                      title: 'View Route Info',
                      description: 'See distance and duration calculations',
                    ),
                    _FeatureItem(
                      icon: Icons.save,
                      title: 'Save Route',
                      description: 'Save your planned route to Firebase',
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 30),
            Center(
              child: ElevatedButton.icon(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const DriverHomeScreen(),
                    ),
                  );
                },
                icon: const Icon(Icons.map),
                label: const Text('Open Driver Home'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(
                    horizontal: 24,
                    vertical: 12,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),
            const Card(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Technical Features:',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    SizedBox(height: 8),
                    Text('• Google Maps integration'),
                    Text('• Firebase Firestore for data storage'),
                    Text('• Real-time location tracking'),
                    Text('• Custom UI components'),
                    Text('• Provider state management'),
                    Text('• Route planning and visualization'),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _FeatureItem extends StatelessWidget {
  final IconData icon;
  final String title;
  final String description;

  const _FeatureItem({
    required this.icon,
    required this.title,
    required this.description,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(
            icon,
            size: 20,
            color: Colors.blue,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontWeight: FontWeight.w500,
                  ),
                ),
                Text(
                  description,
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.grey[600],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// Example usage in main.dart:
/// 
/// ```dart
/// void main() async {
///   WidgetsFlutterBinding.ensureInitialized();
///   await Firebase.initializeApp();
///   runApp(const DriverHomeDemoApp());
/// }
/// ```