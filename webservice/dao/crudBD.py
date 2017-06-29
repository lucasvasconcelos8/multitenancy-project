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

    #check if exists login in database
    cursorResult = collUsers.find({"username" : username, "password" : password})

    user_auth = {}
    for user in cursorResult:
        user_auth = user

    #if ok, return the user credentials(id, type_user)
    if user_auth != {} :
        print 'Check info user: '+user_auth['_id']+'-'+user_auth['type_user']
        return user_auth['_id'], user_auth['type_user']
    else:
        print 'No user'
        return 'Login or password invalid'

"""FUNCTIONS CRUD CONTACTS"""

#   input: contact info and user_id that owner contact
#   output: OK
def insertContact(user_id, contact_json):
    return ''

#   input: contact id and user_id that owner contact
#   output: OK
def removeContact(user_id, contact_id):
    return ''

#   input: contact update info and user_id that owner contact
#   output: OK
def updateContact(user_id, contact_update_json):
    return ''

#   input: user_id that owner contacts
#   output: list of contacts
def listContacts(user_id):
    return ''

"""UTIL FUNCTIONS"""

#function generate id with composition of ascii number of username and password characters
def generateID(username, password):
    for char in username:
        user_id = user_id+str(ord(char))
    for char in password
        user_id = user_id+str(ord(char))

    print 'check generate key : '+user_id

    return user_id
