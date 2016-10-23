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

var imgZonk = new Image();
var imgJackpot = new Image();

imgZonk.src = "js/game/scr.png";
imgJackpot.src = "js/game/a.png";

var content = new Array();

content[0] = null;
content[1] = imgZonk;
content[2] = imgJackpot;

var boxes = new Array();

var globalDisplay = function(){
    for(i = 0; i < count; i++){
            build();
            boxes[i].display();
        }
};

function startgame() {
    master.start();
    gameInit();
    globalDisplay();    
    reveal();
    toMoveGlobal();
    
}
var layout = new Array();

var gameInit = function(){
    count = 5;
    layWidth = devWidth * (82/100);
    startWidth = (devWidth - layWidth) / 2;
    layHeight = devHeight * (25/100);
    startHeight = (devHeight - layHeight) / 2;
};

var base = function(dirx){
    this.x = dirx;
    this.posx = this.x;
    this.size_X = layWidth * (1 / count);
    this.size_Y = (((layWidth / count) * img.height) / img.width);
    this.update = function(){
        
    };
};

var build = function(){
    layout[boxes.length] = new base(startWidth + (( layWidth / count ) * boxes.length));
    boxes[boxes.length] = new box(layout[boxes.length].x, layout[boxes.length].size_X, layout[boxes.length].size_Y, boxes.length );
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
    }
};

var runtimeGlb;

var getTimeFold = function(){
    var fold, ctn;
    fold = 1;
    ctn = 1;
    while(fold < boxes[0].height){
        ctn++;
        fold += ctn;
        fold = fold * 1;
    }
    return ctn;
};

var reveal = function(){
    valFold = startHeight;
    valSquare = 1;
    timeFold = getTimeFold();
    runtimeGlb = setInterval(timeReveal, 20);
};

var deReveal = function(){
    valFold = startHeight;
    valSquare = 1;
    timeFold = getTimeFold();
    runtimeGlb = setInterval(timeDereveal, 20);
};

var valFold, valSquare;

var timeFold;

var timeDereveal = function(){
    if(timeFold > 0){
        master.clear();
        timeFold--;
        if(timeFold > Math.floor(timeFold/2)){

            valSquare += 1;
            valFold += valSquare;
            for(val = 0; val < boxes.length; val++ ){
                boxes[val].reveal(valFold);
            }
        }else{
            valSquare -= 1;
            valFold += valSquare;
            for(val = 0; val < boxes.length; val++ ){
                boxes[val].reveal(valFold);
            }
        }
    }else{
        clearInterval(runtimeGlb);
    }
};

var timeReveal = function(){
    if(timeFold > 0){
        master.clear();
        timeFold--;
        if(timeFold > Math.floor(timeFold/2)){
            
            valSquare -= 1;
            valFold += valSquare;
            for(val = 0; val < boxes.length; val++ ){
                boxes[val].reveal(valFold);
            }
        }else{
            valSquare += 1;
            valFold += valSquare;
            for(val = 0; val < boxes.length; val++ ){
                boxes[val].reveal(valFold);
            }
        }
    }else{
        clearInterval(runtimeGlb);
    }
};

var deltaTime = 10;

var runtimeMove;

var box = function(dirx, width_O, height_O,base) {
    this.base = base;
    this.target;
    this.mx = dirx;
    this.my = startHeight;
    this.x = dirx;
    this.width = width_O;
    this.height = height_O;
    this.c = master.canvas;
    this.ctx = master.canvas.getContext("2d");
    this.display = function(){
        
        this.ctx.drawImage(img, this.x, startHeight, this.width,this.height);
    };
    this.move = function(x){
        master.clear();
        this.mx = x;
        this.my = this.y;
        this.ctx.drawImage(img, this.mx, this.my, this.width,this.height);
    };
    
    this.reveal = function(valAscend){
        this.ctx.drawImage(img, this.x, valAscend, this.width,this.height);
    };
};