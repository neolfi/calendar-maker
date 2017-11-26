all: output-a4.pdf

output.pdf: output.tex
	pdflatex output.tex
	pdflatex output.tex

output.tex:
	node generate.js

output-a4.pdf: output.pdf
	pdflatex output-a4.tex

.PHONY: output.tex output.pdf output-a4.pdf

clean:
	rm -f output.* output-a4.pdf output-a4.log output-a4.aux

INSTALL_PATH=/usr/lib/calendar-maker
install:
	mkdir -p ${INSTALL_PATH}
	cp -r locales example templates ${INSTALL_PATH} 
	cp generate.js calendar-maker ${INSTALL_PATH}
	ln -s ${INSTALL_PATH}/calendar-maker /usr/bin/calendar-maker
	npm install -g moment
	npm install -g calendar-base
	npm install -g generate-weeks
	npm install -g glob-fs
	npm install -g weekz

uninstall:
	rm -Rf ${INSTALL_PATH}
	rm -f /usr/bin/calendar-maker
