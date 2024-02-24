var http = require('http');
var url = require('url');
var axios = require('axios');

http.createServer((req, res) => {

    var q = url.parse(req.url, true)

    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})

    // Opções
    if(q.pathname == '/'){
        res.write("<h1> Escola de Música </h1>")

        res.write("<ul>")
        res.write("<li><a href=/alunos>Alunos</a></li>")
        res.write("<li><a href=/cursos>Cursos</a></li>")
        res.write("<li><a href=/instrumentos>Intrumentos</a></li>")
        res.write("</ul>")
        res.end()
    }

    // Index de alunos
    if(q.pathname == '/alunos'){
        axios.get("http://localhost:3000/alunos?_sort=nome")
        .then((resp) =>{

            let alunos = resp.data
            res.write("<h1>Alunos da Escola de Música</h1>")
            res.write("<ul>")
            for (x in alunos){
                res.write("<li><a href=/alunos/"+ alunos[x].id + ">" + alunos[x].id + " - " + alunos[x].nome + "</a></li>")
            }
            res.write("</ul>")
        })
    }

    // Index de Cursos
    else if(q.pathname == '/cursos'){
        // dar fix no sort depois
        axios.get("http://localhost:3000/cursos?_sort=id")
        .then((resp) =>{

            let cursos = resp.data
            res.write("<h1>Cursos da Escola de Música</h1>")
            res.write("<ul>")
            for (x in cursos){
                res.write("<li>" + cursos[x].id + " - " + cursos[x].designacao + "</li>")
            }
            res.write("</ul>")
        })
    }

    // Index de Instrumentos
    else if(q.pathname == '/instrumentos'){
        axios.get("http://localhost:3000/instrumentos?_sort=text")
        .then((resp) =>{

            let instrumentos = resp.data
            res.write("<h1>Instrumentos Utilizados na Escola de Música</h1>")
            res.write("<ul>")
            for (x in instrumentos){
                res.write("<li>" + instrumentos[x].id + " - " + instrumentos[x]['#text'] + "</li>")
            }
            res.write("</ul>")
        })
    }

    // Página Individual de Alunos

    else if(q.pathname.startsWith("/alunos/")){
        let id = req.url.split("/")
        // id[2] =  AXXXXX
        axios.get("http://localhost:3000/alunos/" + id[2])
        .then((resp) =>{

            let aluno = resp.data
            res.write("<h1>Informação do Aluno</h1>")
            res.write("<p><b>Id:</b> " + aluno.id + "</p>")
            res.write("<p><b>Nome: </b>" + aluno.nome + "</p>")
            res.write("<p><b>Data Nascimento: </b>"+ aluno.dataNasc + "</p>")
            res.write("<p><b>Curso: </b>"+ aluno.curso +"</p>")
            res.write("<p><b>Ano: </b>"+ aluno.anoCurso +"</p>")
            res.write("<p><b>Instrumento: </b>"+ aluno.instrumento + "</p>")
        })
    }
    
    
    // Página Individual de Cursos

    else if(q.pathname.startsWith("/cursos/")){
        let id = req.url.split("/")
        // id[2] =  CSXX
        axios.get("http://localhost:3000/cursos/" + id[2])
        .then((resp) =>{

            let curso = resp.data;
            res.write("<h1>Informação do Curso</h1>");
            res.write("<p><b>Id:</b> " + curso.id + "</p>");
            res.write("<p><b>Designacao: </b>" + curso.designacao + "</p>");
            res.write("<p><b>Duracao: </b>"+ curso.duracao + "</p>");
            res.write("<p><b>Instrumento:</b></p>");
            res.write("<ul>");
            res.write("<li>Name: " + curso.instrumento['#text'] + "</li>");
            res.write("<li>Id: " + curso.instrumento.id + "</li>");
            res.write("</ul>");
        })
    }
}).listen(1902);

console.log("Servidor à escuta na porta 1902...");