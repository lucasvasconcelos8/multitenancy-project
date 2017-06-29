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

class InserirContato(Resource):

    @staticmethod
    def post():
        return ''

class EditarContato(Resource):

    @staticmethod
    def post():
        return ''

class ListarContatos(Resource):

    @staticmethod
    def get():
        return ''

class RemoverContato(Resource):
    @staticmethod
    def get(contato_id):
      return ''

#Busca apenas por nome por enquanto
class BuscarContatos(Resource):
    @staticmethod
    def get(nome):
      return ''

"""-------Classes de Usuário-------"""
class NovoUsuario(Resource):

class EditarUsuario(Resource):

class AutenticarUsuario(Resource):

"""-------ENDPOINTS-------"""
#api.add_resource(Teste,'/teste/<string:word>', endpoint='teste')
api.add_resource(InserirContato, '/inserir', endpoint='inserirContato')
api.add_resource(EditarContato, '/editar', endpoint='EditarContato')
api.add_resource(RemoverContato, '/remover/<string:contato_id>',endpoint="RemoverContato")
api.add_resource(ListarContatos,'/listar',endpoint="ListarContatos");
api.add_resource(BuscarContatos,'/buscar/<string:nome>',endpoint="BuscarContato")
api.add_resource(NovoUsuario,'/usuario/novo', endpoint='novoUsuario')
api.add_resource(EditarUsuario,'/usuario/editar', endpoint='editarUsuario')
api.add_resource(AutenticarUsuario, '/usuario/autenticar', endpoint='autenticarUsuario')


#finish program
app.run(host='0.0.0.0', port=80, debug=True)
