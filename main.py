import os

# criar 8 pastas de TPC
# criar pasta de projeto
# criar Pasta de Teste
# criar ficheiro .gitkeep dentro de cada pasta

# Criar pasta

for i in range(1, 9):
    os.mkdir("TPC" + str(i))
    open("TPC" + str(i) + "/.gitkeep", "w")

os.mkdir("Projeto")
open("Projeto/.gitkeep", "w")
os.mkdir("Teste")
open("Teste/.gitkeep", "w")

