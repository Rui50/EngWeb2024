import json

dataset = 'filmes.json'

filmesdbfile = "filmesDB.json"

def generate_filmes_db(lines):
    filmes = []
    for reg in lines:
        data = json.loads(reg)
        film_id = data["_id"]["$oid"]
        title = data["title"]
        year = data["year"]
        cast = data.get("cast", [])
        genres = data.get("genres", [])

        filmes.append({
            "id": film_id,
            "title": title,
            "year": year, 
            "cast": cast, 
            "genres": genres
        })

    return filmes

def generate_atores_db(lines):
    atores = set()
    atores_list = []
    contador = 0

    for reg in lines:
        data = json.loads(reg)
        cast = data.get("cast", [])
        for ator in cast:
            if ator.lower() != "unknown":
                atores.add(ator)

    for ator in atores:
        atores_list.append({
            "id": f"a{contador}",  # Corrected here, removed the extra colon
            "nome": ator
        })
        contador += 1
        
    return atores_list

def generate_generos_db(lines):
    generos = set()
    generos_list = []

    for reg in lines:
        data = json.loads(reg)
        genre_data = data.get("genres", [])
        for genre in genre_data:
            generos.add(genre)

    for genre in generos:
        generos_list.append({"id": genre})

    return generos_list





def main():
    with open(dataset, "r", encoding="utf-8") as f:
        lines = f.readlines()

    filmes = generate_filmes_db(lines)
    atores = generate_atores_db(lines)
    generos = generate_generos_db(lines)
    
    filmesDB = {
        "films" : filmes,
        "moviecast" : atores,
        "genre" : generos
    }

    with open(filmesdbfile, "w", encoding="utf-8") as f:
        json.dump(filmesDB, f, indent=1)
    

if __name__ == "__main__":
    main()