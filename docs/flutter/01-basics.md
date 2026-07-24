---
title: Introduction à Flutter
---

# Flutter

Compilation vers du code natif vers chaque plateforme

2023 - 20% des apps sur les stores sont en flutter

Une architecture réactive avec des widgets

Dart et flutter 2 technos développées par google

Dart est le langage de programmation, orienté objet, typé. peut être compilé de 2 façons : JIT (Just In Time) pendant le développement pour du hot reload

*AOT* Ahead Of Time pour une app rapide en code natif 

Flutter c'est le framework UI

lui qui permet de construire l'interface, avec comme idée un seul code pour +rs plateformes (android, linux, windows, web...)

Flutter utilise lui mee toute l'interface via son moteur de rendu. Le tout est en C++

2 types de widgets stateless uniquement du contenu pas d'interactions avec l'utilisateur

statefull L'INTERFACE SE recompose en fonction des choix de l'utilisateur

architecture mvvm comme en angular

sound null safety 

Dans les paramètres de fonctions
soit required soit paramètre par défaut soit ?

double opérateur de coalescence 

1 seul constructeur sinon il faut en faire des nommées

scafold widget niveau écran 

## Module 5 : les Etats Statefull VS Stateless



# Mémo Dart — les bases pour débuter
---

## 1. C'est quoi Dart ?

- Langage de programmation créé par **Google** (public en octobre 2011).
- Au départ pensé pour le web, devenu polyvalent, et popularisé par **Flutter**.
- Caractéristiques à retenir :
    - **Syntaxe allégée** (moins de redondance que Java).
    - **Multiparadigme** : objet *et* fonctionnel.
    - **Typage** (à la différence du JS, on ne change pas le type après déclaration).
    - **Compilé en code natif** sur plusieurs plateformes.

---

## 2. Les types et la déclaration de variables

Très proche de Java. Une fois le type fixé, il ne change plus.

```dart
// Types explicites
int age = 25;
double note = 15.3;
bool aGagne = false;
String nom = "Toto";

// Typage automatique (Dart devine le type)
var age2 = 15;      // devient un int, valeur MODIFIABLE
const age3 = 12;    // constante : lecture seule, NON modifiable
```

**À retenir :**
- `var` → type déduit, valeur modifiable.
- `const` → valeur fixée une fois pour toutes (constante). figé dès la compilation
- `final` figé au moment de l'exécution

---

## 3. Sound Null Safety (sécurité contre les `null`)

Dart t'oblige à gérer les valeurs potentiellement vides (`null`) **avant** l'exécution. Ça évite les fameux plantages type "NullPointerException".

### Déclarer qu'une variable peut être nulle : le `?`

```dart
String? nom;          // le ? = "peut être null"
nom = 'Alex';
print(nom.toUpperCase());   // ALEX
```

Si tu essaies d'utiliser une variable nullable sans l'avoir remplie, Dart refuse de compiler :

```dart
String? nom;
print(nom.toUpperCase());   // ERREUR : nom est potentiellement null
```

### Les 4 outils pour gérer le null

```dart
String? nom;

// 1. Accès conditionnel ( ?. ) : si null, l'expression est ignorée (renvoie null)
print(nom?.toUpperCase());            // null

// 2. Assertion non-null ( ! ) : "je te garantis que ce n'est pas null"
//    ⚠️ si c'est null malgré tout → exception levée
print(nom!.toUpperCase());            // Error: Unexpected null value

// 3. Coalesce ( ?? ) : fournit une valeur de secours si null
print(nom?.toUpperCase() ?? "Inconnu");   // Inconnu

// 4. Assignation conditionnelle ( ??= ) : assigne SEULEMENT si la variable est null
nom ??= "Inconnu";
print(nom.toUpperCase());             // INCONNU
```

---

## 4. Les fonctions

Les paramètres et le retour sont typés. Le retour peut être nullable (`?`).

```dart
void main() {
  print(uneFonction("Anna", 3));
}

String uneFonction(String param1, int param2) {
  return "Paramètre String: $param1 et paramètre int multiplié par 4 = ${param2 * 4}";
}
```

