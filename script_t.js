
let container1 = document.querySelector('.container1');
let container2 = document.querySelector('.timer-container');
let progressBar = document.querySelector('.timer-progress');
let progressRate = document.querySelector('.progress-rate');
let defaultTime = document.getElementsByClassName('default-time');
let alarmMusics = document.querySelector('.alarm-musics');
let alarmImage = document.querySelector('#alarm-image');
let timerName =document.querySelector('.timer-name');
let timerHour = document.querySelector('#hour-dropdown');
let timerMinute = document.querySelector('#minute-dropdown');
let timerSecond = document.querySelector('#second-dropdown');
let setTimer = document.querySelector('.set-timer');
let customAlert = document.querySelector('#custom-alert');
let alertMessage = document.querySelector('.alert-message');
let timerTable = document.querySelector('.timer-table');
let timerTableBody = document.querySelector('.timer-table-body');
let timerIsStopped = document.getElementsByClassName('timer-stopped');
let timerButtons = document.querySelector('.timer-buttons');
let pauseButton = document.querySelector('.pause-button');
let restartButton = document.querySelector('#restart-button');
let stopButton = document.querySelector('#stop-button');
let continueButton = document.querySelector('.continue-button');
let timerTableButtons = document.querySelector('.timer-table-buttons');
let editTableData = document.querySelector('.timer-edit-button');
let clearTableData = document.querySelector('.timer-button-primary');
let saveButton = document.querySelector('.timer-save-button');
let deleteButton = document.querySelector('.timer-delete-button');
let timerCellRow = document.getElementsByClassName('timer-cell-row');
let timerInputCheckbox = document.getElementsByClassName('timer-input-checkbox');
let timerInputLabel = document.getElementsByClassName('timer-input-label');
let circle = document.querySelector('.circle');
let circularProgressBar = document.querySelector('.circular-timer-progress');
let timerTime = document.querySelector('.timer-time');

let timerId = 0;

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

function formatNumber(num) {
    let formattedNum = num.toString().padStart(2, '0');
    return formattedNum;
}

const timerSecondsGenerator = (time) =>{
    let val = 0;
    for(let i=0; i<time.length; i++){
        if(time[i]!=' '){
            val+=time[i];
        }
        else{
            if(time[i+1]=='M'){
                val = val*60;
                return Number.parseInt(val);
            }
            else if(time[i+1]=='S'){
                return Number.parseInt(val);
            }
        }
    }
}


