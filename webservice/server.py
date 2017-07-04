# -*- coding: utf-8 -*-
from flask import Flask, render_template,  Response, jsonify, request, make_response,send_file
from flask_restful import Resource,Api
from flask_restful import reqparse
from werkzeug import secure_filename
from datetime import datetime
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
    def post():
        return ''

class EditContact(Resource):

    @staticmethod
    def post():
        return ''

class ListContacts(Resource):

    @staticmethod
    def get():
        return [{'id':'1', 'name':'Igor','email':'igorsbrito93@gmail.com','phone':'85997819696'}, {'id':'1', 'name':'Pedro','email':'pedro01@gmail.com','phone':'8599974597'}]

class RemoveContact(Resource):
    @staticmethod
    def get(contact_id):
      return ''

class SearchContacts(Resource):
    @staticmethod
    def get(nome):
      return ''

"""-------Classes de Usuário-------"""
class NewUser(Resource):
    @staticmethod
    def get():
        return ''

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
        print username
        print password
        return 'Sucesso'


"""-------ENDPOINTS-------"""
#api.add_resource(Teste,'/teste/<string:word>', endpoint='teste')
api.add_resource(InsertContact, '/insert', endpoint='insertContact')
api.add_resource(EditContact, '/edit', endpoint='editContact')
api.add_resource(RemoveContact, '/remove/<string:contato_id>',endpoint="removeContact")
api.add_resource(ListContacts,'/list',endpoint="listContacts");
api.add_resource(SearchContacts,'/search/<string:name>',endpoint="searchContact")
api.add_resource(NewUser,'/user/new', endpoint='newUser')
api.add_resource(EditUser,'/user/edit', endpoint='editUser')
api.add_resource(ValidateUser, '/user/validate', endpoint='validateUser')
api.add_resource(LogIn,'/login/<string:username>/<string:password>', endpoint='login')


#finish program
app.run(host='0.0.0.0', port=80, debug=True)
