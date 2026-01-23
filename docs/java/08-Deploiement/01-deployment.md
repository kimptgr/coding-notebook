# Déploiement
Faire tourner une application Spring Boot avec accès aux données : JDK + SGBD
## Jar War
JAR = Java archive
- Permet de regrouper les classes, les ressources et les bibliothèques Java en un fichier compressé
- Les fichiers JAR ont une extension « .jar »
- Ils peuvent s’exécuter avec la commande :
- Permettent de distribuer des bibliothèques Java ou des applications autonomes
WAR = Web archive
- Permet de regrouper les informations pour une
application Web
- HMTL, CSS, JavaScript et le code Java
- Les fichiers WAR ont une extension « .war »
- Ils peuvent être déployés dans des serveurs Web : Apache
Tomcat, JBoss, WebSphere, …

## 
Possible de créer un JAR exécutable avec Spring Boot
- Dans build.gradle :
- Les 2 propriétés : group et version doivent être précisées
- Elles indiquent le package racine et le numéro de version
- Il faut ajouter un bloc bootJar pour préciser au minimum la classe du « main »
- Puis utiliser Gradle pour générer le JAR avec « bootJar »
- Le JAR exécutable, peut être lancé via la commande Java
Création d’un
JAR exécutable
avec Spring Boot
Java Frameworks
DÉPLOIEMENT
java -jar nom_du_fichier.jar

Les JAR exécutables sont conçus pour être exécutés sur un
système d'exploitation prenant en charge Java
• Comme les applications installées
• = Client lourd
Limitations d’un JAR exécutable avec Spring Boot
• La taille du JAR peut devenir volumineuse.
• Il contient toutes les librairies
• Il n’est pas déployable dans un serveur Web : Tomcat,
JBoss, …

Possible de créer un WAR avec Spring Boot (1/2)
• Installer un serveur Web correspondant au Java.
• Tomcat, JBoss, …
• Il faut déclarer dans build.gradle :
• Configurer le numéro de version du projet
• Ajouter le starter pour l’exécution dans un serveur Web Java :
• Optionnel : configurer le nom du War

Possible de créer un WAR avec Spring Boot (2/2)
• Une application Spring Boot utilise la méthode main()
comme point d’entrée pour l’exécution sur le serveur
intégré
• Un serveur web Java, utilise le ServletContext pour s’exécuter
• Il faut donc que la classe SpringBootApplication hérite de
SpringBootServletInitializer
• Et redéfinisse la méthode « configure »
• SpringBootServletInitializer permet d’exécuter une application Spring depuis le
déploiement d’un WAR
• Utiliser Gradle pour générer le WAR
• Copier le WAR dans webapps de Tomcat

Attention contrainte de sécurité
• Le DispatcherServlet peut rentrer en contrainte avec le
SecurityFilterChain
• Les 2 pouvant filtrer des URLs
2 solutions possibles :
• Toute l’API devient sécurisée :
• Solution à privilégier
• Ou il faut utiliser AntPathRequestMatcher
• Pour qu’il n’y ait pas d’ambiguïté sur qui valide l’URL

## TLDR;
Pour faire tourner une application Spring Boot avec accès aux données, il faut :
- Un JDK Java d’installer correspondant à la version utiliser
pour Spring Boot
- Un serveur de base de données correspondant à celui de développement :
Création d’un JAR exécutable avec Spring Boot
Création d’un WAR déployable dans un Serveur Web Java (Tomcat)
- Attention à la sécurité