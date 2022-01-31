const settingBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const text = document.getElementById('text');
const word = document.getElementById('word');
const scoreEl = document.getElementById('score');
const endGameEl = document.getElementById('end-game-container');
const timeEl = document.getElementById('time');
const settingsForm = document.getElementById('settings-form');
const difficultySelecter = document.getElementById('difficulty');

// list of words in array
const words = [
    'lotion',
    'weather',
    'freedom',
    'games',
    'loosing',
    'withdraw',
    'space',
    'lost',
    'happy',
    'here',
    'there',
    'onee',
    'helloo'
];

let randomWord;
let score = 0;
let time = 10;
let difficulty = localStorage.getItem('difficulty') !== null ? 
localStorage.getItem('difficulty'): 'medium';
// set difficulty select value
difficultySelecter.value = localStorage.getItem('difficulty') !== null ? 
localStorage.getItem('difficulty'): 'medium';
text.focus();
const timeInterval = setInterval(updateTime,1000);

// event listeners
settingBtn.addEventListener('click',displaySettings);
// text.addEventListener('click',randomWordToDom)


// function
function randomWordF(){
    return words[Math.floor(Math.random() * words.length)]
}

 function displaySettings(){
     settings.classList.toggle('hide')
 }
 
//  add Random number to Dom
function randomWordToDom(){
    randomWord = randomWordF();
    word.innerHTML = `
    ${randomWord}
    `
}

text.addEventListener('input', e => {
    const insertedText = e.target.value
    if(insertedText === randomWord){
        randomWordToDom();
        e.target.value ='';
        updateScore();
        if(difficulty === 'hard'){
            time += 2;
        }else if(difficulty === 'medium'){
            time+= 3;
        }else{
            time+=5;
        }
        updateTime();
    }
})

//difficultyLevel
settingsForm.addEventListener('change', e=>{
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty)
})


// score update 
function updateScore(){
    score++;
    scoreEl.innerHTML = `score : ${score}`;
}
function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';
    if(time === 0){
        clearInterval(timeInterval);
        // end Game
        gameOver();
    }
}

function gameOver(){
    endGameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}<p>
    <button onclick = "window.location.reload()">Reload</button>
    `;
    endGameEl.style.display ="flex";
}


randomWordToDom();