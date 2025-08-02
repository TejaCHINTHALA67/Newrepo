import 'package:cloud_firestore/cloud_firestore.dart';

class RouteModel {
  final String routeId;
  final String driverId;
  final String pickup;
  final String destination;
  final double fare;
  final DateTime startTime;
  final GeoPoint currentLocation;
  final bool isActive;
  final DateTime createdAt;
  final DateTime? completedAt;
  final String? status; // 'pending', 'active', 'completed', 'cancelled'

  RouteModel({
    required this.routeId,
    required this.driverId,
    required this.pickup,
    required this.destination,
    required this.fare,
    required this.startTime,
    required this.currentLocation,
    this.isActive = false,
    required this.createdAt,
    this.completedAt,
    this.status = 'pending',
  });

  factory RouteModel.fromMap(Map<String, dynamic> map, String routeId) {
    return RouteModel(
      routeId: routeId,
      driverId: map['driverId'] ?? '',
      pickup: map['pickup'] ?? '',
      destination: map['destination'] ?? '',
      fare: (map['fare'] ?? 0).toDouble(),
      startTime: (map['startTime'] as Timestamp).toDate(),
      currentLocation: map['currentLocation'] as GeoPoint,
      isActive: map['isActive'] ?? false,
      createdAt: (map['createdAt'] as Timestamp).toDate(),
      completedAt: map['completedAt'] != null 
          ? (map['completedAt'] as Timestamp).toDate() 
          : null,
      status: map['status'] ?? 'pending',
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'driverId': driverId,
      'pickup': pickup,
      'destination': destination,
      'fare': fare,
      'startTime': startTime,
      'currentLocation': currentLocation,
      'isActive': isActive,
      'createdAt': createdAt,
      'completedAt': completedAt,
      'status': status,
    };
  }

  RouteModel copyWith({
    String? routeId,
    String? driverId,
    String? pickup,
    String? destination,
    double? fare,
    DateTime? startTime,
    GeoPoint? currentLocation,
    bool? isActive,
    DateTime? createdAt,
    DateTime? completedAt,
    String? status,
  }) {
    return RouteModel(
      routeId: routeId ?? this.routeId,
      driverId: driverId ?? this.driverId,
      pickup: pickup ?? this.pickup,
      destination: destination ?? this.destination,
      fare: fare ?? this.fare,
      startTime: startTime ?? this.startTime,
      currentLocation: currentLocation ?? this.currentLocation,
      isActive: isActive ?? this.isActive,
      createdAt: createdAt ?? this.createdAt,
      completedAt: completedAt ?? this.completedAt,
      status: status ?? this.status,
    );
  }
}