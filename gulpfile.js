// Requiere los módulos
const autoprefixer = require('gulp-autoprefixer'),
      browserSync = require("browser-sync").create(),
      cache = require('gulp-cache'),
      concat = require('gulp-concat'),
      combineMq = require('gulp-combine-mq'),
      jshint = require('gulp-jshint'),
      minifycss = require('gulp-minify-css'),
      notify = require('gulp-notify'),
      gulp = require('gulp'),
      order = require("gulp-order"),
      plumber = require('gulp-plumber'),
      rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify');

// Crea el servidor
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Función de recarga
gulp.task('bs-reload', function () {
  browserSync.reload();
});

// Compila SASS
gulp.task('styles', function(){
  gulp.src(['src/sass/*.sass'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass().on('error',notify.onError({
      message:'Error: <%= error.message %>',
      title:'Fallo en SASS'
    })))
    // .pipe(sass())
    // .pipe(autoprefixer('last 2 versions', 'ie >= 9'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({stream:true}))
    // .pipe(notify({
    //   message:"CSS actualizado",
    //   title: 'TODO OK'
    // }))
});

// Compila JS
gulp.task('scripts', function(){
  return gulp.src('src/scripts/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    // .pipe(jshint())
    // .pipe(jshint.reporter('default'))
    .pipe(order([
      "wow.js",
      "main.js"
    ]))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.reload({stream:true}))
});

// Combina @Media
gulp.task('combineMq', function () {
	return gulp.src('dist/css/app.css')
	.pipe(combineMq({
		beautify: true
	}))
	.pipe(gulp.dest('dist/css/'));
});

// Mira los cambios
gulp.task('default', ['browser-sync'], function(){
  gulp.watch("src/sass/*.sass", ['styles']);
  gulp.watch("src/scripts/*.js", ['scripts']);
  gulp.watch("*.html", ['bs-reload']);
  browserSync.notify("Testing", 1000);
});


// Ejecuta las tareas
// gulp.task('default', ['watch', 'server'])
