$(document).ready(function () {
    var show = $(".show")[0];
    var hide = $('.hide')[0];
    // 公共方法
    var util = {
        // 获取本地存储的数据的方法。
        getStorage: function () {
            return JSON.parse(localStorage.getItem("list") || "[]");
        },

        // 设置本地存储数据的方法。
        setStorage: function (json) {
            localStorage.setItem("list", JSON.stringify(json));
        },

        // 渲染购物车，根据本地存储中的数据，使本地存储中的数据展示在购物车中。
        renderCar: function (products) {
            console.log(products);
            // 如果传入的数据为空，则清除购物车中的内容。
            if (products.length < 1) {
                hide.style.display = "block";
            } else {
                hide.style.display = "none";
                for (var i = 0; i < products.length; i++) {
                    var $newProduct = $("#clone").clone();
                    $newProduct.get(0).style.display = "block";
                    $newProduct.get(0).setAttribute('value', i);
                    $newProduct.addClass("newProduct");
                    $newProduct.find("li").eq(0).children("input").addClass("check" + i);
                    // console.log($newProduct.find("li").eq(0).children("input").className());
                    $newProduct.find("li").eq(1).children("a").children("img")[0].src = products[i].productImgSrc;
                    $newProduct.find("li").eq(1).children("div").find("em").eq(0)[0].innerHTML = products[i].productMore;
                    $newProduct.find("li").eq(2).find("i").eq(1)[0].innerHTML = products[i].productPrice;
                    $newProduct.find("li").eq(3).find("input")[0].value = products[i].productNum;
                    var total = parseFloat(products[i].productPrice) * parseFloat(products[i].productNum);
                    $newProduct.find("li").eq(4).find("span:eq(0)")[0].innerHTML = total;

                    $(".totalbox").before($newProduct);
                }

            }
        }
    }
    // 根据本地存储渲染购物车
    util.renderCar(util.getStorage());
    // 实现购物车基本功能1:增减数量
    zidiao();

    function zidiao() {
        var newProduct = document.getElementsByClassName("newProduct");
        for (var j = 0; j < newProduct.length; j++) {
            $(newProduct[j]).find("ul").children("li").eq(3).children("span:eq(0)").on("click", function () {
                var newProduct = $(this).parent().parent().parent().parent().parent();
                var shu = newProduct.attr("value");
                shu = Number(shu);
                var newNum = $(this).siblings("input").val();
                newNum = Number(newNum);
                if (newNum > 1) {
                    newNum--;
                }
                var newJson = util.getStorage();
                newJson[shu].productNum = newNum;
                util.setStorage(newJson);
                newProduct.remove();
                util.renderCar(util.getStorage());
                zidiao()
            })
            $(newProduct[j]).find("ul").children("li").eq(3).children("span:eq(1)").on("click", function () {
                var newProduct = $(this).parent().parent().parent().parent().parent();
                var shu = newProduct.attr("value");
                shu = Number(shu);
                var newNum = $(this).siblings("input").val();
                newNum = Number(newNum);
                if (newNum >= 1) {
                    newNum++;
                }
                var newJson = util.getStorage();
                newJson[shu].productNum = newNum;
                util.setStorage(newJson);
                newProduct.remove();
                util.renderCar(util.getStorage());
                zidiao()
            })
            // 
            $(newProduct[j]).find("ul").children("li").eq(5).children("span:eq(0)").on("click", function () {
                var newProduct = $(this).parent().parent().parent().parent().parent();
                var shu = newProduct.attr("value");
                shu = Number(shu);
                var newJson = util.getStorage();
                newJson.splice(shu, 1);
                util.setStorage(newJson);
                newProduct.remove();
                util.renderCar(util.getStorage());
                zidiao()
            })
        }
    }
    // 
    var target = true;
    $("#allCheck").on("click", function () {
        if (target) {
            $("#allCheck").removeAttr("checked");
            var newProduct = document.getElementsByClassName("newProduct");
            for (var j = 0; j < newProduct.length; j++) {
                $(newProduct[j]).find("h5").children("input").removeAttr("checked");
                $(newProduct[j]).find("ul").children("li").eq(0).children("input").removeAttr("checked");
            }
            $("#allCheck-bottom").removeAttr("checked");
            target = false;
        } else {
            console.log(1)
            $("#allCheck").get(0).checked = "checked";
            var newProduct = document.getElementsByClassName("newProduct");
            for (var j = 0; j < newProduct.length; j++) {
                $(newProduct[j]).find("h5").children("input").get(0).checked = "checked";
                $(newProduct[j]).find("ul").children("li").eq(0).children("input").get(0).checked = "checked";
            }
            $("#allCheck-bottom").get(0).checked = "checked";
            target = true;
        }
    })


    // 价格汇总
    var newProduct = document.getElementsByClassName("newProduct");
    var totalNum=0;
    var totalPrice=0;
    for (var j = 0; j < newProduct.length; j++) {
        totalNum += parseFloat($(newProduct[j]).find("ul").children("li").eq(3).children("input").val())
        totalPrice += parseFloat($(newProduct[j]).find("ul").children("li").eq(4).children("span:eq(0)").html());
    }
    $(".totalbox-right div:eq(0) span:eq(1) em").get(0).innerHTML = totalNum;
    $(".totalbox-right div:eq(0) span:eq(0) em").get(0).innerHTML = totalPrice;






















})

























