let gameSeq=[]; // stores the game sequence of flashing the buttons 
let userSeq=[]; // stores the user sequence of clicking the buttons
let level=0;
let startGame=false;
let h3=document.querySelector("h3");
let btn=["red","green","blue","brown"] ; // four coloured index buttons 
let highestScore=0;
  let highSpanScore=document.querySelector("#highestScore");

document.addEventListener('keypress',function(){
    if(!startGame){
        startGame=true;
        levelUp();
    }
});
function gameflash(randbtn){
 randbtn.classList.add("gameflash");
 setTimeout(()=>{
    randbtn.classList.remove("gameflash");
 },500);

}
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(()=>{
        btn.classList.remove("userflash");
    },250);
}
function levelUp(){
    userSeq=[];
    level++;
    h3.innerText= `Level ${level}`;
    let score=document.querySelector("#yourScore");
    score.innerText=level;
    if(highestScore<level){
        highSpanScore.innerText=level;
        highestScore=level;
    }
// generate or flash random colour button 
  let btnindx= Math.floor(Math.random()*btn.length);
  let randColor=btn[btnindx];
  gameSeq.push(randColor);// wo random color wla button  game sequence array mai chala jayega 
  let randbtn=document.querySelector(`.${randColor}`);
    gameflash(randbtn);
}

function matchingSeq(indx){
    if(gameSeq[indx]==userSeq[indx]){
        if(userSeq.length==gameSeq.length) {
            setTimeout(levelUp,500); 
        }
    }
    else{
        h3.innerHTML= `<b> Game Over !</b> <br> press any key to restart `;
        let body=document.querySelector("body");
        body.classList.add("red");
        setTimeout(function(){
            body.classList.remove("red");
        },150);
        reset(); // reset the game 
    }
}
function btnPress(){
    let btn=this; // yeha this batata hai ki kaun si button press hui hai 
    // console.dir(btn);
    userflash(btn);
    let userColor= btn.getAttribute("id");
    userSeq.push(userColor);
    matchingSeq(userSeq.length-1);
}
let btncontainers= document.querySelectorAll(".btn");
for(btns of btncontainers){
    btns.addEventListener("click",btnPress);
}

// reset game 
 function reset(){
    userSeq=[];
    gameSeq=[];
    if(highestScore<level){
        highestScore=level;
        highSpanScore.innerText=highestScore;
    }
    level=0;
    startGame=false;

 }