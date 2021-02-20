from flask import Flask, request, redirect, jsonify
import mysql.connector

app = Flask(__name__)

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="SpotifySongs"
)
mycursor = mydb.cursor()

@app.route("/apiSearch", methods=['GET'])
def apiSearch():
    if request.method == 'GET':
        params = request.args
        q = params.get('q', None)
        relation = params.get('relation', 'track')
        if q:
            #add into our database
            #return a JSON response of images
        else 
            return "Please add a search parameter.", 404
    else: 
        return "Invalid HTTP method", 404

@app.route("/track/<track_id>")
def trackProfile():


@app.route("/artist/<artist_id")
def artistProfile():


@app.route("/")
def index():
    return redirect("http://pornhub.com")

if __name__ == '__main__':
    app.run(debug=True)