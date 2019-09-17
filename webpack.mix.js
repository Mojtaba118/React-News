const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js/admin.js')
   .sass('resources/sass/app.scss', 'public/css/admin.css');

mix.react('resources/js/auth/app.js', 'public/js/auth.js')
    .sass('resources/sass/auth.scss', 'public/css/auth.css');
