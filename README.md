# Image compteur (exemple)

Serveur minimal Node.js + Express qui incrémente un compteur à chaque accès à `/image`.

Utilisation:

1. Installer les dépendances:

```bash
cd /workspaces/Test
npm install
```

2. (Optionnel) Placer votre image `cat.jpg` à la racine du projet (`/workspaces/Test/cat.jpg`). Si elle n'existe pas, un petit png transparent sera renvoyé.

3. Lancer le serveur:

```bash
npm start
```

4. Ouvrir `http://localhost:3000` dans le navigateur et cliquer sur "Charger l'image". La console du navigateur affichera le nombre de vues retourné par l'en-tête `X-View-Count`.

Notes:
- L'accès direct à une image via une balise `<img src="/image">` ne permet pas de lire les en-têtes HTTP de la réponse. C'est pour cela que la page cliente utilise `fetch('/image')` pour lire l'en-tête `X-View-Count` puis crée un objet Blob pour afficher l'image.
- Le compteur est stocké dans `count.json` (persistant sur disque).
