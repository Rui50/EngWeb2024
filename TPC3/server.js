var http = require('http')
var fs = require('fs')
var url = require('url')
var axios = require('axios')

http.createServer((req, res) =>{
    
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})

    var q = url.parse(req.url, true)

    if (q.pathname == "/filmes"){
        axios.get("http://localhost:3000/films")
            .then(resp =>{
                let html = `<!DOCTYPE html>
                <html lang="pt-PT"
                <head>
                    <title>Filmes</title>
                    <meta charset="utf-8">
                </head>
                <body>`

                res.write(html);
                res.write("<h1> Filmes </h1>")
                res.write("<ul>")
                for(i in resp.data){
                    res.write("<li><a href=filmes/" + resp.data[i].id + ">" + resp.data[i].title +  "</a></li>")
                }
                res.write("</ul>")
            })
            .catch(erro => {
                res.write("Erro ..." + erro)
                res.end()
            })
    }
    else if(q.pathname == "/atores"){
        axios.get("http://localhost:3000/moviecast")
        .then(resp =>{
            let html = `<!DOCTYPE html>
            <html lang="pt-PT"
            <head>
                <title>Atores</title>
                <meta charset="utf-8">
            </head>
            <body>`

            res.write(html);
            res.write("<h1> Atores </h1>")
            res.write("<ul>")
            for(i in resp.data){
                res.write("<li><a href=atores/" + resp.data[i].id + ">" + resp.data[i].nome +  "</a></li>")
            }
            res.write("</ul>")
        })
        .catch(erro => {
            res.write("Erro ..." + erro)
            res.end()
        })
    }
    else if(q.pathname == "/generos"){
        axios.get("http://localhost:3000/genre")
        .then(resp =>{
            let html = `<!DOCTYPE html>
            <html lang="pt-PT"
            <head>
                <title>Generos</title>
                <meta charset="utf-8">
            </head>
            <body>`

            res.write(html);
            res.write("<h1> Generos </h1>")
            res.write("<ul>")
            for(i in resp.data){
                res.write("<li><a href=generos/" + resp.data[i].id + ">" + resp.data[i].id +  "</a></li>")
            }
            res.write("</ul>")
        })
        .catch(erro => {
            res.write("Erro ..." + erro)
            res.end()
        })
    }

    else if(q.pathname.match(/\/filmes\/.*/)){
        let filme_id = q.pathname.substring(8)
        console.log("filme_id:", filme_id);


        axios.get("http://localhost:3000/films?id=" + filme_id)
            .then(dados => {
                res.write("<h1>" + dados.data[0]['title'] +"</h1>")

                res.write("<p><b>Id:</b> " + dados.data[0]['id'] + "</p>")
                res.write("<p><b>Year:</b> " + dados.data[0]['year'] + "</p>")
                res.write("<p><b>Cast:</b> " + dados.data[0]['cast'].join(', ') + "</p>");
                res.write("<p><b>Genres: " + dados.data[0]['genres'].join(', ') + "</p>");
                res.write("<h6><a href=/filmes> Voltar</a></h6>") 
                res.end()

            })
            .catch(erro => {
                res.write("Erro ..." + erro)
                res.end()
            })      
    }

    else if(q.pathname.match(/\/generos\/.*/)){
        let genero = q.pathname.substring(9)
        console.log("http://localhost:3000/genre?id=" + genero);


        axios.get("http://localhost:3000/genre?id=" + genero)
            .then(dados => {
                res.write("<h1>" + dados.data[0]['id'] +"</h1>")
                res.end()

            })
            .catch(erro => {
                res.write("Erro ..." + erro)
                res.end()
            })      
    }

    else if(q.pathname.match(/\/atores\/.*/)){
        let ator_id = q.pathname.substring(8)
        console.log("http://localhost:3000/moviecast?id=" + ator_id);


        axios.get("http://localhost:3000/moviecast?id=" + ator_id)
            .then(dados => {
                res.write("<h1>" + dados.data[0]['nome'] +"</h1>")
                res.end()

            })
            .catch(erro => {
                res.write("Erro ..." + erro)
                res.end()
            })      
    }
    
    else{
        res.write("Erro")
        res.end()
    }
}).listen(2002)

console.log("Servidor à escuta na porta 2002 ....")