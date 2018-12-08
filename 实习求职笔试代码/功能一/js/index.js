var oDiv = document.getElementsByTagName('div')[0];
var boxLeft = oDiv.offsetLeft;
var prevLeft = boxLeft;
var browserWidth = document.body.offsetWidth;
var timer = null;
function moveFunc(){
    if(boxLeft <= browserWidth) {
        oDiv.style.left = boxLeft + 5 + 'px';
        boxLeft += 5;
    }else {
        oDiv.style.left = 0 + 'px';
        boxLeft = prevLeft;
    }
}
function startMove(){
    moveFunc();
    timer = setTimeout("startMove()",10);
}
startMove();