const mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/test', {useNewUrlParser: true});

var consoSchema = new mongoose.Schema({
  measurement: String,
  fields: {
    inject: Number, //en W, injection (surplus) vers le réseau ENEDIS mesuré par LINKY
    soutir: Number, //en W, soutirage du réseau ENEDIS mesuré par LINKY
    prod: Number, //en W, production photovoltaique mesurée par un compteur à impulsion de l'onduleur
    autoconso: Number, //en W, autoconsommation calculée par différence autoconso =  prod - inject
    inj_sout: Number, //en W, résultante inject-soutir vue du site (le soutirage apparait négatif)
    consoCALC: Number, //en W, consommation totale calculé par somme : prod - inject ou soutir selon prod >0 ou prod = 0
    consoIMP: Number //en W, consommation mesurée par un compteur à impulsion dans le tableau électrique
  },
  tags: {
    pseudo: String,
    timestamp: String
  }, //pseudo de l'utilisateur, référence du compteur
  timestamp: Number
});

module.exports = mongoose.model('consos', consoSchema);
