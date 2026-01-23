---
title: Exception handler
sidebar_position: 0
---

# Exception handler

Déclaration d’une classe (Exception Handler) annotée @ControllerAdvice

Déclaration de méthodes annotées @ExceptionHandler pour capturer et traiter des exceptions Java

```java
@ControllerAdvice
public class AppExceptionHandler {
// Préciser les exceptions à gérer
@ExceptionHandler(value = {Exception.class })
public ResponseEntity<String> capturerException(Exception ex) {
return new ResponseEntity<String>(ex.getMessage(), HttpStatus.NOT_ACCEPTABLE);
}
}
```

Dans notre application web service, quels types d’exception existent-ils et où les gérer ?

- A tout niveau de l’architecture, il y a des Exception (plusieurs types)
- Au niveau DAL : créées par Spring Data JPA ou la driver de la base
- Au niveau BLL :
- Vérification des données et transfert de RuntimeException
- Gestion de certaines exceptions de la couche DAL
- Au niveau contrôleur / BO :
- Gestion d’exception de la couche BLL
- Activation de validation (@Valid)
  L’utilisation d’un @ControllerAdvice va permettre de capturer toutes celles non traitées

````java
@RestControllerAdvice
public class GlobalExceptionHandler {
    private final LocaleHelper localeHelper;

    public GlobalExceptionHandler(LocaleHelper localeHelper) {
        this.localeHelper = localeHelper;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        ValidationErrorResponse response = new ValidationErrorResponse();
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(
                error -> errors.put(error.getField(), error.getDefaultMessage())
        );
        response.status = "400";
        response.message = localeHelper.i18n("ARGUMENT_NOT_VALID", null);
        response.errors = errors;

    return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(HandlerMethodValidationException.class)
    public ResponseEntity<ValidationErrorResponse> handleMethodArgumentTypeMismatch(HandlerMethodValidationException ex) {
        ValidationErrorResponse response = new ValidationErrorResponse();
        Map<String, String> errors = new HashMap<>();
//        ex.getBindingResult().getFieldErrors().forEach(
//                error -> errors.put(error.getField(), error.getDefaultMessage())
//        );
        errors.put(ex.getReason(), ex.getMessage());

        response.status = "400";
        response.message = localeHelper.i18n("ARGUMENT_NOT_VALID", null);
        response.errors = errors;

        return ResponseEntity.badRequest().body(response);
    }
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ValidationErrorResponse> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex) {
        ValidationErrorResponse response = new ValidationErrorResponse();
        Map<String, String> errors = new HashMap<>();
//        ex.getBindingResult().getFieldErrors().forEach(
//                error -> errors.put(error.getField(), error.getDefaultMessage())
//        );
        errors.put(ex.getErrorCode(), ex.getMessage());

        response.status = "400";
        response.message = localeHelper.i18n("ARGUMENT_NOT_VALID", null);
        response.errors = errors;

        return ResponseEntity.badRequest().body(response);
    }
}

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    private final LocaleHelper localeHelper;

    public GlobalExceptionHandler(LocaleHelper localeHelper) {
        this.localeHelper = localeHelper;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        ValidationErrorResponse response = new ValidationErrorResponse();
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(
                error -> errors.put(error.getField(), error.getDefaultMessage())
        );
        response.status = "400";
        response.message = localeHelper.i18n("ARGUMENT_NOT_VALID", null);
        response.errors = errors;

    return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(HandlerMethodValidationException.class)
    public ResponseEntity<ValidationErrorResponse> handleMethodArgumentTypeMismatch(HandlerMethodValidationException ex) {
        ValidationErrorResponse response = new ValidationErrorResponse();
        Map<String, String> errors = new HashMap<>();
//        ex.getBindingResult().getFieldErrors().forEach(
//                error -> errors.put(error.getField(), error.getDefaultMessage())
//        );
        errors.put(ex.getReason(), ex.getMessage());

        response.status = "400";
        response.message = localeHelper.i18n("ARGUMENT_NOT_VALID", null);
        response.errors = errors;

        return ResponseEntity.badRequest().body(response);
    }
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ValidationErrorResponse> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex) {
        ValidationErrorResponse response = new ValidationErrorResponse();
        Map<String, String> errors = new HashMap<>();
//        ex.getBindingResult().getFieldErrors().forEach(
//                error -> errors.put(error.getField(), error.getDefaultMessage())
//        );
        errors.put(ex.getErrorCode(), ex.getMessage());

        response.status = "400";
        response.message = localeHelper.i18n("ARGUMENT_NOT_VALID", null);
        response.errors = errors;

        return ResponseEntity.badRequest().body(response);
    }
}
````
