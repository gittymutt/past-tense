#!/bin/bash
npm run build
cd build
scp -r * root@167.99.145.79:/var/www/html/past-tense
