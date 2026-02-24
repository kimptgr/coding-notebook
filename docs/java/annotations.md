---
title: Annotations
sidebar_position: 4
---

## Annotations principales :

- `@Component` : annotation générique
- `@RestController` : couche API REST
- `@Service` : couche métier
- `@Repository` : accès aux données

## Annotations lombock :

Lombok permet de réduire le **code répétitif (boilerplate)** en Java.
Le code est généré automatiquement à la compilation.

- `@Getter` / `@Setter`
- `@NoArgsConstructor`
- `@AllArgsConstructor`
- `@EqualsAndHashCode`
- `@ToString`
- `@Data`
- `@Entity`
- `@Table`
- `@Id`
- `@GeneratedValue`
- `@Column`
- `@Transactional`
- `@OneToOne`
- `@OneToMany`
- `@ManyToOne`
- `@ManyToMany`
- `@RestController`
- `@RequestMapping`
- `@GetMapping`
- `@PostMapping`
- `@RequestBody`
- `@Valid`
- `@PostMapping`
- `@OpenAPIDefinition`
- `@Tag`
- `@Operation`

# Jackson Annotation
- `@JsonProperty` : nom de la propriété json pour serialize et/ou deserialize
- `@JsonAlias` : autorise plusieurs noms pour la déserialisation (multiple source)
- `@JsonSerialize` : exemple `@JsonSerialize(using = UpperCaseSerializer.class)`
- `@JsonDeserialize` : exemple `@JsonDeserialize(using = CustomDateDeserializer.class)` pour un formatage de date par exemple
- `@JsonInclude(JsonInclude.Include.NON_NULL)` exclure les champs null du json
