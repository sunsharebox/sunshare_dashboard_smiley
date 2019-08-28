const mongoose = require('mongoose');
var consoModel = require('../models/consoModel.js');
var teamModel = require('../models/teamModel.js');

exports.index = function(req, res) {
	Promise.all([getConsoCumulToday(), getConsoPerHoursToday(), getEvolution()]).then(function(data) {
		console.log(data);
		//res.render('dashboard', {consoCumul: data[0], consoHours: data[1], consoEvol: data[2]});
	});
};

exports.teams = function(req, res) {
	getAllTeams().then(function(teams) {
		console.log(teams);
		res.render('team', {teams: teams});
	});
};

function getConsoCumulToday() {
	var today = new Date().getTime().toString().substr(0, 5);
	
	return new Promise((resolve, reject) => {
		consoModel.aggregate([
		   { $match: { "tags.timestamp": new RegExp('^' + today) } },
		   { $group: { _id: "consommation", 
			   tot_inject: { $sum: "$fields.inject" }, 
			   tot_soutir: { $sum: "$fields.soutir" },
			   tot_autoconso: { $sum: "$fields.autoconso" },
			   tot_prod: { $sum: "$fields.prod" }
			    } }
		], function(err, result) {
			resolve(result);
		});
	})
}

function getConsoPerHoursToday() {
	var today = new Date().getTime().toString().substr(0, 5);
	return new Promise(function(resolve, reject) {
		listConsoToday(today).then(function(data) {
			 resolve(createTabPerHours(data));
		})
	});
}

function getEvolution() {
	var today = new Date().getTime().toString().substr(0, 5);
	
	return new Promise(function(resolve, reject) {
		listConsoToday(today).then(function(dataJ) {
			 listConsoToday(today-1).then(function(dataJ1) {
				 var tendance = [];
				 for (var i = 0, len = dataJ.length; i < len; i++) {
					 if(!dataJ[i].fields.prod || !dataJ1[i].fields.prod) {
						 tendance[i] = {evol: 0}
					 } else { 
						 if(dataJ[i].fields.prod > dataJ1[i].fields.prod) {
							 tendance[i] = {evol: 1}
						 } else if(dataJ[i].fields.prod < dataJ1[i].fields.prod) {
							 tendance[i] = {evol: -1}
						 } else {
							 tendance[i] = {evol: 0}
						 }
					 }
				 }
				 console.log(tendance);
				 resolve(tendance);
			 });
		});
	});
}

function listConsoToday(today) {
	return new Promise((resolve, reject) => {
		consoModel.find({ "tags.timestamp": new RegExp('^' + today) }, function(err, result) {
			resolve(result);
		});
	})
}

function createTabPerHours(array) {
	var hours = new Date(array[0].timestamp).getHours()
	var tabHours = [];
	var reccurent = 1;
	
	for (var i = 0, len = array.length; i < len; i++) {
		var currHours = new Date(array[i].timestamp).getHours();
		
		if(currHours == hours) {
			
			if(reccurent > 1 ) {
				tabHours[currHours] = {
					inject: (tabHours[currHours].inject + array[i].fields.inject)/reccurent,
					soutir: (tabHours[currHours].soutir + array[i].fields.soutir)/reccurent,
					autoconso: (tabHours[currHours].autoconso + array[i].fields.autoconso)/reccurent,
					prod: (tabHours[currHours].prod + array[i].fields.prod)/reccurent
				}
			} else {
				tabHours[currHours] = {
					inject: array[i].fields.inject,
					soutir: array[i].fields.soutir,
					autoconso: array[i].fields.autoconso,
					prod: array[i].fields.prod
				}
			}
		
			reccurent++;
		} else {
			hours = currHours;
			reccurent = 1;
			
			tabHours[currHours] = {
				inject: array[i].fields.inject,
				soutir: array[i].fields.soutir,
				autoconso: array[i].fields.autoconso,
				prod: array[i].fields.prod
			}
		}
	}
	
	return tabHours;
}

function getAllTeams() {
	return new Promise(function(resolve, reject) {
		teamModel.find({}, function(err, result) {
			resolve(result);
		});
	});
}
