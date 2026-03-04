# 🎨 ArtSyre

**ArtSyre** est une plateforme e-commerce dédiée à la vente d'œuvres d'art en ligne. Elle permet aux visiteurs de découvrir et d'acheter des tableaux, de gérer un panier et une liste de souhaits, et offre un espace d'administration complet aux gestionnaires du site.

---

## 🗂️ Structure du projet

```
ArtSyre/
├── ArtSyreBack/      → API REST (Laravel 12 · PHP 8.2)
├── ArtSyreFront/     → Application web (Angular 19)
├── start.sh          → Script de démarrage Linux / macOS
└── start.bat         → Script de démarrage Windows
```

---

## 🧰 Prérequis

| Outil | Version minimale |
|-------|-----------------|
| PHP   | 8.2             |
| Composer | 2.x          |
| Node.js | 18.x          |
| npm   | 9.x             |
| Angular CLI | 19.x    |

---

## ⚙️ Installation

### 1. Cloner le dépôt

```bash
git clone <url-du-repo>
cd ArtSyre
```

### 2. Installer le back-end (Laravel)

```bash
cd ArtSyreBack
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
```

> 💡 Configurez votre base de données dans le fichier `.env` avant de lancer les migrations.

### 3. Installer le front-end (Angular)

```bash
cd ../ArtSyreFront
npm install
```

---

## 🚀 Démarrage rapide

Un script de démarrage est fourni à la racine du projet pour **stopper les services existants, les relancer et ouvrir les pages automatiquement dans votre navigateur**.

### Linux / macOS

```bash
chmod +x start.sh
./start.sh
```

### Windows

Double-cliquez sur `start.bat` ou exécutez-le dans un terminal :

```bat
start.bat
```

---

## 🌐 URLs des services

| Service | URL |
|---------|-----|
| Front-end Angular | http://localhost:4200 |
| API Laravel | http://localhost:8000 |
| Administration | http://localhost:4200/administration |

---

## 📦 Fonctionnalités principales

- **Catalogue** — navigation et recherche dans les tableaux disponibles
- **Fiche artiste** — présentation du ou des artistes
- **Panier** — ajout, suppression et validation de commandes
- **Liste de souhaits** — sauvegarde d'œuvres pour plus tard
- **Compte utilisateur** — inscription, connexion, historique de commandes
- **Administration** — gestion des tableaux, utilisateurs, catégories, logs, statistiques et SEO
- **Contact** — formulaire de contact intégré
- **Procédé de fabrication** — page informative sur la création des œuvres

---

## 🛠️ Démarrage manuel (sans script)

### Back-end

```bash
cd ArtSyreBack
php artisan serve
# API disponible sur http://localhost:8000
```

### Front-end

```bash
cd ArtSyreFront
ng serve
# Application disponible sur http://localhost:4200
```

---

## 🧪 Tests

### Back-end

```bash
cd ArtSyreBack
php artisan test
```

### Front-end

```bash
cd ArtSyreFront
ng test
```

---

## 📄 Licence

Ce projet est sous licence MIT.