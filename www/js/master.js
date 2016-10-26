/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var devWidth = document.documentElement.clientWidth;
var devHeight = document.documentElement.clientHeight;

var layWidth,layHeight,startWidth,startHeight;

var img = new Image();
img.src = "js/game/box.png";

var speed;

var imgScare = new Image();
var imgJackpot = new Image();

imgScare.src = "js/game/scr.png";
imgJackpot.src = "js/game/a.png";

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
    master.start();
    gameInit();
    build();
    globalDisplay();    
    master.move();
    
}
var layout = new Array();

var gameInit = function(){
    count = 5;
    layWidth = devWidth * (82/100);
    startWidth = (devWidth - layWidth) / 2;
    layHeight = devHeight * (25/100);
    startHeight = (devHeight - layHeight) / 2;
    genFibo();
};

var base = function(dirx){
    this.x = dirx;
    this.size_X = layWidth * (1 / count);
    this.size_Y = (((layWidth / count) * img.height) / img.width);
    this.update = function(){
        
    };
};

var build = function(){
    for(i = 0; i < count; i++){
        
        layout[boxes.length] = new base(startWidth + (( layWidth / count ) * boxes.length));
        boxes[boxes.length] = new box(layout[boxes.length].x, layout[boxes.length].size_X, layout[boxes.length].size_Y, boxes.length );
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
        this.moving = setInterval(timeMove,20);
        console.log("move function complete");
    }
};



var genFibo = function(){
    for(i = 0; i >= 100; i++){
        fibonaci[i] = getFibo(i);
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
    this.display = function(){
        
        this.ctx.drawImage(img, this.x, this.y, this.width,this.height);
    };
    this.move = function(mx,my){
        master.clear();
        this.x = mx;
        this.y = my;
        this.ctx.drawImage(img, mx, my, this.width,this.height);
    };
    
    this.reveal = function(valAscend){
        this.ctx.drawImage(img, this.x, valAscend, this.width, this.height);
    };
    this.dereveal = function(valDescend){
        this.ctx.drawImage(img,this.x, valDescend, this.width, this.height);
    };
};

var fibonaci = new Array();
function getFibo(sumHalf){
    var val,first,second,count;
    first = 1;
    second = 1;
    count = 0;
    for(;count <= sumHalf;){
        count++;
        val = first + second;
        first = second;
        second = val;
    }
    return second;
};

var firtsFixed,secondFixed;

function genMove(){
    console.log("genMove is runing");
    var firtsTarget = Math.floor(Math.random() * boxes.length);
    var secondTarget;
    do{
        secondTarget = Math.floor(Math.random() * boxes.length);
    }while(secondTarget === null || secondTarget === firtsTarget);
    console.log("Targets is " + firtsTarget+" and "+secondTarget);
    if(boxes[firtsTarget].x > boxes[secondTarget].x){
        deltaMove = boxes[firtsTarget].x - boxes[secondTarget].x;
        secondFixed = firtsTarget;
        firtsFixed= secondTarget;
    }else{
        deltaMove = boxes[secondTarget].x - boxes[firtsTarget].x;
        firtsFixed = firtsTarget;
        secondFixed = secondTarget;
    }
    console.log("fixed target are "+firtsFixed+" and " + secondFixed);
    console.log("DELTAMOVE IS "+deltaMove);
};

var timeMoveCont;

function timeMove(){
    console.log("timeMove is running");
    timeMoveCont++;
    if(boxes[firtsFixed].x >= layout[secondFixed].x){
        clearInterval(master.moving);
    }else{
        boxes[firtsFixed].move(boxes[firtsFixed].x += 5,0 );
        boxes[secondFixed].move(boxes[secondFixed].x -= 5,0 );
    }
    for(i = 0; i <= boxes.length; i++){
        if( i === firtsFixed || i === secondFixed){
            continue;
        }else{
            boxes[i].display();
        }
    }
}