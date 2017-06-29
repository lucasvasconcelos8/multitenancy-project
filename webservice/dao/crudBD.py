from pymongo import MongoClient

#connect with mongoDB via MongoClient
connection = MongoClient('localhost', 27017)

#Connection with an instance of bd in mongo
dbContacts = connection['contacts']

"""FUNCTIONS USER"""

#   input: receive a json with all info about this user
#   output: send the user id to server use.
def criarUsuario(user_json):
    new_id = generateID(user_json['username'], user_json['password'])

    user_json["_id"] = new_id

    collUsers = dbContacts['users']

    cursorResult = collUsers.find({"username" : user_json['username']})

    user_exist = {}
    for user in cursorResult:
        user_exist = user

    if user_exist = {}:
        try:
            collUsers.insert(user_json)
            return 'Success'
        except:
            return 'Error in insert new user to database'
    else:
        return 'Already exist user with this username'

#   input: receive a username and password
#   output: send user id to use in operations
def autenticarUsuario(username, password):

    collUsers = dbContacts['users']

    cursorResult = collUsers.find({"username" : username, "password" : password})

    user_auth = {}
    for user in cursorResult:
        user_auth = user

    if user_auth != {} :
        print 'Check info user: '+user_auth['_id']+'-'+user_auth['tipo_user']
        return user_auth['_id'], user_auth['tipo_user']
    else:
        print 'No user'
        return 'Login or password invalid'

"""FUNCTIONS CRUD CONTACTS"""

def insertContact(contact_json):
    return ''

def removeContact(contact_id):
    return ''

def updateContact():
    return ''

def listContacts():
    return ''

"""UTIL FUNCTIONS"""

#function generate id with composition of ascii number of username and password characters
def generateID(username, password):
    for char in username:
        user_id = user_id+str(ord(char))
    for char in password
        user_id = user_id+str(ord(char))

    return user_id
