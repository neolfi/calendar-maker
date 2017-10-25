const fs = require('fs');

var outfilename = 'output.tex'

file = fs.readFileSync('templates/template-header.tex', {encoding: 'utf8'})
fs.writeFileSync(outfilename, file)

function output_left() {
	file = fs.readFileSync('templates/template-page-left.tex', {encoding: 'utf8'})
	fs.appendFileSync(outfilename, file)
}

function output_day( day, dayofweek ) {
	var offset = 27 + 17 * dayofweek
	var date = '\\PlaceText{132mm}{' + offset + 'mm}{\\huge{' + day + '}}\n'
	fs.appendFileSync(outfilename, date)
}

function output_name( name, dayofweek ) {
	var offset = 31 + 17 * dayofweek
	var name = '\\PlaceText{132mm}{' + offset + 'mm}{\\emph{\\tiny{' + name + '}}}\n'
	fs.appendFileSync(outfilename, name) 
}

function output_photo( photo ) {
	fs.appendFileSync(outfilename, '\\begin{tikzpicture}[remember picture,overlay]')
	fs.appendFileSync(outfilename, '  \\node[outer sep=0pt,inner sep=0pt,anchor=north]')
	fs.appendFileSync(outfilename, '    at ([xshift=67mm,yshift=-26mm]current page.north west)')
	fs.appendFileSync(outfilename, '    {\\includegraphics[max width=104mm, max height=104mm]{' + photo + '}};')
	fs.appendFileSync(outfilename, '\\end{tikzpicture}')
}

function output_new_page() {
	fs.appendFileSync(outfilename, '\\newpage')
}

var moment = require('moment');
require('moment/locale/cs')

var date = moment("2017-01-01");

var startweekday = date.weekday()

date.add(-startweekday, 'days')

var namedays = require('./namedays.json')
var photos = require('./photos.json')

for(var day = 0 ; day < 14+startweekday; day++ )
{
	var dayofweek = date.weekday()
	if ( day % 7 == 0 ) {
		output_left()
		photo = photos[date.week().toString()]
		if ( photo != undefined ) output_photo(photo)
		console.log("=== Week " + date.week().toString())
	}
	output_day(date.format('D'), day % 7)
	nameday = namedays[date.format('D.M.')]
	if ( nameday != undefined) output_name(nameday, day % 7)
	if ( dayofweek == 6 ) 
	{
		output_new_page()
	}
	date.add(1, 'days')
}


file = fs.readFileSync('templates/template-footer.tex', {encoding: 'utf8'})
fs.appendFileSync(outfilename, file)
