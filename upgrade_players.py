import json

# pliki
input_file = "data/players.json"
output_file = "data/players_v2.json"


# wczytanie obecnego players.json
with open(input_file, "r", encoding="utf-8") as file:
    players = json.load(file)


# dodawanie nowych pól
for player_id, player in players.items():

    player.setdefault("nationality", "")

    player.setdefault("yellowCards", 0)

    player.setdefault("redCards", 0)

    player.setdefault("homegrown", False)

    player.setdefault("hallOfFame", False)


# zapis nowej wersji
with open(output_file, "w", encoding="utf-8") as file:
    json.dump(
        players,
        file,
        ensure_ascii=False,
        indent=2
    )


print("Gotowe!")
print("Utworzono:", output_file)
print("Liczba zawodników:", len(players))