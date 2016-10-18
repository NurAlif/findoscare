/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload = function() {
    document.getElementById("box").hidden = true;
    var c = document.getElementById("master");
    var ctx = c.getContext("2d");
    var img = new Image();
    img.src = "js/game/box.png";
    
    ctx.drawImage(img, 10, 10, img.width / 4, img.height / 4);
};