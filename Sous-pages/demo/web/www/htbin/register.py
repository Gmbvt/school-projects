#!/usr/bin/python3
# -*- coding: utf-8 -*-


import warnings
warnings.filterwarnings("ignore", "'cgi' is deprecated", DeprecationWarning)
warnings.filterwarnings("ignore", "'cgitb' is deprecated", DeprecationWarning)
warnings.filterwarnings("ignore", "Debugger warning", DeprecationWarning)
PYDEVD_DISABLE_FILE_VALIDATION=1


import cgi # pyright: ignore[reportMissingImports]
import cgitb # pyright: ignore[reportMissingImports]
import os
import hashlib
import json
import sys
import codecs
import time

time.sleep(3)

if sys.stdout.encoding != 'utf-8':
    sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

cgitb.enable()

print('Cache-Control: no-cache')
print('Content-type: text/html; charset=utf-8')
print('')

# --- 1. RÉCUPÉRATION DES DONNÉES ---

# Valeurs par défaut
new_user = {
    'username': 'Obligatoire',
    'useremail': 'Obligatoire',
    'userpwd': 'Obligatoire',
    'firstname': 'Obligatoire',
    'lastname': 'Obligatoire',
    'birthdate': 'Facultatif'
}

form = cgi.FieldStorage()

# Remplissage des données
if len(form) > 0:
    for name in list(form.keys()):
        if name in new_user or name == 'userpwd':
            if name == 'userpwd':
                new_user[name] = hashlib.sha512(form.getfirst(name).encode('utf-8')).hexdigest()
            else:
                new_user[name] = form.getfirst(name)
else:
    print("Erreur : Aucun formulaire reçu.")
    sys.exit()

# --- 2. TRAITEMENT DE LA BASE DE DONNÉES (JSON) ---

db_path = '../data/users.json'
users_db = {}

# Lecture existante
try:
    if os.path.exists(db_path) and os.path.getsize(db_path) > 0:
        with open(db_path, 'r', encoding='utf-8') as f:
            users_db = json.load(f)
except Exception as e:
    users_db = {}

# Ajout de l'utilisateur
username_key = new_user.get('username')

# Vérification que l'utilisateur a entré un pseudo
if username_key == 'Obligatoire' or not username_key:
    print("Erreur : Le nom d'utilisateur est manquant.")
    sys.exit()

users_db[username_key] = new_user

# --- 3. ÉCRITURE ET AFFICHAGE DU MESSAGE ---


try:
    with open(db_path, 'w', encoding='utf-8') as data_file:
        # ensure_ascii=False permet d'avoir les accents dans le fichier JSON
        json.dump(users_db, data_file, ensure_ascii=False, indent=4)
    
    # === SUCCÈS ===
    print(f"L'utilisateur {username_key} a bien été enregistré.")

except IOError as e:
    # === ÉCHEC (Problème de permission ou disque) ===
    print(f"Erreur : Impossible d'écrire les données ({e})")

except Exception as e:
    # === AUTRE ÉCHEC ===
    print(f"Erreur : {e}")