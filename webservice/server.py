# -*- coding: utf-8 -*-
from flask import Flask, render_template,  Response, jsonify, request, make_response
from flask_restful import Resource,Api
from flask_restful import reqparse
from werkzeug import secure_filename
from datetime import datetime

from dao import crudBD

"""-------Flask start e config-------"""
app = Flask(__name__, static_folder='static')

api = Api(app)

app.config['UPLOAD_FOLDER'] = 'uploads/'

app.config['ALLOWED_EXTENSIONS'] = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

parser = reqparse.RequestParser()


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
        return ''

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

class EditUser(Resource):

class ValidateUser(Resource):

"""-------ENDPOINTS-------"""
#api.add_resource(Teste,'/teste/<string:word>', endpoint='teste')
api.add_resource(InsertContact, '/insert', endpoint='insertContact')
api.add_resource(EditContact, '/edit', endpoint='editContact')
api.add_resource(RemoveContact, '/remove/<string:contato_id>',endpoint="removeContact")
api.add_resource(ListContacts,'/list',endpoint="listContacts");
api.add_resource(SearchContacts,'/search/<string:name>',endpoint="searchContact")
api.add_resource(NewUser,'/user/new', endpoint='newUser')
api.add_resource(EditUser,'/user/edit', endpoint='editUser')
api.add_resource(validateUser, '/user/validate', endpoint='validateUser')


#finish program
app.run(host='0.0.0.0', port=80, debug=True)
