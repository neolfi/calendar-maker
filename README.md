calendar-maker
==============

The `calendar-maker` is small tool to generate printable weekly calendar
with custom photos, messages etc.

The engine is implemented with Node.js and it generates LaTeX file which
is then translated to PDF. There are bunch of LaTeX packages used and
there are page templates used by engine.

Currently there is no error handling or checking what-so-ever so use at own
risk. 

Prerequisities
==============

Ubuntu
------
apt-get install nodejs npm texlive texlive-lang-czechslovak texlive-latex-extra xpdf

Fedora
------
dnf install texlive-adjustbox texlive-babel-czech xpdf texlive-pdfpages

Common
------
npm install moment

Install
=======

```
sudo make install
```

This will install into `/usr/lib/calendar-maker` and it will try to install globaly
needed nodejs modules. This is note very clever and may fail for various reasons like
wrong permissions etc.

Uninstall
=========

```
sudo make uninstall
```

Use
===

1. Create working directory

```
mkdir my-calendar
cd my-calendar
```

2. Run `calendar-maker` for first time, it will create basic configuration and
   it will create first output

```
calendar-maker
```

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

For the configuration examples look at `/usr/lib/calendar-maker/example/*` or into code :-)
