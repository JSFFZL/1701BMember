var gulp = require("gulp");
var webserver = require("gulp-webserver");
var js = require("gulp-babel");

gulp.task("webserver",()=>{
    return gulp.src("./src/")
    .pipe(webserver({
        open:true,
        port:8086,
        host:"169.254.191.1",
        livereload:true,
		proxies:[
			{source:"/api/getUser",target:"http://localhost:3000/api/getUser"},
			{source:"/api/getUserOne",target:"http://localhost:3000/api/getUserOne"}, //查询具体信息
			{source:"/api/getUpdate",target:"http://localhost:3000/api/getUpdate"}, //更改具体信息
			{source:"/api/deleteUser",target:"http://localhost:3000/api/deleteUser"}
		]
    }))
})

gulp.task("es6",()=>{
    return gulp.src(["./src/js/**/*.js","!./src/js/libs/*.js"])  //匹配0个或者多个文件夹
    .pipe(js({
        presets:"es2015"
    }))
    .pipe(gulp.dest("./dist/js/")) //libs 不编译
})

