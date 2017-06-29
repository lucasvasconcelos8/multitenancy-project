from pymongo import MongoClient

#connect with mongoDB via MongoClient
connection = MongoClient('localhost', 27017)

#Connection with an instance of bd in mongo
dbContacts = connection['contacts']

def criarUsuario():
    return ''
    
def autenticarUsuario(username, password):
    return ''

def inserirContato():
    return ''

def removerContato():
    return ''

def atualizarContato():
    return ''

def listContatos():
    return ''
