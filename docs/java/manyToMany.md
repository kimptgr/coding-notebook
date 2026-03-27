---
title: Relation Many To Many
---

# Many to Many

Bonne pratique entité pivot explicite + une clef composite si la table pivot contient des colonnes supplémentaires.

## Sans entité pivot

```java
    @ManyToMany(
            targetEntity = Project.class, fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_project",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id")
    )
    @NotAudited
    protected Set<Project> userProjectList = new HashSet<>();
```

## Entité pivot + clef composite

### Entité pivot

`@EmbeddedId` doit être initialisée sinon NPE quand JPA essaye de setter, 
> `@MapsId` : signal que c'est une partie de la clef primaire, il porte le même nom que le champ dans la clef composite notée par `@Embeddable`

```java
@Entity
@Table(name = "user_project")
public class UserProject {

    @EmbeddedId
    private UserProjectId id = new UserProjectId();

    /**
     * Many-to-one relationship to User.
     */
    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    /**
     * Many-to-one relationship to Project.
     */
    @ManyToOne
    @MapsId("projectId")
    @JoinColumn(name = "project_id")
    private Project project;

    private String role;

    private LocalDateTime joinedAt;

    // getters / setters
}

```

### Clef composite

```java
@Embeddable
public class UserProjectId implements Serializable {

    private Long userId;
    private Long projectId;

    // equals & hashCode
}
```

### Entités liées

```java
@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    /**
     * One-to-many relationship to UserProject.
     */
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserProject> users = new HashSet<>();

}
```

### Repository du pivot

```java
public interface UserProjectRepository
        extends JpaRepository<UserProject, UserProjectId> {

    /**
     * Checks if a relation already exists.
     */
    boolean existsByUserIdAndProjectId(Long userId, Long projectId);

    /**
     * Returns all relations for a given user.
     */
    List<UserProject> findByUserId(Long userId);
}
```