// // 需求分析：
// var cartbox = document.getElementById("cartbox");
// var show = cartbox.firstChild;
// var hide = cartbox.lastChild;
// var clone = document.getElementById("clone");
// // 公共方法。
// var util = {
//         // 获取本地存储的数据的方法。
//         getStorage: function () {
//             return JSON.parse(localStorage.getItem("list") || "[]");
//         },

//         // 设置本地存储数据的方法。
//         setStorage: function (json) {
//             localStorage.setItem("list", JSON.stringify(json));
//         },

//         // 渲染购物车，根据本地存储中的数据，使本地存储中的数据展示在购物车中。
//         renderCar: function (products, id) {
//             var box = document.getElementById(id);
//             // 如果传入的数据为空，则清除购物车中的内容。
//             if (products.length < 1) {
//                 show.style.display = "none";
//                 hide.style.display = "block";
//             } else {
//                 hide.style.display = "none";
//                 show.style.display = "block";

//                 // 定义一个字符串，用于拼接box里面的内容。
//                 for (var i = 0; i < products.length; i++) {
//                     var $newProduct = clone.clone(true);

//                 }
//                 // 把str中拼接的字符串放到box中。
//                 box.innerHTML = str;
//                 addDeleteEvent();
//                 addNumChangeEvent();
//             }
//         }


//         // // 需求0：当本地存储中含有数据，则根据本地存储中的数据自动渲染购物车。
//         // util.renderCar(util.getStorage(), "car");


//         // // 需求1：点击加入购物车按钮，把该商品的数据添加到本地存储。同时在页面中渲染购物车。
//         // addCartEvent();

//         // function addCartEvent() {
//         //     // 获取所有的加入购物车按钮。
//         //     var addCartBtn = document.querySelectorAll(".addCart");
//         //     // 循环给加入购物车按钮绑定点击事件。
//         //     for (var i = 0; i < addCartBtn.length; i++) {
//         //         addCartBtn[i].onclick = function () {
//         //             // 获取加入购物车按钮的父级的父级元素。
//         //             var tr = this.parentNode.parentNode;
//         //             // 把当前商品的信息存到新的对象product中。
//         //             var product = {
//         //                 id: tr.children[0].innerHTML,
//         //                 img: tr.children[1].children[0].src,
//         //                 name: tr.children[2].innerHTML,
//         //                 price: tr.children[3].innerHTML
//         //             };
//         //             // 调用函数，把点击的该商品加到加到购物车中。
//         //             addProduct(product);
//         //         }
//         //     }
//         // }
//         // // 封装函数，把指定的商品加到本地存储和购物车中。
//         // function addProduct(product) {
//         //     // 获取本地存储中的商品。
//         //     var products = util.getStorage();
//         //     // 遍历本地存储中的商品列表。同时判断该指定的商品是否存在本地存储。
//         //     for (var i = 0; i < products.length; i++) {
//         //         // 判断传入的该商品是否存在商量列表中。
//         //         if (products[i].id == product.id) {
//         //             // 如果列表中已经存在该商品，则其数量num++。
//         //             products[i].num = products[i].num + 1;
//         //             // 同时将新的products数据放到本地存储中。
//         //             util.setStorage(products);
//         //             // 当本地存储的商品信息发生变化时，更新购物车中的信息。
//         //             util.renderCar(products, "car");
//         //             // 跳出函数，使程序不再往后执行。
//         //             return;
//         //         }
//         //     }
//         //     // 如果本地存储的商品列表中不含该指定的商品，则把该商品信息放到里面。且数量为1.
//         //     product.num = 1;
//         //     products.push(product);
//         //     util.setStorage(products);
//         //     util.renderCar(products, "car");
//         // }


