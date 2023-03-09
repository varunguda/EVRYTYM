let container1 = document.getElementsByClassName('container1')[0];
let container2 = document.getElementsByClassName('container2')[0];
let cityTime = document.getElementsByClassName('city-time');
let mainContainer = document.getElementsByClassName('maincontainer');
let time = document.getElementsByClassName('time')[0];
let hour = document.getElementsByClassName('hour')[0];
let minute = document.getElementsByClassName('minute')[0];
let second = document.getElementsByClassName('second')[0];
let city = document.getElementsByClassName('city');


function month(num){
    if(num==1){
        return "January";
    }
    else if(num==2){
        return "February";
    }
    else if(num==3){
        return "March";
    }
    else if(num==4){
        return "April";
    }
    else if(num==5){
        return "May";
    }
    else if(num==6){
        return "June";
    }
    else if(num==7){
        return "July";
    }
    else if(num==8){
        return "August";
    }
    else if(num==9){
        return "September";
    }
    else if(num==10){
        return "October";
    }
    else if(num==11){
        return "November";
    }
    else if(num==12){
        return "December";
    }
    else{
        return;
    }
}


async function mainAreaDetails(){
    let response = await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
    let json = await response.json();
    ihtml = "";
    ihtml = ` <div class="date-day">
    <div class="day">${days[json.day_of_week]},&nbsp;</div>
    <div class="date">${month(json.datetime.slice(5,7))} ${json.datetime.slice(8,10)}, ${json.datetime.slice(0,4)}</div>
</div>
<div class="time">
    <div class="hour">${json.datetime.slice(11,13)}</div>
    <div class="seperator">:</div>
    <div class="minute">${json.datetime.slice(14,16)}</div>
    <div class="seperator">:</div>
    <div class="second">${json.datetime.slice(17,19)}</div>
</div>
<div class="area">${json.timezone}</div>`
    container1.innerHTML = ihtml;
}
setInterval(()=>{
    mainAreaDetails();
},500);



async function timezones(){
    let response = await fetch('http://worldtimeapi.org/api/timezone');
    const json = await response.json();
    return json;
}


let days = [0,"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
async function timezoneFetch(arr){
    container2.innerHTML = "";
    for(let val of arr){
        let response = await fetch(`http://worldtimeapi.org/api/timezone/${val}`);
        let json = await response.json();
        let data = await json;
        let ihtml = "";
        ihtml += `<div class="area-time">
            <div class="city" onclick="cityClick()">${data.timezone}</div>
            <div class="citydetails">
                <div class="city-time">
                </div>
            </div>
            </div>`
        container2.innerHTML += ihtml;
        }
}
        

async function timeFetch(arr){
    for(let val in arr){
        let response = await fetch(`http://worldtimeapi.org/api/timezone/${arr[val]}`);
        let json = await response.json();
        let dataInner = await json;
        cityTime[val].innerHTML = "";
        let jhtml = "";
        jhtml = `<div class="city-day">${days[dataInner.day_of_week]}-&nbsp;</div>
            <div class="city-hour">${dataInner.datetime.slice(11,13)}</div>
            <div class="seperator">:</div>
            <div class="city-minute">${dataInner.datetime.slice(14,16)}</div>`
        cityTime[val].innerHTML += jhtml;
    }
}

async function main1(){
    let a = await timezones();
    timezoneFetch(a);
    setInterval(()=>{
        timeFetch(a);
    },1000);
}
main1();


function cityClick(){
    console.log("clicked")
}
