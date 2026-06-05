Consignes d'évaluation JavaScript :

EVALUATION JAVASCRIPT – Suivi de l’ISS

Table des matiËres
INSCRIPTION DE JOUEURS EN BASE DE DONNEES .................................................................................. 1
OBJECTIFS PEDAGOGIQUES ..................................................................................................................... 1
CONTEXTE ................................................................................................................................................ 2
LIVRABLES ................................................................................................................................................ 2
CRITERES D’EVALUATIONS ....................................................................................................................... 3
Fichiers fournis ........................................................................................................................................ 4
Tâches à effectuer : mise en place de LEAFLET ....................................................................................... 4
Tâches à effectuer : Suivi de l’ISS ............................................................................................................. 4
Tâches à effectuer : Météo Locale ........................................................................................................... 5
RESULTAT ATTENDU ................................................................................................................................. 6

OBJECTIFS PEDAGOGIQUES
• Être capable de d’interagir avec des éléments HTML du DOM en Javascript
• Être capable de rendre une page interactive grâce aux évènements
• Être capable d’intégrer et utiliser des bibliothèques Javascript
• Être capable d’interagir avec des appels API de manière asynchrone (async, await)

CONTEXTE
Vous travaillez comme développeur Front-End au CNES, le Centre National d’Etude Spatial. Dans le
cadre d’une collaboration européenne sur un projet incluant l’ISS, votre chef d’équipe vous demande
de concevoir une interface permettant de suivre les déplacements en quasi-temps réel de la Station
Spatial Internationale. Cette interface devra aussi être en mesure d’afficher la météo locale de
l’utilisateur.
Pour ce faire, vous aurez plusieurs choses à mettre en place :
- Mettre en place une carte interactive grâce à la library Leaflet
- Récupérer les coordonnées GPS de la station ISS toutes les secondes grâce à l’API
http://open-notify.org/Open-Notify-API/ISS-Location-Now/ et afficher le marker de l’ISS sur
la carte
- Récupérer la météo locale avec l’API https://prevision-meteo.ch/services/json/toulouse et
l’afficher sur l’interface
A vous de jouer pour développer les fonctionnalités demandées.
LIVRABLES
Une fois terminé, vous devrez envoyer un dépôt github, public, contenant l’ensemble de votre projet
en respectant la nomenclature : EvalJS_NomPrenom. Le lien de ce dépôt sera envoyé par MP à votre
formateur.

CRITERES D’EVALUATIONS
Propreté du code, indentation et commentaire 5
Respect des Consignes 5
Création et manipulation de variables (let, const) et fonction 10
Manipulation du DOM 15
Mise en place d’écouteurs d’évènement 15
Interroger une API avec Fetch + Gestion d’Erreur 15
Exploiter la réponse d’une API 15
Installation d’une Librairie 10
Exploitation des fonctionnalités d’une Librairie 10
TOTAL 100

Fichiers fournis
• Le script Javascript à compléter
• Le fichier HTML correspondant à ce qui a déjà été mis en place
• Le fichier CSS mettant en forme l’interface
• Une image montrant la structure du projet
• Une image qui servira de marker pour l’ISS
• Une archive zip contenant les fichiers ci-dessus

Tâches à effectuer : mise en place de LEAFLET
1) Installer la librairie Leaflet : https://leafletjs.com/
La suite sera faite au sein du fichier script.js :
1) Mettez en place une carte qui sera conservée dans une constante MAP. La vue sera centrée
sur les coordonnées : Latitude 0 – Longitude 0, et avec un niveau de zoom : 5
2) Ajoutez à la carte les tuiles provenant de OpenStreetMap
3) Créez une constante ISS_ICON à laquelle vous assignerez la création d’une icône pour un
marker de carte. L’icon aura les propriétés suivantes :
- iconUrl : le lien relatif vers l’icône de l’ISS
- iconSize : [50,50]
- iconAnchor : [22,94]
4) Assignez dans une constante MARKER l’ajout du marker à la map. (const MARKER = ce qu’il
faut faire pour ajouter le marker à la carte)
Tâches à effectuer : Suivi de l’ISS
1) Définissez une fonction issAPI qui prend en paramètre une map et un marker.
2) Dans cette fonction, faites en sorte de :
- récupérer la latitude et la longitude de l’ISS en interrogeant l’API http://api.opennotify.org/iss-now.json
- redéfinir la View de la map sur les coordonnées récupérées (le niveau de zoom sera
conservé)
- redéfinir la position du marker avec les coordonnées récupérées (setLatLng)
- ne pas oublier de gérer les erreurs en les affichant en console avec un catch()
3) Mettez en place un setInterval qui va appeler la fonction issAPI() tous les 1000ms. Vous
donnerez en entrée de la fonction les constantes MAP et MARKER

Tâches à effectuer : Météo Locale
1) Uniquement en utilisant du Javascript, créez un élément paragraphe (p). Donnez à cet
élément les propriétés CSS suivantes (sans modifier le fichier css, toujours en utilisant
uniquement du javascript) :
- une hauteur de 300px
- une largeur de 200px
- un margin en haut et en bas de 16px
- un border de 3px, solid, en gris
- un padding en haut de 16px, à droite et à gauche de 12px, et en bas de 24px
2) Insérez ce paragraphe dans la balise article possédant la classe cardMeteo, avant le bouton
3) Créez une fonction addInfo() qui prend un élément html et un text en paramètre, et va remplir
le contenu de l’élément html avec le text
4) Faite en sorte que lorsqu'on clique (event click) sur le bouton charger, cela interroge l'API
météo ("https://prevision-meteo.ch/services/json/toulouse") et nous affiche les informations
météos suivantes :
- La condition actuelle
- La température actuelle
- La température maximum du jour 0
- La température minimum du jour 0
NOTE : vous afficherez les informations dans le paragraphe précédemment créé en appelant la
fonction addInfo(). Si vous n'avez pas réussi à la créer et la placer, affichez les informations dans un
console.log