//         // // 需求3：点击删除按钮时，可以删除某个商品。
//         // function addDeleteEvent() {
//         //     // 获取所有的删除按钮标签。
//         //     var deleteBtn = document.querySelectorAll(".deleteProduct");
//         //     // 循环遍历出来每一个删除按钮对应的商品信息。
//         //     for (var i = 0; i < deleteBtn.length; i++) {
//         //         deleteBtn[i].onclick = function () {
//         //             // 获取删除按钮的父级的父级元素的第一个元素，得到其中内容。
//         //             var id = this.parentNode.parentNode.children[0].innerHTML;
//         //             // 调用删除商品的函数。
//         //             removeProduct(id);
//         //         }
//         //     }
//         // }
//         // // 封装函数，可以清除本行的商品。
//         // function removeProduct(id) {
//         //     // 通过本地获取商品列表。
//         //     var products = util.getStorage();
//         //     // 遍历出来商品列表中的每一个商品的信息。
//         //     for (var i = 0; i < products.length; i++) {
//         //         // 如果商品列表中含有该指定的商品。
//         //         if (products[i].id == id) {
//         //             // 删除该商品的所有信息。
//         //             products.splice(i, 1);
//         //             // 当商品列表数组删除一个数据，需要更新本地存储。
//         //             util.setStorage(products);
//         //             // 同时根据新的商品列表，渲染购物车。
//         //             util.renderCar(products, "car");
//         //         }
//         //     }
//         // }


//         // // 需求4：点击+-按钮改变购物车中的商品的数量。
//         // function addNumChangeEvent() {
//         //     // 获取商品增加或者减少的按钮。
//         //     var addNumBtn = document.querySelectorAll(".add");
//         //     var cutNumBtn = document.querySelectorAll(".cut");
//         //     // 遍历所有的增减按钮，并为其绑定点击事件，使购物车中的商品的数量可以增加或者减少。
//         //     for (var i = 0; i < addNumBtn.length; i++) {
//         //         addNumBtn[i].onclick = function () {
//         //             // 获取增减按钮的父级的父级元素的第一个子元素的内容。
//         //             var id = this.parentNode.parentNode.children[0].innerHTML;
//         //             // 调用函数，可以使购物车中的商品数量增加。
//         //             NumChange("add", id);
//         //         }
//         //         cutNumBtn[i].onclick = function () {
//         //             // 获取增减按钮的父级的父级元素的第一个子元素的内容。
//         //             var id = this.parentNode.parentNode.children[0].innerHTML;
//         //             // 调用函数，可以使购物车中的商品数量减少。
//         //             NumChange("cut", id);
//         //         }
//         //     }
//         // }
//         // // 封装函数，根据传入的增减类型，使购物车中的商品的数量增加或者减少。
//         // function NumChange(type, id) {
//         //     // 定义一个对象。存放增加或者减少的方法。
//         //     var obj = {
//         //         // 数量增加方法。
//         //         "add": function (id) {
//         //             var products = util.getStorage();
//         //             for (var i = 0; i < products.length; i++) {
//         //                 if (products[i].id == id) {
//         //                     products[i].num = products[i].num + 1;
//         //                     util.setStorage(products);
//         //                     util.renderCar(products, "car");
//         //                     return;
//         //                 }
//         //             }
//         //         },
//         //         // 数量减少方法。
//         //         "cut": function (id) {
//         //             var products = util.getStorage();
//         //             for (var i = 0; i < products.length; i++) {
//         //                 if (products[i].id == id) {
//         //                     products[i].num = products[i].num - 1;
//         //                     if (products[i].num <= 0) {
//         //                         removeProduct(id);
//         //                         return;
//         //                     }
//         //                     util.setStorage(products);
//         //                     util.renderCar(products, "car");
//         //                     return;
//         //                 }
//         //             }
//         //         }
//         //     }
//         //     obj[type](id);
//         // }