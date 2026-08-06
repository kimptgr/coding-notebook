---
title: Lombock
---

`@Data`
Génère sur TOUS les champs 
- getters / setters
- toString()
- equals()
- hashCode()

⚠ circularité java.lang.stackOverflowError

`@EqualsAndHashCode(callSuper = true)` compare les champs hérités (ok si tout les champs nécessaires pour equals)


`@MappedSuperclass` Cette classe n’est pas une entité,
mais ses champs sont hérités et mappés dans les entités filles


`@Accessors(chain = true)` ermet de chainer les setter `var Janie = new User().setFirstName('Janie).setName('Doe');`
