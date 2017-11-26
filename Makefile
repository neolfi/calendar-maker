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
	npm install -g moment

uninstall:
	rm -R ${INSTALL_PATH}
