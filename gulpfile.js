const { src, dest, watch, parallel, series } = require('gulp');
// перекодування scss в css
const scss = require('gulp-sass')(require('sass'));
//  уміє об'єднувати файли і переіменовує
const concat = require('gulp-concat');
//   для обєднання і зжимання яваскріпт файлів
const uglify = require('gulp-uglify-es').default;
// браузер який сам перезапускається коли є зміни
const browserSync = require('browser-sync').create();
// дописує вендорні префікси для підтримки старих браузерів
const autoprefixer = require('gulp-autoprefixer');
// плагін який стирає все з папки
const clean = require('gulp-clean');
//  конвертація в avif
const avif = require('gulp-avif');
//  конвертація в webp
const webp = require('gulp-webp');
//  конвертація в jpg svg png
const imagemin = require('gulp-imagemin');
//  робота з кешом
const newer = require('gulp-newer');
//  робота з шрифтами
const fonter = require('gulp-fonter'); //   все у woff
const ttf2woff2 = require('gulp-ttf2woff2'); //   ttf i woff у woff2
//  конвертація в svg sprite
const svgSprite = require('gulp-svg-sprite');
//   вставка кода з інших файлів
const include = require('gulp-include');
const fs = require('fs');
const path = require('path');

function pages() {
    return src('app/pages/*.html')
        .pipe(
            include({
                includePaths: 'app/components',
            })
        )
        .pipe(dest('app'))
        .pipe(browserSync.stream());
}

function fonts() {
    return src('app/fonts/src/*.*')
        .pipe(
            fonter({
                formats: ['woff', 'ttf'],
            })
        )
        .pipe(src('app/fonts/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(dest('app/fonts'));
}

function images() {
    //  конвертація в фото в авіф
    return (
        src(['app/images/src/*.*', '!app/images/src/*.svg'])
            .pipe(newer('app/images')) //  порівнює в кеші щоб не конвертувати конвертовані а лиш нові
            .pipe(avif({ quality: 50 }))
            //  конвертація в вебпі
            .pipe(src('app/images/src/*.*'))
            .pipe(newer('app/images')) //  порівнює в кеші щоб не конвертувати конвертовані а лиш нові
            .pipe(webp())
            //  зменшує картинки
            .pipe(src('app/images/src/*.*'))
            .pipe(newer('app/images')) //  порівнює в кеші щоб не конвертувати конвертовані а лиш нові
            .pipe(imagemin())

            .pipe(dest('app/images'))
    );
}

function sprite() {
    return src('app/images/*.svg')
        .pipe(
            svgSprite({
                mode: {
                    stack: {
                        sprite: '../sprite.svg',
                        example: true,
                    },
                },
            })
        )
        .pipe(dest('app/images'));
}

function scripts() {
    return src([
        // "node/swiper/swiper-bundle.js",    якщо треба підключити ще якийсь файл js або якщо скинути в папку
        'node_modules/mixitup/dist/mixitup.js',
        'node_modules/jquery/dist/jquery.js',
        'app/js/main.js',
    ]) // бере файл
        .pipe(concat('main.min.js')) //переіменувати
        .pipe(uglify()) // обєднати і мінімізувати
        .pipe(dest('app/js')) // переміщує в папку
        .pipe(browserSync.stream()); // щоб браузер перезапустився коли змінились скрипти
}

function styles() {
    return src('app/scss/style.scss') // бере файл інші імпортуються
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] })) // використання автопрефіксера
        .pipe(concat('style.min.css')) // переіменовує
        .pipe(scss({ outputStyle: 'compressed' })) // зжимає
        .pipe(dest('app/css')) // переміщує впапку
        .pipe(browserSync.stream()); // щоб браузер перезапустився коли змінились стилі
}

function watching() {
    // функція яка дивиться за змінами
    browserSync.init({
        //підключення браузера разом з вотч
        server: {
            baseDir: 'app/',
        },
    });
    watch(['app/scss/style.scss'], styles); // дивимось за цсс
    watch(['app/images/src'], images); // дивимось за картинками
    watch(['app/js/main.js'], scripts); // дивимось за скріптами
    watch(['app/components/*', 'app/pages/*'], pages);
    watch(['app/*.html']).on('change', browserSync.reload);
    // щоб браузер перезапустився коли змінились html файли всі
}

function cleanDist() {
    //очистка папки для повторного білду проекта
    return src('dist').pipe(clean());
}

function building() {
    // перенос файлів в папку dist готовий проект
    return src(
        [
            'app/css/style.min.css',
            '!app/images/**/*.html',
            'app/images/*.*',
            '!app/images/*.svg',
            'app/images/sprite.svg',
            'app/fonts/*.*',
            'app/js/main.min.js',
            'app/*.html',
        ],
        { base: 'app' }
    ).pipe(dest('dist'));
}

// експортуємо всі функції
exports.styles = styles;

exports.images = images;
exports.fonts = fonts;
exports.pages = pages;
exports.building = building;
exports.sprite = sprite;
exports.scripts = scripts;
exports.watching = watching;

exports.build = series(cleanDist, building); // запуск функцій одна за одною
exports.default = parallel(styles, images, scripts, pages, watching); // запустити паралельно таски всі зразу
