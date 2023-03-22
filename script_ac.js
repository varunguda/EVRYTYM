let navbar = document.getElementsByClassName('navbar')[0];
let container1 = document.getElementsByClassName('container1')[0];
let cityTime = document.getElementsByClassName('city-time');
let mainContainer = document.getElementsByClassName('maincontainer');
let time = document.getElementsByClassName('time')[0];
let hour = document.getElementsByClassName('hour');
let minute = document.getElementsByClassName('minute');
let second = document.getElementsByClassName('second');
let city = document.getElementsByClassName('city');
let navbarSecond = document.getElementsByClassName('navbar-secondary')[0];
let setAlarm = document.getElementsByClassName('set-alarm')[0];
let alarmHour = document.getElementById('alarm-hour');
let alarmMinute = document.getElementById('alarm-minute');
let alarmTable = document.getElementsByClassName('alarm-table')[0];
let alarmTableBody = document.querySelector('.alarm-table-body');
let alarmName = document.querySelector('.alarm-name');
let alarmMusic = document.querySelector('.alarm-musics');
let alarmTone = document.getElementsByClassName('alarm-tone');
let alarmCellRow = document.getElementsByClassName(`alarm-cell-row`);
let alarmCellTime = document.getElementsByClassName(`alarm-cell-time`);
let isStopped = document.getElementsByClassName(`isStopped`);
let tableButtons = document.querySelector('.table-buttons');
let clearTableData = document.querySelector('.button-primary');
let editTableData = document.querySelector('.button-secondary');
let alarmNum = 1;
let alarmId =1;
let alarmImage = document.getElementById('alarm-image');


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

