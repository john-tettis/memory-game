const gameContainer = document.getElementById("game");
const startButton = document.getElementById("start-button");
const timer = document.getElementById("time");
const display = document.getElementById('score').lastChild;
var score = localStorage.getItem('highscore');
var start =false;
var matched = false;



/*const COLORS = [
  "red1",
  "blue1",
  "green1",
  "orange1",
  "purple1",
  "red2",
  "blue2",
  "green2",
  "orange2",
  "purple2"
];
*/

function randomColors(cardAmount){
  var colors=[];
  let increment=cardAmount/2;
  for(let i=0; i<increment; i++){
    let r= Math.floor(Math.random()*226);
    let g= Math.floor(Math.random()*226);
    let b= Math.floor(Math.random()*226);
    colors.push(`rgb(${r},${g},${b})1`);
    colors.push(`rgb(${r},${g},${b})2`);
}
return colors;
} 
let colors = randomColors(10);
let shuffledColors = shuffle(colors);
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

//et shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    newDiv.classList.add('card');
    // give it a class attribute for the value we are looping over
    newDiv.id=color;

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    
    gameContainer.append(newDiv);
    
  }
}
var cards=[];
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked

  console.log("you just clicked", event.target.id);
  if(start===true){
    if(cards.length<2 && !event.target.classList.contains("matched")){
      document.body.style.backgroundColor=event.target.id.slice(0,-1);
      event.target.classList.add('rotate');
      cards.push(event.target.id);
      setTimeout(function(){event.target.style.backgroundColor=event.target.id.slice(0, -1)},600)
      ;
    }
    if(cards.length===2){
      setTimeout(function(){
        console.log(cards)
        if(cards[0]&&cards[1]){
          if(cards[0].slice(0,-1)!==cards[1].slice(0,-1)){
            document.getElementById(cards[0]).classList.toggle('rotate');
            document.getElementById(cards[1]).classList.toggle('rotate');
            setTimeout(function(){
            document.getElementById(cards[0]).style.backgroundColor='#f9de90';
            document.getElementById(cards[1]).style.backgroundColor='#f9de90';
            cards.pop();
            cards.pop();
            },600)
            
          }
          else if(cards[0].slice(0,-1)===cards[1].slice(0,-1)){
            document.getElementById(cards[0]).classList.add('matched');
            document.getElementById(cards[1]).classList.add('matched');
            cards.pop();
            cards.pop();
            checkGameEnd();
          }
          else if(cards[0]===cards[1]){
            alert('DONT CHEAT');
            document.getElementById(cards[0]).classList.toggle('rotate');
            cards.pop();
            cards.pop();
          }
        }
      
        //if(document.quer)
        
      },1500)
    }
  }
}
function timerUpdate(){
  let time= 0.00;
  if(start){
    var timeInterval = setInterval(function(){
      time+=.10;
      time= Math.round(time*10)/10;
      timer.innerText=`${time}s`;
      if(matched){
        clearInterval(timeInterval);
      }
    },100);
  }
}

function checkGameEnd(){
  const gamePieces = document.querySelector('#game').children;
  let tempMatch = true;
  for(let pieces of gamePieces){
    if(!tempMatch){
      break;
    }
    else if(!pieces.classList.contains('matched')){
      tempMatch=false;
     
    }
    
  }
  matched=tempMatch;  
  if(tempMatch){
    gameComplete();
  }
  
  console.log('is it matched', matched);
}

function gameComplete(){
  highScoreUpdate(timer.innerText.slice(0,-1));
  const winMenu= document.createElement('h2');
  const restartBtn = document.createElement('button');
  restartBtn.classList.add('button');

  restartBtn.innerText='Play Again?';
  setTimeout(function(){
    winMenu.innerHTML=`You won!<br> your time was ${timer.innerText} <br>`;
    winMenu.appendChild(restartBtn);
  },50);
  
  winMenu.classList.add('win');
  game.appendChild(winMenu);
  restartBtn.addEventListener('click',function(){
    location.reload();
  })
}

function highScoreSet(){
display.innerText=score;
}

function highScoreUpdate(time){
  if(time<score || !score){
    localStorage.setItem('highscore',time);
    highScoreSet();
  }
}


// when the DOM loads
createDivsForColors(shuffledColors);
highScoreSet();

startButton.addEventListener('click', function(){
  if(start){
    location.reload();
    
  }
  else{
    start=true;
    startButton.innerText='End Game';
    startButton.style.backgroundColor='#b22222'
    timerUpdate();
  }

});
