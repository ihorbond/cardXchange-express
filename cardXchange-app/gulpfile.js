const gulp = require('gulp');
const bs   = require('browser-sync').create(); // create a browser sync instance.

gulp.task('browser-sync', () => {
    bs.init({
          // this should be the URL of your ng server
          // e.g. if you ran 'ng server -p 8080'
          // ** More Settings can be configured here too, but for simply working on a mobile-first design, this should suffice **
          proxy: "localhost:4200"
    });
});
