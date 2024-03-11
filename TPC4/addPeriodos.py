import json

dataset = "compositores.json"
newdataset = "compositoresDB.json"


def generate_periodos_db(compositores):
    periodos = set()
    periodos_list = []
    contador = 0

    for comp in compositores:
        if "periodo" in comp:
            periodo = comp["periodo"]
            periodos.add(periodo)

    for periodo in periodos:
        periodos_list.append({
            "id": f"P{contador}",
            "periodo": periodo
        })
        contador += 1

    return periodos_list


def main():
    with open(dataset, "r", encoding="utf-8") as f:
        data = json.load(f)
    compositores = data["compositores"]

    periodos = generate_periodos_db(compositores)

    compositoresDB = {
        "compositores": compositores,
        "periodos": periodos,
    }

    with open(newdataset, "w", encoding="utf-8") as f:
        json.dump(compositoresDB, f, indent=1)


if __name__ == "__main__":
    main()
