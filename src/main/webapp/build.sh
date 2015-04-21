echo Initializing Grunt...
npm install -g grunt-cli
npm install grunt --save-dev
npm install grunt-contrib-concat --save-dev
npm install grunt-contrib-cssmin --save-dev
npm install grunt-contrib-jshint --save-dev
npm install grunt-contrib-uglify --save-dev
npm install grunt-ng-annotate --save-dev
npm install grunt-contrib-copy --save-dev
npm install grunt-contrib-clean --save-dev
npm install grunt-rev --save-dev
npm install grunt-usemin --save-dev
echo Current Directory
pwd
echo Starting grunt
grunt
cp src\main\webapp\js\system.js dist\js\
cp src\main\webapp\js\config.js dist\js\
cd dist
jar -cvf dc.war *
sleep