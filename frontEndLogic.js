const baseLat = 275;
const baseLong = 90;
var curLat = baseLat;
var curLong = baseLong;
var lat = 0;
var long = 0;
var year = 0;
var month = "None";
var day = 0;
var hour = 0;
var minute = 0;


function resetPos()
{
    document.getElementById("moonModel").setAttribute("camera-orbit", curLat.toString().concat("deg ", curLong.toString(), "deg 700px"));
}

function submitData()
{
    if (document.getElementById("dayBox").value != "Day"){
        fetch("http://localhost:5000/getInfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({"year": document.getElementById("yearBox").value, "month": document.getElementById("monthBox").value, "day": document.getElementById("dayBox").value}),
        })
            .then(response => response.json())
            .then(data => { 
                for (i in data){
                    if (data[i]==null){
                        document.getElementById("data").innerHTML+=i+": Unknown</br></br>"
                    }else{
                    document.getElementById("data").innerHTML+=i+": "+data[i]+"</br></br>"
                    }
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }
}



function clearSelection()
{
    curLat = baseLat;
    curLong = baseLong;
    resetPos();
    document.getElementById("data").innerHTML = ""
    document.getElementById("dayBox").innerHTML = '<option default selected class="option-selected">Day</option>'
    document.getElementById("monthBox").innerHTML = '<option default selected class="option-selected">Month</option>'
    document.getElementById("yearBox").innerHTML = '<option default selected class="option-selected">Year</option>'

    fetch("http://localhost:5000/getYear", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify({}),
    })
        .then(response => response.json())
        .then(data => { 
            for (i in data.years){
                document.getElementById("yearBox").innerHTML+='<option class="option-selected">'+data.years[i].toString()+'</option>'
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function yearSelected(){
    if (document.getElementById("yearBox").value != "Year"){
        fetch("http://localhost:5000/getMonthFromYear", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({"year": document.getElementById("yearBox").value}),
        })
            .then(response => response.json())
            .then(data => { 
                document.getElementById("monthBox").innerHTML = '<option default selected class="option-selected">Month</option>'
                for (i in data.months){
                    document.getElementById("monthBox").innerHTML+='<option class="option-selected">'+data.months[i].toString()+'</option>'
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }
}

function monthSelected(){
    if (document.getElementById("monthBox").value != "Month"){
        fetch("http://localhost:5000/getDayFromMonthYear", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({"year": document.getElementById("yearBox").value, "month": document.getElementById("monthBox").value}),
        })
            .then(response => response.json())
            .then(data => { 
                document.getElementById("dayBox").innerHTML = '<option default selected class="option-selected">Day</option>'
                for (i in data.days){
                    document.getElementById("dayBox").innerHTML+='<option class="option-selected">'+data.days[i].toString()+'</option>'
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }
}