exports.compositoresListPage = (slist, d) => {
    var pagHTML = `
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="icon" href="public/favicon.png"/>
        <link rel="stylesheet" href="public/w3.css"/>
        <title>Gestão de Alunos</title>
    </head>

    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Lista de Compositores</h1>
            </header>

            <div class="w3-container">
                <table class="w3-table-all">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Bio</th>
                        <th>Data Nascimento</th>
                        <th>Data Obito</th>
                        <th>Periodo</th>
                    </tr>`
    for (let i = 0; i < slist.length; i++){
        pagHTML+=`
                    <tr>
                        <td>${slist[i].id}</td>
                        <td>
                            <a href="/compositores/${slist[i].id}">
                                ${slist[i].nome}
                            </a>
                        </td>
                        <td>${slist[i].bio}</td>
                        <td>${slist[i].dataNasc}</td>
                        <td>${slist[i].dataObito}</td>
                        <td>
                            <a href="/compositores?periodo=${slist[i].periodo}">
                                ${slist[i].periodo}
                            </a>
                        </td>
                    </tr>`
    }
    pagHTML+= `</table>
            </div>
            <footer class="w3-container w3-teal">
                <h5>Generated in ${d} - [<a href="/">Return</a>]</h5>
            </footer>
        </div>
    </body>
</html>
    `

    return pagHTML
}


exports.compositorPage = function(compositor, d){
    var pagHTML = `
    <html>
    <head>
        <title>Compositor: ${compositor[0].id}</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-blue">
                <h1>Compositor ${compositor[0].id}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:40%">
                    <li><b>Nome: </b> ${compositor[0].nome}</li>
                    <li><b>Número: </b> ${compositor[0].id}</li>
                    <li><b>Periodo: </b>  
                        <a href="/compositores?periodo=${compositor[0].periodo}">
                            ${compositor[0].periodo}
                        </a>
                    </li>
                    <li><b>Data de Nascimento: </b> ${compositor[0].dataNasc}</li>
                    <li><b>Data de Obito: </b> ${compositor[0].dataObito}</li>
                    <li><b>Bio: </b> ${compositor[0].bio}</li>
                </ul>
            </div>
            <footer class="w3-container w3-teal">
                <address>Gerado em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
    return pagHTML
}

exports.periodosListPage = (slist, d) => {
    var pagHTML = `
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="icon" href="public/favicon.png"/>
        <link rel="stylesheet" href="public/w3.css"/>
        <title>Gestão de Alunos</title>
    </head>

    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Lista de Periodos</h1>
            </header>

            <div class="w3-container">
                <table class="w3-table-all">
                    <tr>
                        <th>ID</th>
                        <th>Periodo</th>
                    </tr>`
    for (let i = 0; i < slist.length; i++){
        pagHTML+=`
                    <tr>
                        <td>${slist[i].id}</td>
                        <td>
                            <a href="/periodos/${slist[i].id}">
                                ${slist[i].periodo}
                            </a>
                        </td>
                    </tr>`
    }
    pagHTML+= `</table>
            </div>
            <footer class="w3-container w3-teal">
                <h5>Generated in ${d} - [<a href="/">Return</a>]</h5>
            </footer>
        </div>
    </body>
</html>
    `

    return pagHTML
}

exports.periodoPage = function(periodo, d){
    var pagHTML = `
    <html>
    <head>
        <title>Periodo: ${periodo[0].periodo}</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-blue">
                <h1>Periodo ${periodo[0].periodo}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:40%">
                    <li><b>ID: </b> ${periodo[0].id}</li>
                    <li><b>Número: </b> ${periodo[0].periodo}</li>
                </ul>
            </div>
            <footer class="w3-container w3-teal">
                <address>Gerado em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
    return pagHTML
}

exports.compositorFormPage = function(d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Compositor Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Compositor Form</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id"/>
                        <label>Name</label>
                        <input class="w3-input w3-round" type="text" name="nome"/>
                        <label>Bio</label>
                        <input class="w3-input w3-round" type="text" name="bio"/>
                        <label>Data Nascimento</label>
                        <input class="w3-input w3-round" type="text" name="dataNasc"/>
                        <label>Data Obito</label>
                        <input class="w3-input w3-round" type="text" name="dataObito"/>
                        <label>Periodo</label>
                        <input class="w3-input w3-round" type="text" name="periodo"/>
                    </fieldset>
                    <br/>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>
                <footer class="w3-container w3-purple">
                    <h5>Generated by EngWeb2024 in ${d} - [<a href="/">Return</a>]</h5>
                </footer>
            
            </div>
    `
}

exports.compositorEditPage = function(compositor, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Compositor Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Compositor Form</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value="${compositor.id}"/>
                        <label>Name</label>
                        <input class="w3-input w3-round" type="text" name="nome" value="${compositor.nome}"/>
                        <label>Bio</label>
                        <input class="w3-input w3-round" type="text" name="bio" value="${compositor.bio}"/>
                        <label>Data Nascimento</label>
                        <input class="w3-input w3-round" type="text" name="dataNasc" value="${compositor.dataNasc}"/>
                        <label>Data obito</label>
                        <input class="w3-input w3-round" type="text" name="dataObito" value="${compositor.dataNasc}"/>
                        <label>Periodo</label>
                        <input class="w3-input w3-round" type="text" name="periodo" value="${compositor.periodo}"/>
                    </fieldset>
                    <br/>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-purple">
                    <h5>Generated by EngWeb2023 in ${d} - [<a href="/">Return</a>]</h5>
                </footer>
            
            </div>
    `
    return pagHTML
}