> 💡 `$variable` insère une variable dans une chaîne. Pour un calcul ou un accès, on utilise `${ ... }`.

### Paramètres obligatoires, nommés et optionnels

```dart
void main() {
  uneFonction("Alex", nom: "Terrieur", age: 25);
}

void uneFonction(String prenom, {required String nom, int niveau = 1, int? age}) {
  print("Bonjour $prenom $nom. Vous êtes au niveau $niveau");
  if (age != null) {
    print("Vous avez $age ans");
  }
}
```

| Paramètre | Type |
|-----------|------|
| `prenom`  | positionnel, obligatoire |
| `nom`     | nommé, obligatoire (`required`) |
| `niveau`  | nommé, optionnel avec valeur par défaut (`= 1`) |
| `age`     | nommé, facultatif (donc nullable avec `?`) |

> Les paramètres entre `{ }` sont **nommés** : à l'appel, on écrit `nom: "..."`.

---

## 5. La POO (Programmation Orientée Objet)

### Classe et constructeur

```dart
class Person {
  String name;
  int age;

  // Constructeur : this.x récupère directement la valeur dans le membre
  Person(this.name, this.age);
}

void main() {
  var person1 = Person("Toto", 15);       // recommandé
  var person2 = new Person("Toto", 15);   // le mot-clé "new" existe mais est facultatif
}
```

### Constructeur avec paramètres optionnels

```dart
class Person {
  String name;
  int? age;   // optionnel → doit être nullable

  Person(this.name, {this.age});
}

var person1 = Person("Toto", age: 15);   // on nomme le paramètre optionnel
```

### Constructeurs nommés (plusieurs façons de créer un objet)

```dart
class Person {
  String? name;
  int? age;

  Person(this.name, this.age);            // constructeur par défaut

  // Construire depuis des données JSON
  Person.fromJson(Map<String, dynamic> json) {
    name = json['name'];
    age = json['age'];
  }

  // Construire avec un âge par défaut
  Person.withDefaultAge(String name) : this(name, 0);
}
```

### Encapsulation (rendre un attribut "privé")

En Dart, pas de `public` / `private` / `protected`. On préfixe avec un underscore `_`
pour rendre un membre privé... **mais seulement si la classe est dans un fichier séparé**.

```dart
class Person {
  String? _name;   // "privé" (underscore)
  int? _age;

  Person(this._name, this._age);

  // Getter (accès en lecture contrôlé)
  String? get name => _name;
  // Setter (accès en écriture contrôlé)
  void set name(String newName) {
    _name = newName;
  }

  int? get age => _age;
  void set age(int newAge) {
    _age = newAge;
  }
}
```

---

## 6. La généricité

Permet d'écrire une classe qui marche avec n'importe quel type. On note souvent `T` (simple convention).

```dart
class MyComponent<T> {
  T value;

  MyComponent(this.value);

  T getValue() {
    return value;
  }
}

// À l'instance, on choisit le type entre < >
var component1 = MyComponent<int>(15);
var component2 = MyComponent<bool>(false);
var component3 = MyComponent<String>("Toto");
```

Tu utilises déjà la généricité avec les **listes** :

```dart
List<int> intList = [1, 2, 3, 4];
List<bool> boolList = [true, false, true];
List<String> stringList = ["Toto", "Tata", "Julien"];
```

---

## 7. Les exceptions

```dart
// Lancer une exception avec throw
void validateAge(int age) {
  if (age < 0) {
    throw Exception('L\'âge ne peut pas être négatif.');
  }
}

// Capturer et traiter une exception
void main() {
  try {
    validateAge(-5);
  } on Exception catch (e) {     // capture un type précis
    print('Exception: $e');
  } catch (e) {                  // capture par défaut (tout le reste)
    print('Une exception s\'est produite : $e');
  } finally {                    // exécuté dans TOUS les cas
    print('Opération terminée.');
  }
}
```

---

## 8. Le traitement asynchrone

Une tâche asynchrone prend du temps mais **ne bloque pas** le programme. Elle renvoie un `Future`.

### Sans valeur de retour

