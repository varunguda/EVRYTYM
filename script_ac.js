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
let alarmTime = document.getElementsByClassName('alarm-time')[0];
let alarmHour = document.getElementById('alarm-hour');
let alarmMinute = document.getElementById('alarm-minute');
let alarmTable = document.getElementsByClassName('alarm-table')[0];
let alarmTableBody = document.querySelector('.alarm-table-body');
let alarmName = document.querySelector('.alarm-name');
let alarmMusic = document.querySelector('.alarm-musics');
let alarmTone = document.getElementsByClassName('alarm-tone');
let alarmCellRow = document.getElementsByClassName(`alarm-cell-row`);
let alarmCellTime = document.getElementsByClassName(`alarm-cell-time`);
let alarmStart = document.getElementsByClassName('alarm-started');
let isStopped = document.getElementsByClassName(`isStopped`);
let tableButtons = document.querySelector('.table-buttons');
let clearTableData = document.querySelector('.button-primary');
let editTableData = document.querySelector('.edit-button');
let deleteButton = document.querySelector('.delete-button');
let saveButton = document.querySelector('.save-button');
let alarmNum = 1;
let alarmId =1;
let alarmImage = document.getElementById('alarm-image');
let alarmInputCheckbox = document.getElementsByClassName('alarm-input-checkbox');
let alarmInputLabel = document.getElementsByClassName('alarm-input-label');
let defaultTime = document.getElementsByClassName('default-time');
let customAlert = document.getElementById('custom-alert');
let alertMessage = document.getElementsByClassName('alert-message')[0];
let pauseButton = document.querySelector('.pause-button');
let restartButton = document.querySelector('#pause-button');
let stopButton = document.querySelector('#stop-button');


let alertId =0;
const showAlert = (msg) =>{
    // the following commented code works for single notification, in case of multiple alerts popping up at a time, this code updates the msg that is present in the previous alert instaed of adding a new alert.
    // customAlert.classList.remove('active');
    // alertMessage.innerHTML = msg;
    // customAlert.style.display = 'block';
    // setTimeout(()=>{
    //     customAlert.classList.add('active');
    // },2500);
    // setTimeout(()=>{
    //     customAlert.style.display = 'none';
    // },3000);

    let alert = document.createElement('div');
    alert.className = 'alert';
    alert.id = 'custom-alert';
    alert.classList.add(`alert${alertId}`);
    alert.innerHTML = `<div class="alert-message">${msg}</div>`
    document.body.appendChild(alert);
    alertId+=1;// on addition of each element the alertId increases
    let alertElement = document.getElementsByClassName('alert');
    alertElement[alertId-1].style.display = 'block';
    setTimeout(()=>{
        alertElement[0].classList.add('active');// the alert stays for 2.5sec and gets removed; here the '0'th element is removed instead of the 'alertId-1' which makes the first added alert removed first
    },2500);
    setTimeout(()=>{
        alertElement[0].remove();
        alertId -=1;
    },3000);// removes the element after the 'active' animation finishes.
}



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
    let response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata');
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
    let response = await fetch(`https://worldtimeapi.org/api/timezone/${localStorage.getItem('default')}`);
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
    if(minute[0].innerHTML == alarmCellTime[val-1].innerHTML.slice(3,5) && isStopped[val-1].innerHTML == '-'){
        if(hour[0].innerHTML == alarmCellTime[val-1].innerHTML.slice(0,2)){
            alarmMusicFn(val);
            isStopped[val-1].innerHTML = "YES";
            alarmNum+=1;
        }
    }
}

