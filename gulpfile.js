var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var exec = require('child_process').exec;
var path = require('path');

const gulpHelper =
    require('./node_modules/clobl/gulp-helper.js')
        .use(gulp)
        .setPath({
            root: __dirname,
            blocks: path.join(__dirname, '/app/blocks')
        })
        .setSoyPath({
            root: 'build'
        });

var errorHandler = function (error) {
  notify.onError({
    message:  "Error: <%= error.message %>",
  })(error);
}


gulp.task('sass', function () {
  gulp.src('scss/*.scss')
    .pipe(sass()).on('error', errorHandler)
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('soy', function () {
    return gulpHelper.soy.build();
});

gulp.task('scripts', function() {   
  var compile = false;
  var command = path.join(__dirname, 'node_modules/google-closure-library/closure/bin/build/closurebuilder.py');
    command += ' --root="' + path.join(__dirname, 'app/blocks/') + '"';
    command += ' --root="' + path.join(__dirname, 'node_modules/google-closure-library/') + '"';
    command += ' --namespace="tr.lProfile"';    
    if(compile) {
      command += ' --output_mode=compiled';
      command += ' --compiler_jar=compiler.jar';
      command += ' --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS"';
    } else {
      command += ' --output_mode="script"';
    }
    command += ' --output_file="' + path.join(__dirname, 'public/js/l-profile.js') + '"';
  exec(command);
});

gulp.task('build', ['soy', 'scripts']);

gulp.task('watch', function () {
  gulp.watch('scss/**', ['sass']);
});
