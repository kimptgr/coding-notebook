---
title: SPA
---
# Single Page Application
une seule page HTML au départ, puis met à jour le contenu dynamiquement via JavaScript sans recharger toute la page


Avec une MPA une nouvelle requête au serveur pour chaque changment de route. En SPAtout est géré côté client
# Routing
## Définition des routes 
Dans app.routes.ts
```ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
```
## Router fournit automatiquement dans main.ts
```
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
```
## Ajout du router-outlet
- app.component.ts
`imports: [Header, RouterOutlet],`


- app.component.html, si **/maRoute2** remplace la route(/maRoute2), sinon ajoute à la route actuelle (/actuelle/maRoute2)
```ts
<h1>My Application</h1>

<nav>
  <a routerLink="/login">Login</a>
  <a routerLink="/dashboard">Dashboard</a>
</nav>

<!-- Dynamic content rendered here -->
<router-outlet></router-outlet>
```

## Nested routes (routes enfants)
```
{
  path: 'admin',
  component: AdminComponent,
  children: [
    { path: 'users', component: UsersComponent }
  ]
}
```
admin.component.html
```
<h2>Admin Panel</h2>
<router-outlet></router-outlet>
```
/admin/users affichera UsersComponent dans le router-outlet du AdminComponent

## Router outlet nommé
```
<router-outlet name="sidebar"></router-outlet>
<router-outlet></router-outlet>
```
```
{
  path: 'dashboard',
  component: DashboardComponent,
  outlet: 'sidebar'
}
```
## RouterLink & navigation
`imports: [RouterLink, RouterLinkActive]`
- Ajout d'une classe si match avec la route actuelle, ajout d'options possible `<a routerLink="" routerLinkActive="nomDeMaClasseCSS" [routerLinkActiveOptions]="{ exact: true }">Home</a>`

### Navigation programmatique
-Dans html `(onClick)="onClickFonction()`
- Import `import { Router } from '@angular/router';`+ injection `constructor(private router: Router) }`
- Définition de la fonction : 
```
onClickFonction(): void{
  this.router.navigateByUrl("nomDeMaRoute")
};
```

# Paramètre de la route
- créer la route avec un paramètre dynamique **:id** `const routes: Routes = [{ path: 'tasse/:id', component: SingleTasseComponent },`
- Injecter `constructor(private route: ActivatedRoute){}`
- Récupérer l'id `const id = this.route.snapshot.params['id'];`
# Constructeur =/= ngOnInit
> Constructeur fonction TypeScript native
- Injecter les dépendances (services)
- Initialiser des propriétés simples
- Préparer l’objet
> ngOnInit() lifecycle hook Angular

Appelé après l’instanciation, après l’injection des dépendances, après l’initialisation des @Input(), juste avant l’affichage du template. 
- Charger des données
- Appeler une API
- Initialiser une logique métier
- Travailler avec des @Input()

|                | constructor          | ngOnInit                     |
| -------------- | -------------------- | ---------------------------- |
| Moment         | Création de l’objet  | Après initialisation Angular |
| Injection DI   | Oui                  | Non                          |
| @Input dispo ? | ❌ Pas garanti        | ✅ Oui                        |
| Appels API     | ⚠️ Mauvaise pratique | ✅ Oui                        |
