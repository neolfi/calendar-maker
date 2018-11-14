FROM fedora

RUN echo -ne 'fastestmirror=true' >> /etc/dnf/dnf.conf && \
    dnf install -y nodejs ImageMagick \
	texlive-adjustbox texlive-babel-czech xpdf texlive-pdfpages \
        texlive-mfware texlive-metafont git 
RUN git clone https://github.com/neolfi/calendar-maker.git && \
    cd calendar-maker && \
    npm install .
ENV PATH=$PATH:/calendar-maker
WORKDIR /work
CMD ["calendar-maker"]
