<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ApiService
{
    protected string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('services.api.url', 'http://localhost:5000/api');
    }

    /**
     * Make GET request to Node.js API
     */
    public function get(string $endpoint, array $query = [], array $headers = [])
    {
        try {
            // Add token to headers if available in session
            if (session()->has('token')) {
                $headers['Authorization'] = 'Bearer ' . session('token');
            }

            $response = Http::withHeaders($headers)
                ->get("{$this->baseUrl}/{$endpoint}", $query);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('API GET request failed', [
                'endpoint' => $endpoint,
                'status' => $response->status(),
                'response' => $response->body(),
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('API GET request exception', [
                'endpoint' => $endpoint,
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }

    /**
     * Make POST request to Node.js API
     */
    public function post(string $endpoint, array $data = [], array $headers = [])
    {
        try {
            // Add token to headers if available in session
            if (session()->has('token')) {
                $headers['Authorization'] = 'Bearer ' . session('token');
            }

            $response = Http::withHeaders($headers)
                ->post("{$this->baseUrl}/{$endpoint}", $data);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('API POST request failed', [
                'endpoint' => $endpoint,
                'status' => $response->status(),
                'response' => $response->body(),
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('API POST request exception', [
                'endpoint' => $endpoint,
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }

    /**
     * Make PUT request to Node.js API
     */
    public function put(string $endpoint, array $data = [], array $headers = [])
    {
        try {
            // Add token to headers if available in session
            if (session()->has('token')) {
                $headers['Authorization'] = 'Bearer ' . session('token');
            }

            $response = Http::withHeaders($headers)
                ->put("{$this->baseUrl}/{$endpoint}", $data);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('API PUT request failed', [
                'endpoint' => $endpoint,
                'status' => $response->status(),
                'response' => $response->body(),
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('API PUT request exception', [
                'endpoint' => $endpoint,
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }

    /**
     * Make DELETE request to Node.js API
     */
    public function delete(string $endpoint, array $headers = [])
    {
        try {
            // Add token to headers if available in session
            if (session()->has('token')) {
                $headers['Authorization'] = 'Bearer ' . session('token');
            }

            $response = Http::withHeaders($headers)
                ->delete("{$this->baseUrl}/{$endpoint}");

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('API DELETE request failed', [
                'endpoint' => $endpoint,
                'status' => $response->status(),
                'response' => $response->body(),
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('API DELETE request exception', [
                'endpoint' => $endpoint,
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }

    /**
     * Get base URL
     */
    public function getBaseUrl(): string
    {
        return $this->baseUrl;
    }
}

