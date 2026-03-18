---
title: Relation One To Many
---
`@OneToMany` Sur le parent qui possède +rs enfants
# Définition et Mapping

Pour implémenter une relation @OneToMany, vous devez annoter l'attribut correspondant dans la classe parent avec @OneToMany. Voici un exemple de mapping sans table d'association :
```
@Entity
@Table(name = "T_Users")
public class User {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int idUser;

@OneToMany(mappedBy = "user", targetEntity = Command.class)
private List<Command> commands = new ArrayList<>();

}
```
**mappedB** relation définie dans la classe Command, la table T_Commands contiendra une clé étrangère (idUser)

## Classe Enfant (Command)
**@ManyToOne**
```
@Entity
@Table(name = "T_Commands")
public class Command {
//...
@ManyToOne
@JoinColumn(name = "idUser", nullable = false)
private User user;

}
```

### Gestion des Collections

Typées avec des interfaces comme List ou Set
### Table d'Association
```
@OneToMany
@JoinTable(
name = "T_Commands_Users_Associations",
joinColumns = @JoinColumn(name = "idUser"),
inverseJoinColumns = @JoinColumn(name = "idCommand")
)
private List<Command> commands = new ArrayList<>();
```

Table intermédiaire T_Commands_Users_Associations est utilisée pour stocker les relations entre T_Users et T_Commands