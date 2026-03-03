---
title: Angular CDA
---
# Angular
Si variable pas en public la vue ne pourra l'utiliser
variable avec ? dit | undefined
variable avec ! dit tkt je gère
  ![Authentification sur un serveur](\img\angular\architecture-angular.png)

- https://picocss.com/docs css framework minimaliste

## Data binding
 `[src] = "bla" ou src={{maVariable}}` on conserve le type de la variable avec [] mais on convertit en string avec `{{}}`

## Directive de structure av angular 17 et après
`<div *ngIf="afficher">` (à importer dans les modules) remplacer par @if (true) {}
@switch
`@for (item of [array]; track $index $even $first;){} @empty` 