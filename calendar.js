

console.log("Hello!");

var moment = require('moment');
require('moment/locale/cs')

var date = moment("2017-01-01");

console.log(date.weekday())

String.prototype.capitalize = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
}


var week = ""
var startweekday = date.weekday()

date.add(-startweekday, 'days')

var namedays = require('./namedays.json')
console.log(namedays)

for(var day = 0 ; day < 365+startweekday; day++ )
{
	if ( day % 7 == 0 ) {
		console.log("=== Week " + date.week().toString())
	}
	var dayofweek = date.weekday()
	nameday = namedays[date.format('D.M.')]
	week += dayofweek.toString()
	var output = date.format('D.M. dddd').capitalize()
	if ( nameday != undefined) output += " " + nameday
	console.log(output)
	if ( dayofweek == 6 ) 
	{
		console.log(week)
		week = ""
	}
	date.add(1, 'days')
}

if ( dayofweek != 0 ) console.log(week)
