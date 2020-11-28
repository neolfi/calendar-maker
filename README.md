calendar-maker
==============

The `calendar-maker` is small tool to generate printable weekly calendar
with custom photos, messages etc.

The engine is implemented in Node.js and it generates LaTeX file which
is then translated to PDF. There are bunch of LaTeX packages used and
there are page templates used by engine.

Supported languages are: *czech*, *slovak* and *finnish*

Currently there is no error handling or checking what-so-ever so use at own
risk. 

Prerequisities
==============

For Fedora 29.

A convenient way to run the `calendar-maker` is inside a `docker` container.
Install `docker` using instructions for your OS https://docs.docker.com/install/linux/docker-ce/fedora/.
After that follow `Install into Docker container`.

If you want to run `calendar-maker` locally in your host you will need further
packages:

```
echo -ne 'fastestmirror=true' >> /etc/dnf/dnf.conf
dnf install -y nodejs ImageMagick texlive-adjustbox texlive-babel-czech xpdf texlive-pdfpages \
               texlive-mfware texlive-metafont git 
```

After that follow `Install locally`.

Install locally
===============

```
git clone https://github.com/neolfi/calendar-maker.git
cd calendar-maker
npm install .
export PATH=$PATH:$PWD
```

Install into Docker container
=============================

```
git clone https://github.com/neolfi/calendar-maker.git
cd calendar-maker
./calendar-maker-build-docker
export PATH=$PATH:$PWD
```

Use
===

1. Create your calendar directory:

    ```
    mkdir my-calendar
    cd my-calendar
    ```

2. Run `calendar-maker` for first time, it will create basic configuration and
    it will create first output

    ```
    calendar-maker-docker
    ```

    or if running locally:

    ```
    calendar-maker
    ```

    the output will be:

    ```
    my-calendar$ calendar-maker 
    Updating templates...
    Converting images...
    Generating TeX...
    Creating PDF (may take couple minutes)...
    All done.
    my-calendar$ ls **
    born.json  config.json  died.json  holidays_local.json  message.json

    output:
    generate.log  output.aux  output.log  output.pdf  output-term.log  output.tex  photos.log

    photos:
    00-PHOTOSREADME
    ```

3. Modify the configuration in the `*.json` files and copy photos to `photos` folder
    look at `photos/00-PHOTOSREADME` how the files need to be named

4. Re run the `calendar-maker` to regenerate PDF output, all outputs are in `output` directory

5. The resulting printable calendar is then in `output/output.pdf`. It is A5 format which can
    be printed, cut and bind.

Configuration
=============

For the configuration examples look at `calendar-maker/example/*` or into code :-)

Debugging
=========

In case of debugging new code with docker container it is handy to remap the cloned
Github project with local one, for example:

```
docker run -it -v $PWD:/work:Z -v ~/calendar-maker:/calendar-maker:Z calendar-maker
```

