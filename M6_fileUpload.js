/*
 * FileUpload amb ExpressJS
 * @author sergi grau, sergi.grau@fje.edu
 * @version 1.0
 * date 21.01.2016
 * format del document UTF-8
 *
 * CHANGELOG
 * 21.01.2016
 * - FileUpload amb ExpressJS
 * - Instal·lar body-parser per tractar JSON, URLencoder i dades
 * - npm install body-parser, https://www.npmjs.com/package/body-parser
 * - Instal·lar multer per tractar multiparts
 * - npm install multer, https://www.npmjs.com/package/multer
 *  23.03.2017
 * - compatible amb Windows i correccions menors
 * - el fitxer es copia amb un altre nom, i cal canviar l'extensio per SO
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes El Clot
 */
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var multer = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));


var upload = multer({ dest: '/tmp/' });

app.post('/file_upload', upload.single('file'), function (req, res) {
  var fitxer = __dirname + '/' + req.file.filename;
  fs.rename(req.file.path, fitxer, function (err) {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.json({
        missatge: 'fitxer pujat',
        fitxer: req.file.filename
      });
    }
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Escoltant en http://%s:%s", host, port)

})