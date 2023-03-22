// initializing variables upon DOM manupilation
let navbar = document.getElementsByClassName('navbar')[0];
let container1 = document.getElementsByClassName('container1')[0];
let container2 = document.getElementsByClassName('container2')[0];
let cityTime = document.getElementsByClassName('city-time');
let mainContainer = document.getElementsByClassName('maincontainer');
let time = document.getElementsByClassName('time')[0];
let hour = document.getElementsByClassName('hour');
let minute = document.getElementsByClassName('minute');
let second = document.getElementsByClassName('second');
let city = document.getElementsByClassName('city');
let loader = document.querySelector('.loader');
let containerplaceholder = document.querySelector('.containerplaceholder');
let navbarSecond = document.getElementsByClassName('navbar-secondary')[0];


let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
function month(num,arr){
    for(let i=0; i<arr.length; i++){
        if(i+1 == num){
            return arr[i];
        }
        else{
            continue;
        }
    }
}


let mainCityInterval = null;
let days = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
async function mainAreaDetails(){
    let response = await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
    let json = await response.json();
    ihtml = "";
    ihtml = ` <div class="date-day">
    <div class="day">${days[json.day_of_week]},&nbsp;</div>
    <div class="date">${month(json.datetime.slice(5,7),months)} ${json.datetime.slice(8,10)}, ${json.datetime.slice(0,4)}</div>
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
    navbarSecond.innerHTML = ihtml;
    mainCityInterval = setInterval(()=>{
        for(let i=0; i<2; i++){
            let sec = parseInt(second[i].innerHTML);
            let min = parseInt(minute[i].innerHTML);
            let hr = parseInt(hour[i].innerHTML);
            
            sec = sec + 1;
            if(sec>59){
                second[i].innerHTML = "00";
                min += 1;
                if(min>59){
                    minute[i].innerHTML = "00";
                    hr += 1;
                    if(hr>23){
                        mainAreaDetails();
                    }
                    else{
                        hour[i].innerHTML = formatNumber(hr);
                    }
                }
                else{
                    minute[i].innerHTML = formatNumber(min);
                }
            }
            else{
                second[i].innerHTML = formatNumber(sec);
            }
        }
    },1000);
}

// mainAreaDetails();

let localStorageCityInterval = null;
async function localAreaDetails(){
    let response = await fetch(`http://worldtimeapi.org/api/timezone/${localStorage.getItem('default')}`);
    let json = await response.json();
    ihtml = "";
    ihtml = ` <div class="date-day">
    <div class="day">${days[json.day_of_week]},&nbsp;</div>
    <div class="date">${month(json.datetime.slice(5,7),months)} ${json.datetime.slice(8,10)}, ${json.datetime.slice(0,4)}</div>
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
    navbarSecond.innerHTML = ihtml;
    clearInterval(mainCityInterval);
    clearInterval(localStorageCityInterval);
    localStorageCityInterval = setInterval(()=>{
        for(let i=0; i<2; i++){
            let sec = parseInt(second[i].innerHTML);
            let min = parseInt(minute[i].innerHTML);
            let hr = parseInt(hour[i].innerHTML);
            
            sec = sec + 1;
            if(sec>59){
                second[i].innerHTML = "00";
                min += 1;
                if(min>59){
                    minute[i].innerHTML = "00";
                    hr += 1;
                    if(hr>23){
                        localAreaDetails();
                    }
                    else{
                        hour[i].innerHTML = formatNumber(hr);
                    }
                }
                else{
                    minute[i].innerHTML = formatNumber(min);
                }
            }
            else{
                second[i].innerHTML = formatNumber(sec);
            }
        }
    },1000);
}

if(localStorage.getItem('default')){
    localAreaDetails();
}
else{
    mainAreaDetails();
}



async function timezonesFirst(){
    let response = await fetch('http://worldtimeapi.org/api/timezone');
    const json = await response.json();
    return json.slice(0,99);
}
async function timezonesSecond(){
    let response = await fetch('http://worldtimeapi.org/api/timezone');
    const json = await response.json();
    return json.slice(99,198);
}
async function timezonesThird(){
    let response = await fetch('http://worldtimeapi.org/api/timezone');
    const json = await response.json();
    return json.slice(198,297);
}
async function timezonesFourth(){
    let response = await fetch('http://worldtimeapi.org/api/timezone');
    const json = await response.json();
    return json.slice(297,387);
}



async function timezoneFetch(arr){
    let jsonArray = [];
    for(let val of arr){
        let response = await fetch(`http://worldtimeapi.org/api/timezone/${val}`);
        let json = await response.json();
        jsonArray.push(json);
    }
    return jsonArray;
}


async function addTimezone(arr){
    let data = await timezoneFetch(arr);
    for(let val = 0; val<data.length; val++){
        let ihtml = "";
        ihtml += `<div class="area-time">
            <div class="city" onclick="cityClick(this);">${data[val].timezone}</div>
            <div class="citydetails">
                <div class="city-time">
                <div class="timeplaceholder"></div>
                <div class="timeplaceholder timeplaceholderprimary"></div>
                </div>
            </div>
            </div>`
        container2.innerHTML += ihtml;
    }
}

