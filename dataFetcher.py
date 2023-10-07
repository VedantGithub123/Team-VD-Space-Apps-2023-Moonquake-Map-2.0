import pandas as pd
import json
from flask import Flask, render_template, request

app = Flask(__name__)

df = pd.read_csv("resources/moonquakeData.csv")

@app.route("/getInfo", methods=["POST"])
def getInfo():
    data = json.loads(request.data.decode("utf-8"))
    # Get input from the HTML form
    data = df.loc[(df['Year'] == 1970) & (df['Month'] == "April") & (df['Day'] == 15)].to_dict()
    for i in data:
        data[i] = data[i][1]

    if data["Magnitude"]==-1:
        data["Magnitude"]=None

    return json.dumps(data)


@app.route("/getYear", methods=["POST"])
def getYear():
    # Get input from the HTML form
    return json.dumps({"years": set(df["Year"])})

@app.route("/getMonthFromYear", methods=["POST"])
def getMonthFromYear():
    data = json.loads(request.data.decode("utf-8"))
    return json.dumps({"months": set(df.loc[df['Year'] == data["year"], 'Month'])})

@app.route("/getDayFromMonthYear", methods=["POST"])
def getDayFromMonthYear():
    data = json.loads(request.data.decode("utf-8"))
    return json.dumps({"days": set(df.loc[(df['Year'] == data["year"]) & (df['Month'] == data["month"]), 'Day'])})

if __name__ == "__main__":
    app.run(debug=True)