import os
import xml.etree.ElementTree as ET

if not os.path.exists('html'):
    os.mkdir("html")

directory = 'MapaRuas-materialBase/texto'

index = """
    <!DOCTYPE html>
    <html lang="pt-PT">
    <head>
        <title>Mapa</title>
        <meta charset="utf-8">
    </head>
    <body>
"""

index += "<ul>"

streets = []

for filename in os.listdir(directory):
    names = filename.split("-")
    street = names[2].split(".")
    streets.append(street)
    index += f'<li><a href="html/{street[0]}.html">{street[0]}</a></li>'

index += "</ul>"
index += "</body>"

ficheiroHtmlOutput = open("index.html", "w", encoding="utf-8")
ficheiroHtmlOutput.write(index)
ficheiroHtmlOutput.close()

# streets gen
i = 0
for filename in os.listdir(directory):
    tree = ET.parse(f'MapaRuas-materialBase/texto/{filename}')
    root = tree.getroot()

    streetPage = """
        <!DOCTYPE html>
        <html lang="pt-PT">
        <head>
            <title>Mapa</title>
            <meta charset="utf-8">
        </head>
        <body>
    """

    meta = root.find('meta')
    # stret number and name
    numero = meta.find('número').text
    nome = meta.find('nome').text

    streetPage += f"""<h1>{numero} - {nome}</h1>"""

    # Old street view
    for figura in root.findall('corpo/figura'):
        legenda = figura.find('legenda')
        imagem = figura.find('imagem')
        figura = imagem.get('path')
        splits = figura.split('/')
        path = f'../MapaRuas-materialBase/imagem/{splits[2]}'
        streetPage += f"""
        <figure>
            <img src='{path}' style='width:1000px;height:750px;'>
            <figcaption>{legenda.text}</figcaption>
        </figure>
        """
    # New street view
    for file in os.listdir('MapaRuas-materialBase/atual'):
        info = file.split('-')
        view_atual = f'../MapaRuas-materialBase/atual/{file}'
        if streets[i][0] == info[1]:
            streetPage += f"""
            <figure>
                <img src='{view_atual}' style='width:1000px;height:750px;'>
            </figure>
            """

    corpo = root.find('corpo')

    streetPage += "<ul>"

    for para in corpo:
        info = "<li>"
        if para.text:
            info += para.text
        for child in para:
            if child.tag == 'lugar' or child.tag == 'entidade':
                info += f" <strong>{child.text}</strong>"
            else:
                info += f" {child.text}"
        info += "</li>"
        streetPage += info

    streetPage += "</ul>"

    listadecasas = corpo.find('lista-casas')
    if listadecasas is not None:
        casas = listadecasas.findall('casa')

        streetPage += f"""<h3> Casas na rua </h3>"""
        for casa in casas:
            numero = casa.find('número').text
            enfiteuta = casa.find('enfiteuta').text if casa.find('enfiteuta') is not None else "Desconhecido"
            foro = casa.find('foro').text if casa.find('foro') is not None else "Desconhecido"

            desc = "<p>"
            desc_elements = casa.find('desc')

            if desc_elements is not None:
                for para in desc_elements:
                    if para.text:
                        desc += para.text
                    for child in para:
                        if child.tag == 'lugar':
                            desc += f" <strong>{child.text}</strong>"
                        elif child.tag == 'entidade':
                            desc += f" <strong>{child.text}</strong>"
                        else:
                            desc += f" {child.text}"
                        if child.tail:
                            desc += child.tail
            else:
                desc = "N/A"

            desc += "</p>"

            streetPage += f"""
            <div class='casa'>
                <h2>Casa {numero}</h2>
                <ul>
                    <li>Enfiteuta: {enfiteuta}</li>
                    <li>Foro: {foro}</li>
                    <li>Descrição: {desc}</li>
                </ul>
            </div>
            """

    streetPage += "</body>"

    with open(f"html/{streets[i][0]}.html", "w", encoding="utf-8") as f:
        f.write(streetPage)
        i += 1
