#!/bin/bash
# Havenia — julkaise sivusto palvelimelle
set -e
cd ~/repositories/Havenia
git pull

DST=~/public_html

# HTML-sivut
/bin/cp *.html "$DST"/ 2>/dev/null || true
# Etusivu index.html:ksi
/bin/cp havenia.html "$DST"/index.html

# Skriptit, PHP ja palvelinasetukset
/bin/cp consent.js "$DST"/ 2>/dev/null || true
/bin/cp *.php "$DST"/ 2>/dev/null || true
/bin/cp .htaccess "$DST"/ 2>/dev/null || true

# Kuvat ja ikonit (vain juurikansio — ei Tuulensuu/-raakakuvia)
/bin/cp *.jpg "$DST"/ 2>/dev/null || true
/bin/cp *.png "$DST"/ 2>/dev/null || true
/bin/cp *.svg "$DST"/ 2>/dev/null || true
/bin/cp *.ico "$DST"/ 2>/dev/null || true

# Pohjakuva-PDF
/bin/cp *.pdf "$DST"/ 2>/dev/null || true

echo "Deploy valmis — kaikki tiedostot kopioitu palvelimelle."
