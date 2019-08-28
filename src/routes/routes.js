// Import des différents modules
var express = require('express');
let querystring = require('querystring');
var bodyParser = require('body-parser');
// let request = require('request');

// Instanciation d'express via la variable 'app'
var app = express();

// moteur de rendu / extension de rendu => ejs
app.set('views','./views');
app.set('view engine', 'ejs');

// Utilisation du dossier 'public' ou se trouvera les fichiers communs (images,css,js)
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
let consoLastDay=[

    {
        injection: 0,
        soutirage: 300,
        autoconso: 0,
        heure:"02:00"
    },
    {
        injection: 0,
        soutirage: 600,
        autoconso: 0,
        heure:"04:00"
    },
    {
        injection: 0,
        soutirage: 800,
        autoconso: 0,
        heure:"06:00"
    },
    {
        injection: 0,
        soutirage: 800,
        autoconso: 1100,
        heure:"08:00"
    },
    {
        injection: 800,
        soutirage: 0,
        autoconso: 400,
        heure:"10:00"
    },
    {
        injection: 1200,
        soutirage: 0,
        autoconso: 600,
        heure:"12:00"
    },
    {
        injection: 1400,
        soutirage: 0,
        autoconso: 200,
        heure:"14:00"
    },
    {
        injection: 1400,
        soutirage: 0,
        autoconso: 800,
        heure:"16:00"
    },
    {
        injection: 0,
        soutirage: 800,
        autoconso: 400,
        heure:"18:00"
    },
    {
        injection: 0,
        soutirage: 1600,
        autoconso: 0,
        heure:"20:00"
    },
    {
        injection: 0,
        soutirage: 1000,
        autoconso: 0,
        heure:"22:00"
    },
    {
        injection: 0,
        soutirage: 100,
        autoconso: 0,
        heure:"00:00"
    }
]
let consoValue=[

    {
        injection: 0,
        soutirage: 500,
        autoconso: 0,
        heure:"02:00"
    },
    {
        injection: 0,
        soutirage: 500,
        autoconso: 0,
        heure:"04:00"
    },
    {
        injection: 0,
        soutirage: 1000,
        autoconso: 0,
        heure:"06:00"
    },
    {
        injection: 21,
        soutirage: 5,
        autoconso: 4,
        heure:"08:00"
    },
    {
        injection: 13,
        soutirage: 8,
        autoconso: 2,
        heure:"10:00"
    },
    {
        injection: 19,
        soutirage: 0,
        autoconso: 8,
        heure:"12:00"
    },
    {
        injection: 19,
        soutirage: 0,
        autoconso: 4,
        heure:"14:00"
    },
    {
        injection: 4,
        soutirage: 0,
        autoconso: 14,
        heure:"16:00"
    },
    {
        injection: 0,
        soutirage: 11,
        autoconso: 4,
        heure:"18:00"
    },
    {
        injection: 0,
        soutirage: 15,
        autoconso: 0,
        heure:"20:00"
    },
    {
        injection: 0,
        soutirage: 7,
        autoconso: 0,
        heure:"22:00"
    },
    {
        injection: 0,
        soutirage: 1,
        autoconso: 0,
        heure:"00:00"
    }
]
// l'appel de la page racine (127.0.0.1:8080) affichera la page login(.ejs)
app.get('/', function(req, res) {
    res.render('dashboard',{consommations: consoValue, lastconso: consoLastDay });
})

app.listen(8080);