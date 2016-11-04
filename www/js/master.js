/* 
 * Nur Alif Ilyasa  2016
 * 
 * 
 * Where Is My Face ? 
 * 
 *     Ver. 1.0.0
 * 
 * nuralif.ilyasa@gmail.com
 * 
 * https://github.com/NurAlif/findoscare.git
 * 
 * --------------###-------------  
 * ----------###--###----------- editting these lines are fully allowed
 * -------###--------###--------
 */

var devWidth = document.documentElement.clientWidth;
var devHeight = document.documentElement.clientHeight;

var layWidth,layHeight,startWidth,startHeight;

var img = new Image();
img.src = "js/game/box.png";

var imgScare = new Image();
var imgJackpot = new Image();

imgScare.src = "js/game/scr.png";
imgJackpot.src = "js/game/trl.png";

var content = new Array();

content[0] = null;
content[1] = imgScare;
content[2] = imgJackpot;

var globalMove = function(){
    var randVar1,randVar2;
    randVar1 = Math.floor(Math.random() * count);
    do{
        randVar2 = Math.floor((Math.random() * 100) + 1);
    }while(randVar2 === randVar1);
    boxes[randVar1].move(randVar2);
    

};
var boxes = new Array();

var globalDisplay = function(){
    for(i = 0; i < count; i++){
            boxes[i].display();
        }
};

function startgame() {
    stsrting = true;
    master.start();
    gameInit();
    build();
    globalDisplay();
    master.move();
}
var layout = new Array();


function gameInit(){
    count = 5;
    layWidth = devWidth * (82/100);
    startWidth = (devWidth - layWidth) / 2;
    layHeight = devHeight * (25/100);
    startHeight = (devHeight - layHeight) / 2;
};


function base(dirx){
    this.x = dirx;
    this.size_X = layWidth * (1 / count);
    this.size_Y = (((layWidth / count) * img.height) / img.width);
    this.update = function(){
        
    };
};


function build(){
    for(i = 0; i < count; i++){
        layout[boxes.length] = new base(startWidth + (( layWidth / count ) * boxes.length));
        boxes[boxes.length] = new box(layout[boxes.length].x, layout[boxes.length].size_X, layout[boxes.length].size_Y, boxes.length );
        if(i === 0){
            boxes[i].content = true;
        }else{
            boxes[i].content = false;
        }
    }
};

var count;

