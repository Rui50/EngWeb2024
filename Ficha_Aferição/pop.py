import json
import requests

post_url = 'http://localhost:3000/pessoas/'

def post_person_data(person_data):
    try:
        res = requests.post(post_url, json=person_data)
    except Exception as e:
        print(f"Request failed: {e}")

def main():
    for i in range(1, 5):
        file_path = f'datasets/dataset-extra{i}.json'
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        
        pessoas = data.get('pessoas', [])
        
        for pessoa in pessoas:
            post_person_data(pessoa)

if __name__ == "__main__":
    main()