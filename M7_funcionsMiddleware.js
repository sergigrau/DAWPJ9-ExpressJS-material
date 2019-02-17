/*
 * Funcions Middleware amb Express.js.
 * Tenen accés a l'objecte req, res i next, en el cicle peticio-resposta
 * Poden executar quasevol codi, fer canvis a req i res, tancar el cicle peticio-resposta i 
 * cridar a la seguent funció de la pila 
 * @author sergi grau, sergi.grau@fje.edu
 * @version 1.0
 * date 21.01.2016
 * format del document UTF-8
 *
 * CHANGELOG
 * 21.01.2016
 * - Funcions Middleware amb Express.js.
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes El Clot
 */

var express = require('express');
var app = express();

app.use('/usuari/:codi', function (req, res, next) {
  console.log('petició a usuari:', req.method);
  next();
});

var log = function (req, res, next) {
  console.log('peticio rebuda');
  next();
};

var dataPeticio = function (req, res, next) {
  req.dataPeticio = Date.now();
  next();
};

app.use(dataPeticio);
app.use(log);

app.get('/', function (req, res) {
  var resposta = 'Petició feta en: ' + new Date(req.dataPeticio) + '';
  res.send(resposta);
});

app.listen(3000);