```dart
void main() {
  print('hello');
  operationAsynchrone();
  print('Au revoir');
}

Future<void> operationAsynchrone() async {
  await Future.delayed(Duration(seconds: 2));  // attend 2 secondes
  print('OK');
}

// Affiche : hello / Au revoir / OK
// (le "OK" arrive en dernier car il attend 2 secondes)
```

- `async` à la fin de la signature → la fonction est asynchrone.
- `await` → attend la fin d'une opération avant de continuer.

### Avec valeur de retour (`await`)

```dart
class UserAccount {
  String pseudo;
  List<String> roles;
  int age;

  UserAccount(this.pseudo, this.roles, this.age);
}

Future<UserAccount> getUserAccount() async {
  await Future.delayed(Duration(seconds: 2));
  return UserAccount('André', ['ROLE_USER'], 20);
}

void main() async {
  print('hello voici votre compte');
  var account = await getUserAccount();   // on attend le résultat
  print("Vous êtes connecté en tant que ${account.pseudo}");
  print('Au revoir');
}

// hello voici votre compte
// Vous êtes connecté en tant que André
// Au revoir
```

### Sans attendre, avec `.then()`

```dart
void main() {
  print('hello voici votre compte');
  getUserAccount().then((account) {
    print("Vous êtes connecté en tant que ${account.pseudo}");
  });
  print('Au revoir');
}

// hello voici votre compte
// Au revoir
// Vous êtes connecté en tant que André   <- arrive APRÈS, le code n'a pas attendu
```

**`await` vs `.then()` :**
- `await` → on attend le résultat avant de continuer (lecture du code plus linéaire).
- `.then()` → on n'attend pas, le code continue et la réponse arrive plus tard.

---

## Récap express

| Notion | Mot-clé / symbole clé |
|--------|----------------------|
| Variable modifiable / constante | `var` / `const` (et `final`) |
| Peut être null | `?` |
| Si null, ignorer | `?.` |
| Forcer non-null | `!` |
| Valeur de secours | `??` |
| Assigner si null | `??=` |
| Paramètre nommé obligatoire | `required` |
| Attribut privé | `_` (underscore) |
| Généricité | `<T>` |
| Lancer / gérer une erreur | `throw` / `try`-`catch`-`finally` |
| Asynchrone | `async` / `await` / `Future` / `.then()` |

# Mémo — Flutter : Interaction et gestion des états (Module 5)

## 1. StatelessWidget vs StatefulWidget

| | **StatelessWidget** | **StatefulWidget** |
|---|---|---|
| Nature | Figé, immuable | Peut changer dynamiquement (rebuild) |
| État interne | Aucun état spécifique | Contient un état qui évolue |
| Exemple | Une page de textes avec des images | Compteur, formulaire réactif, tout écran interactif |

**Règle simple :** dès qu'une partie de l'écran doit changer *après* l'affichage initial suite à une interaction, c'est un `StatefulWidget`.

### Squelette d'un StatelessWidget

```dart
class MonWidgetStateless extends StatelessWidget {
  const MonWidgetStateless({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Flutter demo')),
      body: Center(child: Text('Hello World')),
    );
  }
}
```

---

## 2. Le StatefulWidget — fonctionnement

Un `StatefulWidget` se décompose **toujours en 2 classes** :

1. La classe **Widget** qui hérite de `StatefulWidget` et surcharge `createState()`.
2. La classe **State** qui hérite de `State<MonWidget>` et contient l'état + la méthode `build()`.

```dart
// 1) Le widget (immuable)
class MonWidgetStateful extends StatefulWidget {
  const MonWidgetStateful({super.key});

  @override
  State<MonWidgetStateful> createState() => _MonWidgetStatefulState();
}

// 2) L'état associé (mutable)
class _MonWidgetStatefulState extends State<MonWidgetStateful> {
  int compteur = 0; // état local

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Compteur: $compteur'),
        ElevatedButton(
          onPressed: () {
            setState(() {
              compteur++; // on modifie l'état DANS setState
            });
          },
          child: Text('Incrémenter'),
        ),
      ],
    );
  }
}
```

