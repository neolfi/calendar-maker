const fs = require('fs');

var install_path = __dirname
var run_path = process.cwd()

var outfilename = run_path + '/output/output.tex'

var arrange_template = install_path + '/templates/template-page-left.tex';
var arrange_text_pos = 132;
var arrange_msg_pos = 143;
var arrange_holidays_text_pos = 194;
var arrange_photo_pos = 67;
var arrange_week_header_command = 'Right{15mm}'
var arrange_color = ''

var moment = require('moment');
require('moment/locale/cs')

var config = require(run_path + '/config.json')
var namedays = require(install_path + '/locales/' + config['locale'] + '/namedays.json')
var days = require(install_path + '/locales/' + config['locale'] + '/days.json')
var holidays = require(install_path + '/locales/' + config['locale'] + '/holidays.json')
var born = require(run_path + '/born.json')
var died = require(run_path + '/died.json')
var message = require(run_path + '/message.json')

function set_output_left() {
	arrange_template = install_path + '/templates/template-page-left.tex';
	arrange_text_pos = 132;
	arrange_msg_pos = 143;
	arrange_holidays_text_pos = 194;
	arrange_photo_pos = 67;
	arrange_week_header_command = 'Right{15mm}'
}

function set_output_right() {
	arrange_template = install_path + '/templates/template-page-right.tex';
	arrange_text_pos = 25;
	arrange_msg_pos = 36;
	arrange_holidays_text_pos = 87;
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

function set_color( text ) {
	if ( arrange_color != '' ) return '\\textcolor{' + arrange_color + '}{' + text + '}'
	else return text
}

function output_day_name( dayofweek ) {
	var offset = 20 + 17 * dayofweek
	var color_day_name = set_color(days[dayofweek.toString()])
	var name = '\\PlaceText{' + arrange_text_pos + 'mm}{' + offset + 'mm}{\\small{' + color_day_name + '}}\n'
	fs.appendFileSync(outfilename, name)
}

function output_day( day, dayofweek ) {
	var offset = 27 + 17 * dayofweek
	var color_day = set_color(day)
	var date = '\\PlaceText{' + arrange_text_pos + 'mm}{' + offset + 'mm}{\\huge{' + color_day + '}}\n'
	fs.appendFileSync(outfilename, date)
}

function output_name( name, dayofweek ) {
	var offset = 31 + 17 * dayofweek
	var color_name = set_color(name)
	var name = '\\PlaceText{' + arrange_text_pos + 'mm}{' + offset + 'mm}{\\emph{\\tiny{' + color_name + '}}}\n'
	fs.appendFileSync(outfilename, name) 
}

function output_born( date, dayofweek ) {
	var born_list = born[date.format('D.M.')]
	if ( born_list == undefined ) return
	var offset = 20 + 17 * dayofweek
	var text = '\\PlaceTextRight{' + arrange_msg_pos + 'mm}{' + offset + 'mm}{\\textcolor{red}{\\small{*' + born_list + '}}}\n'
	fs.appendFileSync(outfilename, text) 
}

function output_died( date, dayofweek ) {
	var died_list = died[date.format('D.M.')]
	if ( died_list == undefined ) return
	var offset = 24 + 17 * dayofweek
	var text = '\\PlaceTextRight{' + arrange_msg_pos + 'mm}{' + offset + 'mm}{\\small{\\textdagger ' + died_list + '}}\n'
	fs.appendFileSync(outfilename, text) 
}

function output_message( date, dayofweek ) {
	var message_text = message[date.format('D.M.')]
	if ( message_text == undefined ) return
	var offset = 31 + 17 * dayofweek
	var text = '\\PlaceTextRight{' + arrange_msg_pos + 'mm}{' + offset + 'mm}{\\small{' + message_text + '}}\n'
	fs.appendFileSync(outfilename, text) 
}

function output_holidays_text( holidays_text, dayofweek ) {
	var offset = 31 + 17 * dayofweek
	var color_holidays_text = set_color(holidays_text)
	var text = '\\PlaceTextLeft{' + arrange_holidays_text_pos + 'mm}{' + offset + 'mm}{\\emph{\\tiny{' + color_holidays_text + '}}}\n'
	fs.appendFileSync(outfilename, text) 
}

function output_month_name( date, dayofweek ) {
	if ( date.format('D') != '1' ) return
	var offset = 20 + 17 * dayofweek
	var month_name = date.format('MMMM')
	var text = '\\PlaceTextLeft{' + arrange_holidays_text_pos + 'mm}{' + offset + 'mm}{\\small{' + month_name + '}}\n'
	fs.appendFileSync(outfilename, text) 
}

function output_photo( photo ) {
	var photo_fs = require('fs')
	if ( ! photo_fs.existsSync(photo) ) {
		console.log('Warning: photo ' + photo + ' file doesn\'t exit!')
		return
	}
	fs.appendFileSync(outfilename, '\\begin{tikzpicture}[remember picture,overlay]')
	fs.appendFileSync(outfilename, '  \\node[outer sep=0pt,inner sep=0pt,anchor=north]')
	fs.appendFileSync(outfilename, '    at ([xshift=' + arrange_photo_pos + 'mm,yshift=-26mm]current page.north west)')
	fs.appendFileSync(outfilename, '    {\\includegraphics[max width=104mm, max height=112mm]{../' + photo + '}};')
	fs.appendFileSync(outfilename, '\\end{tikzpicture}')
}


function output_new_page() {
	fs.appendFileSync(outfilename, '\\newpage')
}

function get_week( week ) {
	var date = moment(config['year'] + "-01-01");
	var startweekday = date.weekday()
	date.add(-startweekday + week*7, 'days')
	return date
}

function pad(num, size){ return ('000000000' + num).substr(-size); }

function get_photo( date, week ) {
	var glob = require('glob-fs')({ gitignore: true });
	var photo_name = 'photos/' + date.format('Y-') + pad( (week+1).toString(), 2) + '.*'
	var files = glob.readdirSync(photo_name);
	console.log('Photos ' + photo_name + ' ' + files.toString())
	if ( files == undefined ) return undefined
	return files[0]
}


function output_week( week ) {
	var date = get_week( week );

	output_template()
	output_week_header( week )
	photo = get_photo(date, week)
	if ( photo != undefined ) output_photo(photo)
	for(var day = 0 ; day < 7; day++ )
	{
		var holidays_text = holidays[date.format('D.M.')]
		if ( (day == 6) || (holidays_text != undefined) ) arrange_color = config['holidays-color']
		else arrange_color = ''
		output_day_name(day % 7)
		if ( holidays_text != undefined ) output_holidays_text(holidays_text, day % 7)
		output_day(date.format('D'), day % 7)
		output_month_name(date, day % 7)
		nameday = namedays[date.format('D.M.')]
		if ( nameday != undefined) output_name(nameday, day % 7)
		output_born(date, day % 7)
		output_died(date, day % 7)
		output_message(date, day % 7)
		date.add(1, 'days')
	}
	output_new_page()
}


file = fs.readFileSync(install_path + '/templates/template-header.tex', {encoding: 'utf8'})
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

file = fs.readFileSync(install_path + '/templates/template-footer.tex', {encoding: 'utf8'})
fs.appendFileSync(outfilename, file)
