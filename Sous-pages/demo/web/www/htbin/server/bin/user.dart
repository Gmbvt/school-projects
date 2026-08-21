import 'dart:convert';

import 'package:crypto/crypto.dart';

class User {
  final String username;
  final String userEmail;
  final String userPwd;
  final String firstName;
  final String lastName;
  final String birthDate;

  const User({
    required this.firstName,
    required this.username,
    required this.userPwd,
    required this.lastName,
    required this.userEmail,
    required this.birthDate,
  });

  factory User.fromUnhashedJson(Map<String, dynamic> json) {
    return User(
      firstName: json["firstname"],
      username: json["username"],
      userPwd: sha512.convert(utf8.encode(json["userpwd"])).toString(),
      lastName: json["firstname"],
      userEmail: json["useremail"],
      birthDate: json["birthdate"],
    );
  }

  factory User.fromHashedJson(Map<String, dynamic> json) {
    return User(
      firstName: json["firstname"],
      username: json["username"],
      userPwd: json["userpwd"],
      lastName: json["firstname"],
      userEmail: json["useremail"],
      birthDate: json["birthdate"],
    );
  }

  Map<String, String> toJson() {
    return {
      "username": username,
      "useremail": userEmail,
      "userpwd": userPwd,
      "firstname": firstName,
      "lastname": lastName,
      "birthdate": birthDate,
    };
  }
}
