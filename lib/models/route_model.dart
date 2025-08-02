import 'package:cloud_firestore/cloud_firestore.dart';

enum RouteStatus {
  planned,
  active,
  completed,
  cancelled,
}

class GeoPointData {
  final double latitude;
  final double longitude;

  GeoPointData({
    required this.latitude,
    required this.longitude,
  });

  Map<String, dynamic> toMap() {
    return {
      'latitude': latitude,
      'longitude': longitude,
    };
  }

  factory GeoPointData.fromMap(Map<String, dynamic> map) {
    return GeoPointData(
      latitude: map['latitude']?.toDouble() ?? 0.0,
      longitude: map['longitude']?.toDouble() ?? 0.0,
    );
  }

  factory GeoPointData.fromGeoPoint(GeoPoint geoPoint) {
    return GeoPointData(
      latitude: geoPoint.latitude,
      longitude: geoPoint.longitude,
    );
  }

  GeoPoint toGeoPoint() {
    return GeoPoint(latitude, longitude);
  }
}

class RouteModel {
  final String id;
  final String driverId;
  final String driverName;
  final GeoPointData startLocation;
  final GeoPointData endLocation;
  final String? startAddress;
  final String? endAddress;
  final String distance;
  final String estimatedDuration;
  final RouteStatus status;
  final DateTime createdAt;
  final DateTime? startedAt;
  final DateTime? completedAt;
  final int availableSeats;
  final double pricePerSeat;
  final List<String> passengerIds;
  final String? notes;

  RouteModel({
    required this.id,
    required this.driverId,
    required this.driverName,
    required this.startLocation,
    required this.endLocation,
    this.startAddress,
    this.endAddress,
    required this.distance,
    required this.estimatedDuration,
    required this.status,
    required this.createdAt,
    this.startedAt,
    this.completedAt,
    required this.availableSeats,
    required this.pricePerSeat,
    this.passengerIds = const [],
    this.notes,
  });

  Map<String, dynamic> toMap() {
    return {
      'driverId': driverId,
      'driverName': driverName,
      'startLocation': startLocation.toMap(),
      'endLocation': endLocation.toMap(),
      'startAddress': startAddress,
      'endAddress': endAddress,
      'distance': distance,
      'estimatedDuration': estimatedDuration,
      'status': status.name,
      'createdAt': Timestamp.fromDate(createdAt),
      'startedAt': startedAt != null ? Timestamp.fromDate(startedAt!) : null,
      'completedAt': completedAt != null ? Timestamp.fromDate(completedAt!) : null,
      'availableSeats': availableSeats,
      'pricePerSeat': pricePerSeat,
      'passengerIds': passengerIds,
      'notes': notes,
    };
  }

  factory RouteModel.fromMap(Map<String, dynamic> map, String id) {
    return RouteModel(
      id: id,
      driverId: map['driverId'] ?? '',
      driverName: map['driverName'] ?? '',
      startLocation: GeoPointData.fromMap(map['startLocation'] ?? {}),
      endLocation: GeoPointData.fromMap(map['endLocation'] ?? {}),
      startAddress: map['startAddress'],
      endAddress: map['endAddress'],
      distance: map['distance'] ?? '',
      estimatedDuration: map['estimatedDuration'] ?? '',
      status: RouteStatus.values.firstWhere(
        (status) => status.name == map['status'],
        orElse: () => RouteStatus.planned,
      ),
      createdAt: (map['createdAt'] as Timestamp).toDate(),
      startedAt: map['startedAt'] != null 
          ? (map['startedAt'] as Timestamp).toDate() 
          : null,
      completedAt: map['completedAt'] != null 
          ? (map['completedAt'] as Timestamp).toDate() 
          : null,
      availableSeats: map['availableSeats'] ?? 0,
      pricePerSeat: map['pricePerSeat']?.toDouble() ?? 0.0,
      passengerIds: List<String>.from(map['passengerIds'] ?? []),
      notes: map['notes'],
    );
  }

  RouteModel copyWith({
    String? id,
    String? driverId,
    String? driverName,
    GeoPointData? startLocation,
    GeoPointData? endLocation,
    String? startAddress,
    String? endAddress,
    String? distance,
    String? estimatedDuration,
    RouteStatus? status,
    DateTime? createdAt,
    DateTime? startedAt,
    DateTime? completedAt,
    int? availableSeats,
    double? pricePerSeat,
    List<String>? passengerIds,
    String? notes,
  }) {
    return RouteModel(
      id: id ?? this.id,
      driverId: driverId ?? this.driverId,
      driverName: driverName ?? this.driverName,
      startLocation: startLocation ?? this.startLocation,
      endLocation: endLocation ?? this.endLocation,
      startAddress: startAddress ?? this.startAddress,
      endAddress: endAddress ?? this.endAddress,
      distance: distance ?? this.distance,
      estimatedDuration: estimatedDuration ?? this.estimatedDuration,
      status: status ?? this.status,
      createdAt: createdAt ?? this.createdAt,
      startedAt: startedAt ?? this.startedAt,
      completedAt: completedAt ?? this.completedAt,
      availableSeats: availableSeats ?? this.availableSeats,
      pricePerSeat: pricePerSeat ?? this.pricePerSeat,
      passengerIds: passengerIds ?? this.passengerIds,
      notes: notes ?? this.notes,
    );
  }

  bool get hasAvailableSeats => availableSeats > passengerIds.length;
  int get occupiedSeats => passengerIds.length;
  double get totalEarnings => pricePerSeat * passengerIds.length;
}