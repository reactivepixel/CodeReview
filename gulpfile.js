var gulp            = require('gulp'),
    child_process   = require('child_process'),
    nodemon         = require('gulp-nodemon'),
    jeet            = require('jeet'),
    stylus          = require('gulp-stylus'),
    connect         = require('gulp-connect'),
    mocha           = require('gulp-mocha'),
    jshint          = require('gulp-jshint'),
    exec            = require('child_process').exec,
    uglify          = require('gulp-uglify'),
    gutil           = require('gulp-util'),
    concat          = require('gulp-concat'),
    livereload      = require('gulp-livereload');

var config = {
    jshint: ['./*.js', './*/*.js']
};

gulp.task('clearStart', function () {
    // Ensure mongod is not running
    exec('killall mongod');
});

// startup required services to run the app server
gulp.task('mongod', function () {
    // spawn in a child process mongodb
    child_process.exec('mongod', function (err, stdout, stderr) {
        if (stderr) {
            console.log('Mongod[Error]: ' + stderr + ' : ' + stdout);
        } else {
            console.log(stdout);
        }
    });
});

gulp.task('development', function () {
    nodemon({
            script: 'app.js',
            ext: 'html js styl',
            ignore: ['ignored.js'],
            // tasks:[],
            env: {
                "NODE_ENV": "development"
            }
        })
        .on('restart', function () {
            console.log('restarted!');
        });
});

gulp.task('runTests', function () {
    return gulp.src(['test/*.js'], {
            read: false
        })
        .pipe(mocha({
            reporter: 'spec',
            timeout: 2000
        }))
        .on('error', gutil.log)

    // exit on end
    .once('end', function () {
        process.exit();
    });
});


gulp.task('css', function () {
    gulp.src('./assets/css/**/*.styl')
        .pipe(stylus({
            use: [jeet()]
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(connect.reload());
    gulp.src('./assets/css/**/*.css')
        .pipe(stylus({
            use: [jeet()]
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(connect.reload());
});

//compiling js files and uglifying them
gulp.task('jsCompress', function () {
    gulp.src('./assets/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(livereload())
        .on('error', gutil.log);
});

gulp.task('lint', function () {
    return gulp.src(config.jshint, {
            base: './'
        })
        .pipe(jshint())
        .pipe(jshint.reporter('default', {
            verbose: true
        }))
        .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch([        
        './assets/**/*', 
        './test/*'
    ],['build']);
});

gulp.task('build', ['css', 'jsCompress']);
gulp.task('test', ['clearStart', 'mongod', 'runTests']);
gulp.task('dev', ['clearStart', 'build', 'mongod', 'watch', 'development']);
gulp.task('default', ['build']);
