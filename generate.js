const fs = require('fs');

var outfilename = 'output.tex'

file = fs.readFileSync('templates/template-header.tex', {encoding: 'utf8'})
fs.writeFileSync(outfilename, file)

fs.appendFileSync(outfilename, 'Test\n')

file = fs.readFileSync('templates/template-footer.tex', {encoding: 'utf8'})
fs.appendFileSync(outfilename, file)