const alarmMusicFn = (sound) =>{
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
        let sec = 0;
        let tuneInterval = setInterval(()=>{
            sec += 1;
            if(sec == 60){
                progressBar.style.setProperty('--progress','0%');
                progressRate.innerHTML = '0%';
                circularProgressDone = 0;
                circle.style.setProperty('--circular-progress',`${circularProgressDone}`);
                progressRate.style.color = 'black';
                clearInterval(tuneInterval);
                bgColor(0);
                alarmImage.style.display = 'none';
                music.pause();
            }
        },1000);
        
        alarmImage.addEventListener('click', ()=>{
            progressBar.style.setProperty('--progress','0%');
            progressRate.innerHTML = '0%';
            circularProgressDone = 0;
            circle.style.setProperty('--circular-progress',`${circularProgressDone}`);
            progressRate.style.color = 'black';
            clearInterval(tuneInterval);
            bgColor(0);
            alarmImage.style.display = 'none';
            music.pause();
        });
    }

    if(sound == 'beeps'){
        musicPlay(beepMusic);
    }
    else if(sound == 'emergency'){
        musicPlay(emergencyMusic);
    }
    else if(sound == 'siren'){
        musicPlay(carSirenMusic);
    }
    else if(sound == 'clock'){
        musicPlay(clockMusic);
    }
    else if(sound == 'spaceship'){
        musicPlay(spaceMusic);
    }
    else if(sound == 'schoolbell'){
        musicPlay(schoolMusic);
    }
    else if(sound == 'risendshine'){
        musicPlay(risenshineMusic);
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

const defaultTimeFn = (time) =>{
    let val = 0;
    for(let i=0; i<time.length; i++){
        if(time[i]!=' '){
            val+=time[i];
        }
        else{
            if(time[i+1]=='M'){
                return `00:${formatNumber(Number.parseInt(val))}:00`;
            }
            else if(time[i+1]=='S'){
                return `00:00:${formatNumber(Number.parseInt(val))}`;
            }
        }
    }
}

const getPercentage = (progress) =>{
    let styles = window.getComputedStyle(circle);
    let totalProgressCircular =  styles.getPropertyValue('--total-progress');
    let num = totalProgressCircular * (progress/100);
    return num;
}

let timerContainerInterval;
let sec = 0;
let min = 0;
let hr =  0;
let totalTimer;
const timerTimeFn = (timer) =>{
    sec = Number.parseInt(timer.slice(6,8));
    min = Number.parseInt(timer.slice(3,5));
    hr = Number.parseInt(timer.slice(0,2));
    timerContainerInterval = setInterval(()=>{
        sec -= 1;
        if(sec == -1){
            if(min == 0){
                if(hr == 0){
                    sec = 0;
                }
                else{
                    hr -= 1;
                    min = 59;
                    sec = 59;
                }
            }
            else{
                min -= 1;
                if(min == -1){
                    if(hr == 0){
                        min = 0;
                        sec = 0;
                    }
                    else{
                        hr -= 1;
                        min = 59;
                        sec = 59;
                    }
                }
                else{
                    sec = 59;
                }
            }
        }
        timerTime.innerHTML = `${formatNumber(hr)}:${formatNumber(min)}:${formatNumber(sec)}`;
    },1000)
}

let timerInterval;
let progressDone = 0;
let elapsedSeconds = 0;
let totalSeconds = 0;
let circularProgressDone = 0;
const defaultTimeClick = (elem) =>{
    if(saveButton.style.display != 'flex' && deleteButton.style.display != 'flex'){
        window.scrollTo(0,0);
        container2.style.display = 'none';
        container1.style.display = 'flex';
        timerButtons.style.display = 'flex';
        timerTable.style.visibility = 'visible';
        timerTableButtons.style.display = 'flex';
        timerTableBody.innerHTML += `<tr class='timer-cell-row'>
            <td>
            <input type='checkbox' class='timer-input-checkbox'/>
            <label for='timer-input-checkbox' class='timer-input-label'>${timerId+1}</label>
            </td>
            <td>${timerName.innerHTML}</td>
            <td>${defaultTimeFn(elem.innerHTML)}</td>
            <td>${alarmMusics.value}</td>
            <td class='timer-stopped'>-</td>
            </tr>`
        timerId+=1;
        timerTime.innerHTML = defaultTimeFn(elem.innerHTML);
        totalTimer = timerTime.innerHTML;
        timerTimeFn(timerTime.innerHTML);
        totalSeconds = timerSecondsGenerator(elem.innerHTML);
        elapsedSeconds = 0;
        progressDone = (elapsedSeconds/totalSeconds)*100;
        circularProgressDone = getPercentage(progressDone);
        circle.style.setProperty('--circular-progress',`${circularProgressDone}`);
        progressRate.innerHTML = Math.floor(progressDone)+'%';
        progressBar.style.setProperty('--progress',`${progressDone}%`);
        timerInterval = setInterval(()=>{
            elapsedSeconds += 1;
            progressDone = (elapsedSeconds/totalSeconds)*100;
            progressBar.style.setProperty('--progress',`${progressDone}%`);
            progressRate.innerHTML = Math.floor(progressDone) + '%';
            circularProgressDone = getPercentage(progressDone);
            circle.style.setProperty('--circular-progress',`${circularProgressDone}`);
            if(progressDone > 50){
                progressRate.style.color = 'white';
            }
            if(elapsedSeconds == totalSeconds){
                clearInterval(timerInterval);
                clearInterval(timerContainerInterval);
                alarmMusicFn(alarmMusics.value);
                timerIsStopped[timerId-1].innerHTML = 'YES';
                container1.style.display = 'none';
                timerButtons.style.display = 'none';
                container2.style.display = 'flex';
                window.scrollTo(0,9999);
            }
        },1000);
    }
    else{
        showAlert('Please save the changes');
    }

}

//prevents the div from moving into newline upon pressing 'enter', the content in the div gets saved.
timerName.addEventListener('keydown',(event)=>{
    if(event.keyCode==13){//13 is the keycode for 'enter' key
        event.preventDefault();
        timerName.blur();
    }
})



setTimer.addEventListener('click', ()=>{
    if(saveButton.style.display != 'flex' && deleteButton.style.display != 'flex'){
        if(timerHour.value == 0 && timerMinute.value == 0 && timerSecond.value == 0){
            showAlert('Set the Time first');
        }
        else{
            window.scrollTo(0,0);
            container2.style.display = 'none';
            container1.style.display = 'flex';
            timerButtons.style.display = 'flex';
            timerTable.style.visibility = 'visible';
            timerTableButtons.style.display = 'flex';
            timerTableBody.innerHTML += `<tr class='timer-cell-row'>
            <td>
            <input type='checkbox' class='timer-input-checkbox'/>
            <label for='timer-input-checkbox' class='timer-input-label'>${timerId+1}</label>
            </td>
            <td>${timerName.innerHTML}</td>
            <td>${formatNumber(Number.parseInt(timerHour.value))}:${formatNumber(Number.parseInt(timerMinute.value))}:${formatNumber(Number.parseInt(timerSecond.value))}</td>
            <td>${alarmMusics.value}</td>
            <td class='timer-stopped'>-</td>
            </tr>`
            timerId+=1;
            timerTime.innerHTML = `${formatNumber(Number.parseInt(timerHour.value))}:${formatNumber(Number.parseInt(timerMinute.value))}:${formatNumber(Number.parseInt(timerSecond.value))}`;
            totalTimer = timerTime.innerHTML;
            timerTimeFn(timerTime.innerHTML);
            totalSeconds = Number.parseInt(timerHour.value)*3600 + Number.parseInt(timerMinute.value)*60 + Number.parseInt(timerSecond.value);
            progressDone = (elapsedSeconds/totalSeconds)*100;
            progressRate.innerHTML = Math.floor(progressDone)+'%';
            progressBar.style.setProperty('--progress',`${progressDone}%`);
            circularProgressDone = getPercentage(progressDone);
            circle.style.setProperty('--circular-progress',`${circularProgressDone}`);
            timerInterval = setInterval(()=>{
                elapsedSeconds += 1;
                progressDone = (elapsedSeconds/totalSeconds)*100;
                progressBar.style.setProperty('--progress',`${progressDone}%`);
                progressRate.innerHTML = Math.floor(progressDone) + '%';
                circularProgressDone = getPercentage(progressDone);
                circle.style.setProperty('--circular-progress',`${circularProgressDone}`);
                if(progressDone > 50){
                    progressRate.style.color = 'white';
                }
                if(elapsedSeconds == totalSeconds){
                    clearInterval(timerInterval);
                    clearInterval(timerContainerInterval);
                    alarmMusicFn(alarmMusics.value);
                    timerHour.value = 0;
                    timerMinute.value = 0;
                    timerSecond.value = 0;
                    timerName.innerHTML = 'Timer';
                    timerIsStopped[timerId-1].innerHTML = 'YES';
                    elapsedSeconds = 0;
                    progressDone = 0;
                    totalSeconds = 0;
                    container1.style.display = 'none';
                    timerButtons.style.display = 'none';
                    container2.style.display = 'flex';
                    window.scrollTo(0,9999);
                }
            },1000);
        }
    }
    else{
        showAlert('Please save the changes');
    }
})


pauseButton.addEventListener('click',()=>{
    pauseButton.classList.add('hidden-button');
    continueButton.classList.remove('hidden-button');
    clearInterval(timerContainerInterval);
    clearInterval(timerInterval);
})


continueButton.addEventListener('click',()=>{
    continueButton.classList.add('hidden-button');
    pauseButton.classList.remove('hidden-button');
    if(totalSeconds>0){
        timerInterval = setInterval(()=>{
            elapsedSeconds += 1;
            progressDone = (elapsedSeconds/totalSeconds)*100;
            progressBar.style.setProperty('--progress',`${progressDone}%`);
            progressRate.innerHTML = Math.floor(progressDone) + '%';
            circularProgressDone = getPercentage(progressDone);
            circle.style.setProperty('--circular-progress',`${circularProgressDone}`);
            if(progressDone > 50){
                progressRate.style.color = 'white';
            }
            if(elapsedSeconds == totalSeconds){
                clearInterval(timerInterval);
                clearInterval(timerContainerInterval);
                alarmMusicFn(alarmMusics.value);
                timerHour.value = 0;
                timerMinute.value = 0;
                timerSecond.value = 0;
                timerName.innerHTML = 'Timer';
                timerIsStopped[timerId-1].innerHTML = 'YES';
                elapsedSeconds = 0;
                progressDone = 0;
                totalSeconds = 0;
            }
        },1000);

        timerTimeFn(timerTime.innerHTML);
    }
})


restartButton.addEventListener('click',()=>{
    continueButton.classList.add('hidden-button');
    pauseButton.classList.remove('hidden-button');
    if(totalSeconds>0){
        // Following commented method also works but isn't accurate since we have a interval running and we are changing the elapsed time in between, the interval may have finished almost a second just before we make changes which may result in wrong time, clearing the old Interval and starting a new one is accurate.
        // progressBar.style.setProperty('--progress',`0%`);
        // progressRate.innerHTML = '0%';
        // elapsedSeconds = 0;
        // progressRate.style.color = 'black';

        clearInterval(timerContainerInterval);
        clearInterval(timerInterval);
        timerTime.innerHTML = totalTimer;
        timerTimeFn(totalTimer);
        elapsedSeconds = 0;
        progressRate.style.color = 'black';
        progressDone = (elapsedSeconds/totalSeconds)*100;
        progressRate.innerHTML = Math.floor(progressDone)+'%';
        circularProgressDone = getPercentage(progressDone);
        circle.style.setProperty('--circular-progress',`${circularProgressDone}`);
        progressBar.style.setProperty('--progress',`${progressDone}%`);
        timerInterval = setInterval(()=>{
            elapsedSeconds += 1;
            progressDone = (elapsedSeconds/totalSeconds)*100;
            progressBar.style.setProperty('--progress',`${progressDone}%`);
            progressRate.innerHTML = Math.floor(progressDone) + '%';
            circularProgressDone = getPercentage(progressDone);
            circle.style.setProperty('--circular-progress',`${circularProgressDone}`);
            if(progressDone > 50){
                progressRate.style.color = 'white';
            }
            if(elapsedSeconds == totalSeconds){
                clearInterval(timerInterval);
                clearInterval(timerContainerInterval);
                alarmMusicFn(alarmMusics.value);
                timerHour.value = 0;
                timerMinute.value = 0;
                timerSecond.value = 0;
                timerName.innerHTML = 'Timer';
                timerIsStopped[timerId-1].innerHTML = 'YES';
                elapsedSeconds = 0;
                progressDone = 0;
                totalSeconds = 0;
                container1.style.display = 'none';
                timerButtons.style.display = 'none';
                container2.style.display = 'flex';
            }
        },1000);
    }
})


stopButton.addEventListener('click',()=>{
    clearInterval(timerContainerInterval);
    clearInterval(timerInterval);
    if(totalSeconds>0){
        timerHour.value = 0;
        timerMinute.value = 0;
        timerSecond.value = 0;
        timerName.innerHTML = 'Timer';
        timerIsStopped[timerId-1].innerHTML = 'STOPPED';
        elapsedSeconds = 0;
        progressDone = 0;
        totalSeconds = 0;
        progressBar.style.setProperty('--progress','0%');
        progressRate.innerHTML = Math.floor(progressDone) + '%';
        circularProgressDone = 0;
        circle.style.setProperty('--circular-progress',`${circularProgressDone}`);
        progressRate.style.color = 'black';
        timerTime.innerHTML = '00:00:00';
        container1.style.display = 'none';
        timerButtons.style.display = 'none';
        container2.style.display = 'flex';
        window.scrollTo(0,9999);
    }
})


const disableButtons = () =>{
    clearTableData.style.cursor = 'not-allowed';
    setTimer.style.cursor = 'not-allowed';
    for(let i=0; i<defaultTime.length;i++){
        defaultTime[i].style.cursor = 'not-allowed';
    }
}

const enableButtons = () =>{
    clearTableData.style.cursor = 'pointer';
    setTimer.style.cursor = 'pointer';
    for(let i=0; i<defaultTime.length;i++){
        defaultTime[i].style.cursor = 'pointer';
    }
}


editTableData.addEventListener('click',()=>{
    if(timerId == 0){
        showAlert('You don\'t have any Timers');
    }
    else{
        disableButtons();
        editTableData.style.display = 'none';
        editTableData.style.position = 'absolute';
        saveButton.style.display='flex';
        saveButton.style.position='static';
    
        let isChecked = 0;
        for(let i=0; i<timerId; i++){
            timerInputCheckbox[i].style.display='inline-block';
            timerInputLabel[i].style.display='none';
            timerInputCheckbox[i].addEventListener('change',(event)=>{
                if(event.target.checked){
                    isChecked += 1;
                    saveButton.style.display = 'none';
                    saveButton.style.position = 'absolute';
                    deleteButton.style.display='flex';
                    deleteButton.style.position='static';
                }
                else{
                    isChecked -= 1;
                }
                if(isChecked == 0){
                    saveButton.style.display = 'flex';
                    saveButton.style.position = 'static';
                    deleteButton.style.display='none';
                    deleteButton.style.position='absolute';
                }
            })
        }
    }

});


saveButton.addEventListener('click',()=>{

    enableButtons();

    saveButton.style.display = 'none';
    saveButton.style.position='absolute';
    editTableData.style.display = 'flex';
    editTableData.style.position = 'static';
    for(let i=0; i<timerId; i++){
        timerInputCheckbox[i].checked = false;
        timerInputCheckbox[i].style.display='none';
        timerInputLabel[i].style.display='block';
        timerInputLabel[i].innerHTML = i+1;
    }
})

deleteButton.addEventListener('click',()=>{
    isDeleted = 0;
    for(let i=0; i<timerId; i++){
        if(timerInputCheckbox[i].checked == true){
            timerCellRow[i].remove();
            isDeleted += 1;
            timerId -= 1;
            i-=1;
        }
    }
    if(isDeleted){
        if(isDeleted>1){
            showAlert(`Successfully deleted ${isDeleted} Timers`);
        }
        else{
            showAlert(`Successfully deleted a Timer`);
        }
    }

    if(timerId==0){
        enableButtons();
        deleteButton.style.display = 'none';
        deleteButton.style.position='absolute';
        editTableData.style.display = 'flex';
        editTableData.style.position = 'static';
    }
    else{
        deleteButton.style.display = 'none';
        deleteButton.style.position='absolute';
        saveButton.style.display = 'flex';
        saveButton.style.position = 'static';
    }
})

clearTableData.addEventListener('click',()=>{

    if(timerId == 0){
        showAlert('You don\'t have any Timers');
    }
    else{
        if(saveButton.style.display != 'flex' && deleteButton.style.display != 'flex'){
            for(let i=0; i<timerId; i++){
                timerCellRow[0].remove();
            }
            timerId = 0;
            showAlert('Successfully removed all the Timers');
        }
        else{
            showAlert('Please save the changes');
        }
    }

})
