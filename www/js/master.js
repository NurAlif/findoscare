/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var master={
    cvs : document.getElementById("master"),
    start : function(){
        this.context = this.cvs.getContext("2d");
        document.body.insertBefore(this.cvs, document.body.childNodes[0]);
        this.interval = setInterval(reveal, 20);
        window.addEventListener('touchmove', function (e) {
            
        });
            
    },
    clear : function(){
        this.context.clearRect(0, 0, this.cvs.width, this.cvs.height);
    }
};

function startgame(){
    deviceinit();
    gameinit();
}

var reveal = function(){
    
};

var con = true;

var step = 0;
var count;
var devwidth,devheight;
var dispwidth,dispheight;
var startPosX,startPosY;

var deviceinit = function(){
    devwidth = document.documentElement.width;
    devheight = document.documentElement.height;
    dispwidth = devwidth * 0.82;
    dispheight = devheight * 0.25;
    startPosX = (devwidth - dispwidth)/2;
    startPosY = (devheight - dispheight)/2;
    count = 2;
    layout= new Array();
    layout[layout.length] = new base(getPoint());
    layout[layout.length] = new base(getPoint());
};

var layout;

var getPoint = function(){
    if(layout.length === 0){
        return (dispwidth);
    }else{
        return (layout[layout.length-1].x + dispwidth * (1/3));
    }
};

var imgBox = new Image();
var imgSwad = new Image();
var imgTarget = new Image();
imgBox.src = "/img/game/box.png";
imgSwad.src = "/img/game/shadow.png";
imgTarget.src = "/img/game/target.png";

var box = function(width,height,x,y){
    this.width = width;
    this.height =height;
    this.x = x;
    this.y = y;
    this.display = function(){
        var ctx = master.cvs.getContext("2d");
        ctx.drawImage(imgBox,dispwidth,dispheight);
    };
};

var boxes = new Array();

var base = function(x,y){
    this.x = x;
    this.y = y;
};

var gameinit = function(){
    count = 2;
    boxes[0] = new box(100,100,base[0].x,base[0].y);
    boxes[1] = new box(100,100,base[1].x,base[1].y);
};

var game = function(){
    
    step = 0;
    gameinit();
    
    while(con === true){
        
    }
};