### Points clés à retenir

- Le widget hérite de `StatefulWidget` et associe un état via `createState()`.
- L'état hérite de `State<Widget>` et porte la méthode `build()` chargée de l'affichage.
- Le widget peut **se reconstruire en temps réel** lors d'un événement, à condition que celui-ci déclenche `setState()`.
- À chaque `setState()`, toutes les variables sont mises à jour dans l'affichage.
- Cette séparation en 2 classes garde le `StatefulWidget` **immuable** tout en permettant à Flutter de mettre à jour l'état.
- Le **rebuild est partiel** : seul le sous-arbre concerné est reconstruit → optimisation des performances.

---

## 3. Les méthodes du cycle de vie

Ordre d'exécution :

```
createState() → initState() → build() → didUpdateWidget() → dispose()
                                  ↑
                              setState()
```

| Méthode | Quand est-elle appelée ? | Utilisation typique |
|---|---|---|
| `initState()` | À la création de l'état (une seule fois) | Initialiser des variables, controllers, listeners |
| `setState()` | Sur un événement | Déclencher la reconstruction (`build`) |
| `build()` | À chaque reconstruction de l'interface | Décrire la structure à afficher |
| `didUpdateWidget()` | Quand le widget parent change et reconstruit | Comparer ancien / nouveau widget |
| `dispose()` | Juste avant la destruction du widget | Nettoyer (controllers, listeners, abonnements…) |

---

## 4. Bonnes pratiques (à retenir)

- ✅ Toujours appeler `super.initState()` et `super.dispose()`.
- ✅ **Éviter** les appels réseau ou les opérations lourdes dans `build()` (il est appelé très souvent).
- ✅ Ne jamais oublier de **libérer les ressources** dans `dispose()`.
- ✅ Utiliser `setState()` **uniquement quand l'état change réellement**.

```dart
class _MonState extends State<MonWidget> {
  int? _compteur;

  @override
  void initState() {
    super.initState();   // obligatoire
    _compteur = 0;
  }

  @override
  void dispose() {
    // libération des ressources ici
    super.dispose();     // obligatoire
  }

  @override
  Widget build(BuildContext context) { /* ... */ }
}
```

---

## 5. En une phrase

> Un `StatelessWidget` décrit une UI figée ; un `StatefulWidget` décrit une UI qui évolue dans le temps grâce à un objet `State`, mis à jour via `setState()` et géré par les méthodes du cycle de vie (`initState` → `build` → `dispose`).

# Mémo — Flutter : Les Formulaires

*Module 6 — Le développement cross-plateforme avec Flutter*

---

## 1. Un formulaire dans Flutter : les 4 ingrédients

| Ingrédient | Rôle |
|---|---|
| **StatefulWidget** | Le formulaire est dynamique (saisie, validation, erreurs) → il faut un état |
| **`GlobalKey<FormState>`** | Une « poignée » pour accéder à l'état du formulaire depuis le code (valider, sauvegarder) |
| **`Form`** | Le conteneur qui regroupe tous les champs ; il reçoit la `GlobalKey` via son paramètre `key` |
| **Les champs** (`TextFormField`, `DropdownButtonFormField`, `RadioListTile`…) | Chaque champ = un widget paramétrable imbriqué dans le `Form` |

Squelette de base :

```dart
class FormPage extends StatefulWidget {
  const FormPage({super.key});

  @override
  State<FormPage> createState() => _FormPageState();
}

class _FormPageState extends State<FormPage> {
  final _formKey = GlobalKey<FormState>();   // la clé pour piloter le Form
  final List<String> _countries = ['France', 'Canada', 'Suisse', 'Belgique'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Formulaire')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,                       // on relie la clé au Form
          child: ListView(
            children: [
              TextFormField(
                decoration: const InputDecoration(
                  labelText: 'Nom',
                  border: OutlineInputBorder(),
                ),
              ),
              // ... autres champs
            ],
          ),
        ),
      ),
    );
  }
}
```

> **Pourquoi `StatefulWidget` ?** parce que l'affichage doit changer (valeur sélectionnée, messages d'erreur…). La `GlobalKey` sert de pont pour atteindre le `FormState` et déclencher `validate()` / `save()`.

