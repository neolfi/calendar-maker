FROM fedora:30

ARG USER=user
ARG USER_ID=1000
ARG USER_GID=1000
ENV USER=${USER}
ENV USER_ID=${USER_ID}
ENV USER_GID=${USER_GID}

RUN echo -ne 'fastestmirror=true' >> /etc/dnf/dnf.conf && \
    dnf install -y nodejs ImageMagick \
	texlive-adjustbox texlive-babel-czech xpdf texlive-pdfpages \
        texlive-mfware texlive-metafont git \
        passwd && \
    dnf clean all && \
    useradd -m -u ${USER_ID} ${USER} && \
    passwd -d ${USER} && \
    chown -R ${USER}:${USER} /home/${USER}
RUN git clone https://github.com/neolfi/calendar-maker.git && \
    cd calendar-maker && \
    npm install .
ENV PATH=$PATH:/calendar-maker
USER ${USER}
ENV HOME=/home/${USER}
WORKDIR /work
CMD ["calendar-maker"]
