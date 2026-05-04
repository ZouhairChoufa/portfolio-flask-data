"""
Portfolio Flask Application - Zouhair Choufa
Run with: python app.py
"""

from flask import Flask, render_template, jsonify, request
import json
from datetime import datetime

app = Flask(__name__)

# ─── Portfolio Data ───────────────────────────────────────────────────────────

# Dans ton app.py, modifie la variable PROFILE
PROFILE = {
    "name": "Zouhair Choufa",
    "title": "Data Scientist & Fullstack Developer",
    "subtitle": "Master BI & Big Data Analytics",
    "bio": "Passionné par la convergence entre l'Intelligence Artificielle (ML/NLP), l'Aide à la Décision (BI) et le développement web. Je conçois des systèmes capables d'analyser les données et d'interagir via des architectures Multi-Agents.",
    "location": "El Jadida, Maroc",
    "email": "zouhair.choufa3@gmail.com",
    "phone": "07 07 86 40 14",
    "github": "https://github.com/ZouhairChoufa",
    "linkedin": "https://linkedin.com/in/zouhair-choufa",
    "cv_url": "#",
    "status": "EN STAGE PFE — OCP (JFC V)", # Nouvelle ligne pour le badge
}

SKILLS = [
    {"category": "Data Science & IA", "icon": "fa-solid fa-brain", "skills": [
        {"name": "Python", "level": 92},
        {"name": "Scikit-learn", "level": 88},
        {"name": "TensorFlow / Keras", "level": 85},
        {"name": "NLP / Hugging Face", "level": 82},
        {"name": "CrewAI / RAG (LLMs)", "level": 78},
    ]},
    {"category": "Business Intelligence", "icon": "fa-solid fa-chart-column", "skills": [
        {"name": "Pandas / NumPy", "level": 90},
        {"name": "SQL (PostgreSQL / MySQL)", "level": 88},
        {"name": "Power BI (DAX)", "level": 87},
        {"name": "Elasticsearch", "level": 75},
    ]},
    {"category": "Développement Fullstack", "icon": "fa-solid fa-code", "skills": [
        {"name": "Flask (Backend Python)", "level": 90},
        {"name": "Streamlit (Data UI)", "level": 86},
        {"name": "Tailwind CSS", "level": 85},
        {"name": "HTML / JavaScript Vanilla", "level": 78},
        {"name": "Firebase (NoSQL & Auth)", "level": 75},
        {"name": "Vue.js / Node.js", "level": 65},
    ]},
    {"category": "Outils & DevOps", "icon": "fa-solid fa-screwdriver-wrench", "skills": [
        {"name": "Git / GitHub", "level": 90},
        {"name": "Docker / Déploiement", "level": 80},
        {"name": "Scrum / Agile", "level": 80},
        {"name": "n8n (Automation)", "level": 72},
    ]},
]

