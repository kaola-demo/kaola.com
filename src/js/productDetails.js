// 商品路径分类js
$(function () {
    var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        var links = this.el.find('.link');
        var linkUp = this.el.find('.box');
        links.on('mouseenter', {
            el: this.el,
            multiple: this.multiple
        }, this.dropdown);
        linkUp.on('mouseleave', {
            el: this.el,
            multiple: this.multiple
        }, this.dropdown)
    }
    Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el;
        $this = $(this), $next = $this.next();
        $next.slideToggle();
        $this.parent().toggleClass('open');
        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        };
    }
    var accordion = new Accordion($('#accordion-one'), false);
    var accordion = new Accordion($('#accordion-two'), false);
    var accordion = new Accordion($('#accordion-three'), false);
});



// <!-- 放大镜区域 -->
function scroll() {
    return {
        "left": document.documentElement.scrollLeft || document.body.scrollLeft,
        "top": document.documentElement.scrollTop || document.body.scrollTop
    }
}

// 获取DOM节点
var smallBox = document.getElementById("smallBox");
var mask = document.getElementById("mask");
var bigBox = document.getElementById("bigBox");
var bigImg = document.getElementById("bigImg");
// 需求1：
// 鼠标移入小图片区域，模态框显示，放大区域显示。
smallBox.onmouseenter = function () {
    mask.style.display = "block";
    bigBox.style.display = "block";
}

// 需求2：
// 鼠标移出小图片区域，模态框消失，放大区域消失。
smallBox.onmouseleave = function () {
    mask.style.display = "none";
    bigBox.style.display = "none";
}

// 需求3：
// 鼠标在小图片区域移动时，模态框跟随鼠标移动。
smallBox.onmousemove = function (e) {
    // 获取事件对象
    var evt = e || window.event;
    // 计算模态框在小图片区域中的坐标
    //鼠标的坐标 = 鼠标距离页面顶部的距离 - box距离页面顶部的距离
    //mask的坐标 = 鼠标的坐标 - mask的一半
    var PageX = evt.clientX + scroll().left;
    var PageY = evt.clientY + scroll().top;
    var x = PageX - smallBox.offsetLeft-100 - mask.offsetWidth / 2;
    var y = PageY - smallBox.offsetTop-100 - mask.offsetHeight / 2;
    // 模态框移动的边界检测
    var maxX = smallBox.clientWidth - mask.offsetWidth;
    var maxY = smallBox.clientHeight - mask.offsetHeight;
    if (x < 0) {
        x = 0;
    }
    if (x > maxX) {
        x = maxX;
    }
    if (y < 0) {
        y = 0;
    }
    if (y > maxY) {
        y = maxY;
    }
    // 给模态框的定位left和top进行定位，相对于有定位的父级元素盒子。
    mask.style.left = x + "px";
    mask.style.top = y + "px";


    // 需求4：
    // 模态框移动时，大图片随之在放大区域中移动相同比例。
    //显示比例:mask移动的距离(x)/小图区的宽度 = 大图移动的距离/大图的宽度
    //显示比例:mask移动的距离(x)/小图区的宽度*大图的宽度 = 大图移动的距离
    var bigImgLeft=x/smallBox.clientWidth*bigImg.clientWidth;
    var bigImgTop=y/smallBox.clientHeight*bigImg.clientHeight;
    bigImg.style.marginLeft=-bigImgLeft+"px";
    bigImg.style.marginTop=-bigImgTop+"px";
}

var btnl=document.getElementById("btnl");
var btnr=document.getElementById("btnr");
var BoxUl=document.getElementById("BoxUl");
var smallImg=document.getElementById("smallImg");
var bigImg=document.getElementById("bigImg");
var ul=BoxUl.firstChild;
console.log(ul)
btnl.onclick=function(){
    constantMove(ul,"left",0)
}
btnr.onclick=function(){
    constantMove(ul,"left",-80)
}
var liArr=document.getElementsByClassName("cur");
for(var i=0;i<liArr.length;i++){
    liArr[i].onmouseenter=function(e){
        var evt=e||window.event;

        // console.log(this.className)
        this.className+=" border";
        smallImg.src=this.firstChild.src;
        bigImg.src=this.firstChild.src;
    }
    liArr[i].onmouseleave=function(){
        this.className="cur";
    }
}
// 获取非行内样式
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}
//封装一个匀速运动的函数

function constantMove(obj, attr, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        if (attr == "opacity") {
            var current = parseInt(getStyle(obj, attr) * 100);
        } else {
            var current = parseInt(getStyle(obj, attr));
        }
        var speed = target > current ? 5 : -5;
        if (Math.abs(target - current) <= Math.abs(speed)) {
            if (attr == "opacity") {
                obj.style["opacity"] = target / 100;
            } else {
                obj.style[attr] = target + "px";
            }
            clearInterval(obj.timer);
        } else {
            current = current + speed;
            if (attr == "opacity") {
                obj.style["opacity"] = current / 100;
            } else {
                obj.style[attr] = current + "px";
            }
        }
    }, 20)
}

