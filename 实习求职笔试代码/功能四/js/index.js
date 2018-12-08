var btn1 = document.getElementsByTagName('button')[0];
var btn2 = document.getElementsByTagName('button')[1];
var btn3 = document.getElementsByTagName('button')[2];
var lock1 = false,
    lock2 = false,
    lock3 = false;
btn1.onclick = function(){
    if(!lock1){
        clearScrrenDiv();
        var odiv1 = createMoveObj(100,100,5,'blue',50);
        odiv1.startMove();
    }
    lock1 = true;
    lock2 = false;
    lock3 = false;
}
btn2.onclick = function(){
    if(!lock2){
        clearScrrenDiv();
        var oDiv1 = createMoveObj(200,200,5,'red',100);
        oDiv1.startMove();
        var oDiv2 = createMoveObj(100,200,10,'blue',50);
        oDiv2.startMove();
        var oDiv3 = createMoveObj(50,200,15,'green',30);
        oDiv3.startMove();
        var oDiv4 = createMoveObj(0,200,20,'#f40',10);
        oDiv4.startMove();
    }
    lock2 = true;
    lock1 = false;
    lock3 = false;
}
btn3.onclick = function(){
    if(!lock3){
        clearScrrenDiv();
        var oDiv1 = createMoveObj(200,200,1,'red',100);
        oDiv1.startMove();
        var oDiv2 = createMoveObj(100,200,2,'blue',50);
        oDiv2.startMove();
        var oDiv3 = createMoveObj(50,200,3,'green',30);
        oDiv3.startMove();
        var oDiv4 = createMoveObj(0,200,4,'#f40',10);
        oDiv4.startMove();
        addCollRelationship(oDiv1,oDiv2).collisionAction();
        addCollRelationship(oDiv1,oDiv3).collisionAction();
        addCollRelationship(oDiv2,oDiv3).collisionAction();
        addCollRelationship(oDiv2,oDiv4).collisionAction();
        addCollRelationship(oDiv3,oDiv4).collisionAction();
        addCollRelationship(oDiv1,oDiv4).collisionAction();
    }
    lock3 = true;
    lock1 = false;
    lock2 = false;
}
function clearScrrenDiv(){
    var divArr = document.getElementsByTagName('div');
    var len = divArr.length;
    for(let i = 0; i < len; i++){
        document.body.removeChild(document.getElementsByTagName('div')[0]);
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
   document.body.appendChild(oDiv);
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