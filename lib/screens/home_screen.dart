import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:autoroute/providers/auth_provider.dart';
import 'package:autoroute/screens/driver_home_screen.dart';
import 'package:autoroute/widgets/custom_app_bar.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(
        title: 'AutoRoute',
        actions: [
          // Add logout button or profile access here
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Consumer<AuthProvider>(
              builder: (context, authProvider, child) {
                return Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Welcome, ${authProvider.userModel?.fullName ?? 'User'}!',
                          style: const TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'KYC Status: ${authProvider.userModel?.kycVerified == true ? "Verified" : "Pending"}',
                          style: TextStyle(
                            color: authProvider.userModel?.kycVerified == true 
                                ? Colors.green 
                                : Colors.orange,
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
            const SizedBox(height: 30),
            const Text(
              'Choose Your Role',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 20),
            Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                children: [
                  _RoleCard(
                    title: 'Driver',
                    subtitle: 'Offer rides & earn',
                    icon: Icons.local_taxi,
                    color: Colors.blue,
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const DriverHomeScreen(),
                        ),
                      );
                    },
                  ),
                  _RoleCard(
                    title: 'Passenger',
                    subtitle: 'Find & book rides',
                    icon: Icons.person,
                    color: Colors.green,
                    onTap: () {
                      // Navigate to passenger screen
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Passenger screen not implemented yet')),
                      );
                    },
                  ),
                  _RoleCard(
                    title: 'Fleet Manager',
                    subtitle: 'Manage fleet',
                    icon: Icons.business,
                    color: Colors.orange,
                    onTap: () {
                      // Navigate to fleet manager screen
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Fleet Manager screen not implemented yet')),
                      );
                    },
                  ),
                  _RoleCard(
                    title: 'Analytics',
                    subtitle: 'View insights',
                    icon: Icons.analytics,
                    color: Colors.purple,
                    onTap: () {
                      // Navigate to analytics screen
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Analytics screen not implemented yet')),
                      );
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _RoleCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final IconData icon;
  final Color color;
  final VoidCallback onTap;

  const _RoleCard({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  icon,
                  size: 32,
                  color: color,
                ),
              ),
              const SizedBox(height: 12),
              Text(
                title,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 4),
              Text(
                subtitle,
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.grey[600],
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}