var master = {
    canvas : document.getElementById("master"),
    start : function() {
        this.canvas.width = devWidth;
        this.canvas.height = devHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    move : function(){
        genMove();
        this.moving = setInterval(timeMove, speed);
        
    }
};

var deltaMove;
var runtimeMove;


var box = function(dirx, width_O, height_O,base) {
    this.base = base;
    this.y = startHeight;
    this.x = dirx;
    this.width = width_O;
    this.height = height_O;
    this.c = master.canvas;
    this.ctx = master.canvas.getContext("2d");
    this.content;
    this.display = function(){
        
        this.ctx.drawImage(img, this.x, this.y, this.width,this.height);
    };
    
    this.reveal = function(){
        this.ctx.drawImage(imgJackpot, this.x, startHeight, this.height, this.height);
    };
       
};

var highscore = 0;
var score = 0;

var firtsTar,secondTar,firtsFix,SecondFix;
var deltaMove,deltaTime,deltaWidth;

var dump;

function genMove(){
    speed = 8;
    exactDir();
    
    deltaTime = 20;
    deltaMove = null;
    deltaWidth = null;
    firtsTar = null;
    secondTar = null;
    firtsFix = null;
    secondFix = null;
    midWidth = null;
    
    firtsTar = Math.floor(Math.random() * boxes.length);
    do{
        secondTar = Math.floor(Math.random() * boxes.length);
    }while(firtsTar === secondTar);
    
    
    if(boxes[firtsTar].base < boxes[secondTar].base){
        firtsFix = firtsTar;
        secondFix = secondTar;
        deltaWidth = boxes[firtsFix].x - boxes[secondFix].x;
    }else{
        dump = secondTar;
        secondFix = firtsTar;
        firtsFix = dump;
        deltaWidth = boxes[secondFix].x - boxes[firtsFix].x;
    }
    
    dump = boxes[firtsFix].base;
    boxes[firtsFix].base = boxes[secondFix].base;
    boxes[secondFix].base = dump;
    
    deltaMove = deltaWidth/deltaTime;
    if(dirMove === true){
        dirMove = false;
    }else{
        dirMove = true;
    }
    
}

function displayPoint(){
    if(score > highscore){
        highscore = score;
    }
    var canvas = document.getElementById("master");
    var dispX = startWidth;
    var dispY = devHeight;
    var ctx = canvas.getContext("2d"); 
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "40px Arial";
    ctx.fillText("Highscore : "+highscore, dispX - 10, dispY - 65);
    ctx.fillText("Score       : "+score, dispX - 10, dispY - 30);
    
}

var starting = true;
var speed = 200;
var isTimeMove;

var midWidth;
var dirMove = true;

var time = 1;
var counter = 3;
var timeCounter = 0;
var isOnMoving, encounter;

var isStart = true;
var movePass;
var gettingMove = null;

var resseting, getStart, changePass, currentScore;
var nextLevelPass, isFalse, getResume, listeningResume;
var listening, getNextLevel, listeningMaster;


var isZonk = function(){
    this.x;
    this.y;
    this.w;
    this.h;
    this.canvas = document.getElementById("master");
    this.ctx = this.canvas.getContext("2d");
    this.display = function(){
        this.ctx.drawImage(imgScare, this.x, this.y, this.w, this.h);
    };
};
var getZonk = new isZonk();
var trigger;

function timeMove(){

    master.clear();
    if(boxes[firtsFix].x >= layout[(boxes[firtsFix].base)].x){
            
            if(timeCounter > counter){
                if(encounter){
                    for(i = 0; i < boxes.length; i++){
                        boxes[i].y = startHeight;
                    }
                    encounter = false;
                }
                movePass = false;
                if( ! movePass && gettingMove === null ){
                    gettingMove = false;
                    time++;
                    score++;
                        counter += time;
                    listeningMaster = true;
                    
                }           
                exactDir();
                if(starting){
                    nextLevelPass = true;      
                }
                
                if(gettingMove === false){
                    if( ! starting){
                        displayPoint();
                    }
                    if(nextLevelPass){
                        changePass = true;
                        if(boxes[1].y >= devHeight*(5/100)){
                            for(i = 0; i <= boxes.length; i++){
                                boxes[i].y -= 4;
                                if(i === 0){
                                    boxes[i].reveal();
                    
                                }
                                boxes[i].display();
                            }
                            if( ! starting){
                                displayPoint();
                            }
                            
                        }else{
                            boxes[0].reveal();
                            listening = true;
                            
                            if(isFalse && starting === false){
                            
                            if(changePass){
                                currentScore = score;
                                changePass = false;
                                
                            }
                                
                            if(score > highscore){
                                    highscore = score;
                                
                                }
                                var canvas = document.getElementById("master");
                                    var ctx = canvas.getContext("2d");
                                    var dispX = startWidth;
                                    var dispY = startHeight;
                                    ctx.fillStyle = "#FFFFFF";
                                    ctx.font = "40px Arial";
                                    ctx.fillText("GAMEOVER", dispX + 50,dispY - 4);
                                    
                                    ctx.fillRect(dispX, dispY, layWidth, layHeight);
                                    ctx.fillStyle = "#000000";
                                    ctx.font = "30px Arial";
                                    ctx.fillText("HighScore  :  " + highscore, dispX + 38,dispY + 30);
                                    ctx.fillText("Score      :  " + currentScore, dispX + 38,dispY + 65);
                                    if(time > 5){
                                        ctx.drawImage(imgScare,0,0,devWidth,devHeight);
                                        trigger = true;
                                    }
                                    
                            }
                            if(starting){
                                
                                var canvas = document.getElementById("master");
                                var dispX = startWidth;
                                var dispY = startHeight;
                                    var ctx = canvas.getContext("2d"); 
                                    ctx.fillStyle = "#FFFFFF";
                                    ctx.font = "40px Arial";
                                    ctx.fillText("Tap to Start !", dispX + 30, dispY + 350);
                            }
                            
                            if(getNextLevel){
                                if(isFalse){
                                    score = 0;
                                    resseting = true;
                                }if(starting){
                                    highscore = 0;
                                    resseting =true;
                                    starting = false;
                                }
                                
                                gettingMove = true;
                                nextLevelPass = false;
                                listeningMaster = false;
                                listening = false;
                                getNextLevel = false;
                            }
                        }
                    }
                }else{
                    if( ! starting){
                                displayPoint();
                            }else{
                                score = 0;
                            }
                    if(boxes[1].y <= startHeight){
                        for(i = 0; i <= boxes.length; i++){
                            boxes[i].y += 4;
                            if(i === 0){
                                boxes[i].reveal();

                            }
                            boxes[i].display();
                        }
                    }else{
                        
                        counter += time;
                        timeCounter = 0;
                        
                        gettingMove = null;
                        movePass = true;
                    }
                    
                    
                }
                
            }else{
                movePass = true;
            }
        
            if(movePass){
                for(i = 0; i < boxes.length; i++){
                    boxes[i].y = startHeight;
                }
                timeCounter++;
                
                if(resseting){
                    if(starting){
                        highscore = 0;
                    }
                    starting = false;
                    timeCounter = 0;
                    time = 1;
                    counter = 3;
                    isFalse = false;
                    resseting = false;
                }
                
                genMove();
            }
        
        
    
    }else{
        encounter = true;
        if( ! starting){
        
            displayPoint();
        }else{
            score = 0;
        }
        
            if(dirMove === true){
                boxes[firtsFix].x += devWidth/120;
                boxes[secondFix].x -= devWidth/120;
                if(boxes[firtsFix].x <=  (boxes[firtsFix].x + ((boxes[secondFix].x - boxes[firtsFix].x)/2))){
                    boxes[firtsFix].y += devHeight*(0.8/100);
                    boxes[secondFix].y -= devHeight*(0.8/100);
                }else{
                    boxes[firtsFix].y -= devHeight*(0.8/100);
                    boxes[secondFix].y += devHeight*(0.8/100);
                }
            }else{
                boxes[firtsFix].x += devWidth/120;
                boxes[secondFix].x -= devWidth/120;
                if(boxes[firtsFix].x <=  (boxes[firtsFix].x + ((boxes[secondFix].x - boxes[firtsFix].x)/2))){
                    boxes[firtsFix].y -= devHeight*(0.8/100);
                    boxes[secondFix].y += devHeight*(0.8/100);
                }else{
                    boxes[firtsFix].y += devHeight*(0.8/100);
                    boxes[secondFix].y -= devHeight*(0.8/100);
                }
            }
        
    }
    
    for(i = 0; i <= boxes.length; i++ ){
        boxes[i].display();
    }
    
}

var isStop;

 window.addEventListener("click",function(e){
    if(listening === true){
        getNextLevel = true;
        
    }
    if(listeningResume){
        getResume = true;
        
    }
    
    var mouse = {
        x: e.pageX,
        y: e.pageY
    };
    for(i = 0; i <= boxes.length; i++){
        if(boxes[i].x <= mouse.x && mouse.x <= boxes[i].x + layout[i].size_X &&
                boxes[i].y <= mouse.y && mouse.y <= boxes[i].y + layout[i].size_Y){
                if(i === 0 && listeningMaster){
                    nextLevelPass = true;
                }else{
                    nextLevelPass = true;
                    isFalse = true;
                    
                }
        }
    }
});


function exactDir(){
    for(i = 0; i < boxes.length; i++){
        boxes[i].x = layout[boxes[i].base].x;
    
    }
}

