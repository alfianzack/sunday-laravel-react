<?php

/**
 * Override public_path() untuk cPanel
 * 
 * Di cPanel, document root adalah public_html/, bukan public/
 * Tapi Laravel mencari di public/, jadi kita perlu override
 * 
 * Helper ini akan otomatis menggunakan public_html jika ada,
 * atau fallback ke public untuk development
 */

// Load helper ini SEBELUM Laravel's helper
// Pastikan ini di-load di bootstrap/app.php atau composer.json autoload files

if (!function_exists('public_path')) {
    /**
     * Get the path to the public folder.
     *
     * @param  string  $path
     * @return string
     */
    function public_path($path = '')
    {
        $basePath = base_path();
        $publicHtmlPath = $basePath . DIRECTORY_SEPARATOR . 'public_html';
        $publicPath = $basePath . DIRECTORY_SEPARATOR . 'public';
        
        // Priority:
        // 1. Jika public ada (folder atau symlink), gunakan public
        // 2. Jika public_html ada dan public tidak ada, gunakan public_html
        // 3. Default: gunakan public (untuk development)
        
        if (file_exists($publicPath)) {
            // public ada (bisa folder atau symlink)
            $basePublicPath = $publicPath;
        } elseif (is_dir($publicHtmlPath)) {
            // public tidak ada tapi public_html ada (cPanel production)
            $basePublicPath = $publicHtmlPath;
        } else {
            // Default: gunakan public (untuk development)
            $basePublicPath = $publicPath;
        }
        
        return $basePublicPath . ($path ? DIRECTORY_SEPARATOR . ltrim($path, DIRECTORY_SEPARATOR) : '');
    }
}

