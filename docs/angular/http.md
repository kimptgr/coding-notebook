---
title: Les requêtes http
---
## GET

`this.http.get<Observable<Joke>>(URL)` l'interface Joke doit avoir exactement les mêmes champs qui sont renvoyés par l'API

## Post

`this.http.post(`${URL}`, joke)` angular envoit en json l'objet

### Paramètres optionnels

```ts
const params = new HttpParams.set('key', 'value')
this.http.post(`${URL}`, joke, {params: params})
```

### Signaux is the new BehaviourSubject ou Subject

Partager une même source de données entre plusieurs composants qui peut être une méthode

```ts
export class Comp2 {
  public joke

  constructor(private jokeStore:Store) {
    this.joke = this.jokeStore.joke
  }

  loadJoke(){
    this.jokeStore.loadJoke()
  }
  ```

```html
<div>
  <button (click)="loadJoke()">Joke</button>
  <p>{{joke()?.value}}</p>
</div>
```

````html
<div>
<p>LA taille de la joke est de : {{jokeLength()}}</p>
</div>
```

Méthode dérivée

```ts
@Injectable({
  providedIn: 'root',
})
export class Store {
  private readonly _joke = signal<Joke | null>(null)
  public readonly joke= this._joke.asReadonly()
  public readonly jokeLength = computed(
    () => this._joke()?.value.length ?? 0
  )
  constructor(private api: Api) {
  }

  loadJoke(){
    this.api.getJoke().subscribe(
      data=> this._joke.set(data)
    )
  }
}
```

Api

```ts
export class Api {
  private readonly BASE_URL = 'https://api.chucknorris.io/jokes';
  constructor(private http:HttpClient) {
  }
  public getJoke(): Observable<any>{
    return this.http.get<any>(`${this.BASE_URL}/random`)
  }
}
```

## Exemple

### Modèle

```ts
/**
 * Represents a project entity retrieved from the API.
 */
export interface Project {

  /**
   * Unique identifier of the project.
   */
  id: number;

  /**
   * Display name of the project.
   */
  name: string;

  /**
   * Short description.
   */
  description: string;
}
```

## Service API

project-api.service.ts

```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './project.model';

/**
 * Service responsible for communicating with the backend API.
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  private http = inject(HttpClient);

  /**
   * Fetch all projects from the API.
   * @returns Observable emitting the list of projects
   */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/api/projects');
  }

}
```

## Store avec Signaux

project.store.ts

```ts 
import { Injectable, signal, computed, inject } from '@angular/core';
import { Project } from './project.model';
import { ProjectApiService } from './project-api.service';

/**
 * Store managing the state of projects using Angular signals.
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectStore {

  private api = inject(ProjectApiService);

  /**
   * Internal signal storing the list of projects.
   */
  private projectsSignal = signal<Project[]>([]);

  /**
   * Public readonly signal exposing the list of projects.
   */
  projects = computed(() => this.projectsSignal());

  /**
   * Loads projects from the API and updates the store.
   */
  loadProjects(): void {

    this.api.getProjects().subscribe({
      next: (projects) => {
        this.projectsSignal.set(projects);
      }
    });

  }

}
```

## Composant

project-list.component.ts

```ts
import { Component, inject, OnInit } from '@angular/core';
import { ProjectStore } from '../store/project.store';

/**
 * Component responsible for displaying the list of projects.
 */
@Component({
  selector: 'app-project-list',
  standalone: true,
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {

  /**
   * Injected store managing project state.
   */
  private store = inject(ProjectStore);

  /**
   * Signal containing the list of projects.
   */
  projects = this.store.projects;

  /**
   * Loads projects when the component initializes.
   */
  ngOnInit(): void {
    this.store.loadProjects();
  }

}
```

## Template Angular

project-list.component.html

Version Angular moderne (@for) :

```html
<h2>Project list</h2>

<ul>

  @for (project of projects(); track project.id) {

    <li>
      <strong>{{ project.name }}</strong>
      <p>{{ project.description }}</p>
    </li>

  }

</ul>
```

## Flux complet
Component
   ↓
Store.loadProjects()
   ↓
API Service
   ↓
Backend
   ↓
Store.signal.set()
   ↓
Template -> projects()
   ↓
Angular re-render automatiquement

API Service → communication HTTP uniquement

Store → gestion de l'état

Component → logique UI uniquement

Signal → reactive state ultra simple

Template → simple lecture projects()