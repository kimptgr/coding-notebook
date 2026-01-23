---
title: Internationalisation
sidebar_position: 0
---

# Internationalisation I18N

## Fichiers properties par langue

- messages.properties

```
employee.civility.error=Civility is not valid or empty
```

- messages_en.properties
- messages_fr.properties

```
employee.civility.error=La civilité est incorrecte ou non renseignée
```

## Encodage par défault

Dans application.properties

- spring.messages.encoding=UTF-8
- La langue par défaut : spring.web.locale=en

## Utilisation dans les BO

```java
@NotNull(message = "{employee.civility.error}")
private Civilite civilite;
```

## Utilisation dans les contrôleur

- Injection Bean MessageSource
- Injection de la locale
  Appel des clefs via getMessages

```java
final String titreMsg = messageSource.getMessage("notvalidexception", null, locale);
```

# Pour forcer la locale dans l'application

i18n.config

```java
    @Configuration
    public class LocaleConfig
    {
        @Bean
        public LocaleResolver localeResolver() {
            // Locale forcée en anglais
            return new FixedLocaleResolver(Locale.ENGLISH);
        }
}
```

# Pour forcer la locale dans l'application

package : i18n.config

```java
    @Configuration
    public class LocaleConfig
    {
        @Bean
        public LocaleResolver localeResolver() {
            // Locale forcée en anglais
            return new FixedLocaleResolver(Locale.ENGLISH);
        }
}
```

# Pour alléger le controller

```java
/**
 * Resolves localized messages with parameters.
 */
@Component
public class LocaleHelper {

    private final MessageSource messageSource;

    public LocaleHelper(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    /**
     * Translate a message.
     *
     * @param key          message key
     * @param args         message arguments
     * @return localized message
     */
    public String i18n(
            String key,
            Object[] args
    ) {
        return messageSource.getMessage(key, args, LocaleContextHolder.getLocale());
    }
}
```

Dans le controller

```java
response.message = localeHelper.i18n(response.message, new String[]{idArticle});

```

Dans message{}.properties

```java
ARTICLE_NOT_FOUND=Article not found (id: {0})
```
