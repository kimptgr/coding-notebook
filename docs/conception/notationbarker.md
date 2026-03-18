---
title: La notation Barker ou ERD Entity Relationship Diagramm
---

1. Les Entités
- Définition : Elles représentent un concept métier, un objet ou un événement significatif pour l'entreprise (ex: PERSONNE, COURS)

- Représentation : Elles sont dessinées dans des rectangles aux coins arrondis

- Nommage : Le nom de l'entité doit être au singulier et écrit en majuscules avec accent si besoin

2. Les Attributs
- Définition : Ce sont les propriétés qui décrivent et caractérisent une entité (ex: nom, prénom, âge)

- Nommage : Ils sont écrits en minuscules à l'intérieur de la boîte de l'entité précédé d'un o si optionnel, * pour obligatoire,  ou # si identifiant principal

- Identifiant : L'identifiant est un attribut unique qui permet de distinguer chaque occurrence de l'entité sans ambiguïté (équivalent de la clé primaire)

3. Les Associations (Liens)
- Définition : Elles représentent la manière dont deux entités sont reliées selon les règles de gestion du métier

- Bidirectionnalité : Dans la notation Barker, une association est toujours nommée dans les deux sens

- Représentation : Elle est symbolisée par un trait entre deux entités, avec le nom du lien écrit en minuscules. 

4. Cardinalités et Optionalité
La notation Barker permet de préciser deux aspects sur chaque lien: 
L'optionalité (cardinalité minimale) :
- Obligatoire : "Doit être 1". trait plein
- Optionnel : "Peut être 0". trait en pointillé
- Le degré (cardinalité maximale) :
- Un et un seul : "1". trait simple 
- Un ou plusieurs : "n". patte d'oie
En synthèse, cette notation permet de définir une structure de données claire (1:1, 1:N, N:N) avant de passer aux modèles logique et physique qui définiront les tables techniques de la base de données

![Exemple de MCD](\img\conception\MCDexpression.png)
Un employé DOIT être affecté à un département
Un département PEUT être responsable de 0 ou n employés