let elapsedTime = document.querySelector('.elapsed-time-container');
let lapTime = document.querySelector('.lap-time-container');
let stopMilliSecond = document.querySelector('.stop-milli-second');
let lapMilliSecond = document.querySelector('.lap-milli-second');
let startButton = document.querySelector('.start-button');
let pauseButton = document.querySelector('.pause-button');
let lapButton = document.querySelector('.lap-button');
let continueButton = document.querySelector('.continue-button');
let resetButton = document.querySelector('.reset-button');
let set1Buttons = document.getElementsByClassName('set1');
let set2Buttons = document.getElementsByClassName('set2');
let stopwatchTable = document.getElementsByClassName('stopwatch-table')[0];
let stopwatchTableBody = document.querySelector('.stopwatch-table-body');
let tableButtons = document.querySelector('.stopwatch-table-buttons');
let clearTableData = document.querySelector('.stopwatch-button-primary');
let editTableData = document.querySelector('.stopwatch-edit-button');
let deleteButton = document.querySelector('.stopwatch-delete-button');
let saveButton = document.querySelector('.stopwatch-save-button');
let customAlert = document.querySelector('#custom-alert');
let alertMessage = document.querySelector('.alert-message');
let stopwatchCellRow = document.getElementsByClassName('stopwatch-cell-row');
let stopwatchInputLabel = document.getElementsByClassName('stopwatch-input-label');
let stopwatchInputCheckbox = document.getElementsByClassName('stopwatch-input-checkbox');

const formatNumber = (num) =>{
    let formattedNum = num.toString().padStart(2,'0');
    return formattedNum;
}


let milliSecondInterval;
let timeInterval;
let stopwatchId = 0;
let stopSeconds=0;
let stopMinutes=0;
let stopHours=0;
let stopMilliSeconds = 0;
const runStopWatch = () =>{
    milliSecondInterval = setInterval(()=>{
        stopMilliSeconds += 1;
        stopMilliSecond.innerHTML = stopMilliSeconds;
        if(stopMilliSeconds == 10){
            stopMilliSecond.innerHTML = 0;
            stopMilliSeconds = 0;
        }
    },100);
    
    timeInterval = setInterval(()=>{
        stopSeconds += 1;
        if(stopSeconds == 60){
            stopSeconds = 0;
            stopMinutes += 1;
            if(stopMinutes == 60){
                stopMinutes = 0;
                stopHours += 1;
                if(stopHours == 24){
                    clearInterval(timeInterval);
                }
            }
        }
        elapsedTime.innerHTML = `${formatNumber(stopHours)}:${formatNumber(stopMinutes)}:${formatNumber(stopSeconds)}`;
    },1000);
}


let lapSeconds=0;
let lapMinutes=0;
let lapHours=0;
let lapMilliSeconds = 0;
let lapMilliSecondInterval;
let lapTimeInterval;
const runLapTime = () =>{
    lapMilliSecondInterval = setInterval(()=>{
        lapMilliSeconds += 1;
        lapMilliSecond.innerHTML = lapMilliSeconds;
        if(lapMilliSeconds == 10){
            lapMilliSecond.innerHTML = 0;
            lapMilliSeconds = 0;
        }
    },100);

    lapTimeInterval = setInterval(()=>{
        lapSeconds += 1;
        if(lapSeconds == 60){
            lapSeconds = 0;
            lapMinutes += 1;
            if(lapMinutes == 60){
                lapMinutes = 0;
                lapHours += 1;
                if(lapHours == 24){
                    clearInterval(lapTimeInterval);
                }
            }
        }
        lapTime.innerHTML = `${formatNumber(lapHours)}:${formatNumber(lapMinutes)}:${formatNumber(lapSeconds)}`;
    },1000);
    
}


const resetLapTime = () =>{
    lapTime.innerHTML = '00:00:00';
    lapMilliSecond.innerHTML = 0;
    clearInterval(lapTimeInterval);
    clearInterval(lapMilliSecondInterval);
    lapSeconds = 0;
    lapHours = 0;
    lapMinutes = 0;
    lapMilliSeconds = 0;
}

const resetStopTime = () =>{
    elapsedTime.innerHTML = '00:00:00';
    stopMilliSecond.innerHTML = 0;
    clearInterval(timeInterval);
    clearInterval(milliSecondInterval);
    stopSeconds=0;
    stopMinutes=0;
    stopHours=0;
    stopMilliSeconds = 0;
}

pauseButton.addEventListener('click',()=>{
    if(saveButton.style.display != 'flex' && deleteButton.style.display != 'flex'){
        clearInterval(lapMilliSecondInterval);
        clearInterval(lapTimeInterval);
        clearInterval(milliSecondInterval);
        clearInterval(timeInterval);
        for(let i=0; i<set1Buttons.length; i++){
            set1Buttons[i].style.display = 'none';
            set1Buttons[i].style.position = 'absolute';
        }
        for(let i=0; i<set2Buttons.length; i++){
            set2Buttons[i].style.display = 'flex';
            set2Buttons[i].style.position = 'static';
        }
    }
    else{
        showAlert('Please save the changes');
    }
});

lapButton.addEventListener('click', ()=>{
    if(saveButton.style.display != 'flex' && deleteButton.style.display != 'flex'){
        stopwatchTable.style.visibility = 'visible';
        tableButtons.style.display = 'flex';
        stopwatchTableBody.innerHTML += `<tr class='stopwatch-cell-row'>
        <td>
        <input type='checkbox' class='stopwatch-input-checkbox'/>
        <label for='stopwatch-input-checkbox' class='stopwatch-input-label'>${stopwatchId+1}</label>
        </td>
        <td>${lapTime.innerHTML}.${lapMilliSecond.innerHTML}</td>
        <td>${elapsedTime.innerHTML}.${stopMilliSecond.innerHTML}</td>
        </tr>`
        stopwatchId += 1;
        resetLapTime();
        runLapTime();
    }
    else{
        showAlert('Please save the changes')
    }
});


