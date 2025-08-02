import 'package:cloud_firestore/cloud_firestore.dart';

class UserModel {
  final String uid;
  final String fullName;
  final String email;
  final String phone;
  final String? pan;
  final String? bankAccount;
  final String? username;
  final bool kycVerified;
  final DateTime createdAt;
  final DateTime? lastLoginAt;
  final bool isActive;
  final String? profileImageUrl;

  UserModel({
    required this.uid,
    required this.fullName,
    required this.email,
    required this.phone,
    this.pan,
    this.bankAccount,
    this.username,
    this.kycVerified = false,
    required this.createdAt,
    this.lastLoginAt,
    this.isActive = false,
    this.profileImageUrl,
  });

  factory UserModel.fromMap(Map<String, dynamic> map, String uid) {
    return UserModel(
      uid: uid,
      fullName: map['fullName'] ?? '',
      email: map['email'] ?? '',
      phone: map['phone'] ?? '',
      pan: map['pan'],
      bankAccount: map['bankAccount'],
      username: map['username'],
      kycVerified: map['kycVerified'] ?? false,
      createdAt: (map['createdAt'] as Timestamp).toDate(),
      lastLoginAt: map['lastLoginAt'] != null 
          ? (map['lastLoginAt'] as Timestamp).toDate() 
          : null,
      isActive: map['isActive'] ?? false,
      profileImageUrl: map['profileImageUrl'],
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'fullName': fullName,
      'email': email,
      'phone': phone,
      'pan': pan,
      'bankAccount': bankAccount,
      'username': username,
      'kycVerified': kycVerified,
      'createdAt': createdAt,
      'lastLoginAt': lastLoginAt,
      'isActive': isActive,
      'profileImageUrl': profileImageUrl,
    };
  }

  UserModel copyWith({
    String? uid,
    String? fullName,
    String? email,
    String? phone,
    String? pan,
    String? bankAccount,
    String? username,
    bool? kycVerified,
    DateTime? createdAt,
    DateTime? lastLoginAt,
    bool? isActive,
    String? profileImageUrl,
  }) {
    return UserModel(
      uid: uid ?? this.uid,
      fullName: fullName ?? this.fullName,
      email: email ?? this.email,
      phone: phone ?? this.phone,
      pan: pan ?? this.pan,
      bankAccount: bankAccount ?? this.bankAccount,
      username: username ?? this.username,
      kycVerified: kycVerified ?? this.kycVerified,
      createdAt: createdAt ?? this.createdAt,
      lastLoginAt: lastLoginAt ?? this.lastLoginAt,
      isActive: isActive ?? this.isActive,
      profileImageUrl: profileImageUrl ?? this.profileImageUrl,
    );
  }
}

// Helper class for Timestamp conversion
class Timestamp {
  final DateTime dateTime;
  
  Timestamp(this.dateTime);
  
  DateTime toDate() => dateTime;
  
  static Timestamp fromDate(DateTime dateTime) => Timestamp(dateTime);
  
  static Timestamp now() => Timestamp(DateTime.now());
}