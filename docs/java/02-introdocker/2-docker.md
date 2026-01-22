---
title: Spring Data
sidebar_position: 1
---

## Objectifs du cours

- Comprendre le rôle de Docker dans un environnement de développement moderne
- Savoir distinguer images, conteneurs et registres
- Comprendre le cycle de vie d’un conteneur Docker
- Utiliser Docker Compose pour orchestrer plusieurs services
- Mettre en place un environnement de bases de données avec Docker

---

## 1. Environnement de développement

Dans un contexte de développement professionnel, il est souvent nécessaire de travailler avec **plusieurs systèmes de gestion de bases de données**.

### Bases de données utilisées

- **Microsoft SQL Server**
- **MongoDB**

### Problématique

- Installation locale complexe
- Dépendances différentes selon les systèmes d’exploitation
- Risques d’incompatibilités entre projets

### Solution

👉 **Docker** permet de standardiser l’environnement de développement.

Dans nos projets, **MongoDB sera installé via Docker** afin de simplifier son déploiement.

---

## 2. Docker : présentation générale

### Définition

Docker est une **solution de virtualisation de services** permettant d’exécuter des applications dans des **conteneurs**.

### Caractéristiques

- Gestion des **images** et des **conteneurs**
- **Open Source**
- Très utilisé dans les environnements **cloud**
- Léger (partage le noyau de l’OS hôte)

---

## 3. Cas d’utilisation de Docker

Docker est particulièrement adapté aux contextes suivants :

- 🔁 Intégration continue (CI)
- ⚙️ DevOps
- 🧪 Tests rapides d’applications
- 🚀 Déploiement automatisé
- 🌍 Gestion de plusieurs environnements
  - Développement
  - Test
  - Préproduction
  - Production

---

## 4. Architecture Docker

### Composants principaux

| Composant     | Description                               |
| ------------- | ----------------------------------------- |
| Docker Client | Interface en ligne de commande (`docker`) |
| Docker Host   | Machine qui exécute Docker                |
| Docker Daemon | Service qui gère images et conteneurs     |
| Registry      | Stockage des images Docker                |
| Docker Hub    | Registry public par défaut                |

---

## 5. Cycle de vie d’un conteneur Docker

### Étapes d’exécution

1. **Création d’une image**
   - Via un `Dockerfile` → `docker build`

2. **Recherche de l’image**
   - Si absente localement → `docker pull`
   - Recherche dans un registry (Docker Hub)

3. **Téléchargement et stockage**
   - L’image est stockée localement

4. **Exécution**
   - `docker run` crée et démarre un conteneur

### Schéma logique

```
Dockerfile → docker build → Image
↓
docker pull
↓
docker run
↓
Container
```

---

## 6. Concepts fondamentaux

### Image Docker

- Modèle **immuable**
- Contient l’application et ses dépendances
- Comparable à une **classe**

### Conteneur Docker

- Instance d’une image
- Comparable à un **objet**
- Isolé mais partage le noyau de l’OS

---

## 7. Avantages et inconvénients de Docker

### Avantages

- **Flexibilité** : applications conteneurisées
- **Légèreté** : pas de machine virtuelle complète
- **Portabilité** : fonctionne sur tous les OS
- **Isolation** des processus

### Inconvénients

- Gestion plus complexe avec de nombreux conteneurs
- Besoin possible d’outils comme **Kubernetes**
- Sécurité liée à l’OS hôte :
  - Une faille de l’OS impacte tous les conteneurs

---

## 8. Docker Desktop

### Présentation

Docker Desktop est l’outil utilisé pour manipuler Docker facilement.

### Caractéristiques

- Disponible sur Windows, macOS et Linux
- Utilisation via :
  - Ligne de commande
  - Interface graphique

### Composants inclus

- Docker Engine
- Docker CLI
- Docker Compose
- Interface graphique Docker Desktop

---

## 9. Docker Compose

### Définition

Docker Compose permet de **décrire et lancer plusieurs conteneurs** à l’aide d’un fichier unique :  
`docker-compose.yml`

---

### Structure du fichier `docker-compose.yml`

#### Clés principales

- `version` : version de Docker Compose
- `services` : définition des conteneurs

#### Options courantes

- `image` : image Docker utilisée
- `container_name` : nom du conteneur
- `ports` : exposition des ports
- `volumes` : persistance des données
- `environment` : variables d’environnement
- `depends_on` : dépendances entre services

---

### Exemple : MongoDB avec Docker Compose

```yaml
services:
  mongo:
    image: mongo:7
    container_name: mongo_db
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

## Explication

- Lance un service **MongoDB**
- Les données sont **persistées grâce à un volume**
- MongoDB est accessible sur le **port 27017**

---

## Exécution de Docker Compose

Commande à exécuter dans le répertoire contenant le fichier `docker-compose.yml` :

```bash
docker compose up
```

# Options utiles

-d : exécution en arrière-plan (mode détaché)

--build : reconstruction des images avant le démarrage

## 10. Conclusion

Docker et Docker Compose permettent :

- Un environnement reproductible
- Une installation rapide
- Une meilleure collaboration entre développeurs
- Une transition fluide vers la production
- Ils sont devenus des outils incontournables du développement moderne.
