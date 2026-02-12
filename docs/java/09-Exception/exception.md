---
title: Exception
---
Les erreurs sont des problèmes qui se produisent lors de l'exécution du code, empâchant le programme de fonctionner comme prévu (*StackOverflowError, OutOfMemoryError*):
- défauts de logique...

Les exceptions se produisent *pendant l'exécution* 
> Une bonne gestion des exceptions peut gérer les erreurs et rediriger le programme avec grâce pour offrir à l’utilisateur une expérience positive
>
> —— https://www.baeldung.com/java-exceptions

3 grandes catégories
- Checked exceptions
- Unchecked exceptions / Runtime exceptions
- Errors

Quand une exception est levée le cade s'arrête immédiatiement, s'il n'y pas de catch dans la pile d'appel, l'appli plante. 
## Checked exceptions
Exceptions que l'on doit gérer. Soit en la déclarant dans la pile d'appel, soit la gérer nous mêmes. (*IOException, ServletException, SQLException*)
- Oracle conseil de les utiliser quand l'apellant de notre méthode pourra la récupérer.

## Unchecked Exceptions
Exceptions que l'on est pas obligé de gérer. Souvent quand on crée une exception qui extends RuntimeException. (*NullPointerException, IllegalArgumentException*)

## Transaction
Spring ne rollback que si une unchecked ou une erreur est levée, sinon Spring ne rollback pas automatiquement. 

# Gestion des exceptions
Nous **devons** gérer les checked, et nous **pouvons** gérer les unchecked sur les méthodes risquées. 
## throws
Si c'est une checked, n'importe qui utilisant cette méthode devrau aussi la gérer.
## try-catch
Il peut renverser l'exception avec un throw, ou utiliser façon de récupération (retourner null, 0...)


On peut mettre plusieurs catch pour un try ou unir des exception `catch (IOException | NumberFormatException e)`
### finally
Code qui est exécuté peut importe try catch mais si catch le code est exécuté avant de renvoyé l'exception (utile pour des méthodes comme .close() avant)
> Depuis java 7 beaucoup d'éléments étendent AutoCloseable 

## Les plus courants
1. Checked
- **IOException** - problème sur le réseau, le système de fichiers ou la base de données a échoué
- **SQLException**
2. Unchecked / Runtime
- **NullPointerException** - référencer un objet nul. A éviter en effectuant soit des tests défensifs de nullité, soit en utilisant *Optional*
- **ArrayIndexOutOfBoundsException** - on essaye d’accéder à un index de tableau inexistant
- **ClassCastException** - conersion illégal, faire des tests d'*instanceof* avant
- **IllegalArgumentException** - un des paramètres de méthode ou constructeur fournis est invalide.
- **IllegalStateException** - état interne, comme l’état de notre objet, est invalide
- **NumberFormatException** - on essaye de convertir une chaîne en nombre, mais que la chaîne contenait des caractères illégaux