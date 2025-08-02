import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:autoroute/models/user_model.dart';

class AuthProvider with ChangeNotifier {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  User? get currentUser => _auth.currentUser;
  UserModel? _userModel;
  UserModel? get userModel => _userModel;
  bool _isLoading = false;
  bool get isLoading => _isLoading;
  String? _error;
  String? get error => _error;

  AuthProvider() {
    _auth.authStateChanges().listen((User? user) {
      if (user != null) {
        _loadUserData(user.uid);
      } else {
        _userModel = null;
        notifyListeners();
      }
    });
  }

  Future<void> _loadUserData(String uid) async {
    try {
      final doc = await _firestore.collection('users').doc(uid).get();
      if (doc.exists) {
        _userModel = UserModel.fromMap(doc.data()!, uid);
        notifyListeners();
      }
    } catch (e) {
      _error = 'Failed to load user data: $e';
      notifyListeners();
    }
  }

  Future<bool> signUp({
    required String fullName,
    required String email,
    required String phone,
    required String password,
    String? pan,
    String? bankAccount,
    String? username,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      // Create Firebase Auth user
      final UserCredential result = await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );

      if (result.user != null) {
        // Create user document in Firestore
        final userModel = UserModel(
          uid: result.user!.uid,
          fullName: fullName,
          email: email,
          phone: phone,
          pan: pan,
          bankAccount: bankAccount,
          username: username,
          createdAt: DateTime.now(),
        );

        await _firestore
            .collection('users')
            .doc(result.user!.uid)
            .set(userModel.toMap());

        _userModel = userModel;
        
        // Store session
        await _storage.write(key: 'user_uid', value: result.user!.uid);
        
        _isLoading = false;
        notifyListeners();
        return true;
      }
    } catch (e) {
      _error = _getAuthErrorMessage(e);
      _isLoading = false;
      notifyListeners();
    }
    return false;
  }

  Future<bool> signInWithEmailPassword(String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final UserCredential result = await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );

      if (result.user != null) {
        await _storage.write(key: 'user_uid', value: result.user!.uid);
        _isLoading = false;
        notifyListeners();
        return true;
      }
    } catch (e) {
      _error = _getAuthErrorMessage(e);
      _isLoading = false;
      notifyListeners();
    }
    return false;
  }

  Future<bool> signInWithPhone(String phoneNumber) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await _auth.verifyPhoneNumber(
        phoneNumber: phoneNumber,
        verificationCompleted: (PhoneAuthCredential credential) async {
          await _auth.signInWithCredential(credential);
        },
        verificationFailed: (FirebaseAuthException e) {
          _error = _getAuthErrorMessage(e);
          _isLoading = false;
          notifyListeners();
        },
        codeSent: (String verificationId, int? resendToken) {
          // Store verification ID for later use
          _storage.write(key: 'verification_id', value: verificationId);
          _isLoading = false;
          notifyListeners();
        },
        codeAutoRetrievalTimeout: (String verificationId) {
          _storage.write(key: 'verification_id', value: verificationId);
        },
      );
      return true;
    } catch (e) {
      _error = _getAuthErrorMessage(e);
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> verifyPhoneOTP(String otp) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final String? verificationId = await _storage.read(key: 'verification_id');
      if (verificationId != null) {
        PhoneAuthCredential credential = PhoneAuthProvider.credential(
          verificationId: verificationId,
          smsCode: otp,
        );

        final UserCredential result = await _auth.signInWithCredential(credential);
        if (result.user != null) {
          await _storage.write(key: 'user_uid', value: result.user!.uid);
          _isLoading = false;
          notifyListeners();
          return true;
        }
      }
    } catch (e) {
      _error = _getAuthErrorMessage(e);
      _isLoading = false;
      notifyListeners();
    }
    return false;
  }

  Future<bool> sendPasswordResetEmail(String email) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await _auth.sendPasswordResetEmail(email: email);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = _getAuthErrorMessage(e);
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<void> signOut() async {
    _isLoading = true;
    notifyListeners();

    try {
      await _auth.signOut();
      await _storage.deleteAll();
      _userModel = null;
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = 'Failed to sign out: $e';
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> updateUserProfile({
    String? fullName,
    String? phone,
    String? pan,
    String? bankAccount,
    String? username,
  }) async {
    if (_userModel == null) return false;

    try {
      final updatedUser = _userModel!.copyWith(
        fullName: fullName,
        phone: phone,
        pan: pan,
        bankAccount: bankAccount,
        username: username,
      );

      await _firestore
          .collection('users')
          .doc(_userModel!.uid)
          .update(updatedUser.toMap());

      _userModel = updatedUser;
      notifyListeners();
      return true;
    } catch (e) {
      _error = 'Failed to update profile: $e';
      notifyListeners();
      return false;
    }
  }

  String _getAuthErrorMessage(dynamic e) {
    if (e is FirebaseAuthException) {
      switch (e.code) {
        case 'user-not-found':
          return 'No user found with this email address.';
        case 'wrong-password':
          return 'Incorrect password.';
        case 'email-already-in-use':
          return 'An account with this email already exists.';
        case 'weak-password':
          return 'Password is too weak.';
        case 'invalid-email':
          return 'Invalid email address.';
        case 'invalid-phone-number':
          return 'Invalid phone number.';
        case 'invalid-verification-code':
          return 'Invalid verification code.';
        default:
          return e.message ?? 'Authentication failed.';
      }
    }
    return 'An error occurred. Please try again.';
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }
}