---
title: Analyse et Conception
---

## Cadre, Démarche et Exigences Transverses

Analyse fonctionnelle : comprendre le besoin, identifier acteurs (MOA, MOE), règles et contraintes

Modélisation : modèles UML + MCD

Exigences transverses
- RGPD : respect de la finalité et minimisation des données
- Accessibilité (RGAA : Référentiel Général d’Amélioration de l’Accessibilité/WCAG : Web Content Accessibility Guidelines) : création d'interfaces inclusives
- Éco-conception : limitation des appels réseau et évitement de la sur-fonctionnalité
- Sécurité : identification des risques via des méthodes comme STRIDE

![Exemple de MCD](\img\conception\acteurs.png)

## Interprétation du Cahier des Charges

Éléments clés d'un besoin métier : le périmètre, les acteurs, les contraintes et les règles de gestion
Les besoins sont reformulés sous forme d'User Stories [ « En tant que [acteur], je veux [action] afin de [finalité] »] ou de Cas d'Utilisation (Use Cases) 
Pour la gestion des priorités, la méthode MoSCoW (Must, Should, Could, Won’t have) est utilisée afin de s'accorder sur l'importance des tâches

## Modélisation UML

description des structures et des comportements d'un système:
- Diagrammes de structure (statiques) : Le diagramme de classes est central, incluant des concepts avancés comme l'héritage ("est un"), les interfaces (contrats de capacité), l'agrégation (relation faible) et la composition (relation forte avec cycle de vie lié)

- Diagrammes de comportement (dynamiques) : On y retrouve le diagramme d'activités (avec flux parallèles, fork/join et swimlanes) et le diagramme de séquences pour modéliser les interactions synchrones ou asynchrones et les appels externes

## Modélisation et Normalisation des Données

L'analyse passe par trois niveaux : le modèle conceptuel (règles métier), logique (tables et associations) et physique (spécifique au SGBDR)

### Le Modèle Conceptuel de Données (MCD)

Il représente la vue de l'entreprise et est totalement indépendant de toute technologie
- Objectif : Exprimer les règles métier en identifiant les données à stocker
- Éléments : Il se compose d'**entités** (concepts métier), d'**attributs** (propriétés) et d'associations **liens** entre entités (clef étrangère)
- Exemple : Un diagramme Entité-Association (notation Barker) ou un diagramme de classes simplifié

![Exemple de MCD](\img\conception\MCD.png)
Exemple avec **Oracle Data Modeler**
![Exemple de MCD](\img\conception\MCDexpression.png)

### Le Modèle Logique de Données (MLD)

Il correspond à la vue du système et adapte le modèle conceptuel au modèle relationnel
- Objectif : Définir la structure des données sous forme de tables et d'associations
- Indépendance : Bien qu'il préfigure l'organisation en base de données, il ne dépend pas encore d'un logiciel de gestion de base de données (SGBD) précis

![Exemple de MLD](\img\conception\MLD.png)

### Le Modèle Physique de Données (MPD)

Il s'agit de la vue spécifique au SGBDR choisi (comme MySQL, PostgreSQL ou Oracle)

- Objectif : Décrire précisément comment les données sont stockées techniquement pour créer la base de données opérationnelle
- Éléments : Il définit les types de données précis, les index, les clés primaires, les clés étrangères et les contraintes d'intégrité SQL (unicité, nullité, etc.)

En résumé : Le MCD définit quoi stocker (le métier), le MLD définit comment l'organiser (les tables), et le MPD définit avec quel outil et quelles contraintes techniques le réaliser

![Traduction des expressions](\img\conception\langage.png)

**Normalisation** (1NF, 2NF, 3NF) : techniques pour éliminer les redondances et les anomalies de mise à jour

Transactions **ACID** : garantie de l'Atomicité, la Cohérence, l'Isolation et la Durabilité des données
- A pour Atomicité : transaction est exécutée en totalité ou pas du tout. Si une partie de l'opération échoue, l'ensemble de la transaction est annulé pour éviter des données incomplètes.
- C pour Cohérence : Une transaction doit faire passer la base de données d’un état valide à un autre état valide. Cela signifie que toutes les règles de gestion et contraintes d'intégrité doivent être respectées à la fin de l'opération.
- I pour Isolation : Les transactions qui se produisent en même temps (concurrentes) ne doivent pas se perturber entre elles. Chaque transaction doit s'exécuter comme si elle était la seule sur le système.
- D pour Durabilité : Une fois qu'une transaction est validée, les données doivent être persistantes, même en cas de panne du système ou du matériel

## Maquettage

- **Zoning** : organisation des grandes zones de la page
- **Wireframe** : structure précise en noir et blanc (frame0)
- **Mockup** : design visuel final (couleurs, typographies) (figma)
- **Prototype** : version interactive permettant de simuler le fonctionnement

Le maquettage permet également d'identifier les futurs attributs des classes à partir des éléments de l'interface (champs de saisie, images, etc.)

