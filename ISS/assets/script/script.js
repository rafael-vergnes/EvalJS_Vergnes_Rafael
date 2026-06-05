/***************
  MAP LEAFLET
***************/

// Installation de la map
const map = L.map('map').setView([0, 0], 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 5,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/*******************
  SUIVI ISS
*******************/

// Création d'une icone ISS
const ISS_ICON = L.icon({
    iconUrl: "./assets/img/international-space-station-icon.png",
    iconSize: [38, 95],
    iconAnchor: [22, 94]
});

// Mise en place du markeur avec l'icone ISS
const marker = L.marker([0, 0], {icon: ISS_ICON}).addTo(map);

// On crée la fonction : suivi en temps réel de l'ISS via une API
async function issAPI (carte, marqueur) {
    try {
        // On récupère toutes les données de l'api
        const coordonnees = await fetch('http://api.open-notify.org/iss-now.json');
        console.log('Coordonnées', coordonnees);

        if (!coordonnees.ok || coordonnees.status !== 200) {
            console.error('Erreur lors de la récupération des données :', coordonnees.statusText);
            return;
        }

        // On transforme la réponse en objet JS
        const coordonneesTransformed = await coordonnees.json();
        console.log('coordonneesTransformed', coordonneesTransformed);
        console.log(coordonneesTransformed.iss_position.latitude);
        console.log(coordonneesTransformed.iss_position.longitude);

        // On change la vue de map sur les coordonnées de l'ISS
        map.setView([coordonneesTransformed.iss_position.latitude, coordonneesTransformed.iss_position.longitude], 5);
        
        // On change la position du marker sur les coordonnées de l'ISS
        marker.setLatLng([coordonneesTransformed.iss_position.latitude, coordonneesTransformed.iss_position.longitude]);

    // Gestion des erreurs
    } catch (error) {
        console.error("Erreur lors de l'appel à l'API :", error);
    }
}

// On appelle la fonction avec un intervale de 1 seconde
setInterval(issAPI, 1000, map, marker);

/***************
  METEO LOCALE
***************/
// On crée un paragraphe
let para = document.createElement("p");

// On le stylise
para.style.height = "300px";
para.style.width = "200px";
para.style.margin = "16px 0px";
para.style.border = "3px solid gray";
para.style.padding = "16px 12px 24px 12px";

// On sélectionne les éléments pour placer notre paragraphe où l'on souhaite
let theCardMeteo = document.querySelector("article");
let theBouton = document.querySelector("button");
theBouton.insertAdjacentElement('beforebegin', para);

// On crée la fonction : météo via une API
function addInfo (html, texte) {
  theBouton.addEventListener("click", async function (clickEvent) {
    try {
        // On récupère toutes les données de l'api
        const infosMeteo = await fetch('https://prevision-meteo.ch/services/json/toulouse');
        console.log('Meteo', infosMeteo);

        if (!infosMeteo.ok || infosMeteo.status !== 200) {
            console.error('Erreur lors de la récupération des données :', infosMeteo.statusText);
            return;
        }

        // On transforme la réponse en objet JS
        const infosMeteoTransformed = await infosMeteo.json();
        console.log('MeteoTransformed', infosMeteoTransformed);

        // On sélectionne les informations que l'on souhaite
        console.log(infosMeteoTransformed.fcst_day_0.condition);
        console.log(infosMeteoTransformed.current_condition.tmp);
        console.log(infosMeteoTransformed.fcst_day_0.tmax);
        console.log(infosMeteoTransformed.fcst_day_0.tmin);

        // On les range des dans variables pour les manipuler plus facilement
        let conditionM = infosMeteoTransformed.fcst_day_0.condition;
        let temp = infosMeteoTransformed.current_condition.tmp;
        let tempMax = infosMeteoTransformed.fcst_day_0.tmax;
        let tempMin = infosMeteoTransformed.fcst_day_0.tmin;

        // On écrit le texte de la météo avec nos variables contenant nos infos
        texte = `Aujourd'hui le temps est : ${conditionM}, et la température est de ${temp}°C
        T° Max = ${tempMax}°C - T° Min = ${tempMin}°C`;

        // On met le texte dans notre paragraphe
        para.append(texte);

    // Gestion des erreurs
    } catch (error) {
        console.error("Erreur lors de l'appel à l'API :", error);
    }
  });
}

// On appelle la fonction
addInfo(para, para.innerText);
