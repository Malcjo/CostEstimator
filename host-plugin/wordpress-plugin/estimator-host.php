<?php
/**
 * Plugin Name: Cost Estimator Host API
 * Description: Host-side plugin for managing templates and API key validation.
 * Version: 0.1
 * Author: Your Name
 */

if (!defined('ABSPATH')) exit;

// Register API endpoints
add_action('rest_api_init', function () {
    register_rest_route('estimator/v1', '/check-key', [
        'methods' => 'POST',
        'callback' => 'feh_check_api_key',
        'permission_callback' => '__return_true'
    ]);

    register_rest_route('estimator/v1', '/get-template', [
        'methods' => 'GET',
        'callback' => 'feh_get_template',
        'permission_callback' => '__return_true'
    ]);
});

// Dummy license check
function feh_check_api_key($request) {
    $key = sanitize_text_field($request->get_param('key'));
    $valid_keys = ['TEST123', 'CLIENT456'];

    if (!in_array($key, $valid_keys)) {
        return new WP_REST_Response(['status' => 'invalid'], 403);
    }

    return ['status' => 'valid', 'features' => ['pro' => true]];
}

// Dummy template fetch
function feh_get_template($request) {
    $template = file_get_contents(__DIR__ . '/example-template.json');
    return json_decode($template, true);
}
