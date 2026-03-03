---
title: Angular
---
## Angular

## Installation

1. Prérequis : node
2. Installer le cli angular avec :

```bash
npm i -g @angular/cli

```

3. Créer une appli dans le répertoire voulu avec

```bash
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
>
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

Puis dans le code `import { Pic } from`
> Pour une propriété optionnelle on utilise **?** location?: string; , il faut alors mettre un setter
>
## Control Flow Block
>
> Dans html **@if** `@if (pic.location) {<p>{{pic.location}}</p>}` suivi ou non **@else**
> `@for (element of array; track element.identifiantunique) {<... />}`

## Directives de styles
Préférer **[class]** et **[style]**
- directive : classe qui ajoute du comportement aux éléments Angular
  1. [ngStyle] applique des styles dynamiques, prend en argument un objet où les clefs sont les styles css à modifier en en valeur les valeurs à prendre de ceux-ci
  Dans les nouvelles versions il faut importer angular common

  ```ts
     import { CommonModule } from '@angular/common';import { NgStyle } from '@angular/common';
     @Component({
  selector: 'app-pic-knit',
  imports: [NgStyle],
  })
  ```

  En html `span [ngStyle]="{ color: 'rgb(0, ' + pic.likes + ', 0)' }">` et mieux [style] avec une seule propriété plutôt qu'un objet `[style.color]="(consumption > 7) ? 'red': (consumption < 4) ? 'green': null"` null annulera la propriété inline
  
2. [ngClass] applique dynamiquement une classe. On importe la classe `imports: [NgClass]` dans le component NgClass + `[ngClass]="{nomdemaclasse: condition}"` dans la balise html
Préférer la directive class

```html
  <p>Consommation pour 100km :
    <span [class.short-distance]="distance > 500"
          [class.long-distance]=" distance < 100">
      {{ consumption }}
    </span>
```

## Pipes

Outils pour formater une valeur

### String

- `<h2>{{ titredemabdd.title | uppercase }}</h2>` + `imports: [UpperCasePipe]` (from angular common)
- lowercase
- titlecase

### Dates

DatePipe est configurable

- `{{ createdAt | date: 'd MMMM yyyy, à HH:mm' }}`
- ou dd/MM/yy
- à https://v17.angular.io/api/common/DatePipe
On peut changer la locale to fr dans le main.ts et dans la config
- main.ts

```ts
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';

registerLocaleData(fr.default);
```

- main.config.ts

```ts
import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
  ...,
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ]
};
```

### Nombres

- DecimalPipe arrondi à l'entier `<p>{{ 4346234.36 | number: '1.0-0' }}</p>`
- PercentPipe arrondi à 33.6% `<p>{{ 0.336 | percent: '1.0-1' }}</p>`
- CurrencyPipe
chiffresMinAvantVirgule.chiffresMinAprèsVirgule-chiffresMaxAprèsVirgule'

## Service

On déclare une classe comme injectable depuis la racine pour qu'il n'y ait qu'une instance partagée

```@Injectable({
        providedIn: 'root' // instance singleton pour toute l'appli
    })
    export class PicKnitService {

    private pics : PicKnitModel[] = [//...];

  getPicKnits(): PicKnitModel[]{
    return [...this.pics];
  }
}
```

  Utilisation du spread operator pour copie du tableau mais pas des objets

- injection de dépendance dans le cosntructeur du composant avec `constructor(private Service: service) }`
- Pour les interfaces de méthodes qui ont besoin du service on utilise on utilise `@Inject`
