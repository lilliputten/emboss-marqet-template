const fs = require('fs');
const path = require('path');

const gulp = require('gulp');

const replace = require('gulp-replace');
// const sourcemaps = require('gulp-sourcemaps');
const tap = require('gulp-tap');

const {
  getBuildInfoText,
  getProjectRelativeFileName,
  truthyValue,
  getEnvVariable,
} = require('./utils/gulp-helpers');

const cssPath = 'build/css';

const useRelativePaths = truthyValue(getEnvVariable('USE_RELATIVE_PATHS'));

function processRelativeStyleUrls() {
  // build/_next/static/css/5c20234126dae04a.css
  return (
    gulp
      .src([cssPath + '/*.css'])
      .pipe(
        tap(function (file) {
          const name = getProjectRelativeFileName(file.path).replace(/\\/g, '/');
          // eslint-disable-next-line no-console
          console.log('Processing relative urls in', name);
        }),
      )
      // .pipe(sourcemaps.init({ loadMaps: true }))
      // Replace pseudo-absolute font (and mother media?) paths to relative ones...
      .pipe(replace(/(url\("?)(\/)/g, '$1..$2'))
      .pipe(replace(/[\n\r\s]*\/\*# sourceMappingURL=.*\*\/[\n\r\s]*/g, ''))
      // .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(cssPath))
  );
}

function processRelativeHtmlUrls() {
  // Process current urls for deep ('build/XXX/**/*.html') html files to '../...' (or '../../......'):
  // `<link rel="preload" href="./_next/static/...`
  // `<script src="./_next/static/...`
  return (
    gulp
      .src(['build/**/*.html'])
      // Replace relative paths to current folder to parent ones ('./' -> '../') -- it will work only for 1st level files ('build/XXX/*.html')...
      .pipe(
        tap(function (file) {
          const filePath = file.path;
          const name = getProjectRelativeFileName(filePath).replace(/\\/g, '/');
          const dirname = path.dirname(name);
          const parts = name.split('/');
          const depth = parts.length - 2;
          const enoughDepth = depth >= 0;
          const prefix = enoughDepth ? '../'.repeat(depth) : './';
          if (enoughDepth) {
            // eslint-disable-next-line no-console
            console.log('Processing relative urls in', name);
            return gulp
              .src(name)
              .pipe(
                replace(
                  /(url\("?|<link[^<>]* href="|<(?:img|script)[^<>]* src=")\//g,
                  '$1' + prefix,
                ),
              )
              .pipe(gulp.dest(dirname));
          }
        }),
      )
    // .pipe(gulp.dest('build'))
  );
}

function writeBuildInfo(cb) {
  const buildInfoText = getBuildInfoText();
  // eslint-disable-next-line no-console
  console.log('Build info:\n' + buildInfoText);
  fs.writeFile('build/build.txt', buildInfoText, cb);
}

gulp.task('writeBuildInfo', writeBuildInfo);
gulp.task('processRelativeStyleUrls', processRelativeStyleUrls);
gulp.task('processRelativeHtmlUrls', processRelativeHtmlUrls);

const patchBuildTasks = [
  useRelativePaths && 'processRelativeStyleUrls',
  useRelativePaths && 'processRelativeHtmlUrls',
  'writeBuildInfo',
].filter(Boolean);

gulp.task('patchBuild', gulp.parallel.apply(gulp, patchBuildTasks));
