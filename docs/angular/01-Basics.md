---
title: Angular
---
# Angular
## Installation
1. Prérequis : node
2. Installer le cli angular avec : 
``bash
npm i -g @angular/cli
```
3. Créer une appli dans le répertoire voulu avec
``bash
ng new nom-de-l-app
cd nom-de-l-app
ng serve
```
4. Lancer le *serveur de développement* sur le port **4200**
```bash
ng serve
```
## Component
`ng generate component nom-du-component`
## Passage de données
Pour passer des données on implément l'interface `OnInit`qui a besoin d'une méthode `ngOnInit()` pour initialiser les composant. 


On note des propriétés au composant avec ! pour signaler à TS qu'on va les initialiser. Puis on les initialise dans la méthode.
```ts
export class MaClassComponent implements OnInit {
  @Input() monmodeldedonnees!: PassagedeDonnees; // Passage de données du parents

  hasuUserClick!:boolean
  buttonText!: string;

  ngOnInit(): void {
    this.hasuUserClick = false;
    this.buttonText = "Oh waw !"
  }

  onClickLike(): void {
    this.hasuUserClick ? this.addLike() : this.subLike() ;    
  }
```
### String interpolation
Les doubles accolades permettent d'insérer une valeur de propriétés dans le template
```html
<h2>{{title}}</h2>
```
### Attribute binding
Pour lier la valeur d'une propriété TS à un attribut HTML, en mettant l'attribut entre crochets et en passant le nom de la propriété
```html
<img [src]="imageUrl" [alt]="title" >
```
Fonctionne aussi avec des attributs personnalisées comme des types, classes... `<app-pic [pic]="secondKnit"></app-pic>`
### Event binding
Lier une méthode TypeScript à un évènement du DOM.
`(click)="onClickLike()"`
Pour écouter un évènement ()
> Norme : quand on réagit à un évènement venant du DOM on nomme avec **on**
### Depuis le parent
`@Input()` permet de passer une propriété depuis l'extérieur

## Classe
Utiliser public dans le constructeur pour être moins verbeux, sinon attribut + initialisation dans constructeur
```ts
export class Pic{
    constructor (
        public title: string,
        public createdAt: Date,
        public likes: number) {}

        setLocation(loc:string): void {
        this.location = loc
        }
}
```
Puis dans le code `import { Pic } from `
> Pour une propriété optionnelle on utilise **?** location?: string; , il faut alors mettre un setter
## Control Flow Block
> Dans html **@if** `@if (pic.location) {<p>{{pic.location}}</p>}` +/- **@else**
> @for (element of array; track element.identifiantunique) {<... />}

## Directives de styles
- directive : classe qui ajoute du comportement aux éléments Angular
  1. [ngStyle] applique des styles dynamiques, prend en argument un objet où les clefs sont les styles css à modifier en en valeur les valeurs à prendre de ceux-ci
  Dans les nouvelles versions il faut importer angular common
  3. ```
     import { CommonModule } from '@angular/common';import { NgStyle } from '@angular/common';
     @Component({
  selector: 'app-pic-knit',
  imports: [NgStyle],
  ```
  En html `span [ngStyle]="{ color: 'rgb(0, ' + pic.likes + ', 0)' }">`
  
