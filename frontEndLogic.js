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
}