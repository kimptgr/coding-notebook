---
title: Routing & Guard
---

## ROUTING ANGULAR

### Définir des routes simples

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' } 
];
```

### Affichage des vues

Dans le composant racine :

`<router-outlet></router-outlet>`

C’est ici que les composants liés aux routes s’affichent.

### Navigation en TypeScript

Injection :

```ts
import { Router } from '@angular/router';
constructor(private router: Router) {}
```

Navigation :

```ts
this.router.navigate(['/about']);
```

Avec paramètre :

```ts
this.router.navigate(['/product', 123]);
```

### Routes avec paramètres

Déclaration

```ts
{ path: 'product/:id', component: ProductComponent }
```

### Récupérer un paramètre

Injection :

```ts
import { ActivatedRoute } from '@angular/router';

constructor(private route: ActivatedRoute) {}
// Snapshot (lecture unique)
const id = this.route.snapshot.paramMap.get('id');
```

OK si le composant est recréé à chaque navigation

Observable (recommandé si même composant réutilisé)

```ts
this.route.paramMap.subscribe(params => {
  const id = params.get('id');
});
```

nécessaire si navigation /product/1 → /product/2

Angular ne recrée pas le composant

### Navigation en HTML

```html
<a routerLink="/">Accueil</a>
<a routerLink="/about">À propos</a>
// Avec paramètre
<a [routerLink]="['/product', 12]">Produit</a>
```

Il faut les [] pour passer un tableau.

Route active

```html
<a routerLink="/about" routerLinkActive="active">À propos</a>
```

Option stricte :

```html
<a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
  Accueil
</a>
```

## GUARDS (Protection des routes)

### Principe

Service Angular

Bloque ou autorise l’accès à une route

Utilise CanActivateFn (fonctionnel, moderne)

Retourne :

true

false

UrlTree (meilleure pratique que navigate + false)

### Guard

Avec Angular cli `ng g guard nom-du-guard`

On inject le service avec `inject(AuthService);`

```ts
import { CanActivateFn, inject } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRole = route.data['role'] ?? null;

  if (authService.isAuthenticated() && authService.hasRole(requiredRole)) {
    return true;
  }

  return router.createUrlTree(
    ['/login'],
    { queryParams: { returnUrl: state.url } }
  );
};
```

éviter router.navigate() dans un guard

retourner un UrlTree

### Utilisation dans les routes

```ts
export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [authGuard],
    data: { role: 'admin' }
  },
  { path: '**', redirectTo: '' }
];
```
