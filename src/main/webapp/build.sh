echo hi
source npm install -g grunt-cli
source npm install grunt --save-dev
source npm install grunt-contrib-concat --save-dev
source npm install grunt-contrib-cssmin --save-dev
source npm install grunt-contrib-jshint --save-dev
source npm install grunt-contrib-uglify --save-dev
source npm install grunt-ng-annotate --save-dev
source npm install grunt-contrib-copy --save-dev
source npm install grunt-contrib-clean --save-dev
source npm install grunt-rev --save-dev
source npm install grunt-usemin --save-dev
source grunt
cp js\system.js dist\js\
cp js\config.js dist\js\
cd dist
jar -cvf dc.war *
sleep