function formatNumber(num) {
    let formattedNum = num.toString().padStart(2, '0');
    return formattedNum;
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

        if(alarmId>1){
            for(let j=alarmNum;j<alarmId;j++){
                ringAlarm(j);
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

        if(alarmId>1){
            for(let j=alarmNum;j<alarmId;j++){
                ringAlarm(j);
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


const ringAlarm = (val) =>{
    if(minute[0].innerHTML == alarmCellTime[val-1].innerHTML.slice(3,5)){
        if(hour[0].innerHTML == alarmCellTime[val-1].innerHTML.slice(0,2)){
            alarmMusicFn(val);
            isStopped[val-1].innerHTML = "YES";
            alarmNum+=1;
        }
    }
}

const alarmMusicFn = (v) =>{
    let beepMusic = new Audio('https://nf1f8200-a.akamaihd.net/downloads/ringtones/files/mp3/twirling-intime-lenovo-k8-note-alarm-tone-41440.mp3');
    let emergencyMusic = new Audio('audios/delta-7-evacuation-siren-22510.mp3');
    let carSirenMusic = new Audio('audios/alarm-car-or-home-62554.mp3');
    let clockMusic = new Audio('audios/the-clock-strickes-twelve-o-clock-nature-sounds-7806.mp3');
    let schoolMusic = new Audio('audios/SCHOOL BELL SOUND.mp3');
    let spaceMusic = new Audio('audios/mixkit-spaceship-alarm-998.wav');
    let risenshineMusic = new Audio('audios/Vivo Y91 Alarm - Morning Alarm.mp3');

    if(alarmTone[v-1].innerHTML == 'beeps'){
        beepMusic.play();
        alarmImage.style.visibility='visible';
        alarmImage.addEventListener('click', ()=>{
            alarmImage.style.visibility = 'hidden';
            beepMusic.pause();
        })
    }
    else if(alarmTone[v-1].innerHTML == 'emergency'){
        emergencyMusic.play();
        alarmImage.style.visibility='visible';
        alarmImage.addEventListener('click', ()=>{
            alarmImage.style.visibility = 'hidden';
            emergencyMusic.pause();
        })
    }
    else if(alarmTone[v-1].innerHTML == 'siren'){
        carSirenMusic.play();
        alarmImage.style.visibility='visible';
        alarmImage.addEventListener('click', ()=>{
            alarmImage.style.visibility = 'hidden';
            carSirenMusic.pause();
        })
    }
    else if(alarmTone[v-1].innerHTML == 'clock'){
        clockMusic.play();
        alarmImage.style.visibility='visible';
        alarmImage.addEventListener('click', ()=>{
            alarmImage.style.visibility = 'hidden';
            clockMusic.pause();
        })
    }
    else if(alarmTone[v-1].innerHTML == 'spaceship'){
        spaceMusic.play();
        alarmImage.style.visibility='visible';
        alarmImage.addEventListener('click', ()=>{
            alarmImage.style.visibility = 'hidden';
            spaceMusic.pause();
        })
    }
    else if(alarmTone[v-1].innerHTML == 'schoolbell'){
        schoolMusic.play();
        alarmImage.style.visibility='visible';
        alarmImage.addEventListener('click', ()=>{
            alarmImage.style.visibility = 'hidden';
            schoolMusic.pause();
        })
    }
    else if(alarmTone[v-1].innerHTML == 'risendshine'){
        risenshineMusic.play();
        alarmImage.style.visibility='visible';
        alarmImage.addEventListener('click', ()=>{
            alarmImage.style.visibility = 'hidden';
            risenshineMusic.pause();
        })
    }
}


//Makes the navbar invisible upon scrolling a certain height(40vh in this case) and makes it visible again upon scrolling up.
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


alarmName.addEventListener('keydown',(e)=>{
    if(e.keyCode==13){
        e.preventDefault();
        alarmName.blur();
    }
})

const addAlarm = async() =>{
    if(alarmId>1){
        for(let i=1; i<alarmId; i++){
            if(alarmHour.value == alarmCellTime[i-1].innerHTML.slice(0,2)){
                if(alarmMinute.value == alarmCellTime[i-1].innerHTML.slice(3,5)){
                    console.log('already have');
                    break
                }
            }
        }
    }
    let response = await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata')
    let json = await response.json();
    alarmTableBody.innerHTML += `<tr class='alarm-cell-row'>
    <td>${alarmId}</td>
    <td>${alarmName.innerHTML}</td>
    <td class='alarm-cell-time'>${alarmHour.value}:${alarmMinute.value}</td>
    <td class='alarm-tone'>${alarmMusic.value}</td>
    <td>${json.datetime.slice(11,13)}:${json.datetime.slice(14,16)}</td>
    <td class='isStopped'>-</td>
</tr>`;
    alarmId += 1;
    alarmHour.value= '00';
    alarmMinute.value='00';
    alarmName.innerHTML = 'Alarm';
}

const addAlarmLocal = async() =>{
    if(alarmId>1){
        for(let i=1; i<alarmId; i++){
            if(alarmHour.value == alarmCellTime[i-1].innerHTML.slice(0,2)){
                if(alarmMinute.value == alarmCellTime[i-1].innerHTML.slice(3,5)){
                    console.log('already have');
                    break
                }
            }
        }
    }
    let response = await fetch(`http://worldtimeapi.org/api/timezone/${localStorage.getItem('default')}`)
    let json = await response.json();
    alarmTableBody.innerHTML += `<tr class='alarm-cell-row'>
    <td>${alarmId}</td>
    <td>${alarmName.innerHTML}</td>
    <td class='alarm-cell-time'>${alarmHour.value}:${alarmMinute.value}</td>
    <td class='alarm-tone'>${alarmMusic.value}</td>
    <td>${json.datetime.slice(11,13)}:${json.datetime.slice(14,16)}</td>
    <td class='isStopped'>-</td>
</tr>`;
    alarmId += 1;
    alarmHour.value= '00';
    alarmMinute.value='00';
    alarmName.innerHTML = 'Alarm';
}


setAlarm.addEventListener("click", ()=>{
    alarmTable.style.visibility='visible';//makes the alarm table visible.
    tableButtons.style.visibility = 'visible';
    window.scrollTo(0,1200);
    if(localStorage.getItem('default')){
        addAlarmLocal();
    }
    else{
        addAlarm();//adds an alarm to the table
    }
})


clearTableData.addEventListener('click',()=>{
    for(let i=1; i<alarmId; i++){
        alarmCellRow[0].remove();
    }
    alarmId = 1;
})


const addDefaultAlarmLocal = async(elem) =>{
    if(alarmId>1){
        for(let i=1; i<alarmId; i++){
            if('0'+elem.innerHTML.slice(0,1) == alarmCellTime[i-1].innerHTML.slice(0,2)){
                if(elem.innerHTML.slice(2,4) == alarmCellTime[i-1].innerHTML.slice(3,5)){
                    console.log('already have');
                    break;
                }
            }
        }
    }
    let response = await fetch(`http://worldtimeapi.org/api/timezone/${localStorage.getItem('default')}`);
    let json = await response.json();
    alarmTableBody.innerHTML += `<tr class='alarm-cell-row'>
    <td>${alarmId}</td>
    <td>${alarmName.innerHTML}</td>
    <td class='alarm-cell-time'>0${elem.innerHTML}</td>
    <td class='alarm-tone'>${alarmMusic.value}</td>
    <td>${json.datetime.slice(11,13)}:${json.datetime.slice(14,16)}</td>
    <td class='isStopped'>-</td>
</tr>`;
    alarmId += 1;
}

const addDefaultAlarm = async(elem) =>{
    if(alarmId>1){
        for(let i=1; i<alarmId; i++){
            if('0'+elem.innerHTML.slice(0,1) == alarmCellTime[i-1].innerHTML.slice(0,2)){
                if(elem.innerHTML.slice(2,4) == alarmCellTime[i-1].innerHTML.slice(3,5)){
                    console.log('already have');
                    break;
                }
            }
        }
    }
    let response = await fetch(`http://worldtimeapi.org/api/timezone/Asia/Kolkata`);
    let json = await response.json();
    alarmTableBody.innerHTML += `<tr class='alarm-cell-row'>
    <td>${alarmId}</td>
    <td>${alarmName.innerHTML}</td>
    <td class='alarm-cell-time'>0${elem.innerHTML}</td>
    <td class='alarm-tone'>${alarmMusic.value}</td>
    <td>${json.datetime.slice(11,13)}:${json.datetime.slice(14,16)}</td>
    <td class='isStopped'>-</td>
</tr>`;
    alarmId += 1;
}

const defaultTimeClick = (elem) =>{
    alarmTable.style.visibility='visible';
    tableButtons.style.visibility = 'visible';
    window.scrollTo(0,1200);
    if(localStorage.getItem('default')){
        if(alarmId>1){
            for(let i=1; i<alarmId; i++){
                if('0'+elem.innerHTML.slice(0,1) == alarmCellTime[i-1].innerHTML.slice(0,2)){
                    if(elem.innerHTML.slice(2,4) == alarmCellTime[i-1].innerHTML.slice(3,5)){
                        console.log('already have');
                        break;
                    }
                }
            }
        }
        else{
            addDefaultAlarmLocal(elem);
        }
    }
    else{
        addDefaultAlarm(elem);//adds an alarm to the table
    }
}