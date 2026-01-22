---
title: Clés primaires composites
---

## 🔑 Clés primaires composites

- Méthode 1 — @IdClass

```java
public class OrderProductId implements Serializable {

    private Integer orderId;
    private Integer productId;
}
```

```java
@Entity
@IdClass(OrderProductId.class)
public class OrderProduct {

    @Id
    private Integer orderId;

    @Id
    private Integer productId;
}
```

- Méthode 2 — @EmbeddedId (préférée)

```java
@Embeddable
public class OrderProductId implements Serializable {

    private Integer orderId;
    private Integer productId;
}
```

```java
@Entity
public class OrderProduct {

    @EmbeddedId
    private OrderProductId id;
}
```

⚠ modifie la structure de l’entité
