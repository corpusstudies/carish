#!/bin/sh
set -eux

rm -rf ../carish-gh-pages/*
cp index.html ../carish-gh-pages
cp -R output ../carish-gh-pages

cd ../carish-gh-pages
DATE_PART="$(date "+%Y-%m-%dT%H-%M-%S")"
mv output output-$DATE_PART
sed -i '' -e s/"output\/main.js"/"output-$DATE_PART\/main.js"/g index.html
git add .
git commit -m "Release $DATE_PART"
git push origin HEAD
