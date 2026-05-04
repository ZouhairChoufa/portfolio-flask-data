# Portfolio V2 — Zouhair Choufa

> **Portfolio personnel Premium | Data Science, Intelligence Artificielle & Fullstack**
> Construit avec Python (Flask), Tailwind CSS, Vanilla JS et WebGL (Three.js).

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)](#)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?logo=flask&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](#)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?logo=three.js&logoColor=white)](#)

---

## Fonctionnalites (V2 Upgrades)

*   **Dark / Light Mode** : Bascule fluide avec sauvegarde des preferences (LocalStorage) et adaptation dynamique du design.
*   **Arriere-plan 3D Interactif** : Reseau de neurones et de donnees genere en temps reel avec Three.js, reactif aux mouvements de la souris.
*   **Messagerie Integree** : Formulaire de contact fonctionnel propulse par EmailJS (envoi direct sans serveur SMTP lourd).
*   **Design Premium** : Glassmorphism, curseur personnalise, effets d'inclinaison 3D sur les cartes de projets, et animations fluides (AOS).
*   **Backend Dynamique** : Toutes les donnees (projets, competences, bio) sont gerees dynamiquement via Flask.

---

## Structure du projet

    portfolio/
    ├── app.py                  # Backend Flask (Routes & Data statique)
    ├── requirements.txt        # Dependances Python
    ├── templates/
    │   └── index.html          # Template HTML principal (Tailwind CDN)
    └── static/
        ├── css 
            ├── style.css            # Styles CSS personnalises & overrides
        ├── js 
            ├── script.js            # Logique UI, Three.js, AOS & EmailJS
        └── profile.png         # Photo de profil

---

## Stack Technologique

| Composant | Technologie |
| :--- | :--- |
| **Backend** | Python 3.10+, Flask 3.0 |
| **Frontend UI** | HTML5, Tailwind CSS (via CDN) |
| **Animations & 3D** | Vanilla JS, Three.js (WebGL), AOS (Animate On Scroll) |
| **Messagerie** | EmailJS (Cote client) |
| **Typographie** | Google Fonts (Bebas Neue, DM Mono, Outfit) |
| **Icones** | FontAwesome 6 (SVG & Webfonts) |

---

## Lancer le projet en local

### 1. Cloner le depot
    git clone https://github.com/ZouhairChoufa/nom-du-repo.git
    cd nom-du-repo

### 2. Creer un environnement virtuel

**Windows :**
    python -m venv venv
    venv\Scripts\activate

**macOS / Linux :**
    python3 -m venv venv
    source venv/bin/activate

### 3. Installer les dependances
    pip install -r requirements.txt

### 4. Lancer le serveur Flask
    python app.py

> Ouvrez votre navigateur sur : http://127.0.0.1:5000

---

## Personnaliser le contenu

Aucune modification du code HTML n'est necessaire pour mettre a jour vos informations. 
Tout le contenu est centralise dans le fichier **app.py** via des dictionnaires Python :

*   PROFILE : Bio, liens reseaux sociaux, statut actuel.
*   SKILLS : Categories et barres de progression dynamiques.
*   PROJECTS : Liste des projets avec filtrage automatique par tags.
*   EXPERIENCE & CERTIFICATIONS : Historique professionnel.

---

## Configuration EmailJS (Contact)

Le formulaire de contact utilise EmailJS pour envoyer les messages directement dans votre boite de reception.

Pour l'activer sur votre propre environnement :
1. Creez un compte gratuit sur EmailJS et connectez votre adresse Gmail.
2. Creez un Email Template.
3. Recuperez vos cles et remplacez-les dans static/script.js dans la fonction handleContact() :

    emailjs.init("VOTRE_PUBLIC_KEY");
    emailjs.send("VOTRE_SERVICE_ID", "VOTRE_TEMPLATE_ID", templateParams)

---

## Deploiement en production

### Option A — Render (Recommande, Gratuit)
1. Creez un compte sur Render et connectez votre GitHub.
2. Creez un New Web Service et selectionnez ce depot.
3. Configuration :
   * Build Command : pip install -r requirements.txt
   * Start Command : gunicorn app:app (necessite d'ajouter gunicorn a votre requirements.txt).
4. Deployez !

### Option B — PythonAnywhere
1. Allez sur PythonAnywhere.
2. Ajoutez une nouvelle Web App (Flask -> Python 3.10).
3. Importez vos fichiers et pointez le chemin d'execution vers app.py.

---

## Licence

Distribue sous la licence MIT. Libre d'utilisation et de modification.

---
Developpe par Zouhair Choufa (https://github.com/ZouhairChoufa)