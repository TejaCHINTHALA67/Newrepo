import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:provider/provider.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:autoroute/providers/auth_provider.dart';
import 'package:autoroute/providers/location_provider.dart';
import 'package:autoroute/models/route_model.dart';
import 'package:autoroute/widgets/custom_app_bar.dart';
import 'package:autoroute/widgets/route_info_card.dart';

class DriverHomeScreen extends StatefulWidget {
  const DriverHomeScreen({super.key});

  @override
  State<DriverHomeScreen> createState() => _DriverHomeScreenState();
}

class _DriverHomeScreenState extends State<DriverHomeScreen> {
  GoogleMapController? _mapController;
  LatLng _startLocation = const LatLng(13.6288, 79.4192); // Default to Tirupati
  LatLng? _destination;
  Set<Marker> _markers = {};
  Set<Polyline> _polylines = {};
  bool _isOnline = false;
  bool _isLoadingRoute = false;
  String? _routeDistance;
  String? _routeDuration;

  @override
  void initState() {
    super.initState();
    _initializeLocation();
  }

  void _initializeLocation() async {
    final locationProvider = Provider.of<LocationProvider>(context, listen: false);
    await locationProvider.getCurrentLocation();
    
    if (locationProvider.currentPosition != null) {
      setState(() {
        _startLocation = LatLng(
          locationProvider.currentPosition!.latitude,
          locationProvider.currentPosition!.longitude,
        );
        _markers.add(
          Marker(
            markerId: const MarkerId('start'),
            position: _startLocation,
            icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueGreen),
            infoWindow: const InfoWindow(title: 'Your Location'),
          ),
        );
      });
      
      if (_mapController != null) {
        _mapController!.animateCamera(
          CameraUpdate.newLatLng(_startLocation),
        );
      }
    }
  }

  void _onMapCreated(GoogleMapController controller) {
    _mapController = controller;
    
    // Set initial marker for current location
    setState(() {
      _markers.add(
        Marker(
          markerId: const MarkerId('start'),
          position: _startLocation,
          icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueGreen),
          infoWindow: const InfoWindow(title: 'Your Location'),
        ),
      );
    });
  }

  void _setDestination(LatLng position) {
    setState(() {
      _destination = position;
      _markers.removeWhere((marker) => marker.markerId.value == 'destination');
      _markers.add(
        Marker(
          markerId: const MarkerId('destination'),
          position: position,
          icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueRed),
          infoWindow: const InfoWindow(title: 'Destination'),
        ),
      );
    });
    
    _calculateRoute();
  }

  void _calculateRoute() async {
    if (_destination == null) return;
    
    setState(() {
      _isLoadingRoute = true;
    });

    // For now, we'll create a simple polyline. In production, use Google Directions API
    setState(() {
      _polylines.clear();
      _polylines.add(
        Polyline(
          polylineId: const PolylineId('route'),
          points: [_startLocation, _destination!],
          color: Colors.blue,
          width: 5,
        ),
      );
      
      // Mock calculation - in production, use actual distance calculation
      double distance = _calculateDistance(_startLocation, _destination!);
      _routeDistance = '${distance.toStringAsFixed(1)} km';
      _routeDuration = '${(distance * 2).toInt()} min'; // Mock duration
      _isLoadingRoute = false;
    });
  }

  double _calculateDistance(LatLng start, LatLng end) {
    // Simple distance calculation (not accurate for long distances)
    double lat1 = start.latitude;
    double lon1 = start.longitude;
    double lat2 = end.latitude;
    double lon2 = end.longitude;
    
    double dLat = (lat2 - lat1) * 57.2958; // Convert to radians and back
    double dLon = (lon2 - lon1) * 57.2958;
    double a = 0.5 - (dLat / 2) + (lat1 * lat2) * (dLon / 2);
    return 12742 * (2 * (a.clamp(0, 1))); // Earth radius in km
  }

  void _saveRoute() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    
    if (authProvider.currentUser == null || _destination == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please select a destination first')),
      );
      return;
    }

    try {
      final routeData = RouteModel(
        id: '', // Will be set by Firestore
        driverId: authProvider.currentUser!.uid,
        driverName: authProvider.userModel?.fullName ?? 'Unknown',
        startLocation: GeoPointData(
          latitude: _startLocation.latitude,
          longitude: _startLocation.longitude,
        ),
        endLocation: GeoPointData(
          latitude: _destination!.latitude,
          longitude: _destination!.longitude,
        ),
        distance: _routeDistance ?? '0 km',
        estimatedDuration: _routeDuration ?? '0 min',
        status: RouteStatus.planned,
        createdAt: DateTime.now(),
        availableSeats: 4,
        pricePerSeat: 0.0,
      );

      await FirebaseFirestore.instance
          .collection('routes')
          .add(routeData.toMap());

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Route saved successfully!'),
            backgroundColor: Colors.green,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to save route: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  void _toggleOnlineStatus() {
    setState(() {
      _isOnline = !_isOnline;
    });
    
    // Update driver status in Firestore
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    if (authProvider.currentUser != null) {
      FirebaseFirestore.instance
          .collection('drivers')
          .doc(authProvider.currentUser!.uid)
          .update({'isOnline': _isOnline});
    }
  }

  void _clearRoute() {
    setState(() {
      _destination = null;
      _markers.removeWhere((marker) => marker.markerId.value == 'destination');
      _polylines.clear();
      _routeDistance = null;
      _routeDuration = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'Driver Home',
        actions: [
          IconButton(
            icon: Icon(
              _isOnline ? Icons.radio_button_checked : Icons.radio_button_unchecked,
              color: _isOnline ? Colors.green : Colors.grey,
            ),
            onPressed: _toggleOnlineStatus,
            tooltip: _isOnline ? 'Go Offline' : 'Go Online',
          ),
        ],
      ),
      body: Column(
        children: [
          // Status Card
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16),
            color: _isOnline ? Colors.green.shade50 : Colors.grey.shade100,
            child: Row(
              children: [
                Icon(
                  _isOnline ? Icons.online_prediction : Icons.offline_bolt,
                  color: _isOnline ? Colors.green : Colors.grey,
                ),
                const SizedBox(width: 8),
                Text(
                  _isOnline ? 'You are ONLINE' : 'You are OFFLINE',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: _isOnline ? Colors.green : Colors.grey,
                  ),
                ),
                const Spacer(),
                if (_isLoadingRoute)
                  const SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  ),
              ],
            ),
          ),
          
          // Route Info Card
          if (_destination != null)
            RouteInfoCard(
              distance: _routeDistance ?? 'Calculating...',
              duration: _routeDuration ?? 'Calculating...',
              onClear: _clearRoute,
            ),
          
          // Map
          Expanded(
            child: GoogleMap(
              onMapCreated: _onMapCreated,
              initialCameraPosition: CameraPosition(
                target: _startLocation,
                zoom: 14.0,
              ),
              markers: _markers,
              polylines: _polylines,
              onTap: _isOnline ? _setDestination : null,
              myLocationEnabled: true,
              myLocationButtonEnabled: true,
              mapType: MapType.normal,
            ),
          ),
        ],
      ),
      floatingActionButton: _destination != null
          ? FloatingActionButton.extended(
              onPressed: _saveRoute,
              icon: const Icon(Icons.save),
              label: const Text('Save Route'),
              backgroundColor: Colors.blue,
            )
          : null,
    );
  }
}