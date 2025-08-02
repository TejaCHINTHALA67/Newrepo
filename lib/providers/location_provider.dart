import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:geocoding/geocoding.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class LocationProvider with ChangeNotifier {
  Position? _currentPosition;
  Position? get currentPosition => _currentPosition;
  
  String? _currentAddress;
  String? get currentAddress => _currentAddress;
  
  bool _isLoading = false;
  bool get isLoading => _isLoading;
  
  String? _error;
  String? get error => _error;
  
  bool _locationPermissionGranted = false;
  bool get locationPermissionGranted => _locationPermissionGranted;

  LocationProvider() {
    _checkLocationPermission();
  }

  Future<void> _checkLocationPermission() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      _error = 'Location services are disabled.';
      notifyListeners();
      return;
    }

    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        _error = 'Location permissions are denied.';
        notifyListeners();
        return;
      }
    }

    if (permission == LocationPermission.deniedForever) {
      _error = 'Location permissions are permanently denied.';
      notifyListeners();
      return;
    }

    _locationPermissionGranted = true;
    notifyListeners();
  }

  Future<void> getCurrentLocation() async {
    if (!_locationPermissionGranted) {
      await _checkLocationPermission();
      if (!_locationPermissionGranted) return;
    }

    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _currentPosition = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );
      
      await _getAddressFromCoordinates();
      
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = 'Failed to get current location: $e';
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> _getAddressFromCoordinates() async {
    if (_currentPosition == null) return;

    try {
      List<Placemark> placemarks = await placemarkFromCoordinates(
        _currentPosition!.latitude,
        _currentPosition!.longitude,
      );

      if (placemarks.isNotEmpty) {
        Placemark place = placemarks[0];
        _currentAddress = '${place.street}, ${place.locality}, ${place.administrativeArea}';
      }
    } catch (e) {
      _error = 'Failed to get address: $e';
      notifyListeners();
    }
  }

  Future<String?> getAddressFromCoordinates(double lat, double lng) async {
    try {
      List<Placemark> placemarks = await placemarkFromCoordinates(lat, lng);
      if (placemarks.isNotEmpty) {
        Placemark place = placemarks[0];
        return '${place.street}, ${place.locality}, ${place.administrativeArea}';
      }
    } catch (e) {
      _error = 'Failed to get address: $e';
      notifyListeners();
    }
    return null;
  }

  Future<Position?> getCoordinatesFromAddress(String address) async {
    try {
      List<Location> locations = await locationFromAddress(address);
      if (locations.isNotEmpty) {
        return Position(
          latitude: locations.first.latitude,
          longitude: locations.first.longitude,
          timestamp: DateTime.now(),
          accuracy: 0,
          altitude: 0,
          heading: 0,
          speed: 0,
          speedAccuracy: 0,
        );
      }
    } catch (e) {
      _error = 'Failed to get coordinates: $e';
      notifyListeners();
    }
    return null;
  }

  double calculateDistance(double startLat, double startLng, double endLat, double endLng) {
    return Geolocator.distanceBetween(startLat, startLng, endLat, endLng);
  }

  GeoPoint getCurrentGeoPoint() {
    if (_currentPosition != null) {
      return GeoPoint(_currentPosition!.latitude, _currentPosition!.longitude);
    }
    // Default to a location (you can change this)
    return const GeoPoint(13.0827, 80.2707); // Chennai coordinates
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }

  void startLocationUpdates() {
    if (!_locationPermissionGranted) return;

    Geolocator.getPositionStream(
      locationSettings: const LocationSettings(
        accuracy: LocationAccuracy.high,
        distanceFilter: 10, // Update every 10 meters
      ),
    ).listen((Position position) {
      _currentPosition = position;
      _getAddressFromCoordinates();
      notifyListeners();
    });
  }
}