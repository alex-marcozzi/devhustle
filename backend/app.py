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
mail_ref  = db.collection('mail')

@app.route('/addCard', methods = ['POST'])
def addCard():
    """
    Adds a card to the database and gives it an arbitrary ID value.

    Request format:
    {
        type: 'project'  (string, should be either 'project' or 'teammate'),
        email: 'johndoe@gmail.com'  (string, should be the email of the card's creator),
        title: 'Cool Project'  (string),
        school: 'University of Placeholder'  (string),
        roles: ['backend', 'frontend', etc.]  (array of strings, should be preset choices),
        description: 'Project description goes here.'  (string),
        timezone: 'EST'  (string, should be preset choices),
        tags: ['education', 'social', 'entertainment']  (array of strings, should be preset choices)
    }
    """
    try:
        doc = cards_ref.document()
        request.json.update({'id': doc.id})
        doc.set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/getCard', methods = ['GET'])
def getCard():
    """
    Gets cards.

    If an ID is specified in the request, the card with that ID will be returned.
    If instead an email is specified in the request, a list of all cards created by that email will be returned.
    Otherwise, a list of all cards in the database is returned.
    """

    id = request.args.get('id')
    email = request.args.get('email')
    if id:
        card = cards_ref.document(id).get()
        return jsonify(card.to_dict()), 200
    elif email:
        all_cards = [doc.to_dict() for doc in cards_ref.stream() if ('email' in doc.to_dict() and doc.to_dict()['email'] == email)]
        return jsonify(all_cards), 200
    else:
        all_cards = [doc.to_dict() for doc in cards_ref.stream()]
        return jsonify(all_cards), 200

@app.route('/deleteCard', methods=['GET', 'DELETE'])
def deleteCard():
    """
    Deletes the card specified by the ID in the request.
    """

    print(request.json)
    try:
        id = request.json['id']
        cards_ref.document(id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route('/updateCard', methods=['POST', 'PUT'])
def update():
    """
    Updates / overwrites the card specified by the ID in the request.
    """

    try:
        id = request.json['id']
        cards_ref.document(id).set(request.json)  # update method didn't work for some reason
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"
@app.route('/sendEmail', methods=['POST'])
def sendEmail():
    """
    Format for requests to be sent to this route:
    {
        to: ['person1@gmail.com', 'person2@gmail.com', ...]  (array of strings),
        name: 'Firstname Lastname'  (string),
        text: 'Body text of the email goes here.'  (string)
    }

    JSON format required by Firebase to send emails:
    to: ['someone@example.com'],
    message: {
    subject: 'Hello from Firebase!',
    text: 'This is the plaintext section of the email body.',
    html: 'This is the <code>HTML</code> section of the email body.',
    }
    """

    try:
        to = request.json['to']
        subject = request.json['name'] + ' wants to work together!'
        text = request.json['text']
        mail_ref.add({'to': to, 'message': {'subject': subject, 'text': text}})
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

if __name__ == '__main__':
    app.run(debug = True)