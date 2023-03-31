let secondLine = document.querySelector('.second-line');
let minuteLine = document.querySelector('.minute-line');
let hourLine = document.querySelector('.hour-line');
let analogDate = document.querySelector('#box-date');
let analogMonth = document.querySelector('#box-month');
let container1  = document.getElementsByClassName('container1')[0];
let container2  = document.getElementsByClassName('container2')[0];
let second = document.getElementsByClassName('second');
let minute = document.getElementsByClassName('minute');
let hour = document.getElementsByClassName('hour');
let analogButton = document.querySelector('.analog-button');
let digitalButton = document.querySelector('.digital-button');


let analogInterval;

const analogTime = async() =>{
    let response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata');
    let json = await response.json();
    let secondLineDegree = json.datetime.slice(17,19)*6;
    let minuteLineDegree = json.datetime.slice(14,16)*6 + json.datetime.slice(17,19)*0.1;
    let hourLineDegree = json.datetime.slice(11,13)*30 + json.datetime.slice(14,16)*0.5 + json.datetime.slice(17,19)*0.00833;
    secondLine.style.transform = `rotate(${secondLineDegree}deg)`;
    minuteLine.style.transform = `rotate(${minuteLineDegree}deg)`;
    hourLine.style.transform = `rotate(${hourLineDegree}deg)`;
    analogDate.innerHTML = json.datetime.slice(8,10);
    analogMonth.innerHTML = json.datetime.slice(5,7);

    //A minute hand rotates 0.1deg every second and a Hour hand rotates 0.0083deg every second;
    analogInterval = setInterval(()=>{
        console.log('running');
        secondLineDegree += 6;
        minuteLineDegree += 0.1;
        hourLineDegree += 0.0083;
        secondLine.style.transform = `rotate(${secondLineDegree}deg)`;
        minuteLine.style.transform = `rotate(${minuteLineDegree}deg)`;
        hourLine.style.transform = `rotate(${hourLineDegree}deg)`;
        if(secondLineDegree == minuteLineDegree == hourLineDegree){
            clearInterval(analogInterval);
            analogTime();
        }
    },1000)
}

analogTime();


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

let mainCityInterval;
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
    mainCityInterval = setInterval(()=>{
        console.log('running 2');
            let sec = parseInt(second[0].innerHTML);
            let min = parseInt(minute[0].innerHTML);
            let hr = parseInt(hour[0].innerHTML);
            
            sec = sec + 1;
            if(sec>59){
                second[0].innerHTML = "00";
                min += 1;
                if(min>59){
                    minute[0].innerHTML = "00";
                    hr += 1;
                    if(hr>23){
                        mainAreaDetails();
                    }
                    else{
                        hour[0].innerHTML = formatNumber(hr);
                    }
                }
                else{
                    minute[0].innerHTML = formatNumber(min);
                }
            }
            else{
                second[0].innerHTML = formatNumber(sec);
            }
    },1000);
}


digitalButton.addEventListener('click', ()=>{
    container2.style.display = 'none';
    container1.style.display = 'flex';
    clearInterval(mainCityInterval);
    clearInterval(analogInterval);
    mainAreaDetails();
    analogButton.classList.remove('active-button');
    digitalButton.classList.add('active-button');
})

analogButton.addEventListener('click', ()=>{
    container1.style.display = 'none';
    container2.style.display = 'block';
    clearInterval(mainCityInterval);
    clearInterval(analogInterval);
    analogTime();
    digitalButton.classList.remove('active-button');
    analogButton.classList.add('active-button');
})
