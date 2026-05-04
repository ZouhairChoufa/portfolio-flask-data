# 🧠 Portfolio — Zouhair Choufa

> Portfolio personnel Data & IA — Stack Flask + Tailwind CSS

---

## 🗂️ Structure du projet

```
portfolio/
├── app.py                  # Backend Flask (routes + données)
├── requirements.txt        # Dépendances Python
├── templates/
│   └── index.html          # Template Jinja2 principal
└── static/
    ├── css/
    │   └── style.css       # Styles personnalisés
    └── js/
        └── script.js       # Particules, animations, form
```

---

## 🚀 Lancer le projet en local

### Étape 1 — Cloner / placer les fichiers

Assurez-vous d'avoir tous les fichiers dans un dossier `portfolio/`.

### Étape 2 — Créer un environnement virtuel

**Windows (PowerShell) :**
```powershell
cd portfolio
python -m venv venv
venv\Scripts\activate
```

**macOS / Linux :**
```bash
cd portfolio
python3 -m venv venv
source venv/bin/activate
```

> ✅ Vous devriez voir `(venv)` apparaître dans votre terminal.

### Étape 3 — Installer les dépendances

```bash
pip install -r requirements.txt
```

### Étape 4 — Lancer le serveur Flask

```bash
python app.py
```

### Étape 5 — Ouvrir dans le navigateur

```
http://127.0.0.1:5000
```

---

## 🛑 Arrêter le serveur

Appuyez sur `Ctrl + C` dans le terminal.

---

## ✏️ Personnaliser le contenu

Tout le contenu (bio, projets, compétences, etc.) est centralisé dans **`app.py`** dans les variables :

- `PROFILE` → vos informations personnelles
- `SKILLS` → catégories et barres de progression
- `PROJECTS` → cartes projets (titre, description, tags, lien GitHub)
- `EXPERIENCE` → expériences professionnelles
- `CERTIFICATIONS` → vos certifications

Aucune modification du HTML n'est nécessaire pour mettre à jour le contenu.

---

## 📧 Formulaire de contact

Le formulaire envoie les données à `/api/contact` via `fetch`. Par défaut, les messages sont affichés dans le terminal Flask (mode dev).

**Pour la production**, remplacez la section `# In production` dans `app.py` par un service email :

- **SendGrid** : `pip install sendgrid`
- **Mailgun** : API REST simple
- **Flask-Mail** : `pip install flask-mail`

Exemple avec SendGrid :
```python
import sendgrid
from sendgrid.helpers.mail import Mail

sg = sendgrid.SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
message = Mail(from_email='you@example.com', to_emails='you@example.com',
               subject=f'Contact de {name}', html_content=message)
sg.send(message)
```

---

## 🌐 Déploiement en production

### Option A — Render (Recommandé, gratuit)

1. Créez un compte sur [render.com](https://render.com)
2. Connectez votre repo GitHub
3. **New Web Service** → sélectionnez votre repo
4. Configurez :
   - **Build Command** : `pip install -r requirements.txt`
   - **Start Command** : `gunicorn app:app`
5. Ajoutez `gunicorn` à `requirements.txt` : `gunicorn==21.2.0`
6. Cliquez **Deploy** → votre portfolio est en ligne !

### Option B — PythonAnywhere (Simple)

1. Créez un compte sur [pythonanywhere.com](https://pythonanywhere.com)
2. **Files** → Upload vos fichiers
3. **Web** → Add new web app → Flask → Python 3.10
4. Configurez le chemin vers `app.py`
5. Reload → votre site est live sur `username.pythonanywhere.com`

### Option C — VPS (Avancé)

```bash
# Installer gunicorn et nginx
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app:app

# Configurer nginx comme reverse proxy vers le port 8000
```

---

## 📦 Variables d'environnement (production)

Créez un fichier `.env` (ne jamais le committer) :
```
FLASK_ENV=production
SECRET_KEY=votre_cle_secrete_longue_et_aleatoire
SENDGRID_API_KEY=votre_cle_sendgrid
```

Et dans `app.py` :
```python
from dotenv import load_dotenv
import os
load_dotenv()
app.secret_key = os.environ.get('SECRET_KEY', 'dev-key')
```

Installez : `pip install python-dotenv`

---

## 🧩 Technologies utilisées

| Couche | Technologie |
|--------|-------------|
| Backend | Python 3.10+, Flask 3.0 |
| Frontend | HTML5, Tailwind CSS (CDN), JS Vanilla |
| Animations | AOS (Animate On Scroll), Canvas API |
| Fonts | Google Fonts (Syne, Space Mono, DM Sans) |
| Icons | SVG inline |

---

## 📝 License

MIT — Libre d'utilisation et de modification.

---

*Made by Zouhair Choufa — zouhair.choufa3@gmail.com*