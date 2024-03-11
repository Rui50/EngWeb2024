var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');
const url = require('url');


var templates = require('./templates')          
var static = require('./static.js')   

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}


var alunosServer = http.createServer((req, res) => {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    var q = url.parse(req.url, true)
    
    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /compositores
                if(req.url == "/" || req.url == "/compositores"){
                    axios.get("http://localhost:3000/compositores?_sort=nome")
                        .then(resp =>{
                            var compositores = resp.data
                            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write(templates.compositoresListPage(compositores,d))
                            res.end()   
                        })
                        .catch(erro =>{
                            res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possivel obter a lista de compositores</p>")
                            res.write("<p>"+ erro +"</p>")
                            res.end()   
                        })
                }
                // GET /compositores/{id}
                else if(/\/compositores\/C[0-9]+$/i.test(req.url)){
                    const id = req.url.split('/compositores/')[1];
                    console.log(id)
                    axios.get(`http://localhost:3000/compositores?id=${id}`)
                        .then(resp =>{
                            var compositor = resp.data;
                            //res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write(templates.compositorPage(compositor,d))
                            res.end()  
                        })
                        .catch(erro => {
                            res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possivel obter a informação do compositor</p>")
                            res.write("<p>"+ erro +"</p>")
                            res.end()  
                        })
                }

                // GET compositores?periodo= {x}
                else if (/\/compositores\?periodo=[A-Za-z]+$/i.test(req.url)) {
                    var periodo = req.url.split('=')[1];
                    console.log(periodo);
                    axios.get(`http://localhost:3000/periodos/${periodo}`)
                        .then(resp =>{
                            var compositores = resp.data;
                            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write(templates.compositoresListPage(compositores,d))
                            res.end()  
                        })
                        .catch(erro => {
                            res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possivel obter a informação do compositor</p>")
                            res.write("<p>"+ erro +"</p>")
                            res.end()  
                        })
                }
                else if("/compositores/registo"){
                    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write(templates.compositorFormPage(d))
                    res.end()   
                }
                
                // GET /compositores/edit/:id 
                else if(/\/compositores\/edit\/(C)[0-9]+$/i.test(req.url)){
                    const id = req.url.split('/')[3]
                    console.log("http://localhost:3000/compositores/" + id)
                    axios.get("http://localhost:3000/compositores/" + id)
                        .then(resp =>{
                            var compositor = resp.data;
                            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write(templates.compositorEditPage(compositor,d))
                            res.end()  
                        })
                        .catch(erro => {
                            res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possivel obter a informação do compositor</p>")
                            res.write("<p>"+ erro +"</p>")
                            res.end()  
                        })
                }

                else if(/\/compositores\/delete\/(C)[0-9]+$/i.test(req.url)){
                    var id = req.url.split('/')[3]
                    axios.delete("http://localhost:3000/compositores/" + id)
                    .then(resp =>{
                        var compositor = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write("<p>Compositor Apagado: " + id + "</p>")
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(510, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível eliminar o compositor "+ id +"</p>")
                        res.end()
                    })
                }

                else if(req.url == "/periodos"){
                    axios.get("http://localhost:3000/periodos")
                        .then(resp =>{
                            var periodos = resp.data;
                            res.writeHead(201, {"Content-Type" : "text/html; charset=utf-8"})
                            res.write(templates.periodosListPage(periodos, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possivel obter a informação dos periodos</p>")
                            res.write("<p>"+ erro +"</p>")
                            res.end()  
                        })
                }

                // GET /periodos/{id}
                else if(/\/periodos\/P[0-9]+$/i.test(req.url)){
                    const id = req.url.split('/periodos/')[1];
                    console.log(id)
                    axios.get(`http://localhost:3000/periodos?id=${id}`)
                        .then(resp =>{
                            var periodo = resp.data;
                            //res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write(templates.periodoPage(periodo,d))
                            res.end()  
                        })
                        .catch(erro => {
                            res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possivel obter a informação do compositor</p>")
                            res.write("<p>"+ erro +"</p>")
                            res.end()  
                        })
                }
                
                // GET ? -> Lancar um erro
                else{
                    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write("<p>Método GET não suportado" + req.url + "</p>")
                    res.write("<p><a href='/'>Return</a></p>")
                    res.end()
                }
                break
            case "POST":
                // POST /alunos/registo --------------------------------------------------------------------
                if(req.url == "/alunos/registo"){
                }
                // POST /alunos/edit/:id --------------------------------------------------------------------
                else if(/\/alunos\/edit\/(A|PG)[0-9]+$/i.test(req.url)){

                }
                // POST ? -> Lancar um erro
                else{
                    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write("<p>Método POST não suportado" + req.url + "</p>")
                    res.write("<p><a href='/'>Return</a></p>")
                    res.end()
                }
                break;
            default: 
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                res.write("<p>Método não suportado" + req.method + "</p>")
                res.end()

                break;
        }
    }
})

alunosServer.listen(3040, ()=>{
    console.log("Servidor à escuta na porta 3040...")
})



