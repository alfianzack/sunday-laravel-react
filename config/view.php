<?php

return [

    /*
    |--------------------------------------------------------------------------
    | View Storage Paths
    |--------------------------------------------------------------------------
    |
    | Most templating systems load templates from disk. Here you may specify
    | an array of paths that should be checked for your views. Of course
    | the usual Laravel view path has already been registered for you.
    |
    */

    'paths' => [
        resource_path('views'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Compiled View Path
    |--------------------------------------------------------------------------
    |
    | This option determines where all the compiled Blade templates will be
    | stored for your application. Typically, this is within the storage
    | directory. However, as usual, you are free to change this value.
    |
    */

    'compiled' => env(
        'VIEW_COMPILED_PATH',
        realpath(storage_path('framework/views'))
    ),

    /*
    |--------------------------------------------------------------------------
    | Blade View Checking
    |--------------------------------------------------------------------------
    |
    | When set to true, Blade will check if a view has been modified since
    | it was last compiled. If it has, Blade will recompile the view.
    |
    */

    'cache' => env('VIEW_CACHE', true),

    /*
    |--------------------------------------------------------------------------
    | Relative Hash
    |--------------------------------------------------------------------------
    |
    | When set to true, Blade will use a relative hash for the compiled view
    | path. This allows for better cache busting when deploying.
    |
    */

    'relative_hash' => env('VIEW_RELATIVE_HASH', false),

    /*
    |--------------------------------------------------------------------------
    | Compiled Extension
    |--------------------------------------------------------------------------
    |
    | This option determines the file extension that will be used for compiled
    | Blade templates. By default, this is "php". However, you are free to
    | change this value if you have a different preference.
    |
    */

    'compiled_extension' => env('VIEW_COMPILED_EXTENSION', 'php'),

];

