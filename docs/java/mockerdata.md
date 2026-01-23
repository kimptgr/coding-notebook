---
title: Insertion initial de données
description: schema.sql / data.sql
---

**schema.sql**
**data.sql**
Exécuté automatiquement au démarrage de l’application

- schema.sql Crée les tables
- data.sql Insère les données

📂 src/main/resources/data.sql

Spring Boot le détecte sans configuration supplémentaire (dans la plupart des cas)

Au démarrage :

- Spring Boot démarre la datasource
- Les tables sont créées (via JPA / Hibernate ou schema.sql)
- data.sql est exécuté
- Les données sont insérées
  ⚠️ Les fichiers ne peuvent exister et être vides
