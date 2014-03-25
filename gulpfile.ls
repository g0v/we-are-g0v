require! <[gulp gulp-util express connect-livereload gulp-jade tiny-lr gulp-livereload path gulp-livescript]>

app = express!
lr = tiny-lr!

gulp.task 'html', ->
  gulp.src 'src/*.jade'
    .pipe gulp-jade!
    .pipe gulp.dest '_public'
    .pipe gulp-livereload lr

gulp.task 'js', ->
  gulp.src 'src/*.ls'
    .pipe gulp-livescript!
    .pipe gulp.dest '_public'
    .pipe gulp-livereload lr

gulp.task 'assets', ->
  gulp.src <[src/*.png src/*.js]>
    .pipe gulp.dest '_public'
    .pipe gulp-livereload lr

gulp.task 'server', ->
  app.use connect-livereload!
  app.use express.static path.resolve '_public'
  app.listen 3000
  gulp-util.log 'Listening on port 3000'

gulp.task 'watch', ->
  lr.listen 35729, ->
    return gulp-util.log it if it
  gulp.watch 'src/**/*.jade', <[html]>
  gulp.watch 'src/**/*.png', <[assets]>
  gulp.watch 'src/**/*.ls', <[js]>

gulp.task 'build', <[html js assets]>
gulp.task 'dev', <[build server watch]>
gulp.task 'default', <[build]>