PROJECTS = [
    {
        "id":          1,
        "title":       "CasaMobilit",
        "subtitle":    "Langage principal : Python",
        "description": "Application d'analyse et de gestion de la mobilité urbaine à Casablanca. Développement de modèles d'analyse et de visualisations de données avec Python pour comprendre et optimiser les flux de transport.",
        "tags":        ["Python", "Data Analysis", "Mobility"],
        "icon":        "fa-solid fa-car",
        "color":       "cyan",
        "github":      "https://github.com/ZouhairChoufa/CasaMobilit",
        "highlight":   "Python",
    },
    {
        "id":          3,
        "title":       "MediAlert Pro - Système Multi-Agents",
        "subtitle":    "Langage principal : Python",
        "description": "Plateforme d'orchestration IA de niveau entreprise pour les services d'urgence (EMS). Combine des systèmes Multi-Agents (LLMs) et de l'intelligence géospatiale en temps réel pour optimiser la coordination entre les ambulances et les hôpitaux.",
        "tags":        ["Python", "CrewAI", "LLM", "Multi-Agents"],
        "icon":        "fa-solid fa-truck-medical",
        "color":       "cyan",
        "github":      "https://github.com/ZouhairChoufa/MediAlert-SMA_V2",
        "highlight":   "Python",
    },
    {
        "id":          5,
        "title":       "TaskFlow - Gestionnaire Kanban",
        "subtitle":    "Langage principal : HTML",
        "description": "Application moderne de gestion de projet (type Jira) intégrant un tableau Kanban interactif (drag-and-drop), un tableau de bord analytique et une interface 'Glassmorphism' élégante développée avec Tailwind CSS, Flask et Firebase.",
        "tags":        ["HTML", "Tailwind", "Flask", "Firebase"],
        "icon":        "fa-solid fa-list-check",
        "color":       "emerald",
        "github":      "https://github.com/ZouhairChoufa/TaskFlow-Project-Manager",
        "highlight":   "HTML",
    },
    {
        "id":          7,
        "title":       "Crypto SaaS - Analyse de Portefeuille",
        "subtitle":    "Langages principaux : Python & HTML",
        "description": "Plateforme SaaS multiplateforme d'analyse de cryptomonnaies. Intègre 4 tableaux de bord dynamiques combinant l'analyse de sentiment du marché et le suivi de portefeuille en temps réel pour l'aide à la décision financière.",
        "tags":        ["Python", "HTML", "SaaS", "Finance"],
        "icon":        "fa-brands fa-bitcoin",
        "color":       "emerald", 
        "github":      "https://github.com/ZouhairChoufa/crypto-saas-portfolio-management",
        "highlight":   "Python & Data",
    },
    {
        "id":          9,
        "title":       "Mini Jira - Board Collaboratif",
        "subtitle":    "Langage principal : JavaScript",
        "description": "Application Kanban web complète pour la gestion agile de projets. Inclut un système d'authentification sécurisé, des tableaux de bord personnalisés et des outils collaboratifs, développée en JavaScript Vanilla et Node.js.",
        "tags":        ["JavaScript", "Node.js", "Agile"],
        "icon":        "fa-brands fa-jira",
        "color":       "amber",
        "github":      "https://github.com/ZouhairChoufa/kanban-project-manager-Mini_jira",
        "highlight":   "JavaScript",
    },
    {
        "id":          11,
        "title":       "MediAlert - Coordination IA (V1.1)",
        "subtitle":    "Langage principal : Python",
        "description": "Système médical d'urgence propulsé par l'IA. Première version de l'orchestration intelligente de la flotte d'ambulances et du personnel médical via une architecture Multi-Agents collaborative.",
        "tags":        ["Python", "AI", "Healthcare"],
        "icon":        "fa-solid fa-heart-pulse",
        "color":       "cyan",
        "github":      "https://github.com/ZouhairChoufa/MediAlert-SMA_V1.1",
        "highlight":   "Python",
    },
    {
        "id":          13,
        "title":       "Détection de Tumeurs Cérébrales (IRM)",
        "subtitle":    "Langage principal : Jupyter Notebook",
        "description": "Application web médicale intégrant un modèle de Deep Learning (Réseaux de Neurones Convolutifs - CNN) capable de classifier automatiquement les tumeurs cérébrales à partir d'images IRM avec une précision de 98%.",
        "tags":        ["Deep Learning", "CNN", "Computer Vision"],
        "icon":        "fa-solid fa-brain",
        "color":       "rose",
        "github":      "https://github.com/ZouhairChoufa/Brain-Tumor-Detection",
        "highlight":   "Jupyter Notebook",
    },
    {
        "id":          15,
        "title":       "Analyse de Sentiments Multilingue",
        "subtitle":    "Langage principal : CSS",
        "description": "Application web d'analyse sémantique multilingue (Anglais, Arabe, etc.) s'appuyant sur les modèles NLP de pointe d'Hugging Face Transformers et un backend robuste développé en Flask.",
        "tags":        ["NLP", "Hugging Face", "Flask"],
        "icon":        "fa-solid fa-language",
        "color":       "violet",
        "github":      "https://github.com/ZouhairChoufa/multilingual-sentiment-app",
        "highlight":   "CSS",
    },
    {
        "id":          17,
        "title":       "Moteur de Topic Modeling (LDA)",
        "subtitle":    "Langage principal : Jupyter Notebook",
        "description": "Outil NLP puissant combinant web scraping et analyse de contenu textuel. Implémente l'algorithme LDA pour le Topic Modeling et un vectoriseur TF-IDF pour une recherche documentaire textuelle avancée.",
        "tags":        ["NLP", "LDA", "TF-IDF", "Scraping"],
        "icon":        "fa-solid fa-diagram-project",
        "color":       "rose",
        "github":      "https://github.com/ZouhairChoufa/Topic-Modeling-Engine",
        "highlight":   "Jupyter Notebook",
    },
    {
        "id":          19,
        "title":       "Système de Gestion Bibliothèque (SOAP)",
        "subtitle":    "Langage principal : Java",
        "description": "Architecture orientée services (SOA) intégrant un web service SOAP en Java pour la gestion complète d'une bibliothèque, interfacé de manière transparente avec des applications clientes en JSP et PHP.",
        "tags":        ["Java", "SOAP", "SOA", "JSP"],
        "icon":        "fa-solid fa-book",
        "color":       "cyan",
        "github":      "https://github.com/ZouhairChoufa/SOAP-Webservice-Clients",
        "highlight":   "Java",
    },
    {
        "id":          21,
        "title":       "Moteur de Recherche Sémantique",
        "subtitle":    "Langage principal : Python",
        "description": "Moteur de recherche intelligent combinant la vélocité de Flask et la puissance d'Elasticsearch. Interroge Wikidata et indexe les données pour permettre des requêtes sémantiques complexes en langage naturel.",
        "tags":        ["Python", "Elasticsearch", "NLP"],
        "icon":        "fa-solid fa-magnifying-glass",
        "color":       "cyan",
        "github":      "https://github.com/ZouhairChoufa/Flask-Semantic-Search",
        "highlight":   "Python",
    },
    {
        "id":          23,
        "title":       "Chatbot Scientifique (API Scopus)",
        "subtitle":    "Langage principal : Python",
        "description": "Assistant conversationnel RAG (Retrieval-Augmented Generation) pour la recherche scientifique. Combine Sentence Transformers, FAISS et l'API Scopus via Streamlit pour interroger des publications en langage naturel.",
        "tags":        ["Python", "RAG", "FAISS", "Streamlit"],
        "icon":        "fa-solid fa-robot",
        "color":       "cyan",
        "github":      "https://github.com/ZouhairChoufa/Scorpus-Chatbot",
        "highlight":   "Python",
    },
    {
        "id":          25,
        "title":       "Auto-École Management System",
        "subtitle":    "Langage principal : Python",
        "description": "Application logicielle desktop complète de gestion administrative pour auto-écoles. Interface graphique intuitive développée avec Python et PyQt6, gérant les dossiers candidats, les séances et la facturation.",
        "tags":        ["Python", "PyQt6", "Desktop App"],
        "icon":        "fa-solid fa-id-card",
        "color":       "cyan",
        "github":      "https://github.com/ZouhairChoufa/driving-school-app",
        "highlight":   "Python",
    },
    {
        "id":          27,
        "title":       "Application Mobile d'Annonces",
        "subtitle":    "Langage principal : Java",
        "description": "Application mobile native Android développée en Java. Plateforme complète permettant la création de profils, la publication, la recherche filtrée et la gestion de petites annonces avec une interface utilisateur fluide.",
        "tags":        ["Java", "Android", "Mobile"],
        "icon":        "fa-solid fa-mobile-screen",
        "color":       "cyan",
        "github":      "https://github.com/ZouhairChoufa/DevMobile",
        "highlight":   "Java",
    },
    {
        "id":          29,
        "title":       "Coding WebSchool Platform",
        "subtitle":    "Langage principal : HTML",
        "description": "Plateforme web éducative d'apprentissage du code. Conception d'une interface responsive et moderne en HTML5/CSS3 pour faciliter l'accès aux ressources pédagogiques et le suivi des élèves.",
        "tags":        ["HTML", "CSS", "Frontend"],
        "icon":        "fa-brands fa-html5",
        "color":       "emerald",
        "github":      "https://github.com/ZouhairChoufa/Coding_WebSchool-Web_site",
        "highlight":   "HTML",
    }
]

