import os
from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
import json
# Initialize Flask App
app = Flask(__name__)
# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()
cards_ref = db.collection('cards')

# temporary - remove later
# @app.route('/')
# def home():
#     print('home')
#     return jsonify({"home/get": True}), 200

@app.route('/add', methods = ['POST'])
def add():
    try:
        id = request.json['id']
        cards_ref.document(id).set(request.json)
        return jsonify({"success": True}), 200 
    except Exception as e:
        return f"An Error Occured: {e}"
    

@app.route('/read', methods = ['GET'])
def read():
    id = request.args.get('id')    
    if id:
        card = cards_ref.document(id).get()
        return jsonify(card.to_dict()), 200
    else:
        all_cards = [doc.to_dict() for doc in cards_ref.stream()]
        return jsonify(all_cards), 200

@app.route('/delete', methods=['GET', 'DELETE'])
def delete():
    try:
        id = request.args.get('id')
        cards_ref.document(id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

if __name__ == '__main__':
    app.run(debug = True)