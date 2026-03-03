---
title: Les observables
---
# Observables

Convention de nommage pour toute variable contenant un observable: **monObservable$**

À chaque souscription, une nouvelle instance de l'observable.

## Souscrire

- `interval$.subscribe(value => console.log(value));` à proscrire
- `<h1>{{ interval$ | async }}</h1> `pipe async qui souscrit directement dans l'html

## Opérateurs

Avec `.pipe()` permet de mettre des opérateurs. Si plusieurs les séparer par des virgules

- opérateur **map()** de rxjs/operators `this.interval$ = interval(1000).pipe(map(value => value * 10));`
- opérateur **filter()**
- opérateur **tap()** permet de réagir à une émission sans la modifier pour obtenir un side effect `tap(text => this.logger(text))`

- `mergeMap` projette chaque valeur vers un nouvel Observable et fusionne toutes les émissions en parallèle sans attendre la fin des précédentes (met en parallèle)
- `concatMap` projette chaque valeur vers un Observable et les exécute séquentiellement en attendant que le précédent se termine avant de démarrer le suivant (met en série, garantit l'exécution séquentielle dans l'ordre)
- `exhaustMap` projette vers un Observable mais ignore toute nouvelle valeur tant que l’Observable en cours n’est pas terminé (ignore les nouvelles)
- `switchMap` projette vers un Observable et annule automatiquement le précédent dès qu’une nouvelle valeur arrive (annule les anciennes)

## Se désabonner

- Si on sait après combien d'émission on veut le supprimer, opérateur `take(nbdefois)`
- Lifecyclehook `OnDestroy`. Création d'un `Subject` qui est un type d'observable qui émet à la demande avec sa méthode `next()`. On le fait émettre lors de la destruction du component et on utilise l'opérateur `takeUntil()`

```java
  export class PicKnitList implements OnInit, OnDestroy{
  private destroy$!: Subject<boolean>

  //
  ngOnInit(){
  //
    this.destroy$ = new Subject<boolean>();
    interval(1000).pipe(
      takeUntil(this.destroy$),
      //
    ).subscribe();
}
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
```

Les observables souscrit avec le pipe async sont automatiquement déssouscrit
