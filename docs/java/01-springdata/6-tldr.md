---
title: TL;DR Spring JPA
sidebar_position: 6
---

- Spring Data = abstraction d’accès aux données
- Spring Data JPA = relationnel + ORM
- JpaRepository = cœur du DAL
- Entités = mapping objet / relationnel
- Transactions maîtrisées avec @Transactional
- JPQL = requêtes sûres et portables

Spring Data JPA permet de manipuler des objets Java pendant que Hibernate gère le SQL, en respectant les règles JPA et les garanties ACID.

# TL;DR — Spring Data / JPA

## Spring Data

- Projet Spring pour **simplifier l’accès aux données**
- Introduit le concept de **Repository**
- Compatible avec plusieurs stockages (JPA, MongoDB, Redis…)

---

## Spring Data JPA

- Module pour les **bases relationnelles**
- Pile technique :
  Spring Data JPA → JPA → Hibernate → JDBC → Database

---

## JPA

- **Spécification (contrat)** Java de persistance
- Définit les règles de mapping objet ↔ base
- **Ne fait rien seule**
- Implémentation principale : **Hibernate**

---

## Entité JPA

- Classe Java **persistante**
- 1 objet = 1 ligne en base
- Annotations principales :
  - `@Entity`, `@Table`
  - `@Id`, `@GeneratedValue`
  - `@Column`
- Doit être un **POJO**

---

## Repository

- Interface héritant de `JpaRepository<T, ID>`
- Fournit CRUD + requêtes automatiques
- Implémentation générée par Spring

---

## Transactions & ACID

- Gérées via `@Transactional`
- Garanties :
  - **A**tomicity → tout ou rien
  - **C**onsistency → données valides
  - **I**solation → transactions indépendantes
  - **D**urability → données persistantes

---

## Cycle de vie JPA

- New → Managed → Detached → Removed
- SQL exécuté au **commit**

---

## Associations

- `OneToOne`, `OneToMany`, `ManyToOne`, `ManyToMany`
- Unidirectionnelles recommandées
- Attention à `equals()` et `toString()`

---

## Clés primaires composites

- `@IdClass` (ancienne)
- `@EmbeddedId` (recommandée)

---

## Héritage JPA

- `SINGLE_TABLE` → 1 table + **Discriminator Column**
- `JOINED` → tables liées par jointures
- `TABLE_PER_CLASS` → 1 table par classe concrète

---

## Discriminator Column

- Colonne indiquant le **type réel** de l’entité
- Utilisée avec l’héritage `SINGLE_TABLE`

---

## Requêtes

- **JPQL** : orienté objets, portable
- Méthodes dérivées (`findBy...`)
- **SQL natif** possible (`nativeQuery = true`)

---

## À retenir

> Spring Data JPA permet de manipuler des objets Java pendant que Hibernate gère le SQL et les transactions à ta place.

- il existe Spring Data rest qui génère les contrôleurs automatiquement sur les repo de Spring Data
