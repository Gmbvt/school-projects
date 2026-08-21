import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart';
import 'package:shelf_router/shelf_router.dart';
import 'package:shelf_static/shelf_static.dart';
import 'package:shelf_multipart/shelf_multipart.dart';
import 'user.dart';

Future<Response> _registerHandler(Request request) async {
  try {
    Map<String, String> form = {};
    // Get the body
    if (request.formData() case var formDataRaw?) {
      // Read all form-data parameters into a single map:
      form = <String, String>{
        await for (final formData in formDataRaw.formData)
          formData.name: await formData.part.readString(),
      };
    }

    // Check that the form is full
    if (form.isEmpty) {
      return Response.ok(
        "Erreur : Formulaire absent",
        headers: {"Content-Type": "text/plain"},
      );
    } else if (form.length != 6) {
      return Response.ok(
        "Erreur : Formulaire mal formé",
        headers: {"Content-Type": "text/plain"},
      );
    }

    // Get the new user
    final User newUser = .fromUnhashedJson(form);

    // Open the DB and get its content
    File? db;
    if (await File("../data/users.json").exists()) {
      db = File("../data/users.json");
    } else {
      db = File("data/users.json");
    }

    final rawDb = jsonDecode(await db.readAsString());

    if (rawDb.containsKey(newUser.username)) {
      return Response.ok(
        "Erreur : Le nom d'utilisateur existe déjà",
        headers: {"Content-Type": "text/plain"},
      );
    }
    rawDb[newUser.username] = newUser.toJson();

    // Write the DB with the new content
    await db.writeAsString(jsonEncode(rawDb));

    return Response.ok(
      "L'utilisateur ${newUser.username} a bien été enregistré",
      headers: {"Content-Type": "text/plain"},
    );
  } catch (e) {
    return Response.ok("Erreur : $e", headers: {"Content-Type": "text/plain"});
  }
}

void main(List<String> args) async {
  final ip = InternetAddress.anyIPv4;

  final router = Router()..post('/htbin/register.py', _registerHandler);

  FutureOr<Response> Function(Request)? staticHandler;

  try {
    staticHandler = createStaticHandler(
      "../www",
      defaultDocument: 'index.html',
    );
  } catch (e) {
    staticHandler = createStaticHandler("www", defaultDocument: 'index.html');
  }

  final handler = Cascade().add(router.call).add(staticHandler).handler;
  final pipeline = Pipeline().addMiddleware(logRequests()).addHandler(handler);

  final port = int.parse(Platform.environment['PORT'] ?? '8123');
  final server = await serve(pipeline, ip, port);
  server.autoCompress = true;
  print('Server listening on port ${server.port}');
}