---

## 2. Les types de champs

### TextFormField (champ texte)

```dart
TextFormField(
  decoration: const InputDecoration(
    labelText: 'Email',
    border: OutlineInputBorder(),
  ),
  keyboardType: TextInputType.emailAddress,
)
```

`keyboardType` adapte le clavier mobile (email, nombre, téléphone…).

### Dropdown (liste déroulante)

On stocke le choix dans une variable d'état, et on la met à jour avec `setState()`.

```dart
String? _selectedCountry;   // dans le State

DropdownButtonFormField<String>(
  decoration: const InputDecoration(
    labelText: 'Pays',
    border: OutlineInputBorder(),
  ),
  value: _selectedCountry,
  items: _countries
      .map((country) => DropdownMenuItem(
            value: country,
            child: Text(country),
          ))
      .toList(),
  onChanged: (value) {
    setState(() {
      _selectedCountry = value;
    });
  },
)
```

> **Point clé :** pour que le choix sélectionné s'affiche, il faut appeler `setState()` dans `onChanged`, ce qui met à jour `value` en temps réel.

### Radios (choix exclusif)

Toutes les options partagent la même variable via `groupValue`. Celle cochée est celle dont `value == groupValue`.

```dart
String? _gender = "Non determiné";   // dans le State

RadioListTile<String>(
  title: const Text('Homme'),
  value: 'Homme',
  groupValue: _gender,
  onChanged: (value) {
    setState(() {
      _gender = value;
    });
  },
)
// + un RadioListTile pour 'Femme', un autre pour 'Non déterminé'
```

> Même logique que le dropdown : `setState()` met à jour `groupValue`, donc le bouton coché.

---

## 3. La validation de la saisie

Le système de validation est **intégré au `Form`**. Le principe :

- Chaque champ définit ses contraintes dans son paramètre **`validator`**.
- L'état du formulaire est accessible via la **`GlobalKey<FormState>`**.
- À la soumission, on appelle **`validate()`** : ça déclenche le `validator` de **chaque** champ.
- Si tout est valide, on peut appeler **`save()`** pour récupérer les valeurs via `onSaved`.

### Le validator d'un champ

La règle du `validator` :
- s'il y a une **erreur** → on retourne une **chaîne** (le message affiché sous le champ) ;
- si tout est **OK** → on retourne **`null`**.

```dart
String _email = '';   // dans le State

TextFormField(
  decoration: const InputDecoration(
    labelText: 'Email',
    border: OutlineInputBorder(),
  ),
  keyboardType: TextInputType.emailAddress,
  validator: (value) {
    if (value == null || value.isEmpty) {
      return 'Veuillez entrer votre email';
    }
    if (!RegExp(r'\S+@\S+\.\S+').hasMatch(value)) {
      return 'Email invalide';
    }
    return null;   // OK
  },
  onSaved: (value) => _email = value!,   // stocke la valeur dans une propriété
)
```

> `validator` = la **règle**. `onSaved` = le **rangement** de la valeur dans une variable de la classe (déclenché par `save()`).

---

## 4. Le processus de soumission

On crée une méthode (souvent `_submitForm`) reliée au bouton d'envoi.

```dart
// Le bouton
ElevatedButton(
  onPressed: _submitForm,
  child: const Text('Envoyer'),
)

// La méthode de soumission
void _submitForm() {
  final isValid = _formKey.currentState!.validate();   // valide tous les champs

  if (!isValid || !_acceptTerms) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Veuillez remplir tous les champs')),
    );
    return;   // on arrête là si invalide
  }

  _formKey.currentState!.save();   // déclenche les onSaved → récupère les saisies
  // ... ici on peut envoyer les données, naviguer, etc.
}
```

Le déroulé :
1. **`validate()`** lance le `validator` de chaque champ → retourne `true` si tout est bon.
2. Si invalide, on **affiche un message** (`SnackBar`) et on **sort** (`return`).
3. Si OK, on peut **vérifier d'autres conditions** (ex. case « conditions acceptées »).
4. **`save()`** déclenche les `onSaved` pour **récupérer les valeurs** non encore stockées.

