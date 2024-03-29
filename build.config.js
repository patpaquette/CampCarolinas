/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: 'build',
  compile_dir: '../CampCarolinas/public/campsearch/bin',
  //compile_dir: 'bin',

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains ourcd
   * app's unit tests.
   */
  app_files: {
    js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
    configDev: 'src/app/config/config.dev.js',
    configProd: 'src/app/config/config.prod.js',
    jsunit: [ 'src/**/*.spec.js' ],

    coffee: [ 'src/**/*.coffee', '!src/**/*.spec.coffee' ],
    coffeeunit: [ 'src/**/*.spec.coffee' ],

    atpl: [ 'src/app/**/*.tpl.html' ],
    ctpl: [ 'src/common/**/*.tpl.html' ],

    html: [ 'src/index.html' ],
    less: 'src/less/main.less',

    atpl_dest: 'templates-app.js',
    ctpl_dest: 'templates-common.js',
    css_dest: 'css_compiled.css'
  },

  /**
   * This is a collection of files used during testing only.
   */
  test_files: {
    js: [
      'vendor/angular-mocks/angular-mocks.js'
    ]
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
  dev_vendor_files: {
    js: [
      'vendor/angular/angular.js',
      'vendor/angular-route/angular-route.js',
      'vendor/placeholders/angular-placeholders-0.0.1-SNAPSHOT.min.js',
      'vendor/jquery/jquery.js',
      'vendor/jquery.serializeJSON/jquery.serializeJSON.js',
      'vendor/underscore/underscore.js',
      'vendor/bootstrap/dist/js/bootstrap.js',
      'vendor/async/lib/async.js',
      'vendor/angular-sanitize/angular-sanitize.js',
      //'vendor/angular-ui/build/angular-ui.js',
      'vendor/angular-ui-bootstrap3/ui-bootstrap.js',
      'vendor/angular-ui-bootstrap3/ui-bootstrap-tpls.js',
      'vendor/imagemapster/jquery.imagemapster.js',
      'vendor/maphilight/jquery.maphilight.js',
      'vendor/modernizr/modernizr.js',
      'vendor/angular-encode-uri/dist/angular-encode-uri.js',
      'vendor/jQuery-ajaxTransport-XDomainRequest/jQuery.XDomainrequest.js',
      'vendor/html5shiv-dist/html5shiv.js',
      'vendor/respond/dest/respond.min.js',
      'vendor/gmaps/gmaps.js'
      //'vendor/raphael/raphael.js'
    ],
    css: [
      //'vendor/angular-ui/build/angular-ui.css'
    ],
    assets: [
    ]
  },
  prod_vendor_files: {
    js: [
      //'vendor/jquery/jquery.js',
      'vendor/angular/angular.js',
      'vendor/angular-route/angular-route.js',
      'vendor/placeholders/angular-placeholders-0.0.1-SNAPSHOT.min.js',
      'vendor/jquery.serializeJSON/jquery.serializeJSON.js',
      'vendor/underscore/underscore.js',
      'vendor/bootstrap/dist/js/bootstrap.js',
      'vendor/async/lib/async.js',
      'vendor/angular-sanitize/angular-sanitize.js',
      //'vendor/angular-ui/build/angular-ui.js',
      'vendor/angular-ui-bootstrap3/ui-bootstrap.js',
      'vendor/angular-ui-bootstrap3/ui-bootstrap-tpls.js',
      'vendor/imagemapster/jquery.imagemapster.js',
      'vendor/maphilight/jquery.maphilight.js',
      'vendor/modernizr/modernizr.js',
      'vendor/angular-encode-uri/dist/angular-encode-uri.js',
      'vendor/jQuery-ajaxTransport-XDomainRequest/jQuery.XDomainrequest.js',
      'vendor/html5shiv-dist/html5shiv.js',
      'vendor/respond/dest/respond.min.js',
      'vendor/gmaps/gmaps.js'
      //'vendor/raphael/raphael.js'
    ],
    css: [
      //'vendor/angular-ui/build/angular-ui.css'
    ],
    assets: [
    ]
  },
};
