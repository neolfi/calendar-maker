all: output-a4.pdf

output.pdf: output.tex
	pdflatex output.tex
	pdflatex output.tex

output.tex:
	node generate.js

output-a4.pdf: output.pdf
	pdflatex output-a4.tex

.PHONY: output.pdf output-a4.pdf

clean:
	rm -f output.* output-a4.pdf output-a4.log output-a4.aux
