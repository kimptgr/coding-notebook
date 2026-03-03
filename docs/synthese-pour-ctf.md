---
title: Techniques pour CTF
---


### 1. Cryptographie et Encodage

* **Identification et décodage de formats standards :** Utilisation fréquente de **CyberChef** pour identifier et décoder des formats comme le **Base32**, le **Base58** (utilisé pour les adresses Bitcoin) ou le **Base64**.
* **Analyse de Hashs :** Emploi d'outils comme `hash-identifier` ou des sites comme `hashcat.net` pour déterminer le type d'algorithme (MD5, SHA512, NTLM).
* **Brute-force :** Utilisation massive de **hashcat** ou **John the Ripper** avec la célèbre wordlist **rockyou.txt** pour casser des mots de passe ou des hashs réseau (Kerberos, NTLMv1/v2).
* **Scripts personnalisés :** Développement de scripts **Python** (utilisant souvent la bibliothèque `pycryptodome`) pour déchiffrer des algorithmes spécifiques comme le **ChaCha20** ou pour automatiser des attaques de type **Vigenère**.
* **Attaques spécialisées :** Emploi de `RsaCtfTool` pour casser des certificats de protection basés sur le nombre RSA.

### 2. Analyse Réseau (Forensic & Network)

* **Analyse de trafic avec Wireshark :**
  * Recherche de chaînes de caractères en clair (comme un flag "ENI{") dans des protocoles non sécurisés tels que **FTP**.
  * Extraction d'objets (images, pages HTML, fichiers ZIP ou archives RAR) via les menus d'exportation HTTP ou SMB.
  * Analyse de protocoles d'authentification (NTLM, Kerberos AS-REQ/AS-REP) pour extraire des hashs de session.
* **Analyse de systèmes Windows :** Utilisation de **Mimikatz** pour analyser des dumps de processus (**LSASS**) ou des ruches de registre (**SAM, SECURITY, SYSTEM**) afin de récupérer des mots de passe en clair ou des hashs NTLM.
* **Flux de données alternatifs (ADS) :** Extraction de fichiers cachés dans les *Alternate Data Streams* de fichiers Windows via la commande `dir /r` et `expand`.

### 3. Stéganographie (Données cachées)

* **Extraction d'images et fichiers :** Utilisation d'outils comme `steghide` ou `stegcracker` pour extraire des informations dissimulées derrière une passphrase.
* **Analyse de fichiers texte :** Détection de messages cachés dans les espaces et tabulations (caractères invisibles) avec l'outil `StegSnow`.
* **Réparation de fichiers :** Utilisation d'éditeurs hexadécimaux (**HexEdit**) pour corriger des en-têtes (headers) de fichiers corrompus (par exemple, un header JPEG erroné).
* **Inspection visuelle et métadonnées :** Recherche d'indices dans les commentaires du code source d'une page web ou dans les propriétés d'un fichier multimédia.

### 4. Web et Programmation

* **Exploitation de vulnérabilités :**
* **Injections SQL :** Contournement de l'authentification en injectant des commandes comme `' AND 1=1 --`.
* **Remote Code Execution (RCE) :** Exploitation d'injections de modèles côté serveur (**SSTI**) sur des applications Python Flask (Jinja2) pour lire des fichiers de configuration ou exécuter des commandes système.
* **Reconnaissance et énumération :** Utilisation de `Wappalyzer` pour identifier les technologies d'un site, ou recherche de fichiers sensibles comme `phpinfo.php` pour trouver des variables d'environnement (mots de passe de base de données).
* **Automatisation (Web Scraping) :** Utilisation de scripts Python (`requests`, `BeautifulSoup`) pour tester automatiquement des milliers de combinaisons d'ingrédients sur une page web.

### 5. OSINT (Recherche en sources ouvertes)

* **Recherche d'images inversée :** Emploi de **Google Lens**
* **Collecte d'informations :** Utilisation de **Wikipédia**
* **Génération de wordlists :** Utilisation de l'outil `CEWL` pour créer un dictionnaire de mots-clés à partir du contenu d'un site web spécifique afin de faciliter le brute-force.
* **Guessing logique :** Suivi d'un parcours sémantique à travers des liens Wikipédia (paragraphe X, mot Y) pour aboutir à une réponse finale.