> `_formKey.currentState` donne accès au `FormState` ; le `!` indique qu'on est sûr qu'il n'est pas `null` (le formulaire est bien construit).

---

## 5. Récapitulatif des étapes pour valider un Form

1. **Déclarer** un membre de classe : `final _formKey = GlobalKey<FormState>();`
2. **Associer** cette clé au `Form` : `Form(key: _formKey, ...)`
3. Donner un **`validator`** à chaque champ (retourne un message ou `null`).
4. (Optionnel) Donner un **`onSaved`** à chaque champ pour ranger la valeur.
5. Dans la méthode de soumission, appeler **`_formKey.currentState!.validate()`**.
6. Si valide, appeler **`_formKey.currentState!.save()`**.

---

## En résumé

- Un formulaire = **`StatefulWidget` + `GlobalKey<FormState>` + `Form` + champs**.
- Les champs « dynamiques » (dropdown, radios) ont besoin de **`setState()`** pour afficher la sélection.
- La **validation** repose sur le `validator` de chaque champ : message d'erreur ou `null`.
- La **soumission** : `validate()` (vérifier) puis `save()` (récupérer) via la `GlobalKey`.

# Mémo — Flutter : La Navigation

*Module 7 — Le développement cross-plateforme avec Flutter*

---

## 1. Le principe de la pile (stack)

Une application Flutter à plusieurs pages fonctionne comme une **pile LIFO** (*Last In, First Out* — dernier arrivé, premier sorti).

- Chaque page **est un widget** (Stateful ou Stateless).
- Ouvrir une page = la **poser au-dessus** de la pile (elle recouvre la précédente).
- Quitter une page = la **retirer** du sommet de la pile.
- La **page initiale** reste toujours en bas de la pile : on ne peut pas la supprimer.

```
        ┌──────────┐  ← sommet (page affichée)
        │ Écran 3  │
      ┌─┴──────────┤
      │ Écran 2    │
    ┌─┴────────────┤
    │ Écran 1      │  ← page initiale (toujours présente)
    └──────────────┘
```

> Ce modèle explique le bouton « retour » : il fait un `pop`, c'est-à-dire qu'il enlève la page du sommet et révèle celle d'en dessous.

---

## 2. Les routes (l'annuaire)

Comme « tout est widget », une page n'est qu'un widget. Les **routes** sont un annuaire qui associe un **nom** (`'/'`, `'/details'`…) à un **écran**.

On les déclare dans le `MaterialApp` :

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: '/',                              // page de démarrage
      routes: {
        '/': (context) => HomeScreen(),
        '/details': (context) => DetailsScreen(),
      },
    );
  }
}
```

- `initialRoute` : le nom de la première page affichée.
- `routes` : la table `{ nom → écran }`.

---

## 3. La navigation basique (Navigator)

La classe **`Navigator`** fournit les fonctions de navigation. Les deux essentielles :

| Méthode | Effet |
|---|---|
| `Navigator.pushNamed(context, '/details')` | **Ouvrir** une page (la poser sur la pile) |
| `Navigator.pop(context)` | **Fermer** la page courante (la retirer de la pile) |

```dart
// Ouvrir la page de détails
OutlinedButton(
  onPressed: () {
    Navigator.pushNamed(context, '/details');
  },
  child: const Text('Voir détails'),
)

// Revenir en arrière
OutlinedButton(
  onPressed: () {
    Navigator.pop(context);
  },
  child: const Text('Retour'),
)
```

> Retenir le couple **push / pop** = empiler / dépiler.

---

## 4. Passer des arguments

### Un seul argument

On le passe via le paramètre `arguments` de `pushNamed`, et on le récupère dans le `build` de la page cible avec `ModalRoute`.

```dart
// Page de départ : on envoie 42
ElevatedButton(
  onPressed: () {
    Navigator.pushNamed(context, '/details', arguments: 42);
  },
  child: const Text('2e page'),
)