async function addTimeFirst(arr){
    // let data = await timezoneFetch(arr); //also works but has a delay in updating the time because of await until fetch of every timezone
    for(let val of arr){
        let response = await fetch(`http://worldtimeapi.org/api/timezone/${val}`);
        let json = await response.json();
        let ihtml = "";
        ihtml = `<div class="city-day">${days[json.day_of_week]}-&nbsp;</div>
            <div class="city-hour">${json.datetime.slice(11,13)}</div>
            <div class="seperator">:</div>
            <div class="city-minute">${json.datetime.slice(14,16)}</div>`
        cityTime[arr.indexOf(val)].innerHTML = ihtml;
    }
}

async function addTimeSecond(arr){
    for(let val of arr){
        let response = await fetch(`http://worldtimeapi.org/api/timezone/${val}`);
        let json = await response.json();
        let ihtml = "";
        ihtml = `<div class="city-day">${days[json.day_of_week]}-&nbsp;</div>
            <div class="city-hour">${json.datetime.slice(11,13)}</div>
            <div class="seperator">:</div>
            <div class="city-minute">${json.datetime.slice(14,16)}</div>`
        cityTime[99+arr.indexOf(val)].innerHTML = ihtml;
    }
}

async function addTimeThird(arr){
    for(let val of arr){
        let response = await fetch(`http://worldtimeapi.org/api/timezone/${val}`);
        let json = await response.json();
        let ihtml = "";
        ihtml = `<div class="city-day">${days[json.day_of_week]}-&nbsp;</div>
            <div class="city-hour">${json.datetime.slice(11,13)}</div>
            <div class="seperator">:</div>
            <div class="city-minute">${json.datetime.slice(14,16)}</div>`
        cityTime[198+arr.indexOf(val)].innerHTML = ihtml;
    }
}

async function addTimeFourth(arr){
    for(let val of arr){
        let response = await fetch(`http://worldtimeapi.org/api/timezone/${val}`);
        let json = await response.json();
        let ihtml = "";
        ihtml = `<div class="city-day">${days[json.day_of_week]}-&nbsp;</div>
            <div class="city-hour">${json.datetime.slice(11,13)}</div>
            <div class="seperator">:</div>
            <div class="city-minute">${json.datetime.slice(14,16)}</div>`
        cityTime[297+arr.indexOf(val)].innerHTML = ihtml;
    }
}


async function main1(){
    let a = await timezonesFirst();
    await addTimezone(a);
    setInterval(()=>{
        addTimeFirst(a);
    },900)

    let b = await timezonesSecond();
    await addTimezone(b);
    setInterval(()=>{
        addTimeSecond(b);
    },900);

    let c = await timezonesThird();
    await addTimezone(c);
    setInterval(()=>{
        addTimeThird(c);
    },900);

    let d = await timezonesFourth();
    await addTimezone(d);
    loader.style.display = "none";
    setInterval(()=>{
        addTimeFourth(d);
    },900);
}
main1();


function formatNumber(num) {
    let formattedNum = num.toString().padStart(2, '0');
    return formattedNum;
}

let cityClickInterval = null;
async function cityClick(elem){
    window.scrollTo(0,0);
    localStorage.setItem('default',elem.innerHTML);//LocalStorage is set such that the city location sustain page/browser refresh
    containerplaceholder.style.display = "block";
    let response = await fetch(`http://worldtimeapi.org/api/timezone/${elem.innerHTML}`);
    let json = await response.json();
    containerplaceholder.style.display = "none";
    let ihtml = "";
    ihtml = `<div class="date-day">
    <div class="day">${days[json.day_of_week]},&nbsp;</div>
    <div class="date">${month(json.datetime.slice(5,7),months)} ${json.datetime.slice(8,10)}, ${json.datetime.slice(0,4)}</div>
    </div>
    <div class="time">
        <div class="hour">${json.datetime.slice(11,13)}</div>
        <div class="seperator">:</div>
        <div class="minute">${json.datetime.slice(14,16)}</div>
        <div class="seperator">:</div>
        <div class="second">${json.datetime.slice(17,19)}</div>
    </div>
    <div class="area">${json.timezone}</div>`;
    container1.innerHTML = ihtml;
    navbarSecond.innerHTML = ihtml;

    clearInterval(mainCityInterval);
    clearInterval(localStorageCityInterval);
    clearInterval(cityClickInterval);
    cityClickInterval = setInterval(()=>{
        // console.time()
        for(let i=0; i<2; i++){
            let sec = parseInt(second[i].innerHTML);
            let min = parseInt(minute[i].innerHTML);
            let hr = parseInt(hour[i].innerHTML);
            
            sec = sec + 1;
            if(sec>59){
                second[i].innerHTML = "00";
                min += 1;
                if(min>59){
                    minute[i].innerHTML = "00";
                    hr += 1;
                    if(hr>23){
                        cityClick(elem);
                    }
                    else{
                        hour[i].innerHTML = formatNumber(hr);
                    }
                }
                else{
                    minute[i].innerHTML = formatNumber(min);
                }
            }
            else{
                second[i].innerHTML = formatNumber(sec);
            }
        }
        // console.timeEnd()
    },1000);
}


let prevScrollPositon = window.pageYOffset;
window.addEventListener("scroll",()=>{
    let currentScrollPosition = window.pageYOffset;
    if(prevScrollPositon > currentScrollPosition){
        navbar.classList.remove('navbar-hidden');
        navbarSecond.style.display = "none";
    }
    else if(currentScrollPosition >= 40 * window.innerHeight/100){
        navbar.classList.add('navbar-hidden');
        navbarSecond.style.display = "flex";
    }
    prevScrollPositon = currentScrollPosition;
});


