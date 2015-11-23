/**
 * Created by patricepaquette on 2014-04-01.
 */

var
  gulp = require('gulp'),
  clean = require('gulp-clean'),
  ngTemplateCache = require('gulp-angular-templatecache'),
  jshint = require('gulp-jshint'),
  less = require('gulp-less'),
  concat = require('gulp-concat'),
  config = require('./build.config.js'),
  gulpif = require('gulp-if'),
  gulpTemplate = require('gulp-template'),
  q = require('q'),
  es = require('event-stream'),
  glob = require('multi-glob').glob,
  _ = require('lodash'),
  async = require('async'),
  watch = require('gulp-watch'),
  args = require('yargs').argv;


var env = args.env || 'dev';
var target = (env="dev")?config.build_dir:config.compile_dir;

//set up dynamic configs
config.app_files.config = [implPath + 'src/**/config.' + env + '.js'];

console.log(config.app_files.config);
gulp.task("clean", function(){
  return gulp.src(target, {read: false})
    .pipe(clean());
});

gulp.task("compileSource", ['clean'], function(){
  return es.merge(
    //compile angular templates
    gulp.src(config.app_files.atpl)
      .pipe(ngTemplateCache(config.app_files.atpl_dest, { module: 'templates-app', standalone: true }))
      .pipe(gulp.dest(target)),
    gulp.src(config.app_files.ctpl)
      .pipe(ngTemplateCache(config.app_files.ctpl_dest, { module: 'templates-common', standalone: true }))
      .pipe(gulp.dest(target)),
    //compile less and css;
    gulp.src([config.app_files.less].concat(config.dev_vendor_files.css))
      .pipe(less())
      .pipe(concat(config.app_files.css_dest))
      .pipe(gulp.dest(target)),
    //copy configs
    gulp.src(config.app_files.config)
      .pipe(gulp.dest(target)),
    //copy src js files
    gulp.src(config.app_files.js)
      .pipe(gulp.dest(target)),

    //copy vendor js files
    gulp.src(config.dev_vendor_files.js)
      .pipe(gulp.dest(target + '/vendor'))
  );
});

gulp.task("build", ['compileSource'], function(){
  return generateIndex([
    target + '/vendor/angular.js',
    target + '/vendor/jquery.js',
    target + '/vendor/bootstrap.js',
    target + '/vendor/ui-bootstrap.js',
    target + '/vendor/**/*.js',
    target + '/templates-app.js',
    target + '/templates-common.js',
    target + '/app/**/*.js',
    target + '/**/*.css']);
});


function generateIndex(filesSrc){
  var deferred = q.defer();
  var deferred2 = q.defer();

  glob(filesSrc, {}, function(err, files){
    console.log(files);
    deferred.resolve(files);
  });

  deferred.promise.then(function(filesSrc){
    var dirRE = new RegExp('^(' + config.build_dir + '|' + config.compile_dir + ')\/', 'g');
    var jsFiles = filterForJS(filesSrc).map(function (file) {
      return file.replace(dirRE, '');
    });
    var cssFiles = filterForCSS(filesSrc).map(function (file) {
      return file.replace(dirRE, '');
    });

    deferred2.resolve(
      gulp.src('src/index.html')
        .pipe(gulpTemplate({
          scripts: jsFiles,
          styles: cssFiles
        }))
        .pipe(gulp.dest(config.build_dir))
    );
  })

  return deferred2.promise;
}

/**
 * A utility function to get all app JavaScript sources.
 */
function filterForJS(files) {
  return files.filter(function (file) {
    return file.match(/\.js$/);
  });
}

/**
 * A utility function to get all app CSS sources.
 */
function filterForCSS(files) {
  return files.filter(function (file) {
    return file.match(/\.css$/);
  });
}
