title: Commandes git utiles
---

```bash
git stash push -m "before refacto" //enregistre un stash
git stash push -m "after test refacto"
git stash list //lister les stashes
git stash pop stash@{1} //Appliquer et supprimer != apply
git stash drop stash@{0} //supprime le plus récent
```

```bash
git checkout master
git pull origin master

git checkout develop
git pull origin develop

git checkout master
git merge develop

git push origin master

git checkout develop
git merge MAJ-44

git push origin develop
```

Modifier le dernier commit :
- seulement les fichiers
`git commit --amend --no-edit`
- modifier le messages
`git commit --amend -m "Nouveau message de commit"`

# Renommer branche
```bash
git branch -m nouveau_nom // en étant sur la bonne branche ou 
git branch -m ancien_nom nouveau_nom
git branch // vérifier les changements
git push origin --delete ancien_nom 
git push origin -u nouveau_nom
```