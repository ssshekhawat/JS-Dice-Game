var winningScore=100;
var diceNumber=0,isGamePlay=true;
var perviousDicePoint=0;

var player1={
name:"Kelly",
score:0,
roundScores:0,
isCurrentPlayer:true,
isWinner:false
}

var player2={
    name:"Iman",
    score:0,
    roundScores:0,
    isCurrentPlayer:false,
    isWinner:false
}
initGame();
var discNumber = function(){    
    var number = Math.floor(Math.random()*6)+1;
    var domDice= document.querySelector('.dice');
    domDice.style.display='block';
    domDice.src='images/dice-'+number+'.png';    
    return  number;
}
var activePlayer= function(){  
    return player1.isCurrentPlayer==true?player1:player2;  
}

function switchPlayer(currentPlayer){    
    player1.roundScores=player2.roundScores=0;
    if(currentPlayer.name == player1.name)
    {
        player1.isCurrentPlayer=false;
        player2.isCurrentPlayer=true;    
    }else{
     player1.isCurrentPlayer=true;
     player2.isCurrentPlayer=false;
    }
    document.querySelector('.player-0-panel').classList.toggle('active'); 
    document.querySelector('.player-1-panel').classList.toggle('active'); 
}
document.querySelector('.btn-roll').addEventListener('click',function(){
    if(isGamePlay){    
    var dicePoint = discNumber();
    var currentPlayer=activePlayer();
    var isSwitch=false;
    if(dicePoint==6 && perviousDicePoint==6){
        dicePoint=0;
        currentPlayer.score=0;
        isSwitch=true;
    }
    perviousDicePoint=dicePoint;
    
    currentPlayer.roundScores+=dicePoint;
    if(dicePoint==1 || isSwitch){
        switchPlayer(currentPlayer);
        showScore();
     }       
     showCurrentScore(currentPlayer);
    }
})
document.querySelector('.btn-hold').addEventListener('click',function(){
    var currentPlayer=activePlayer();
    currentPlayer.score+=currentPlayer.roundScores;
    currentPlayer.roundScores=0;
    perviousDicePoint=0;
    if(document.getElementById('finalScore').value!=''){
        winningScore=document.getElementById('finalScore').value;
    }
    if(currentPlayer.score>=winningScore){
        currentPlayer.isWinner=true;
        declareWinner();
    }
    showScore();  
    showCurrentScore(currentPlayer);
    if(isGamePlay){
    switchPlayer(currentPlayer);
    }
})

document.querySelector('.btn-new').addEventListener('click',initGame);

function declareWinner(){
    if(player1.isWinner==true){
        document.querySelector('.player-0-panel').classList.add('winner');
        document.getElementById('name-0').textContent='winner';
    }else{
        document.querySelector('.player-1-panel').classList.add('winner');
        document.getElementById('name-1').textContent='winner';
    }
    isGamePlay=false;
    document.querySelector('.dice').style.display='none';
}
function showScore(){    
    var domScorePlayer1=document.getElementById('score-0');
    domScorePlayer1.textContent=player1.score;    
    var domScorePlayer2=document.getElementById('score-1');
    domScorePlayer2.textContent=player2.score;    
}
function showCurrentScore(currentPlayer){    
    if(currentPlayer.name==player1.name){
        var domCurrentPlayer1=document.getElementById('current-0');
        domCurrentPlayer1.textContent=currentPlayer.roundScores;
    }else{
        var domCurrentPlayer2=document.getElementById('current-1');
        domCurrentPlayer2.textContent=currentPlayer.roundScores;
    }
}
function initGame(){
    player1.score=0;
    player1.roundScores=0;
    player1.isCurrentPlayer=true;
    player1.isWinner=false;
    player2.score=0;
    player2.roundScores=0;
    player2.isCurrentPlayer=false;
    player2.isWinner=false;
    isGamePlay=true;
    showScore();
    showCurrentScore(player1);
   document.querySelector('.dice').style.display='none';
   document.querySelector('.player-0-panel').classList.remove('winner');
   document.querySelector('.player-1-panel').classList.remove('winner');
   document.querySelector('.player-0-panel').classList.add('active');
   document.querySelector('.player-1-panel').classList.remove('active');
   document.getElementById('name-0').textContent=player1.name;
   document.getElementById('name-1').textContent=player2.name;
   document.getElementById('finalScore').value='';
}
