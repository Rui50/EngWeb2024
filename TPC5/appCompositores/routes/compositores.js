var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET lista compositores */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)

  axios.get("http://localhost:3000/compositores")
    .then( resp => {
        var compositores = resp.data
        res.status(200).render("listaCompositores", {"lCompositores" : compositores, "date" : d})
    })
    .catch(erro =>{
      res.status(501).render("error", {"error" : erro})       
  })
});

/* GET registo compositores */
router.get('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)

  axios.get("http://localhost:3000/compositores")
    .then( resp => {
        var compositores = resp.data
        res.status(200).render("compositorFormPage", {"date" : d})
    })
    .catch(erro =>{
      res.status(501).render("error", {"error" : erro})       
  })
});

/* POST registo compositores*/
router.post('/registo', function(req, res, next) {
  
  var d = new Date().toISOString().substring(0, 16)
  var result = req.body

  axios.post("http://localhost:3000/compositores", result)
    .then( resp => {
        console.log(resp.data)
        res.status(201).redirect("/compositores")
    })
    .catch(erro =>{
      res.status(502).render("error", {"error" : erro})       
  })
});

/* GET compositor*/
router.get('/:idCompositor', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)

  axios.get("http://localhost:3000/compositores/" + req.params.idCompositor)
    .then( resp => {
        var compositor = resp.data
        res.status(200).render("compositorPage", {"Compositor" : compositor, "date" : d})
    })
    .catch(erro =>{
      res.status(501).render("error", {"error" : erro})       
  })
});

/* GET compositor delete */
router.get('/delete/:idCompositor', function(req, res, next) {

  var d = new Date().toISOString().substring(0, 16)

  axios.get("http://localhost:3000/compositores/" + req.params.idCompositor)
    .then( resp =>{
        res.redirect("/compositores")                      
    })
    .catch(erro =>{
        res.status(504).render("error", {"error" : erro})       
    })
});

/* GET compositor edit */
router.get('/edit/:idCompositor', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)

  axios.get("http://localhost:3000/compositores/" + req.params.idCompositor)
    .then( resp => {
        var compositor = resp.data
        res.status(200).render("compositorFormEditPage", {"Compositor" : compositor, "date" : d})
    })
    .catch(erro =>{
      res.status(501).render("error", {"error" : erro})       
  })
});

/* POST compositor edit. */
router.post('/edit/:idCompositor', function(req, res, next) {

  var d = new Date().toISOString().substring(0, 16)
  var compositor = req.body

  axios.put("http://localhost:3000/compositores/" + req.params.idCompositor, compositor)
    .then( resp =>{
        res.status(201).redirect("/compositores")                      
    })
    .catch(erro =>{
        res.status(504
          ).render("error", {"error" : erro})       
    })
});

module.exports = router;
