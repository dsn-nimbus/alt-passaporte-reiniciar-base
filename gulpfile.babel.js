import gulp from 'gulp';
import uglify from 'gulp-uglify';
import coveralls from 'gulp-coveralls';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import {Server as Karma} from 'karma';

const _coverage = 'coverage/**/lcov.info';
const _scripts = 'src/**/*.js';
const _styles = 'src/**/*.css';
const _script = 'alt-passaporte-reiniciar-base.js';
const _dist = 'dist';

gulp.task('build', ['unit_test'], () => {
  return gulp.src(_scripts)
    .pipe(concat(_script.toLowerCase()))
    .pipe(gulp.dest(_dist))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(_dist));
});

gulp.task('unit_test', (done) => {
  let _opts = {
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    browsers: ['Chrome']
  };

  return new Karma(_opts, done).start();
});

gulp.task('test-ci', ['unit_test'], () => {
  return gulp.src(_coverage).pipe(coveralls());
});
