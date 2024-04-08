var express = require('express');
var router = express.Router();
var Ficheiro = require("../controllers/pessoas")

/* GET modalidades listing. */
router.get('/', function(req, res, next) {
    Ficheiro.getAllModalidades()
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
});

/* GET modalidades listing. */
router.get('/:modalidade', function(req, res, next) {
    Ficheiro.getAllAtletasByModalidade(req.params.modalidade)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
});


module.exports = router;
