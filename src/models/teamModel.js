const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test', {useNewUrlParser: true});

var teamSchema = new mongoose.Schema({
  name: String,
  inscrit: String,
  consommation: String,
  tendance: String,
  points: String
});

module.exports = mongoose.model('teams', teamSchema);
