title : Docker pour les nullos
---
## docker =/= VM
### VM
- un OS complet
- son kernel
- ses services système
Lourd, lent au démarrage
### Docker / conteneurs
- Virtualise le système
- Partage le kernel de l’OS hôte
Chaque conteneur embarque :
- l’application
- ses dépendances
> léger, rapide, très efficace en dev & CI/CD

## Architecture Docker : 4 composants
1. Engine: 
- Daemon (dockerd)
tourne en arrière-plan

gère images, conteneurs, volumes, réseaux

- Client (CLI)
`docker build, docker run, docker ps...`
envoie des ordres au daemon
- API REST
utilisée par le CLI, Docker Desktop, CI, IDE…
2. image
- Modèle en lecture seule
- Décrit comment créer un conteneur
Contient :
- OS minimal (Alpine, Debian slim…)
- runtime (JDK, Node, PHP…)
- application
> Une image ne s’exécute pas, elle sert de plan.
3. Registry / hub
Stockage centralisé des images
- public (Docker Hub)
- privé (GitLab Registry, GitHub, Harbor…)
4. Orchestration swarw comme k8esorchestrateur natif
- gère déploiement, pannes...
## Image et layers
Image immuable composée de layers (1 par instruction)
### Layers
- Une image = empilement de couches
- 1 instruction Dockerfile = 1 layer
- layer est immuable et partagé entre les images

Une image définit les besoins et le conteneur construit à partir d'une image

Les layers sont gardées en caches donc buil rapide, de plus grâce au hub plusieurs build qui ont besoin de la même couche ne la récupère qu'une fois

> **Toujours mettre les parties stables en premier**
Si un layer change, celles d'en dessous change.
### Conteneur
- image + couche writable
Ne doit pas contenir de données importantes, elles sont stockées dans les volumes.

# dockerignore
.dockerignore
node, .git, log, Dockerfile, .idea, .vscode

## Multi-stage
Permet de créer le war avec une image gradle puis de l'utiliesr avec une image tomcat (cf `AS builder` `--from`)
## Volume
### bind mount
Pour les logs, le dev

## Réseaux docker
par défault un conteneur pour communiqué par un **bridge**
Permet la communication entre 2 conteneurs par les noms de conteneur et non par l'ip + port de la machine hôte

- Réseau de machine hôte: pour gain de performance
- network_mode: host
## Docker-compose
Définir et lancer plusieurs conteneurs ensemble, de manière déclarative, via un seul fichier docker-compose.yml
> Volume toujours nommé 
Compose crée automatiquement un bridge network

1. On monte service par service
```yml
build
    context: . # chemin par rapport au docker compose
    dockerfile: Dockerfile.dev
ports:
    - "8081:8080" # chemin depuis exterieur: chemin interne
depends_on: # si a besoin qu'un autre service soit au moins en cours de démarrage
```
