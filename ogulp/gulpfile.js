let gulp=require("gulp")
let htmlmin=require("gulp-htmlmin")
let sass=require("gulp-sass")
let cssmin=require("gulp-clean-css")
let autoprefixer=require("gulp-autoprefixer")
let uglify=require("gulp-uglify")
let babel=require("gulp-babel")
let imagemin=require("gulp-imagemin")
let webserver=require("gulp-webserver")

gulp.task("devhtml",()=>{
    return gulp.src("./fileone/*.html")
    .pipe(htmlmin({
        collapseWhitespace:true
    }))
    .pipe(gulp.dest("./filetwo/"))
})
gulp.task("devcss",()=>{
    return gulp.src("./fileone/style/*.scss")
    .pipe(sass())
    .pipe(autoprefixer({
        browsers:["last 2 versions"]
    }))
    .pipe(cssmin())
    .pipe(gulp.dest("./filetwo/style"))
})
gulp.task("devimg",()=>{
    return gulp.src("./fileone/images/*.jpg")
    .pipe(imagemin())
    .pipe(gulp.dest("./filetwo/images"))
})
gulp.task("dev",()=>{
    gulp.watch("./fileone/*.html",gulp.series("devhtml")),
    gulp.watch("./fileone/style/*.scss",gulp.series("devcss")),
    gulp.watch("./fileone/images/*.jpg",gulp.series("devimg"))
})
gulp.task("devserver",()=>{
    return gulp.src("./filetwo/")
    .pipe(webserver({
        port:7878,
        open:true,
        livereload:true,
        host:"192.168.137.4"
    }))
})
gulp.task("go",gulp.parallel(["devserver","dev"]))
