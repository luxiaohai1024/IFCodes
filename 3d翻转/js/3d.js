var oLi = Array.prototype.slice.call(document.getElementsByTagName('li')); 
oLi.forEach(function(ele,index){
    ele.spec = getSpec(ele);
    ele.addEventListener('mouseenter', function(e){
        addClass(this,e,'in');
    })
    ele.addEventListener('mouseleave',function(e){
        addClass(this,e,'out');
    })
})
function getSpec(ele){
    return {
        x : ele.offsetWidth,
        y : ele.offsetHeight
    }
}
function addClass(ele,e,state){
    var x = e.offsetX - ele.spec.x/2;
    var y = e.offsetY - ele.spec.y/2;
    var d = (Math.round((Math.atan2(y,x) * (180/Math.PI) + 180)/90) + 3)%4;
    //转换为0,1,2,3
    var direction;
    if(state == 'in'){
        switch(d) {
            case 0: 
                direction = 'top';
                break;
            case 1:
                direction = 'right';
                break;
            case 2:
                direction = 'bottom';
                break;
            case 3:
                direction = 'left';
                break;
            default: break;
        }
    }else {
        switch(d) {
            case 0: 
                direction = 'bottom';
                break;
            case 1:
                direction = 'left';
                break;
            case 2:
                direction = 'top';
                break;
            case 3:
                direction = 'right';
                break;
            default: break;
        }
    }  
    ele.className = state + '-' + direction;
}