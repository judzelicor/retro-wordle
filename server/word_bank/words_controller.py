import json

def generate_word_list():

    f = open("server/word_bank/words.txt", "r")
    words = f.readlines()

    word_list = []

    for id, word in enumerate(words):
        word = word.strip()
        if len(word) == 5:
            word_list_element = { 
                "word": word,
                "capitalize": word.capitalize(), 
                "lowercase": word.lower(), 
                "uppercase": word.upper(), 
                "id": id
            }

            word_list.append(word_list_element)


    words_list_json = json.dumps(word_list, indent=4)

    with open("server/word_bank/words.json", "w") as output:
        output.write(words_list_json)

# generate_word_list()

def generate_word_list():

    f = open("server/word_bank/words.txt", "r")
    words = f.readlines()

    word_dictionary = {}

    for id, word in enumerate(words):
        word = word.strip()
        if len(word) == 5:
            word_list_element = { 
                "word": word,
                "capitalize": word.capitalize(), 
                "lowercase": word.lower(), 
                "uppercase": word.upper(), 
                "id": id
            }

            word_dictionary[word] = word_list_element


    words_list_json = json.dumps(word_dictionary, indent=4)

    with open("server/word_bank/words_dictionary.json", "w") as output:
        output.write(words_list_json)

generate_word_list()