startButton.addEventListener('click',()=>{
    if(saveButton.style.display != 'flex' && deleteButton.style.display != 'flex'){
        runStopWatch();
        runLapTime();
        startButton.style.display = 'none';
        startButton.style.position = 'absolute';
        for(let i=0; i<set1Buttons.length; i++){
            set1Buttons[i].style.display = 'flex';
            set1Buttons[i].style.position = 'static';
        }
    }
    else{
        showAlert('Please save the changes')
    }
})

continueButton.addEventListener('click', ()=>{
    if(saveButton.style.display != 'flex' && deleteButton.style.display != 'flex'){
        for(let i=0; i<set2Buttons.length; i++){
            set2Buttons[i].style.display = 'none';
            set2Buttons[i].style.position = 'absolute';
        }
        for(let i=0; i<set1Buttons.length; i++){
            set1Buttons[i].style.display = 'flex';
            set1Buttons[i].style.position = 'static';
        }
        runStopWatch();
        runLapTime();
    }
    else{
        showAlert('Please save the changes');
    }
})


resetButton.addEventListener('click',()=>{
    if(saveButton.style.display != 'flex' && deleteButton.style.display != 'flex'){
        stopwatchTable.style.visibility = 'visible';
        tableButtons.style.display = 'flex';
        stopwatchTableBody.innerHTML += `<tr class='stopwatch-cell-row'>
        <td>
        <input type='checkbox' class='stopwatch-input-checkbox'/>
        <label for='stopwatch-input-checkbox' class='stopwatch-input-label'>${stopwatchId+1}</label>
        </td>
        <td>${lapTime.innerHTML}.${lapMilliSecond.innerHTML}</td>
        <td>${elapsedTime.innerHTML}.${stopMilliSecond.innerHTML}</td>
        </tr>`
        stopwatchId += 1;
        for(let i=0; i<set2Buttons.length; i++){
            set2Buttons[i].style.display = 'none';
            set2Buttons[i].style.position = 'absolute';
        }
        startButton.style.display = 'flex';
        startButton.style.position = 'static';
        resetLapTime();
        resetStopTime();
    }
    else{
        showAlert('Please save the changes');
    }
})

const showAlert = (msg) =>{
    customAlert.classList.remove('active');
    alertMessage.innerHTML = msg;
    customAlert.style.display = 'block';
    setTimeout(()=>{
        customAlert.classList.add('active');
    },2500);
    setTimeout(()=>{
        customAlert.style.display = 'none';
    },3000);
}

const disableButtons = () =>{
    clearTableData.style.cursor = 'not-allowed';
    startButton.style.cursor = 'not-allowed';
    continueButton.style.cursor = 'not-allowed';
    lapButton.style.cursor = 'not-allowed';
    pauseButton.style.cursor = 'not-allowed';
    resetButton.style.cursor = 'not-allowed';
}

const enableButtons = () =>{
    clearTableData.style.cursor = 'pointer';
    startButton.style.cursor = 'pointer';
    continueButton.style.cursor = 'pointer';
    lapButton.style.cursor = 'pointer';
    pauseButton.style.cursor = 'pointer';
    resetButton.style.cursor = 'pointer';
}

editTableData.addEventListener('click',(event)=>{
    if(stopwatchId == 0){
        showAlert('You don\'t have any Timers');
    }
    else{
        disableButtons();
        event.preventDefault();
        editTableData.style.display = 'none';
        editTableData.style.position = 'absolute';
        saveButton.style.display='flex';
        saveButton.style.position='static';
    
        let isChecked = 0;
        for(let i=0; i<stopwatchId; i++){
            stopwatchInputCheckbox[i].style.display='inline-block';
            stopwatchInputLabel[i].style.display='none';
            stopwatchInputCheckbox[i].addEventListener('change',(event)=>{
                if(event.target.checked){
                    isChecked += 1;
                    saveButton.style.display = 'none';
                    saveButton.style.position = 'absolute';
                    deleteButton.style.display='flex';
                    deleteButton.style.position='static';
                }
                else{
                    isChecked -= 1;
                    if(isChecked == 0){
                        saveButton.style.display = 'flex';
                        saveButton.style.position = 'static';
                        deleteButton.style.display='none';
                        deleteButton.style.position='absolute';
                    }
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
    for(let i=0; i<stopwatchId; i++){
        stopwatchInputCheckbox[i].checked = false;
        stopwatchInputCheckbox[i].style.display='none';
        stopwatchInputLabel[i].style.display='block';
        stopwatchInputLabel[i].innerHTML = i+1;
    }
})

deleteButton.addEventListener('click',()=>{
    isDeleted = 0;
    for(let i=0; i<stopwatchId; i++){
        if(stopwatchInputCheckbox[i].checked == true){
            stopwatchCellRow[i].remove();
            isDeleted += 1;
            stopwatchId -= 1;
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

    if(stopwatchId==0){
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

    if(stopwatchId == 0){
        showAlert('You don\'t have any Timers');
    }
    else{
        if(saveButton.style.display != 'flex' && deleteButton.style.display != 'flex'){
            for(let i=0; i<stopwatchId; i++){
                stopwatchCellRow[0].remove();
            }
            stopwatchId = 0;
        }
        else{
            showAlert('Please save the changes');
        }
    }

})
