const fs = require('fs');

var outfilename = 'output.tex'

var arrange_template = 'templates/template-page-left.tex';
var arrange_text_pos = 132;
var arrange_photo_pos = 67;
var arrange_week_header_command = 'Right{15mm}'

var moment = require('moment');
require('moment/locale/cs')

var namedays = require('./namedays.json')
var photos = require('./photos.json')

function set_output_left() {
	arrange_template = 'templates/template-page-left.tex';
	arrange_text_pos = 132;
	arrange_photo_pos = 67;
	arrange_week_header_command = 'Right{15mm}'
}

function set_output_right() {
	arrange_template = 'templates/template-page-right.tex';
	arrange_text_pos = 25;
	arrange_photo_pos = 143;
	arrange_week_header_command = 'Left{195mm}'
}

function output_template() {
	file = fs.readFileSync(arrange_template, {encoding: 'utf8'})
	fs.appendFileSync(outfilename, file)
}

function output_week_header( week ) {
	var date = get_week( week );
	var month = date.format('MMMM Y');
	var week_num = date.week();
	date.add(6, 'days')
	if ( month != date.format('MMMM Y') ) month += ' / ' + date.format('MMMM Y')
	var header = '\\PlaceText' + arrange_week_header_command + '{18mm}{' + month + ' / ' + week_num + '. týden}'
	fs.appendFileSync(outfilename, header)
}

function output_day( day, dayofweek ) {
	var offset = 27 + 17 * dayofweek
	var date = '\\PlaceText{' + arrange_text_pos + 'mm}{' + offset + 'mm}{\\huge{' + day + '}}\n'
	fs.appendFileSync(outfilename, date)
}

function output_name( name, dayofweek ) {
	var offset = 31 + 17 * dayofweek
	var name = '\\PlaceText{' + arrange_text_pos + 'mm}{' + offset + 'mm}{\\emph{\\tiny{' + name + '}}}\n'
	fs.appendFileSync(outfilename, name) 
}

function output_photo( photo ) {
	fs.appendFileSync(outfilename, '\\begin{tikzpicture}[remember picture,overlay]')
	fs.appendFileSync(outfilename, '  \\node[outer sep=0pt,inner sep=0pt,anchor=north]')
	fs.appendFileSync(outfilename, '    at ([xshift=' + arrange_photo_pos + 'mm,yshift=-26mm]current page.north west)')
	fs.appendFileSync(outfilename, '    {\\includegraphics[max width=104mm, max height=104mm]{' + photo + '}};')
	fs.appendFileSync(outfilename, '\\end{tikzpicture}')
}


function output_new_page() {
	fs.appendFileSync(outfilename, '\\newpage')
}

function get_week( week ) {
	var date = moment("2017-01-01");
	var startweekday = date.weekday()
	date.add(-startweekday + week*7, 'days')
	return date
}

function output_week( week ) {
	var date = get_week( week );

	output_template()
	output_week_header( week )
	photo = photos[(week+1).toString()]
	if ( photo != undefined ) output_photo(photo)
	console.log("=== Week " + date.week().toString())
	for(var day = 0 ; day < 7; day++ )
	{
		output_day(date.format('D'), day % 7)
		nameday = namedays[date.format('D.M.')]
		if ( nameday != undefined) output_name(nameday, day % 7)
		date.add(1, 'days')
	}
	output_new_page()
}


file = fs.readFileSync('templates/template-header.tex', {encoding: 'utf8'})
fs.writeFileSync(outfilename, file)

date = get_week( 0 );
if ( date.week() == 52 ) {
	set_output_right();
	output_week( 52 );
}

for ( var week = 0; week < 26; week+=2 ) {
	set_output_left();
	output_week( week );
	output_week( week+1 );
	set_output_right();
	output_week( 51-week );
	output_week( 51-week-1 );
}



file = fs.readFileSync('templates/template-footer.tex', {encoding: 'utf8'})
fs.appendFileSync(outfilename, file)
