/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var devwidth = document.documentElement.clientWidth;
var devheight = document.documentElement.clientHeight;
var laywidth, layheight;
var startWidth, startHeight;
var img = new Image();

var box = function(x,w,h ) {
    this.x = x;
    this.width = w;
    this.height = h;
    this.c = master.canvas;
    this.ctx = this.c.getContext("2d");
    this.display = function(){
        img.src = "js/game/box.png";
        this.ctx.drawImage(img, this.x, 20, 200, 200);
    };
};

var boxes = new Array();

function startgame() {
    master.start();
    boxes[0] = new box();
    boxes[0].display();
   
}



var master = {
    canvas : document.getElementById("master"),
    start : function() {
        this.canvas.width = devwidth;
        this.canvas.height = devheight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
};