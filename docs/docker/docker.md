title: Docker pour les nullos
---
docker =/= VM
VM = OS entier
Conteneur s'appuie sur l'OS de la machine hôte
Execution bien 
Docker : 4 composants
1. Engine: 
 - daemon
 - client : CLI
 - API 
2. image
3. hub : répertorie les images peuvent venir de chez nous (registries, sur gitlab) ou non 
4. swarw comme k8es

Image immuable composée de couches (1 par instruction)

Une image définit les besoins et le conteneur construit à partir d'une image

Les layers sont gardées en caches donc buil rapide, de plus grâce au hub plusieurs build qui ont besoin de la même couche ne la récupère qu'une fois

> **Toujours mettre les parties stables en premier**
Si un layer change, celles d'en dessous change.

# dockerignore
.dockerignore
node, .git, log, Dockerfile, .idea, .vscode

## Multi-stage
Permet de créer le war avec une image gradle puis de l'utiliesr avec une image tomcat (cf `AS builder` `--from`)
## Volume
### bind mount
Pour les logs, le dev

## Réseaux docker
par défault un conteneur pour communiqué par un bridge
Permet la communication entre 2 conteneurs par les noms de contairs et non par l'ip + port de la machine hôte

Réseau de machne hôte: pour gain de performance
0 réseaux
## Docker-compose
