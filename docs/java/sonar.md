---
sidebar_position: 1
---

# Sonar – SonarQube – SonarScanner - Jacoco

**SonarSource** est utilisé pour **analiser la qualité du code**.

- Bugs
- Mauvaises pratiques de codage
- Failles de sécurité
- Dette technique
- Problèmes de couverture de tests

## SonarQube

C'est l'application serveur

- Stocke les résultats d'analyse
- Affiche les tableaux de bord et les indicateurs
- Applique les critères de qualité
- Suit l'évolution des problèmes dans le temps

## SonarScanner

**SonarScanner** est **l'outil client**.

- Analyse votre code source en local ou dans un environnement d'intégration continue
- Envoie les résultats d'analyse à SonarQube

SonarScanner **ne peut pas fonctionner seul**

Il nécessite toujours un **serveur SonarQube**

# Guide d'utilisation

## Configurer Java

### Les variables

**JAVA_HOME** = La racine d'un dossier jdk jdk-25\bin

Téléchargement : https://www.sonarsource.com/products/sonarqube/downloads/

Décompressez-le et lancez l'exécutable

Lancer le script StartSonar.bat situé dans le dossier bin/windows-x86-64

```
StartSonar.bat
```

## Configuration de base

- http://localhost:9000
- Nom d'utilisateur : admin
- Mot de passe : admin

### Token SonarQube

Il faut créer un projet dans SonarQube pour générer ensuite un **token**

## Sonar Scanner

https://docs.sonarsource.com/sonarqube-server/9.8/analyzing-source-code/scanners/sonarscanner

sonar-project.properties

```
sonar.projectKey=my-project

sonar.sources=src

sonar.host.url=http://localhost:9000
sonar.token=YOUR_TOKEN_HERE

sonar.java.binaries=build/classes
```

Ajouter le path du bin de Sonar Scanner dans les variables d'environnements système
**SONAR-PATH**

```
sonar-scanner --version
```

## Projet Java Gradle

Dans un projet java gradle il faut:

- Ajouter le sonar dans les plugins gradle
- Ajouter les properties sonar dans le gradle

```gradle
plugins {
    ...
	id "org.sonarqube" version "4.3.1.3277"
}
...
sonar {
    properties {
        property "sonar.projectKey", "my-project"
        property "sonar.host.url", "http://localhost:9000"
        property "sonar.token", "montoken"
    }
}
```

## Exécuter un scan

Lancer l'analyse depuis la **racine du projet**

```
sonar-scanner
```

## Jacoco

build.gradle :

```
plugins {
    ...
	id 'jacoco'
	id "org.sonarqube" version "4.3.1.3277"
}
jacoco {
	toolVersion = "0.8.7"
}
```

Spécifier à jacoco de générer le rapport du test coverage en XML et HTML

```
jacocoTestReport {
	reports {
		xml.required = true
		html.outputLocation = layout.buildDirectory.dir('jacocoHtml')
	}
}

tasks.named('test') {
	useJUnitPlatform()
	finalizedBy jacocoTestReport
}
```

Dit à `gradle test` d'effectuer les tests :

- Tests unitaires JUnit
- Tests jacoco (code coverage)

## sonar-project.properties

- On dit à Sonar que le code coverage est fait par jacoco
- On ne scan que les services pour le coverage

```
sonar.java.coveragePlugin=jacoco
sonar.coverage.jacoco.xmlReportPaths=build/reports/jacoco/jacocoTestReport.xml
sonar.inclusions=**/*Service.java
```

## Exécuter jacoco

```
gradlew.bat build jacocoTestReport sonar
```
