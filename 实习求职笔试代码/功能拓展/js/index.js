var showDiv = document.getElementsByClassName('show')[0];
var submitBtn = document.getElementsByClassName('submitBtn')[0];
var relationBtn = document.getElementsByClassName('relationSubmit')[0];
var inputArr = document.getElementsByTagName('input');
var boxPositionX = inputArr[0],
    boxPositionY = inputArr[1],
    boxSpeed = inputArr[2],
    boxColor = inputArr[3],
    boxSize = inputArr[4],
    boxName = inputArr[5],
    objA = inputArr[6],
    objB = inputArr[7];
var divArr = new Array();
submitBtn.onclick = function(){
    if(isNum(boxPositionX.value) && isNum(boxPositionY.value) && isNum(boxSpeed.value) || isNum(boxSize.value)){
        var oDiv = createMoveObj(Number(boxPositionX.value),Number(boxPositionY.value),Number(boxSpeed.value),boxColor.value,Number(boxSize.value));
        oDiv.startMove();
        var obj = new Object();
        obj["name"] = boxName.value;
        obj[boxName.value] = oDiv;
        divArr.push(obj);
    }
}
relationBtn.onclick = function(){
    var domArr = divArrHas(objA.value,objB.value);
    if(domArr){
        var relation = addCollRelationship(domArr[0],domArr[1]);
        relation.collisionAction();
    }
}
//判断divArr是否有objA和objB
function divArrHas(objA,objB){
    var len = divArr.length;
    var divDom = [];
    var count = 0;
    for(let i = 0; i < len; i++ ){
        if(divArr[i].name == objA || divArr[i].name == objB){
            count++;
            divDom.push(divArr[i][divArr[i].name]);
        }
    }
    if(count == 2){
        return divDom;
    }else {
        return false;
    }
}
//判断输入是否是数字
function isNum(value){
    if(!isNaN(value) && Number(value) == value){
        return true;
    }else {
        alert("You just can enter number!!!")
        return false;
    }
}
function clearScrrenDiv(){
    var divArr = showDiv.getElementsByTagName('div');
    var len = divArr.length;
    for(let i = 0; i < len; i++){
        showDiv.removeChild(showDiv.getElementsByTagName('div')[0]);
    }
}
//positionX : 初始x坐标
// positionY : 初始y坐标
// speed : 速度
// color : 颜色
// size : 正方形大小
function createMoveObj(positionX,positionY,speed,color,size) {
    //创建div并赋予css样式。
   var oDiv = document.createElement('div');
   oDiv.style.width = size + 'px';
   oDiv.style.height = size + 'px';
   oDiv.style.backgroundColor = color;
   oDiv.style.position = "absolute";
   oDiv.style.left = positionX + 'px';
   oDiv.style.top = positionY + 'px';
   showDiv.appendChild(oDiv);
   //工厂模式创建对象并赋予属性和方法。
   var obj = new Object();
   obj.browserWidth = document.body.offsetWidth;
   obj.size = size;
   obj.boxLeft = positionX;
   obj.speed = speed;
   obj.positionX = positionX;
   obj.positionY = positionY;
   obj.timer = null;
   //运动函数
   obj.moveFunc = function() {
       if(this.boxLeft <= this.browserWidth) {
           oDiv.style.left = this.boxLeft + this.speed + 'px';
           this.boxLeft += this.speed;
       }else {
           oDiv.style.left = this.positionX + 'px';
           this.boxLeft = this.positionX;
       }
   };
   obj.setDivLeft = function(position){
       oDiv.style.left = position + 'px';
   }
   obj.getDivleft = function(position){
       return oDiv.offsetLeft;
   }
   //定时器
   obj.startMove = function(){
       obj.moveFunc();
       this.timer = setTimeout(obj.startMove,10);
   };
   return obj;
}
//碰撞检测模块
function addCollRelationship(objA,objB){
    var obj = new Object();
    obj.checkCollision = function(objA,objB){
        var behindBox = objA,
            handBox = objB;
        if(objA.getDivleft() > objB.getDivleft()){
            behindBox = objB;
            handBox = objA;
        }
        if((behindBox.boxLeft + behindBox.size + behindBox.speed) >= handBox.boxLeft){
            behindBox.setDivLeft(handBox.boxLeft - behindBox.size);
            var speed = behindBox.speed;
            behindBox.speed = handBox.speed;
            handBox.speed = speed;
        }
    };
    obj.collisionAction = function() {
        obj.checkCollision(objA,objB);
        this.timer = setTimeout(obj.collisionAction,10,objA,objB);
    }
    return obj;
}