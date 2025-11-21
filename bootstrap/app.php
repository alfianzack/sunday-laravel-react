<?php

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| The first thing we will do is create a new Laravel application instance
| which serves as the "glue" for all the components of Laravel, and is
| the IoC container for the system binding all of the various parts.
|
*/

$app = new Illuminate\Foundation\Application(
    $_ENV['APP_BASE_PATH'] ?? dirname(__DIR__)
);

/*
|--------------------------------------------------------------------------
| Register Filesystem Binding Early
|--------------------------------------------------------------------------
|
| Register the 'files' binding early to prevent errors when service providers
| try to access it before FilesystemServiceProvider is loaded.
|
*/

$app->singleton('files', function () {
    return new Illuminate\Filesystem\Filesystem;
});

/*
|--------------------------------------------------------------------------
| Register Database Connection Binding Early (No-op)
|--------------------------------------------------------------------------
|
| Register a no-op database connection to prevent DatabaseServiceProvider
| from trying to connect to database. Since backend is handled by Node.js,
| we don't need database connection.
|
*/

// Database bindings will be registered by DatabaseServiceProvider
// But we prevent actual connection by using SQLite in-memory
// No need to register early bindings as DatabaseServiceProvider handles it

/*
|--------------------------------------------------------------------------
| Register MaintenanceMode Binding Early
|--------------------------------------------------------------------------
|
| Register the MaintenanceMode binding early to prevent errors when middleware
| or other components try to access it before FoundationServiceProvider is loaded.
| Using FileBasedMaintenanceMode as default since it doesn't require config.
|
*/

$app->singleton(
    Illuminate\Contracts\Foundation\MaintenanceMode::class,
    function () {
        return new Illuminate\Foundation\FileBasedMaintenanceMode();
    }
);

/*
|--------------------------------------------------------------------------
| Register Blade Compiler Binding Early
|--------------------------------------------------------------------------
|
| Register the 'blade.compiler' binding early to support Blade engine.
|
*/

$app->singleton('blade.compiler', function ($app) {
    $compiledPath = $app['config']['view.compiled'] ?? storage_path('framework/views');
    $relativeHash = $app['config']->get('view.relative_hash', false) ?? false;
    $cache = $app['config']->get('view.cache', true) ?? true;
    $extension = $app['config']->get('view.compiled_extension', 'php') ?? 'php';
    
    return new Illuminate\View\Compilers\BladeCompiler(
        $app['files'],
        $compiledPath,
        $relativeHash ? $app->basePath() : '',
        $cache,
        $extension
    );
});

/*
|--------------------------------------------------------------------------
| Register View Engine Resolver Binding Early
|--------------------------------------------------------------------------
|
| Register the 'view.engine.resolver' binding early to support view engines.
|
*/

$app->singleton('view.engine.resolver', function ($app) {
    $resolver = new Illuminate\View\Engines\EngineResolver();
    
    // Register file engine
    $resolver->register('file', function () use ($app) {
        return new Illuminate\View\Engines\FileEngine($app['files']);
    });
    
    // Register PHP engine
    $resolver->register('php', function () use ($app) {
        return new Illuminate\View\Engines\PhpEngine($app['files']);
    });
    
    // Register Blade engine
    $resolver->register('blade', function () use ($app) {
        $compiler = new Illuminate\View\Engines\CompilerEngine(
            $app->make('blade.compiler'),
            $app->make('files')
        );
        return $compiler;
    });
    
    return $resolver;
});

/*
|--------------------------------------------------------------------------
| Register View Finder Binding Early
|--------------------------------------------------------------------------
|
| Register the 'view.finder' binding early to support view finding.
|
*/

$app->singleton('view.finder', function ($app) {
    $paths = $app['config']['view.paths'] ?? [resource_path('views')];
    return new Illuminate\View\FileViewFinder($app['files'], $paths);
});

/*
|--------------------------------------------------------------------------
| Register Lang Path Binding Early
|--------------------------------------------------------------------------
|
| Register the 'path.lang' binding early to support translation loader.
|
*/

if (!$app->bound('path.lang')) {
    $app->instance('path.lang', resource_path('lang'));
}

/*
|--------------------------------------------------------------------------
| Register Translation Loader Binding Early
|--------------------------------------------------------------------------
|
| Register the 'translation.loader' binding early to support translation.
|
*/

$app->singleton('translation.loader', function ($app) {
    $langPath = $app['path.lang'] ?? resource_path('lang');
    return new Illuminate\Translation\FileLoader(
        $app['files'],
        [$langPath]
    );
});

/*
|--------------------------------------------------------------------------
| Register Translator Binding Early
|--------------------------------------------------------------------------
|
| Register the 'translator' binding early to prevent errors when components
| try to access it before TranslationServiceProvider is loaded.
|
*/

$app->singleton('translator', function ($app) {
    $loader = $app['translation.loader'];
    $locale = $app->getLocale() ?? $app['config']['app.locale'] ?? 'en';
    $fallbackLocale = $app->getFallbackLocale() ?? $app['config']['app.fallback_locale'] ?? 'en';
    
    $trans = new Illuminate\Translation\Translator($loader, $locale);
    $trans->setFallback($fallbackLocale);
    
    return $trans;
});

/*
|--------------------------------------------------------------------------
| Register View Binding Early
|--------------------------------------------------------------------------
|
| Register the 'view' binding early to prevent errors when components try
| to access it before ViewServiceProvider is loaded. This uses a deferred
| binding that will be resolved when actually needed.
|
*/

$app->singleton('view', function ($app) {
    // Defer to ViewServiceProvider if it's already loaded
    if ($app->bound('view.engine.resolver') && $app->bound('view.finder')) {
        $resolver = $app['view.engine.resolver'];
        $finder = $app['view.finder'];
        $events = $app['events'] ?? new Illuminate\Events\Dispatcher();
        $factory = new Illuminate\View\Factory($resolver, $finder, $events);
        $factory->setContainer($app);
        $factory->share('app', $app);
        return $factory;
    }
    
    // Use the pre-registered resolver and finder
    $resolver = $app['view.engine.resolver'];
    $finder = $app['view.finder'];
    $events = $app->bound('events') ? $app['events'] : new Illuminate\Events\Dispatcher();
    
    $factory = new Illuminate\View\Factory($resolver, $finder, $events);
    $factory->setContainer($app);
    $factory->share('app', $app);
    
    return $factory;
});

/*
|--------------------------------------------------------------------------
| Bind Important Interfaces
|--------------------------------------------------------------------------
|
| Next, we need to bind some important interfaces into the container so
| we will be able to resolve them when needed. The kernels serve the
| incoming requests to this application from both the web and CLI.
|
*/

$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    App\Http\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

/*
|--------------------------------------------------------------------------
| Return The Application
|--------------------------------------------------------------------------
|
| This script returns the application instance. The instance is given to
| the calling script so we can separate the building of the instances
| from the actual running of the application and sending responses.
|
*/

return $app;

