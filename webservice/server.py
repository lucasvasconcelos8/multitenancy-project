# -*- coding: utf-8 -*-
from flask import Flask, render_template,  Response, jsonify, request, make_response,send_file
from flask_restful import Resource,Api
from flask_restful import reqparse
from werkzeug import secure_filename
from datetime import datetime
import json
import sys

reload(sys)
sys.setdefaultencoding('utf-8')


""" commented for test"""
from dao import crudBD

"""-------Flask start e config-------"""
app = Flask(__name__, static_folder='static')

api = Api(app)

app.config['UPLOAD_FOLDER'] = 'uploads/'

app.config['ALLOWED_EXTENSIONS'] = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

parser = reqparse.RequestParser()

@app.route('/')
def log():
    return send_file('templates/index.html')


"""-------Classes do CRUD dos contatos-------"""
list_contatos = []

class InsertContact(Resource):

    @staticmethod
    def post(user_id):

        data = request.data
        contact_json = json.loads(data)['contact_json']


        resp = crudBD.insertContact(user_id, contact_json)

        if(resp == 'Sucess'):
            return 'Success'
        else:
            return 'fail'

class EditContact(Resource):

    @staticmethod
    def post(user_id):

        data = request.data
        contact_json = json.loads(data)['contact_json']


        resp = crudBD.updateContact(user_id, contact_json)

        if(resp == 'Sucess'):
            return 'Success'
        else:
            #print resp
            return 'fail'

class ListContacts(Resource):

    @staticmethod
    def get(user_id):
        
        contacts = crudBD.listContacts(user_id);
        if(len(contacts) > 0):
            return contacts
        else:
            return []

        #return [{'id':'1', 'name':'Igor','email':'igorsbrito93@gmail.com','phone':'85997819696'}, {'id':'1', 'name':'Pedro','email':'pedro01@gmail.com','phone':'8599974597'}]

class RemoveContact(Resource):
    @staticmethod
    def get(contact_id, user_id):

        resp = crudBD.removeContact(user_id,contact_id);

        if(resp == 'Success'):
            return 'Success'
        else:
            return 'fail'

class SearchContacts(Resource):
    @staticmethod
    def get(nome):
      return ''

"""-------Classes de Usuário-------"""
class NewUser(Resource):
    @staticmethod
    def post():
        # get user_json {username, passowrd, email}
        data = request.data
        user_json = json.loads(data)['user_json']

        username = user_json['username']
        password = user_json['password']

        resp = crudBD.criarUsuario(user_json)

        if(resp == "Success"):
            userId = crudBD.generateID(username,password)

            return {'status':'Success', 'id':userId}
        elif(resp == "Already exist user with this username"):
            return {'status':'fail', 'msg':'user alredy exists'}
        else:
            return {'status':'fail', 'msg':'error on the database'}

        return 'sucesso'

class EditUser(Resource):
    @staticmethod
    def get():
        return ''


class ValidateUser(Resource):
    @staticmethod
    def get():
        return ''

class LogIn(Resource):
    @staticmethod
    def get(username, password ):
        resp = crudBD.autenticarUsuario(username, password)

        if (isinstance(resp, tuple)):
            user_id = resp[0]
            user_type = resp[1]
            user_name = resp[2]
            user_option = resp[3]

            return {'status':'Success', 'user_id':resp[0], 'user_type':resp[1], 'user_name': resp[2], 'user_option':resp[3]}
        else:
            return {'status':'fail', 'msg':resp}


"""-------ENDPOINTS-------"""
#api.add_resource(Teste,'/teste/<string:word>', endpoint='teste')
api.add_resource(InsertContact, '/insert/<string:user_id>', endpoint='insertContact')
api.add_resource(EditContact, '/edit/<string:user_id>', endpoint='editContact')
api.add_resource(RemoveContact, '/remove/<string:contact_id>/<string:user_id>',endpoint="removeContact")
api.add_resource(ListContacts,'/list/<string:user_id>',endpoint="listContacts");
api.add_resource(SearchContacts,'/search/<string:name>',endpoint="searchContact")
api.add_resource(NewUser,'/user/new', endpoint='newUser')
api.add_resource(EditUser,'/user/edit', endpoint='editUser')
api.add_resource(ValidateUser, '/user/validate', endpoint='validateUser')
api.add_resource(LogIn,'/login/<string:username>/<string:password>', endpoint='login')


#finish program
app.run(host='0.0.0.0', port=80, debug=True)
