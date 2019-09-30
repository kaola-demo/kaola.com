// 头部黑色导航栏
$('header a').mouseenter(function(){ $(this).css("color","#fff");}).mouseleave(function(){ $(this).css("color","#999");});
$('.header-con ul div a').mouseenter(function(){ $('.muLuText').css("display","block");}).mouseleave(function(){ $('.muLuText').css("display","none");});
$("header .box>.link").mouseenter(function(){ $(this).css({'color':'red','background':'#fff'});$(this).next().css("display","block");$(this).children('i').removeClass('fa-chevron-down').addClass('fa-chevron-up')});
$("header .box").mouseleave(function(){ $(this).children('.link').css({'color':'#999',"background":"#000"}).children('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');$(this).children(".submenu").css("display","none")});
$("header .submenu a").mouseenter(function(){ $(this).css("color","red");}).mouseleave(function(){ $(this).css("color","#000");});

// logo存放区
var MAX = 10;
var inp=document.getElementById('topSearchInput');
var ul=document.getElementById('xiaLa-wzj');
inp.oninput = inp.onpropertychange = function(){
    //在搜索框输入文本
    var word = this.value;//输入框中的文本
    //创建一个script标签用户请求数据
    var script = document.createElement('script');		
    script.src = "https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1445,21092,18560,29518,28519,29099,29568,28833,29220,26350,29589&wd="+word+"&req=2&pbs=%E7%99%BE%E5%BA%A6%E7%BF%BB%E8%AF%91&csor=5&pwd=baid&cb=show&_=1563970627537";

    //创建一个函数,以备调用
    window.show = function(data){
        console.log(data)
        //获取结果数组
        var list = data.g;//要先打印data查看结构
        //定义ul里面的字符串
        var str = "";
        for(var i=0;i<(list.length>MAX?MAX:list.length);i++){
            str+="<li>"+list[i].q+"</li>";
        };
        ul.innerHTML = str;			
    }
    //把生成的script标签放入body中
    document.body.appendChild(script);
    if(word==''){ul.style.display='none';}
    else{ul.style.display='block';};
}
