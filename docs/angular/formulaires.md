---
title: Formulaire
---

2 types de formulaires : Template-driven forms et Reactive forms

## Template-driven forms (basé sur le template)

Déclaration HTML avec directives ngModel

Pour des formulaires très simple

Exemple de directive : `<input [(ngModel)]="user.name" name="name" required>`

## Reactive forms (basé sur le code)

Définition dans le TypeScript à l’aide de FormGroup, FormControl et FormArray.

```ts
import { FormGroup, FormControl, Validators } from '@angular/forms';

this.userForm = new FormGroup({
  name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  email: new FormControl('', [Validators.required, Validators.email])
});
```

Liaison dans le HTML avec [formGroup] et formControlName.

Validation

Built-in validators : Validators.required, Validators.email, Validators.minLength, etc.

Custom validators : fonction qui retourne `{ 'errorName': true }` si la validation échoue.

Async validators : pour des vérifications côté serveur, par exemple vérifier si un email est déjà pris.

Gestion des événements

ngSubmit pour récupérer les données du formulaire.

Méthodes de Reactive forms : value, valid, invalid, touched, dirty.

Permet de réagir dynamiquement aux changements avec valueChanges.