function bgColor(n){
    let bgElement = document.createElement('div');
    bgElement.classList.add('bgc');
    bgElement.style.backgroundColor='#000000ab';
    if(n==1){
        document.body.appendChild(bgElement);
    }
    else if(n==0){
        let bgc = document.querySelector('.bgc');
        if(bgc){
            bgc.remove();
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

    const musicPlay = (music) =>{
        music.play();
        bgColor(1);
        alarmImage.style.display = 'block';
        let tuneInterval = setInterval(()=>{
            if(second[0].innerHTML == 59){
                clearInterval(tuneInterval);
                bgColor(0);
                alarmImage.style.display = 'none';
                music.pause();
            }
        },1000);
        alarmImage.addEventListener('click', ()=>{
            clearInterval(tuneInterval);
            bgColor(0);
            alarmImage.style.display = 'none';
            music.pause();
        });
    }

    if(alarmTone[v-1].innerHTML == 'beeps'){
        musicPlay(beepMusic);
    }
    else if(alarmTone[v-1].innerHTML == 'emergency'){
        musicPlay(emergencyMusic);
    }
    else if(alarmTone[v-1].innerHTML == 'siren'){
        musicPlay(carSirenMusic);
    }
    else if(alarmTone[v-1].innerHTML == 'clock'){
        musicPlay(clockMusic);
    }
    else if(alarmTone[v-1].innerHTML == 'spaceship'){
        musicPlay(spaceMusic);
    }
    else if(alarmTone[v-1].innerHTML == 'schoolbell'){
        musicPlay(schoolMusic);
    }
    else if(alarmTone[v-1].innerHTML == 'risendshine'){
        musicPlay(risenshineMusic);
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

//prevents the div from moving into newline upon pressing 'enter', the content in the div gets saved.
alarmName.addEventListener('keydown',(event)=>{
    if(event.keyCode==13){//13 is the keycode for 'enter' key
        event.preventDefault();
        alarmName.blur();
    }
})


const addAlarm = async() =>{
    let response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata');
    let json = await response.json();
    alarmTableBody.innerHTML += `<tr class='alarm-cell-row'>
    <td class='alarm-id'>
    <input type='checkbox' class='alarm-input-checkbox'/>
    <label for='alarm-input-checkbox' class='alarm-input-label'>${alarmId}</label>
    </td>
    <td>${alarmName.innerHTML}</td>
    <td class='alarm-cell-time'>${alarmHour.value}:${alarmMinute.value}</td>
    <td class='alarm-tone'>${alarmMusic.value}</td>
    <td class='alarm-started'>${json.datetime.slice(11,13)}:${json.datetime.slice(14,16)}</td>
    <td class='isStopped'>-</td>
    </tr>`;
    alarmHour.value= '00';
    alarmMinute.value='00';
    alarmName.innerHTML = 'Alarm';
    alarmId += 1;
}

const addAlarmLocal = async() =>{
    let response = await fetch(`https://worldtimeapi.org/api/timezone/${localStorage.getItem('default')}`);
    let json = await response.json();
    alarmTableBody.innerHTML += `<tr class='alarm-cell-row'>
    <td class='alarm-id'>
    <input type='checkbox' class='alarm-input-checkbox'/>
    <label for='alarm-input-checkbox' class='alarm-input-label'>${alarmId}</label>
    </td>
    <td>${alarmName.innerHTML}</td>
    <td class='alarm-cell-time'>${alarmHour.value}:${alarmMinute.value}</td>
    <td class='alarm-tone'>${alarmMusic.value}</td>
    <td class='alarm-started'>${json.datetime.slice(11,13)}:${json.datetime.slice(14,16)}</td>
    <td class='isStopped'>-</td>
</tr>`;
    alarmId += 1;
    alarmHour.value= '00';
    alarmMinute.value='00';
    alarmName.innerHTML = 'Alarm';
}

setAlarm.addEventListener("click", ()=>{

    if(saveButton.style.visibility != 'visible' && deleteButton.style.visibility != 'visible'){
        alarmTable.style.visibility='visible';//makes the alarm table visible.
    tableButtons.style.visibility = 'visible';

    if(alarmId>1){
        //checks if there exists an alarm already set to that time, if yes, prevents from adding another...
        isSame = false;
        for(let i=1; i<alarmId; i++){
            if(alarmHour.value == alarmCellTime[i-1].innerHTML.slice(0,2)){
                if(alarmMinute.value == alarmCellTime[i-1].innerHTML.slice(3,5)){
                    isSame = true;
                    break;
                }
                else{
                    continue
                }
            }
            else{
                continue
            }
        }

        if(isSame){
            showAlert(`You already have an Alarm set to ${alarmHour.value}:${alarmMinute.value}`);
        }
        else{
            if(localStorage.getItem('default')){
                // window.scrollTo(0,1200);
                alarmTable.scrollIntoView({behavior:'smooth', block:"start"})
                addAlarmLocal();
            }
            else{
                // window.scrollTo(0,1200);
                alarmTable.scrollIntoView({behavior:'smooth', block:"start"})
                addAlarm();
            }
        }
    }
    else{
        if(localStorage.getItem('default')){
            // window.scrollTo(0,1200);
            alarmTable.scrollIntoView({behavior:'smooth', block:"start"})
            addAlarmLocal();
        }
        else{
            // window.scrollTo(0,1200);
            alarmTable.scrollIntoView({behavior:'smooth', block:"start"})
            addAlarm();
        }
    }
    
    }
    else{
        showAlert('Save the Alarm Changes');
    }
})


clearTableData.addEventListener('click',()=>{

    if(alarmId == 1){
        showAlert('There are no Alarms set');
    }
    else{
        if(saveButton.style.visibility != 'visible' && deleteButton.style.visibility != 'visible'){
            for(let i=1; i<alarmId; i++){
                alarmCellRow[0].remove();
            }
            alarmId = 1;
            alarmNum = 1;
        }
        else{
            showAlert('Save the Alarm Changes');
        }
    }

})


const addDefaultAlarmLocal = async(elem) =>{
    let response = await fetch(`https://worldtimeapi.org/api/timezone/${localStorage.getItem('default')}`);
    let json = await response.json();
    alarmTableBody.innerHTML += `<tr class='alarm-cell-row'>
    <td class='alarm-id'>
    <input type='checkbox' class='alarm-input-checkbox'/>
    <label for='alarm-input-checkbox' class='alarm-input-label'>${alarmId}</label>
    </td>
    <td>${alarmName.innerHTML}</td>
    <td class='alarm-cell-time'>0${elem.innerHTML}</td>
    <td class='alarm-tone'>${alarmMusic.value}</td>
    <td class='alarm-started'>${json.datetime.slice(11,13)}:${json.datetime.slice(14,16)}</td>
    <td class='isStopped'>-</td>
</tr>`;
    alarmId += 1;
}

const addDefaultAlarm = async(elem) =>{
    let response = await fetch(`https://worldtimeapi.org/api/timezone/Asia/Kolkata`);
    let json = await response.json();
    alarmTableBody.innerHTML += `<tr class='alarm-cell-row'>
    <td class='alarm-id'>
    <input type='checkbox' class='alarm-input-checkbox'/>
    <label for='alarm-input-checkbox' class='alarm-input-label'>${alarmId}</label>
    </td>
    <td>${alarmName.innerHTML}</td>
    <td class='alarm-cell-time'>0${elem.innerHTML}</td>
    <td class='alarm-tone'>${alarmMusic.value}</td>
    <td class='alarm-started'>${json.datetime.slice(11,13)}:${json.datetime.slice(14,16)}</td>
    <td class='isStopped'>-</td>
</tr>`;
    alarmId += 1;
}

const defaultTimeClick = (elem) =>{

    if(saveButton.style.visibility != 'visible' && deleteButton.style.visibility != 'visible'){
        
    alarmTable.style.visibility='visible';
    tableButtons.style.visibility = 'visible';

    if(alarmId>1){
        //checks if there exists an alarm already set to that time, if yes, prevents from adding another...
        isSame = false;
        for(let i=1; i<alarmId; i++){
            if('0'+elem.innerHTML.slice(0,1) == alarmCellTime[i-1].innerHTML.slice(0,2)){
                if(elem.innerHTML.slice(2,4) == alarmCellTime[i-1].innerHTML.slice(3,5)){
                    isSame = true;
                    break;
                }
                else{
                    continue
                }
            }
            else{
                continue
            }
        }

        if(isSame){
            showAlert(`You already have an Alarm set to ${elem.innerHTML}`);
        }
        else{
            if(localStorage.getItem('default')){
                // window.scrollTo(0,1200);
                alarmTable.scrollIntoView({behavior:'smooth', block:"start"})
                addDefaultAlarmLocal(elem);
            }
            else{
                // window.scrollTo(0,1200);
                alarmTable.scrollIntoView({behavior:'smooth', block:"start"})
                addDefaultAlarm(elem);
            }
        }
    }
    else{
        if(localStorage.getItem('default')){
            // window.scrollTo(0,1200);
            alarmTable.scrollIntoView({behavior:'smooth', block:"start"})
            addDefaultAlarmLocal(elem);
        }
        else{
            // window.scrollTo(0,1200);
            alarmTable.scrollIntoView({behavior:'smooth', block:"start"})
            addDefaultAlarm(elem);
        }
    }
    }
    else{
        showAlert('Save the Alarm Changes');
    }
}


const disableButtons = () =>{
    for(let i=0; i<defaultTime.length; i++){
        defaultTime[i].style.cursor = 'not-allowed';
    }
    clearTableData.style.cursor = 'not-allowed';
    setAlarm.style.cursor = 'not-allowed';
}

const enableButtons = () =>{
    for(let i=0; i<defaultTime.length; i++){
        defaultTime[i].style.cursor = 'pointer';
    }
    clearTableData.style.cursor = 'pointer';
    setAlarm.style.cursor = 'pointer';
}

editTableData.addEventListener('click',(event)=>{

    if(alarmId == 1){
        showAlert('There are no Alarms set');
    }
    else{
        disableButtons();
    
        event.preventDefault();
        editTableData.style.visibility = 'hidden';
        saveButton.style.visibility='visible';
        saveButton.style.position='static';
    
        let isChecked = 0;
        for(let i=1; i<alarmId; i++){
            alarmInputCheckbox[i-1].style.display='inline-block';
            alarmInputLabel[i-1].style.display='none';
            alarmInputCheckbox[i-1].addEventListener('change',(event)=>{
                if(event.target.checked){
                    isChecked += 1;
                    saveButton.style.visibility = 'hidden';
                    deleteButton.style.visibility='visible';
                    deleteButton.style.position='static';
                }
                else{
                    isChecked -= 1;
                    if(isChecked == 0){
                        saveButton.style.visibility = 'visible';
                        deleteButton.style.visibility='hidden';
                        deleteButton.style.position='absolute';
                    }
                }
            })
        }
    }

});


saveButton.addEventListener('click',()=>{

    enableButtons();

    saveButton.style.visibility = 'hidden';
    saveButton.style.position='absolute';
    editTableData.style.visibility = 'visible';
    for(let i=1; i<alarmId; i++){
        alarmInputCheckbox[i-1].checked = false;
        alarmInputCheckbox[i-1].style.display='none';
        alarmInputLabel[i-1].style.display='block';
        alarmInputLabel[i-1].innerHTML = i;
    }
})

deleteButton.addEventListener('click',()=>{
    isDeleted = 0;
    for(let i=1; i<alarmId; i++){
        if(alarmInputCheckbox[i-1].checked == true){
            alarmCellRow[i-1].remove();
            isDeleted += 1;
            alarmId -= 1;
            i-=1;
        }
    }
    if(isDeleted){
        if(isDeleted>1){
            showAlert(`Successfully deleted ${isDeleted} Alarms`);
        }
        else{
            showAlert(`Successfully deleted an Alarm`);
        }
    }

    if(alarmId==1){
        enableButtons();
        deleteButton.style.visibility = 'hidden';
        deleteButton.style.position='absolute';
        saveButton.style.position='absolute';
        editTableData.style.visibility = 'visible';
    }
    else{
        deleteButton.style.visibility = 'hidden';
        deleteButton.style.position='absolute';
        saveButton.style.visibility = 'visible';
    }
})
