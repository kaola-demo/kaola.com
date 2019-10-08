// 引入gulp模块.
var gulp = require("gulp");

// 自动加载插件:可以加载以gulp-打头的插件.
var load = require("gulp-load-plugins")();

// 引入插件:ES6语法转换成ES5语法.
var babel = require("gulp-babel");

// 引入插件:合并获取到的文件,使其成为一个文件.
var concat = require("gulp-concat");

// 引入插件:重新命名获取后的操作完成的文件.
var rename = require("gulp-rename");

// 搭建静态服务器插件.
// browser-sync是静态服务器,create()开启创建.
var browser = require("browser-sync").create();

// 压缩.js文件.
//引入压缩js文件插件
var uglify = require("gulp-uglify");
gulp.task("js", function (done) { //任务名:js
    //获取文件流:读取src/js里面所有的js文件.
    gulp.src("./src/js/*.js")
        //调用插件:ES6语法转换成ES5语法.
        // 如果js文件中没有es6语法,则无法执行.
        .pipe(load.babel({
            presets: ["@babel/env"]
        }))
        // 调用插件,压缩js文件插件.
        .pipe(uglify())
        // .pipe(load.uglify())
        // 调用插件,所有压缩后的js文件进行合并.
        // .pipe(concat("all.js"))
        // 调用插件,操作后的js文件进行重新命名.
        // .pipe(rename("newName.min.js"))
        // 写入文件流:将当前获取的文件,操作后写入到dist/js中.
        .pipe(gulp.dest("./dist/js/"))
    done()
})

// 压缩.css文件.
// 引入压缩css文件插件.
var minifyCss = require("gulp-minify-css");
gulp.task("css", function (done) { //任务名:css
    //获取文件流:读取src/css里面所有的css文件.
    gulp.src("./src/css/*.css")
        // 调用插件:压缩css文件.
        // .pipe(minifyCss())
        .pipe(load.minifyCss())
        // 调用插件,所有压缩后的css文件进行合并.
        //  .pipe(concat("all.css"))
        // 调用插件,操作后的css文件进行重新命名.
        // .pipe(rename("newName.min.css"))
        // 写入文件流:将当前获取的文件,操作后写入到dist/css中.
        .pipe(gulp.dest("./dist/css/"))
    //获取文件流:读取src/css里面所有的scss文件.
    gulp.src("./src/css/*.scss")
        //调用插件,所有的scss转化为css类型文件.
        .pipe(load.sass())
        .pipe(load.minifyCss())
        .pipe(gulp.dest("./dist/css/"))

    done()
})

// 压缩.html文件.
// 引入压缩html文件插件.
var minifyHtml = require("gulp-minify-html");
gulp.task("html", function (done) { //任务名:html
    //获取文件流:读取src/里面所有的html文件.
    gulp.src("./src/*.html")
        // 调用插件:压缩html文件.
        // .pipe(minifyHtml())
        .pipe(load.minifyHtml())
        // 调用插件,所有压缩后的html文件进行合并.
        //  .pipe(concat("all.html"))
        // 调用插件,操作后的html文件进行重新命名.
        // .pipe(rename("newName.min.html"))
        // 写入文件流:将当前获取的文件,操作后写入到dist/css中.
        .pipe(gulp.dest("./dist/"))
    done();
})

// 压缩image图片
// 引入压缩image图片文件的插件.
var imageMin = require("gulp-imagemin")
gulp.task("image", function (done) {
    //获取文件流:读取src/img里面所有的image图片文件.
    gulp.src("./src/images/**")
        // 调用插件:压缩图片文件.
        // .pipe(imageMin())
        .pipe(load.imagemin())
        // 写入文件流:将当前获取的文件,操作后写入到dist/img中.
        .pipe(gulp.dest("./dist/images/"))
    done();
})


// 压缩所有文件.
// 串行:
gulp.task("minifyArr", gulp.series("js", "css", "html", "image", function (done) {
    // 执行完前面任务,执行搭建服务器中的刷新方法.使页面自动刷新.
    browser.reload();
    done()
}))
// 并行:
gulp.task("minifyArr", gulp.parallel("js", "css", "html", "image", function (done) {
    // 执行完前面任务,执行搭建服务器中的刷新方法.使页面自动刷新.
    browser.reload();
    done();
}))
// 结合:
gulp.task('minify', gulp.series(gulp.parallel('js', 'css', 'html', 'image'), function (done) {
    // 执行完前面任务,执行搭建服务器中的刷新方法.根据本地文件使页面自动刷新.
    browser.reload()
    done()
}));

// 在进行搭建服务器时,最初压缩一遍要求的文件.
gulp.task("server", gulp.series(gulp.parallel("js", "css", "html","image"), function (done) {
    //使用browser.init创建服务器位置和端口.
    browser.init({
        server: "./dist/",
        port: "8080"
    })
    // watch方法("要观测的文件",文件发生变化时的回调函数)
    gulp.watch("./src/", gulp.series("minify"))
    done();
}))