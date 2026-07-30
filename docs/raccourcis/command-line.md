---
title: Command Line
---

## Navigation

```bash
cd dossier            # change directory → change de dossier
cd ..                 # parent directory → remonte au dossier parent
cd -                  # previous directory → retourne au dossier précédent
cd ~                  # home → retourne au dossier personnel
pwd                   # print working directory → affiche le chemin courant
ls                    # list → affiche les fichiers/dossiers
ls -l                 # long listing → affichage détaillé
ls -a                 # all → affiche aussi les fichiers cachés
ls -R                 # recursive → affiche récursivement
tree                  # affiche l’arborescence des dossiers
```

## Manipulation de fichiers

```bash
cp fichier dossier/   # copy → copie un fichier
cp -r dossier cible/  # recursive copy → copie un dossier récursivement
mv a b                # move → déplace ou renomme
cat fichier.txt       # concatenate → affiche/fusionne des fichiers
head fichier.txt      # affiche les 10 premières lignes
head -n 20 fichier    # affiche les 20 premières lignes
tail fichier.txt      # affiche les 10 dernières lignes
tail -n 50 fichier    # affiche les 50 dernières lignes
tail -f app.log       # follow → suit un fichier en temps réel
nano fichier.txt      # éditeur de texte terminal
chmod +x script.sh    # change mode → rend exécutable
./script.sh           # exécute un fichier exécutable
```

## Recherche

```bash
find . -name "*.txt"  # cherche des fichiers par nom
find . -type d        # cherche uniquement des dossiers
grep "mot" fichier    # recherche du texte
grep -i "mot" fich    # ignore la casse
grep -r "mot" .       # recherche récursive
grep -l "mot" *       # affiche seulement les noms de fichiers
man grep              # manual → affiche la documentation
```

## Lecture / affichage

```bash
less fichier.txt      # lecture page par page
clear                 # nettoie le terminal
cal                   # calendar → affiche le calendrier du mois
cal 2026              # affiche le calendrier de l’année
Processus

```bash
ps                    # process status → liste les processus
ps aux                # liste tous les processus détaillés
kill 1234             # termine le processus PID 1234
kill -9 1234          # force l’arrêt du processus
kill -l               # liste les signaux disponibles
```

## Redirections et pipes

```bash
commande > fichier    # stdout → écrit la sortie dans un fichier
commande 2> erreurs   # stderr → écrit les erreurs dans un fichier
commande < fichier    # stdin → lit depuis un fichier
cmd1 | cmd2           # pipe → envoie la sortie vers une autre commande
2>/dev/null           # ignore les erreurs
```

## Exécution avancée

```bash
commande1 ; commande2 # exécute les commandes à la suite
commande &            # lance en arrière-plan
xargs commande        # transforme stdin en arguments
```

## Wildcards / Jokers

```bash
*                     # remplace n’importe quelle suite de caractères
?                     # remplace un seul caractère
~                     # raccourci du dossier personnel
```

## Exemples très utiles

```bash
grep -r "TODO" src/                # cherche TODO dans src
find . -name "*.log"               # cherche tous les logs
tail -f app.log                    # regarde les logs en direct
ps aux | grep java                 # cherche les processus Java
find . -name "*.tmp" | xargs rm    # supprime tous les .tmp
grep -riv "PAY" . | wc -l          # compte les lignes sans PAY
du -h /var/log                     # taille d'un dossier DiskUsage Human-readable -h en giga sinon octets
```
