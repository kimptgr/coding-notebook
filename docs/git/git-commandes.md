title: Commandes git utiles
---

`git stash push -m "before refacto"` //enregistre un stash
`git stash push -m "after test refacto"`
`git stash list` //lister les stashes
`git stash pop stash@{1}` //Appliquer et supprimer != apply
`git stash drop stash@{0}` //supprime le plus récent

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