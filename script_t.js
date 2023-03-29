
let progressBar = document.querySelector('.timer-progress');
let progressRate = document.querySelector('.progress-number');
let defaultTime = document.getElementsByClassName('default-time');
let alarmMusics = document.querySelector('.alarm-musics');
let alarmImage = document.querySelector('#alarm-image');
let timerName =document.querySelector('.timer-name');
let timerHour = document.querySelector('#hour-dropdown');
let timerMinute = document.querySelector('#minute-dropdown');
let timerSecond = document.querySelector('#second-dropdown');
let setTimer = document.querySelector('.set-timer');


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

const defaultTimeClick = (elem) =>{
    let totalSeconds = timerSecondsGenerator(elem.innerHTML);
    let elapsedSeconds = 0;
    let progressDone = (elapsedSeconds/totalSeconds)*100;
    progressRate.innerHTML = Math.floor(progressDone)+'%';
    progressBar.style.setProperty('--progress',`${progressDone}%`);
    let defaultProgressInterval = setInterval(()=>{
        elapsedSeconds += 1;
        progressDone = (elapsedSeconds/totalSeconds)*100;
        progressBar.style.setProperty('--progress',`${progressDone}%`);
        progressRate.innerHTML = Math.floor(progressDone) + '%';
        if(progressDone > 50){
            progressRate.style.color = 'white';
        }
        if(elapsedSeconds == totalSeconds){
            clearInterval(defaultProgressInterval);
            alarmMusicFn(alarmMusics.value);
        }
    },1000);
}

//prevents the div from moving into newline upon pressing 'enter', the content in the div gets saved.
timerName.addEventListener('keydown',(event)=>{
    if(event.keyCode==13){//13 is the keycode for 'enter' key
        event.preventDefault();
        timerName.blur();
    }
})


setTimer.addEventListener('click', ()=>{
    let totalSeconds = Number.parseInt(timerHour.value)*3600 + Number.parseInt(timerMinute.value)*60 + Number.parseInt(timerSecond.value);
    let elapsedSeconds = 0;
    let progressDone = (elapsedSeconds/totalSeconds)*100;
    progressRate.innerHTML = Math.floor(progressDone)+'%';
    progressBar.style.setProperty('--progress',`${progressDone}%`);
    let timerInterval = setInterval(()=>{
        elapsedSeconds += 1;
        progressDone = (elapsedSeconds/totalSeconds)*100;
        progressBar.style.setProperty('--progress',`${progressDone}%`);
        progressRate.innerHTML = Math.floor(progressDone) + '%';
        if(progressDone > 50){
            progressRate.style.color = 'white';
        }
        if(elapsedSeconds == totalSeconds){
            clearInterval(timerInterval);
            alarmMusicFn(alarmMusics.value);
            timerHour.value = 0;
            timerMinute.value = 0;
            timerSecond.value = 0;
            timerName.innerHTML = 'Timer';
        }
    },1000)
})