// Page cible : on récupère
class DetailsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final int id = ModalRoute.of(context)!.settings.arguments as int;
    print(id);
    // ...
  }
}
```

> `ModalRoute.of(context)!.settings.arguments` donne l'argument transmis ; `as int` précise son type.

### Plusieurs arguments

Comme `arguments` n'accepte qu'**une** valeur, on regroupe les données dans une **classe** dédiée.

```dart
// 1) Une classe pour transporter les arguments
class ScreenArguments {
  final int id;
  final String name;
  ScreenArguments(this.id, this.name);
}

// 2) On envoie une instance
ElevatedButton(
  onPressed: () {
    Navigator.pushNamed(
      context,
      '/details',
      arguments: ScreenArguments(42, 'un nom'),
    );
  },
  child: const Text('2e page'),
)

// 3) On récupère dans la page cible
final args = ModalRoute.of(context)!.settings.arguments as ScreenArguments;
print(args.id);
print(args.name);
```

---

## 5. La navigation avec GoRouter

**GoRouter** est une librairie qui facilite la navigation et le passage de paramètres. Elle apporte :
- la gestion du **deep-linking** (ouvrir l'app directement sur une page via une URL),
- la gestion des **erreurs** (page introuvable),
- la gestion des **redirections** (ex. : si non connecté → `/login`),
- l'utilisation de **Navigator 2.0** sous le capot.

### Installation

Dans `pubspec.yaml` :

```yaml
dependencies:
  flutter:
    sdk: flutter
  go_router: ^13.0.0   # ou la version la plus récente
```

### Étape 1 — Configurer le router

```dart
import 'package:go_router/go_router.dart';

void main() {
  runApp(const MyApp());
}

final GoRouter _router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => HomePage(),
    ),
    GoRoute(
      path: '/details',
      builder: (context, state) {
        final args = state.extra as ScreenArguments;   // réception des arguments
        return DetailsPage(id: args.id, name: args.name);
      },
    ),
  ],
);
```

### Étape 2 — Brancher le router sur l'app

On utilise le constructeur nommé **`MaterialApp.router()`** avec le paramètre `routerConfig`.

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      routerConfig: _router,
    );
  }
}
```

### Étape 3 — Naviguer

GoRouter distingue deux gestes :

| Geste | Méthode | Effet sur la pile |
|---|---|---|
| **Remplacer** l'écran | `context.go('/details', extra: ...)` | Remplace la page courante |
| **Empiler** l'écran | `context.push('/details', extra: ...)` | Pose une nouvelle page au-dessus (retour possible) |

```dart
// 3a — Remplacement de l'écran
ElevatedButton(
  onPressed: () {
    context.go('/details', extra: ScreenArguments(42, 'un nom'));
  },
  child: const Text('2e page'),
)

// 3b — Empilement de l'écran
ElevatedButton(
  onPressed: () {
    context.push('/details', extra: ScreenArguments(42, 'un nom'));
  },
  child: const Text('2e page'),
)
```

> `extra` transporte les arguments (ici l'objet `ScreenArguments`).

### Étape 4 — Recevoir les arguments

Avec GoRouter, on récupère les données dans le `GoRoute` (via `state.extra`) puis on les passe à la page **par son constructeur**, ce qui est plus propre que `ModalRoute`.

```dart
class DetailsPage extends StatelessWidget {
  final int id;
  final String name;

  DetailsPage({required this.id, required this.name});

  @override
  Widget build(BuildContext context) {
    print(id);
    print(name);
    // ...
  }
}
```

---

## En résumé

- La navigation Flutter = une **pile LIFO** de pages (chaque page = un widget).
- Les **routes** = un annuaire `{ nom → écran }` déclaré dans `MaterialApp`.
- **Navigator** : `pushNamed()` pour ouvrir, `pop()` pour fermer.
- **Arguments** : via `arguments` (+ `ModalRoute` pour les lire) ; pour plusieurs valeurs, on crée une **classe**.
- **GoRouter** : librairie plus puissante (deep-linking, redirections) ; `context.go()` remplace, `context.push()` empile, `extra` transporte les arguments reçus par le **constructeur** de la page.