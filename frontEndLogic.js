const baseLat = 275;
const baseLong = 90;
var curLat = baseLat;
var curLong = baseLong;


function resetPos()
{
    document.getElementById("moonModel").setAttribute("auto-rotate-delay", 0)
    if (document.getElementById("dayBox").value!="Day"){
        document.getElementById("text").style.display=""
        document.getElementById("moonModel").removeAttribute("auto-rotate");
        document.getElementById("moonModel").setAttribute("camera-orbit", curLat.toString().concat("deg ", curLong.toString(), "deg 700px"));
        document.getElementById("moonModel").classList.add('animate')
        setTimeout(function(){
            document.getElementById("moonModel").classList.remove('animate')
       },2000);
    }
}



function submitData()
{
    if (document.getElementById("dayBox").value != "Day" && document.getElementById("monthBox").value != "Month" && document.getElementById("yearBox").value != "Year"){
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
                document.getElementById("data").innerHTML = ""
                for (i in data){
                    if (data[i]==null){
                        document.getElementById("data").innerHTML+=i+": Unknown</br></br>"
                    }else{
                        document.getElementById("data").innerHTML+=i+": "+data[i]+"</br></br>"
                    }
                }
                curLat = data["Latitude"]+baseLat
                curLong =  data["Longitude"]+baseLong
                resetPos()
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
    document.getElementById("moonModel").setAttribute("auto-rotate", "");
    document.getElementById("text").style.display=""

    document.getElementById("moonModel").setAttribute("auto-rotate-delay", 0)


    change()
    document.getElementById("dayBox").innerHTML = '<option default selected class="option-selected">Day</option>'
    document.getElementById("monthBox").innerHTML = '<option default selected class="option-selected">Month</option>'
    document.getElementById("yearBox").innerHTML = '<option default selected class="option-selected">Year</option>'
    document.getElementById("data").innerHTML = "Latitude: Not Selected<br><br> Longitude: Not Selected<br><br> Year: Not Selected<br><br> Month: Not Selected<br><br> Day: Not Selected<br><br> Hour: Not Selected<br><br> Minute: Not Selected<br><br> Magnitude: Not Selected"

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

function change(){
    document.getElementById("text").style.display="none"
}