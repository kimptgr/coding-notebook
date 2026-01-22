---
title: REST
sidebar_position: 2
---

REST signifie **REpresentational State Transfer**.

Un **Web Service REST** est une application accessible via Internet qui expose des **ressources** manipulables via des requêtes HTTP.

Une ressource représente une entité métier :

- utilisateur
- article
- produit
- commande

---

### Principe des échanges REST

- Le **client** envoie une requête HTTP
- Le **serveur** renvoie une réponse contenant des données

Méthodes HTTP principales :

- `GET` : lecture d’une ressource
- `POST` : création
- `PUT` : modification
- `DELETE` : suppression

Formats d’échange :

- JSON (le plus courant)
- XML

---

### Architecture REST en couches

Une API REST repose généralement sur :

- **Controller (Web / HTTP)**
- **Business Logic Layer (BLL)**
- **Data Access Layer (DAL / Repository)**
- **Base de données**

---

## Architecture Back avec Frameworks

### Séparation des responsabilités

Une application Back-end structurée est composée de :

- **API REST**
- **Business Logic Layer (BLL)**  
  Règles métier, validations, traitements
- **Data Access Layer (DAL)**  
  Accès aux données
- **Business Objects (BO)**  
  Modèles métiers

---
