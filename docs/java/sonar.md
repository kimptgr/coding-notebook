build.gradle
```
plugins {
    ...
    id 'org.sonarqube' version '4.3.1.3277'
}

sonar {
    properties {
        property "sonar.projectKey", "tpjava"
        property "sonar.host.url", "http://localhost:9000"
        property "sonar.token", "squ_75c91f281fb867dc89993eb9e9a7bf2ee6dfed61"
    }
}
```
[docs/general/tuto-01-jacoco-sonar](https://chocolaterie.github.io/documentation/docs/general/tuto-01-jacoco-sonar/)
```
sonar-project.properties
```