EXPERIENCE = [
    {
        "role": "Ingénieur Data / BI (Stage PFE)",
        "type": "Stage de Fin d'Études",
        "company": "OCP Group (JFC V) — Jorf Lasfar",
        "period": "Février 2026 — Juillet 2026",
        "description": "Supervision & aide à la décision : conception de tableaux de bord Power BI unifiés exploitant les données industrielles en temps réel (PI System, Asset Framework) pour consolider les KPIs de production, d'énergie et de maintenance.",
        "stack": ["Power BI", "PI System", "PI Vision", "Data Modeling", "KPIs"],
        "url": "https://www.ocpgroup.ma",
    },
    {
        "role": "Développeur FullStack",
        "type": "Stage",
        "company": "ENDOSMART — EcoDesign",
        "period": "Avril 2024 — Juillet 2024",
        "description": "Développement d'une plateforme d'évaluation d'impacts environnementaux.",
        "stack": ["Vue.js", "Laravel", "PHP"],
        "url": "https://ecodesign.ma",
    },
]

CERTIFICATIONS = [
    {"title": "The Machine Learning Algorithms A-Z", "org": "365 Data Science", "year": "2025"},
    {"title": "Power BI Data Visualization Hero", "org": "365 Data Science", "year": "2025"},
    {"title": "Machine Learning in Python", "org": "365 Data Science", "year": "2025"},
    {"title": "Power BI", "org": "365 Data Science", "year": "2025"},
    {"title": "Introduction to Jupyter", "org": "365 Data Science", "year": "2025"},
]

# ─── Routes ───────────────────────────────────────────────────────────────────

@app.route("/")
def index():
    return render_template(
        "index.html",
        profile=PROFILE,
        skills=SKILLS,
        projects=PROJECTS,
        experience=EXPERIENCE,
        certifications=CERTIFICATIONS,
        year=datetime.now().year,
    )

@app.route("/api/projects")
def api_projects():
    return jsonify(PROJECTS)

@app.route("/api/contact", methods=["POST"])
def api_contact():
    data = request.get_json()
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()

    if not all([name, email, message]):
        return jsonify({"success": False, "error": "Tous les champs sont requis."}), 400

    # In production, integrate an email service (SendGrid, Mailgun, etc.)
    print(f"[CONTACT] From: {name} <{email}> — {message}")
    return jsonify({"success": True, "message": "Message reçu ! Je vous répondrai bientôt."})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)