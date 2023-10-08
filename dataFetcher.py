import pandas as pd
import json
from flask import Flask, request
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app)

df = pd.read_csv("resources/moonquakeData.csv")

@app.route("/getInfo", methods=["POST"])
def getInfo():
    data = request.get_json()
    data = df.loc[(df['Year'] == int(data["year"])) & (df['Month'] == data["month"]) & (df['Day'] == int(data["day"]))].to_dict()
    for i in data:
        data[i] = list(data[i].values())[0]

    if data["Magnitude"]==-1:
        data["Magnitude"]=None

    return json.dumps(data)


@app.route("/getYear", methods=["POST"])
def getYear():
    # Get input from the HTML form
    return json.dumps({"years": list(set(df["Year"]))})

@app.route("/getMonthFromYear", methods=["POST"])
def getMonthFromYear():
    data = request.get_json()
    return json.dumps({"months": list(set(df.loc[df['Year'] == int(data["year"]), 'Month']))})

@app.route("/getDayFromMonthYear", methods=["POST"])
def getDayFromMonthYear():
    data = request.get_json()
    return json.dumps({"days": list(set(df.loc[(df['Year'] == int(data["year"])) & (df['Month'] == data["month"]), 'Day']))})

if __name__ == "__main__":
    app.run(debug=True)